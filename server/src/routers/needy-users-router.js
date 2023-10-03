import express from "express";
import { pool } from "../db/connection.js";

const needyUsersRouter = express.Router();

needyUsersRouter.get("/needy-users", async (req, res) => {
  try {
    const [users] = await pool.query("SELECT * FROM NeedyUsers");
    res.status(200).send(users);
  } catch (error) {
    res.status(400).send({ error: error.message || "Unknown error" });
  }
});

needyUsersRouter.post("/needy-users", async (req, res) => {
  try {
    // Asumiendo que el cuerpo de la solicitud tiene la información necesaria del usuario
    const { email, password, fullName } = req.body;
    await pool.query(
      "INSERT INTO NeedyUsers (email, password, fullName) VALUES (?, ?, ?)",
      [email, password, fullName]
    );
    res.status(201).send({ message: "Needy user successfully created" });
  } catch (error) {
    res.status(400).send({ error: error.message || "Unknown error" });
  }
});

// Más endpoints; por ejemplo para eliminar o actualizar usuarios.

export default needyUsersRouter;
