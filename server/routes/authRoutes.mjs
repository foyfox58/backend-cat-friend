import { Router } from "express";
import supabase from "../utils/supabaseClient.mjs";

const authRouter = Router();


// ===== REGISTER =====
authRouter.post("/register", async (req, res) => {
  // register logic
});


// ===== LOGIN =====
authRouter.post("/login", async (req, res) => {
  // login logic
});


// ===== RESET PASSWORD =====
authRouter.put("/reset-password", async (req, res) => {
  const token = req.headers.authorization?.split(" ")[1];
  const { oldPassword, newPassword } = req.body;

  if (!token) {
    return res.status(401).json({ error: "Unauthorized: Token missing" });
  }

  if (!newPassword) {
    return res.status(400).json({ error: "New password is required" });
  }

  try {
    const { data: userData } = await supabase.auth.getUser(token);

    const { error: loginError } = await supabase.auth.signInWithPassword({
      email: userData.user.email,
      password: oldPassword,
    });

    if (loginError) {
      return res.status(400).json({ error: "Invalid old password" });
    }

    const { error } = await supabase.auth.updateUser({
      password: newPassword,
    });

    if (error) {
      return res.status(400).json({ error: error.message });
    }

    res.status(200).json({
      message: "Password updated successfully",
    });

  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});


export default authRouter;
