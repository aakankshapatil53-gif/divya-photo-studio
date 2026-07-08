import { PrismaClient } from "@prisma/client";

// Reuse a single PrismaClient instance across the app.
export const prisma = new PrismaClient();
