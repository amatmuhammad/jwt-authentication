import bcrypt from "bcrypt";
import db from "./db.js";

async function seedUser() {
  const username = "admin";
  const plainPassword = "123456";
  const hashedPassword = await bcrypt.hash(plainPassword, 10);

  db.query(
    "INSERT INTO users (username, password) VALUES (?, ?)",
    [username, hashedPassword],
    (err) => {
      if (err) {
        console.error("Gagal menambahkan user:", err);
      } else {
        console.log(`User "${username}" berhasil ditambahkan! Password: ${plainPassword}`);
      }
      process.exit();
    }
  );
}

seedUser();
