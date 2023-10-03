const PORT = process.env.PORT || 8080;

import express from "express";
import cors from "cors";

import loginRouter from "./routers/login-router.js";
import adminRouter from "./routers/admin-router.js";
import oscRouter from "./routers/osc-router.js";
import needyUsersRouter from "./routers/needy-users-router.js";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api", loginRouter);
app.use("/api/admins", adminRouter);
app.use("/api/oscs", oscRouter);
app.use("/api/needy-users", needyUsersRouter);

app.use(express.static("../web/dist"));

app.use("*", (req, res) => {
  res.sendFile("index.html", { root: "../web/dist" });
});

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
