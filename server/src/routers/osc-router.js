import express from "express";
import { pool } from "../db/connection.js";
import { z } from "zod";

const oscsRouter = express.Router();

// POST /register
oscsRouter.post("/register", async (req, res) => {
  try {
    const { name, description, contactEmail, contactPhone, category } = z
      .object({
        name: z.string(),
        description: z.string().optional(),
        contactEmail: z.string().optional(),
        contactPhone: z.string().optional(),
        category: z.string().optional(),
      })
      .parse(req.body);

    await pool.query(
      "INSERT INTO OSCs (name, description, contactEmail, contactPhone, category) VALUES (?, ?, ?, ?, ?)",
      [name, description, contactEmail, contactPhone, category]
    );

    res.status(201).send({ message: "OSC registration request received!" });
  } catch (error) {
    res.status(400).send({ error: error.message || "Unknown error" });
  }
});

// GET /
oscsRouter.get("/", async (req, res) => {
  try {
    const [approvedOscs] = await pool.query(
      "SELECT * FROM OSCs WHERE isApproved = TRUE"
    );
    res.status(200).send(approvedOscs);
  } catch (error) {
    res.status(400).send({ error: error.message || "Unknown error" });
  }
});

export default oscsRouter;
