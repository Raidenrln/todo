import express from "express";
import cors from "cors";
import { db } from "./db.js";
import "dotenv/config";
import { logger } from "./middleware/logger.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import "dotenv/config";
import { auth } from "./middleware/auth.js";

const app = express();

app.use(cors());
app.use(express.json());
app.use(logger);

app.get("/todo", auth, async (req, res) => {
  try {
    const user = (req as any).user;
    console.log(user);
    const [rows] = await db.query("SELECT * FROM test where user_id = ?", [user.id]);
    res.json(rows);
    console.log(rows);
  } catch (error) {
    throw new Error("No Server");
  }
});

app.post("/todo/test", auth, async (req, res) => {
  const user = (req as any).user;
  try {
    const { id, name, status, createdAt, deadline, description, isEditable } = req.body;
    await db.query(
      `INSERT INTO test (id, name, status, created_At, deadline, description, is_editable, user_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [id, name, status, createdAt, deadline, description, isEditable, user.id],
    );
    res.status(201).json({ message: "Todo created" });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Failed to created todo",
    });
  }
});

app.put("/todo/:id", auth, async (req, res) => {
  const { id } = req.params;
  const { name, createdAt, description } = req.body;

  await db.query(
    `
      UPDATE test SET
      name = ?,
      created_At = ?,
      description = ?
      WHERE id = ?
    `,
    [name, createdAt, description, id],
  );

  res.json({
    message: "Todo updated",
  });
});

app.post("/register", async (req, res) => {
  try {
    const { id, username, password } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    await db.query(`INSERT INTO users (id, username, password) VALUES (?, ?, ?)`, [
      id,
      username,
      hashedPassword,
    ]);

    res.status(201).json({
      message: "User Registered",
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Registration failed",
    });
  }
});

app.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;

    const [rows] = await db.query("SELECT * FROM users WHERE username = ?", [username]);

    const users = rows as any[];

    if (users.length === 0) {
      return res.status(401).json({
        message: "User not found",
      });
    }

    const user = users[0];

    const validPassword = await bcrypt.compare(password, user.password);

    if (!validPassword) {
      return res.status(401).json({
        message: "Wrong password",
      });
    }

    const token = jwt.sign(
      {
        id: user.id,
        username: user.username,
      },
      process.env.JWT_SECRET!,
      {
        expiresIn: "1d",
      },
    );
    res.json({
      message: "Login succesfully",
      token,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Login failed",
    });
  }
});

app.listen(process.env.PORT, () => {
  console.log(`Server running on http://localhost:${process.env.PORT}`);
});
