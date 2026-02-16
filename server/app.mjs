import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import assignmentRoutes from "./routes/assignmentRoutes.mjs";
import postRoutes from "./routes/posts.mjs";


dotenv.config();

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

app.listen(PORT, () => {
  console.log(`Server is running at ${PORT}`);
});
