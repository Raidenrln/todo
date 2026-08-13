import type { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { db } from "../config/db.js";

export const register = async (req: Request, res: Response) => {
  try {
    const { id, username, password } = req.body;

    const [rows] = await db.query(
      "SELECT id, username FROM users WHERE id = ? OR username = ?",
      [id, username],
    );

    const users = rows as any[];

    if (users.length > 0) {
      const existingUser = users[0];

      if (existingUser.id === id) {
        return res.status(409).json({ message: "ID is already taken" });
      }

      if (existingUser.username === username) {
        return res.status(409).json({ message: "Username is already taken" });
      }
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await db.query(
      "INSERT INTO users (id, username, password) VALUES (?, ?, ?)",
      [id, username, hashedPassword],
    );

    res.status(201).json({ message: "User Registered" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Registration failed" });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body;

    const [rows] = await db.query("SELECT * FROM users WHERE username = ?", [
      username,
    ]);

    const users = rows as any[];

    if (users.length === 0) {
      return res.status(401).json({ message: "User not found" });
    }

    const user = users[0];
    const validPassword = await bcrypt.compare(password, user.password);

    if (!validPassword) {
      return res.status(401).json({ message: "Wrong password" });
    }

    const token = jwt.sign(
      { id: user.id, username: user.username },
      process.env.JWT_SECRET!,
      { expiresIn: "1d" },
    );

    res.json({ message: "Login successful", token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Login failed" });
  }
};