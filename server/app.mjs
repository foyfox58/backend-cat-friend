// Load environment variables BEFORE importing modules that read process.env at import-time.
import "dotenv/config";

import express from "express";
import cors from "cors";

import assignmentRoutes from "./routes/assignmentRoutes.mjs";
import postRoutes from "./routes/posts.mjs";
import protectAdmin from "./middleware/protectAdmin.mjs";
import protectUser from "./middleware/protectUser.mjs";

const app = express();
const PORT = process.env.PORT || 4000;

app.use(express.json());

app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "http://localhost:3000",
      "https://your-frontend.vercel.app",
    ],
  })
);

// ✅ เรียกใช้ routes
app.use("/", assignmentRoutes);
app.use("/", postRoutes); // ✅ เพิ่มตรงนี้
app.get("/protected-route", protectUser, (req, res) => {
  res.json({ message: "This is protected content", user: req.user });
});

app.get("/admin-only", protectAdmin, (req, res) => {
  res.json({ message: "This is admin-only content", admin: req.user });
});

app.listen(PORT, () => {
  console.log(`Server is running at ${PORT}`);
});
