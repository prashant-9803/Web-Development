const express = require("express");
const jwt = require("jsonwebtoken");
const { authMiddleware } = require("./middleware");

var USERS_ID = 1;
var ORGANISATION_ID = 1;
var BOARD_ID = 1;
var ISSUES_ID = 1;

const USERS = [];

const ORGANISATIONS = [
  
];

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

app.post("/signup", (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  const userExists = USERS.find((u) => u.username === username);

  if (userExists) {
    res.status(411).json({
      message: "User with this username already exists",
    });
    return;
  }

  USERS.push({
    username,
    password,
    id: USERS_ID++,
  });

  res.status(201).json({
    message: "Signup successsful",
  });
});

app.post("/signin", (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  const userExists = USERS.find((u) => u.username === username);

  if (!userExists) {
    res.status(403).json({
      message: "Invalid Credentials",
    });

    return;
  }

  // create jwt token
  const token = jwt.sign(
    {
      userId: userExists.id,
    },
    "jwtSecret",
  );

  res.json({
    token,
  });
});



app.post("/organisation", authMiddleware, (req, res) => {
  const userId = req.userId;

  ORGANISATIONS.push({
    id: ORGANISATION_ID,
    title: req.body.title,
    description: req.body.description,
    admin: userId,
    members: [],
  });

  res.json({
    message: "Org created",
    id: ORGANISATION_ID++,
  });
});



app.post("/add-member-to-organisation", authMiddleware, (req, res) => {
  const userId = req.userId;
  const organisationId = req.body.organisationId;
  const memberUsername = req.body.memberUsername;

  const organisation = ORGANISATIONS.find((o) => o.id == organisationId);

  if (!organisation || organisation.admin !== userId) {
    console.log(organisation, userId)
    res.status(411).json({
      message:
        "Either this org does not exist, or you are not admin of that org",
    });

    return;
  }

  const memberUser = USERS.find((u) => u.username === memberUsername);

  console.log("member", memberUser)

  if (!memberUser) {
    res.status(411).json({
      message: "No member of this username exists",
    });

    return;
  }
  organisation.members.push(memberUser.id);

  res.status(201).json({
    message: "new member added",
  });
});

app.post("/board", (req, res) => {});
app.post("/issue", (req, res) => {});

app.put("/issues", (req, res) => {});

app.get("/organisations", authMiddleware, (req, res) => {
  const userId = req.userId;
  const organisationId = req.query.organisationId;

  const organisation = ORGANISATIONS.find((o) => o.id == organisationId);

  if (!organisation || organisation.admin !== userId) {
    res.status(411).json({
      message:
        "Either this org does not exist, or you are not admin of that org",
    });

    return;
  }

  res.json({
    organisation: {
      ...organisation,
      members: organisation.members.map((memberId) => {
        const user = USERS.find((u) => u.id === memberId);
        return {
          id: user.id,
          username: user.username
        }
      }),
    },
  });
});

app.get("/boards/", (req, res) => {});
app.get("/issues", (req, res) => {});
app.get("/members", (req, res) => {});

app.delete("/member", authMiddleware, (req, res) => {
  const userId = req.userId;
  const organisationId = req.body.organisationId;
  const memberUsername = req.body.memberUsername;

  const organisation = ORGANISATIONS.find((o) => o.id == organisationId);

  if (!organisation || organisation.admin !== userId) {
    res.status(411).json({
      message:
        "Either this org does not exist, or you are not admin of that org",
    });

    return;
  }

  const memberUser = USERS.find((u) => u.username === memberUsername);

  if (!memberUser) {
    res.status(411).json({
      message: "No member of this username exists",
    });

    return;
  }

  ORGANISATIONS.members = ORGANISATIONS.filter((m) => m.id !== memberUser.id);

  res.status(201).json({
    message: "new member added",
  });
});

app.listen(3000, function () {
  console.log("server listening on port 3000");
});
