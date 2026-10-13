import { CreateAvatarSchema, SigninSchema, SignupSchema } from "./zodSchemas";
import express from "express";
import { prisma } from "./db";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

// Must be called before anything that reads process.env (including GoogleGenAI)
dotenv.config();

import { GoogleGenAI } from "@google/genai";
import fs from "fs";
import axios from "axios";

const app = express();
// Explicitly pass the key — the SDK auto-discovers GOOGLE_API_KEY, not GEMINI_API_KEY
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

app.use(express.json());

app.post("/api/v1/signup", async (req, res) => {
  const { data, success, error } = SignupSchema.safeParse(req.body);

  if (!success) {
    return res.status(411).json({
      error: error.issues.map((err) => err.message),
    });
  }

  const { username, password } = data;
  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    let user = await prisma.user.create({
      data: {
        username,
        password: hashedPassword,
      },
    });

    return res.json({
      message: "user created !",
      userId: user.id,
    });
  } catch (error: any) {
    return res.status(401).json({
      error: error.message,
    });
  }
});

app.post("/api/v1/signin", async (req, res) => {
  const { data, success, error } = SigninSchema.safeParse(req.body);
  if (!success) {
    return res.status(400).json({
      error: error.issues.map((err) => err.message),
    });
  }

  const { username, password } = data;

  try {
    const userExisting = await prisma.user.findFirst({
      where: {
        username,
      },
    });

    if (!userExisting) {
      return res.status(401).json({
        message: "Invalid email or password",
      });
    }

    const isCorrectPassword = await bcrypt.compare(
      password,
      userExisting.password,
    );
    if (isCorrectPassword) {
      const token = jwt.sign(
        {
          userId: userExisting.id,
        },
        process.env.JWT_SECRET!,
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
  } catch (error: any) {
    return res.status(500).json({
      error: error.message ?? "An unknown error occurred",
    });
  }
});

// POST /api/v1/avatar
// Creates an AI-generated avatar (left-side profile headshot) from a provided image URL.
// Steps:
//   1. Validate the request body against CreateAvatarSchema
//   2. Fetch the source image and convert it to base64
//   3. Build a multimodal prompt (text instruction + image) for the AI model
//   4. Call the Gemini AI model to generate the avatar image
//   5. Save the generated image to disk as a PNG file
app.post("/api/v1/avatar", async (req, res) => {
  // Step 1: Validate incoming request body using Zod schema
  const { data, success, error } = CreateAvatarSchema.safeParse(req.body);

  if (!success) {
    return res.status(411).json({
      error: error,
    });
  }

  // Step 2: Fetch the image from the provided URL and encode it as base64
  // `arraybuffer` response type ensures raw binary data is returned
  const base64Image = await axios
    .get(data.image, {
      responseType: "arraybuffer",
    })
    .then((response) =>
      Buffer.from(response.data, "binary").toString("base64"),
    );

  // Step 3: Build the multimodal prompt for the AI model
  // Combines a text instruction describing the desired output with the source image
  const prompt = [
    {
      type: "text" as const,
      text: "create a left side profile For this user, given the image, create a portfolio, head short from left side of this user",
    },
    {
      type: "image" as const,
      mime_type: "image/png",
      data: base64Image,
    },
  ];

  // Step 4: Send the prompt to the Gemini AI model and await the generated image
  const response = await ai.interactions.create({
    model: "gemini-3-pro-image",
    input: prompt,
  });

  // Step 5: If the model returned image data, decode it from base64 and write to disk
  const generatedImage = response.output_image;
  if (generatedImage && generatedImage.data) {
    const buffer = Buffer.from(generatedImage.data, "base64");
    fs.writeFileSync("./assets/gemini-native-image.png", buffer);
    console.log("Image saved as gemini-native-image.png");
  }
});

app.post("/api/v1/video", (req, res) => {});

app.get("/api/v1/video/:videoId", (req, res) => {});

app.get("/api/v1/videos", (req, res) => {});

app.get("/api/v1/credits", (req, res) => {});

app.get("/api/v1/models", (req, res) => {});

app.get("/api/v1/avatar/:avatarId", (req, res) => {});

app.get("/api/v1/avatars", (req, res) => {});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
