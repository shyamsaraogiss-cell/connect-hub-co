import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import { prisma } from "../lib/prisma";
import { AuthenticatedRequest } from "../middleware/auth.middleware";
import { getJwtConfig } from "../lib/jwt.config";

export async function registerUser(
  req: Request,
  res: Response
) {
  try {
    const {
      fullName,
      email,
      password,
    } = req.body;

    if (!fullName || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "All fields are required.",
      });
    }

    const existingUser =
      await prisma.user.findUnique({
        where: {
          email,
        },
      });

    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: "Email already registered.",
      });
    }

    const hashedPassword =
      await bcrypt.hash(password, 10);

    const user =
      await prisma.user.create({
        data: {
          fullName,
          email,
          password: hashedPassword,
        },
      });

    return res.status(201).json({
      success: true,
      message: "User registered successfully.",
      user: {
        id: user.id,
        fullName: user.fullName,
        email: user.email,
        role: user.role,
      },
    });

  } catch (error) {

    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });

  }
}

export async function loginUser(
  req: Request,
  res: Response
) {
  try {
    const {
      email,
      password,
    } = req.body;

    const user =
      await prisma.user.findUnique({
        where: {
          email,
        },
      });

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password.",
      });
    }

    if (!user.isActive) {
      return res.status(403).json({
        success: false,
        message: "This account is not active.",
      });
    }

    const validPassword =
      await bcrypt.compare(
        password,
        user.password
      );

    if (!validPassword) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password.",
      });
    }

    let jwtConfig;
    try {
      jwtConfig = getJwtConfig();
    } catch {
      console.error("Required JWT configuration is missing.");
      return res.status(500).json({
        success: false,
        message: "Authentication service is unavailable.",
      });
    }

    const token = jwt.sign(
      {
        id: user.id,
        email: user.email,
        role: user.role,
      },
      jwtConfig.secret,
      {
        expiresIn: "7d",
        issuer: jwtConfig.issuer,
        audience: jwtConfig.audience,
      }
    );

    return res.json({
      success: true,
      message: "Login successful.",
      token,
      user: {
        id: user.id,
        fullName: user.fullName,
        email: user.email,
        role: user.role,
      },
    });

  } catch (error) {

    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });

  }
}

export async function getCurrentUser(req: AuthenticatedRequest, res: Response) {
  const user = await prisma.user.findUnique({
    where: { id: req.auth!.id },
    select: { id: true, fullName: true, email: true, role: true, isActive: true },
  });
  if (!user?.isActive) {
    return res.status(401).json({ success: false, message: "Authentication session is no longer active." });
  }
  return res.json({ user: { id: user.id, fullName: user.fullName, email: user.email, role: user.role } });
}

export function logoutUser(_req: Request, res: Response) {
  return res.status(204).send();
}
