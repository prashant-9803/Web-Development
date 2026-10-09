import { prisma } from "./db";
import express from "express";

const app = express();

app.use(express.json())

// async function createUser() {
//   // const newUser = await prisma.user.create({
//   //   data: {
//   //     username: "sdasdasd",
//   //     password: "ada",
//   //     city: "Asdad"
//   //   },
//   //   omit:{
//   //     password: true
//   //   }
//   // })

//   const newUser = await prisma.user.findFirst({
//     where: {
//       username: "prashant",
//     },
//     omit: {
//       password: true,
//     },
//   });

//   console.log(newUser);
// }

app.get("/users", async (req, res) => {
  try {
    let users = await prisma.user.findMany();

    if (!users) {
      return res.json({
        message: "NO users are present",
      });
    }

    res.json({
      users,
    });
  } catch (error: any) {
    console.log(error.message);
    return res.status(401).json({
      error: error.message,
    });
  }
});

app.get("/users/:id", async (req, res) => {
  let id = parseInt(req.params.id);

  try {
    let user = await prisma.user.findFirst({
      where: {
        id: id,
      },
    });

    if (!user) {
      return res.json({
        message: "NO user present with this id",
      });
    }

    res.json({
      user,
    });
  } catch (error: any) {
    console.log(error.message);
    return res.status(401).json({
      error: error.message,
    });
  }
});

app.get("/user-todos/:id", async (req, res) => {
  const userId = parseInt(req.params.id);
  try {
    let userTodos = await prisma.user.findFirst({
      where: {
        id: userId,
      },
      select: {
        todos: true,
      },
    });

    if (!userTodos) {
      return res.json({
        message: "NO todo present for this user",
      });
    }

    res.json({
      userTodos,
    });
  } catch (error: any) {
    console.log(error.message);
    return res.status(401).json({
      error: error.message,
    });
  }
});

app.post("/create-todo", async (req, res) => {
  const { title, description, userId } = req.body;

  if (!title || !description || !userId) {
    return res.status(401).json({
      message: "please provide all the fields",
    });
  }

  try {
    let newTodo = await prisma.todo.create({
      data: {
        title: title,
        description: description,
        userId: userId,
      },
    });

    if (!newTodo) {
      return res.status(403).json({
        message: "error while creating todo",
      });
    }

    res.json({
      message: "todo created!",
      todo: newTodo,
    });
  } catch (error: any) {
    console.log(error)
    return res.json({
      error: error.message,
    });
  }
});

app.listen(3000, () => {
  console.log("server listening on 3000");
});
