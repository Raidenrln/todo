import type { Request, Response } from "express";
import { db } from "../config/db.js";

export const getTodos = async (req: Request, res: Response) => {
  try {
    const user = (req as any).user;
    const [rows] = await db.query("SELECT * FROM test WHERE user_id = ?", [
      user.id,
    ]);
    res.json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to retrieve todos" });
  }
};

export const createTodo = async (req: Request, res: Response) => {
  try {
    const user = (req as any).user;
    const { id, name, status, created_at, deadline, description, isEditable } =
      req.body;

    await db.query(
      `INSERT INTO test (id, user_id, name, status, created_at, deadline, description, is_editable) 
       VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [id, user.id, name, status, created_at, deadline, description, isEditable],
    );

    res.status(201).json({ message: "Todo created" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to create todo" });
  }
};

export const updateTodo = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { name, created_at, description } = req.body;

    await db.query(
      `UPDATE test SET name = ?, created_at = ?, description = ? WHERE id = ?`,
      [name, created_at, description, id],
    );

    res.json({ message: "Todo updated" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to update todo" });
  }
};