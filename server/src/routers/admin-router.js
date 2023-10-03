import express from "express";
import { pool } from "../db/connection.js";
import { z } from "zod";
import jwt from "jsonwebtoken";

const adminRouter = express.Router();

// POST /login
adminRouter.post("/login", async (req, res) => {
  try {
    const { email, password } = z
      .object({ email: z.string(), password: z.string() })
      .parse(req.body);

    // Check Administrators
    const [administrators] = await pool.query(
      "SELECT id, fullName FROM Administrators WHERE email = ? AND password = ?",
      [email, password]
    );

    if (administrators.length > 0) {
      const user = administrators[0];
      res.status(200).send({ role: "ADMINISTRATOR", ...user });
      return;
    }

    // Check NeedyUsers
    const [needyUsers] = await pool.query(
      "SELECT id, fullName FROM NeedyUsers WHERE email = ? AND password = ?",
      [email, password]
    );

    if (needyUsers.length > 0) {
      const user = needyUsers[0];
      res.status(200).send({ role: "NEEDYUSER", ...user });
      return;
    }
    res.status(404).send("User not found. Email or password are incorrect.");
  } catch (error) {
    res.status(400).send({ error: error.message || "Unknown error" });
  }
});

// GET /oscs
adminRouter.get("/oscs", async (req, res) => {
  try {
    const [oscs] = await pool.query(
      "SELECT * FROM OSCs WHERE isApproved = FALSE"
    );
    res.status(200).send(oscs);
  } catch (error) {
    res.status(400).send({ error: error.message || "Unknown error" });
  }
});

// PUT /oscs/:id/approve
adminRouter.put("/oscs/:id/approve", async (req, res) => {
  try {
    const { id } = req.params;
    await pool.query("UPDATE OSCs SET isApproved = TRUE WHERE id = ?", [id]);
    res.status(200).send({ message: "OSC approved successfully!" });
  } catch (error) {
    res.status(400).send({ error: error.message || "Unknown error" });
  }
});

// PUT /oscs/:id/reject
adminRouter.put("/oscs/:id/reject", async (req, res) => {
  try {
    const { id } = req.params;
    await pool.query("DELETE FROM OSCs WHERE id = ?", [id]);
    res.status(200).send({ message: "OSC rejected successfully!" });
  } catch (error) {
    res.status(400).send({ error: error.message || "Unknown error" });
  }
});

// PUT /oscs/:id
adminRouter.put("/oscs/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description, contactEmail, contactPhone, category } =
      req.body;

    await pool.query(
      "UPDATE OSCs SET name = ?, description = ?, contactEmail = ?, contactPhone = ?, category = ? WHERE id = ?",
      [name, description, contactEmail, contactPhone, category, id]
    );

    res.status(200).send({ message: "OSC updated successfully!" });
  } catch (error) {
    res.status(400).send({ error: error.message || "Unknown error" });
  }
});

export default adminRouter;
