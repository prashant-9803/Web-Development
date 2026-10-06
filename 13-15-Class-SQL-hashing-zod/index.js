import { Pool } from "pg";
import express from "express";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { signinSchema, signupSchema } from "./zodSchemas.js";

// loads env variables
dotenv.config();

// application instance
const app = express();

// middleware to parse json objects
app.use(express.json());

// initialize connection pool for sql db
const pool = new Pool({
  connectionString: process.env.DATABASE_URL_POOLED,
});

app.post("/signup", async (req, res) => {
  // validate the request body using zod
  const { data, success, error } = signupSchema.safeParse(req.body);
  if (!success) {
    return res.status(400).json({
      error: error.issues.map((err) => err.message),
    });
  }

  const hashedPassword = await bcrypt.hash(data.password, 10);

  try {
    // very bad way -> prone to sql injection
    // const response = await pool.query(`INSERT INTO users (username, email, password) VALUES ('${username}', '${email}', '${password}') RETURNING id`)
    const response = await pool.query(
      `INSERT INTO users (username, email, password) VALUES ($1, $2, $3) RETURNING id`,
      [data.username, data.email, hashedPassword],
    );

    return res.json({
      id: response.rows[0].id,
      message: "signup successful",
    });
  } catch (error) {
    return res.status(401).json({
      error: error.message,
    });
  }
});

app.post("/signin", async (req, res) => {
  // validate the request body using zod
  const { data, success, error } = signinSchema.safeParse(req.body);
  if (!success) {
    return res.status(400).json({
      error: error.issues.map((err) => err.message),
    });
  }

  try {
    // const userExists = await pool.query(`SELECT * from users where email='${email}' AND password='${password}'`)
    const response = await pool.query(`SELECT * from users where email=$1`, [
      data.email,
    ]);

    let userExists = response.rows[0];

    if (!userExists) {
      return res.status(401).json({
        message: "Invalid email or password",
      });
    }

    const isCorrectPassword = await bcrypt.compare(
      data.password,
      userExists.password,
    );
    if (isCorrectPassword) {
      const token = jwt.sign(
        {
          userId: userExists.id,
        },
        process.env.JWT_SECRET,
        { expiresIn: "1d" },
      );

      return res.json({
        message: "signin succesful",
        token: token,
      });
    } else {
      return res.status(401).json({
        message: "Password incorrect",
      });
    }
  } catch (error) {
    return res.status(500).json({
      error: error.message,
    });
  }
});

app.listen(3000, () => {
  console.log("server started on port 3000");
});
