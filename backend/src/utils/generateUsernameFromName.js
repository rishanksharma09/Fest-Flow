import crypto from "crypto"

export function generateUsernameFromName(name) {
  const base = name
    .toLowerCase()
    .trim()
    .split(/\s+/)
    .join("")
    .replace(/[^a-z0-9]/g, "")
    .slice(0, 20)

  const random = crypto.randomBytes(2).toString("hex") // 4 chars

  return `${base}_${random}`
}