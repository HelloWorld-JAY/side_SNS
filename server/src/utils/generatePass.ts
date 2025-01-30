import crypto from "crypto";

export function generateRandomPassword(): string {
  return crypto.randomBytes(16).toString("hex");
}