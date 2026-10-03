const express = require("express");
const jwt = require("jsonwebtoken");
const { authMiddleware } = require("./middleware");
require("dotenv").config();

const { userModel, organisationModel } = require("./models")


const boards = [
  {
    id: 1,
    title: "100xSchool website frontend",
    organisationId: 1,
  },
];

const issues = [
  {
    id: 1,
    title: "Add dark mode",
    boardId: 1,
    state: "IN_PROGRESS",
  },
  {
    id: 2,
    title: "Allow admins to create more courses",
    boardId: 1,
    state: "DONE",
  },
];

const app = express();

app.use(express.json());


app.post("/signup", async (req, res) => {
  console.log("signup")
  const username = req.body.username;
  const password = req.body.password;

  const userExists = await userModel.findOne({ username: username });

  if (userExists) {
    res.status(411).json({
      message: "User with this username already exists",
    });
    return;
  }

  const user = await userModel.create({
    username: username,
    password: password
  })

  res.status(201).json({
    message: "Signup successsful",
  });
});


app.post("/signin", async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  const userExists = await userModel.findOne({ username: username, password: password });

  if (!userExists) {
    res.status(403).json({
      message: "Invalid Credentials",
    });

    return;
  }

  const token = jwt.sign(
    {
      userId: userExists._id,
    },
    process.env.JWT_SECRET
  );

  res.json({
    token,
  });
});


app.post("/organisation", authMiddleware, async (req, res) => {
  const userId = req.userId;

  const organisation = await organisationModel.create({
    title: req.body.title,
    description: req.body.description,
    admin: userId,
    members: []
  })

  res.json({
    message: "Org created",
    id: organisation._id
  });
});


app.post("/add-member-to-organisation", authMiddleware, async (req, res) => {
  const userId = req.userId;
  const organisationId = req.body.organisationId;
  const memberUsername = req.body.memberUsername;

  const organisation = await organisationModel.findOne({
    _id: organisationId,
    admin: userId
  });

  if (!organisation) {
    res.status(403).json({
      message:
        "Either this org does not exist, or you are not admin of that org",
    });

    return;
  }

  const memberUser = await userModel.findOne({
    username: memberUsername
  })

  if (!memberUser) {
    res.status(411).json({
      message: "No member of this username exists",
    });

    return;
  }

  await organisationModel.updateOne({
    _id: organisationId,
    admin: userId
  }, {
    $push: {
      members: memberUser._id
    }
  });

  res.status(201).json({
    message: "new member added",
  });
});

app.post("/board", (req, res) => { });
app.post("/issue", (req, res) => { });
app.put("/issues", (req, res) => { });

app.get("/organisation", authMiddleware, async (req, res) => {

  const userId = req.userId;
  const organisationId = req.query.organisationId;

  const organisation = await organisationModel.findOne({
    _id: organisationId,
    admin: userId
  })
    .populate("admin", "-password")
    .populate("members", "-password");

  if (!organisation) {
    res.status(411).json({
      message:
        "Either this org does not exist, or you are not admin of that org",
    });

    return;
  }

  res.json({
    organisation
  })
});


app.get("/boards/", (req, res) => { });
app.get("/issues", (req, res) => { });
app.get("/members", (req, res) => { });



app.delete("/member", authMiddleware, async(req, res) => {
  const userId = req.userId;
  const organisationId = req.body.organisationId;
  const memberUsername = req.body.memberUsername;

  const organisation = await organisationModel.findOne({
    _id: organisationId,
    admin: userId
  });

  if (!organisation) {
    res.status(403).json({
      message:
        "Either this org does not exist, or you are not admin of that org",
    });

    return;
  }

  const memberUser = await userModel.findOne({
    username: memberUsername
  })

  // but we have to see if this member exist in that particular organisation 
  if (!memberUser || !organisation.members.some(id => id.equals(memberUser._id))) {
    res.status(411).json({
      message: "No member of this username exists in this organisation",
    });

    return;
  }

  await organisationModel.updateOne({
    _id: organisationId,
    admin: userId
  }, {
    $pull: {
      members: memberUser._id
    }
  });

  res.status(201).json({
    message: "new member removed",
  });
});











app.listen(process.env.PORT, function () {
  console.log("server listening on port", process.env.PORT);
});
