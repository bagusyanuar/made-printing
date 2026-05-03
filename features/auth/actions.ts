"use server";

import { cookies } from "next/headers";
import { getIronSession } from "iron-session";
import { redirect } from "next/navigation";
import { db } from "@/db";
import { users } from "@/db/schema";
import { eq } from "drizzle-orm";
import bcrypt from "bcryptjs";
import { sessionOptions, type SessionData } from "@/lib/session";
import { loginSchema, registerSchema, type LoginInput, type RegisterInput } from "./schemas";

/**
 * Get Session Helper
 */
export async function getSession() {
  const session = await getIronSession<SessionData>(await cookies(), sessionOptions);
  return session;
}

/**
 * Sign In Action
 */
export async function signInWithUsername(data: LoginInput) {
  // 1. Validate Input
  const validated = loginSchema.safeParse(data);
  if (!validated.success) {
    return { error: "Input tidak valid" };
  }

  const { username, password } = validated.data;

  try {
    // 2. Check User existence
    const user = await db.query.users.findFirst({
      where: eq(users.username, username),
    });

    if (!user) {
      return { error: "Username atau password salah" };
    }

    // 3. Check if active
    if (!user.isActive) {
      return { error: "Akun anda dinonaktifkan" };
    }

    // 4. Verify Password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return { error: "Username atau password salah" };
    }

    // 5. Create Session
    const session = await getSession();
    session.user = {
      id: user.id,
      username: user.username,
    };
    session.isLoggedIn = true;
    await session.save();

    return { success: true };
  } catch (error) {
    console.error("Login error:", error);
    return { error: "Terjadi kesalahan pada server" };
  }
}

/**
 * Sign Up Action
 */
export async function signUpWithUsername(data: RegisterInput) {
  // 1. Validate Input
  const validated = registerSchema.safeParse(data);
  if (!validated.success) {
    return { error: "Input tidak valid" };
  }

  const { username, password } = validated.data;

  try {
    // 2. Check if username taken
    const existingUser = await db.query.users.findFirst({
      where: eq(users.username, username),
    });

    if (existingUser) {
      return { error: "Username sudah digunakan" };
    }

    // 3. Hash Password
    const hashedPassword = await bcrypt.hash(password, 12);

    // 4. Create User
    await db.insert(users).values({
      username,
      password: hashedPassword,
    });

    return { success: true };
  } catch (error) {
    console.error("Register error:", error);
    return { error: "Terjadi kesalahan pada server" };
  }
}


/**
 * Sign Out Action
 */
export async function signOut() {
  const session = await getSession();
  session.destroy();
  redirect("/");
}
