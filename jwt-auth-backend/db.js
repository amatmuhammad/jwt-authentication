import mysql from "mysql2";

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",      
  password: "",     
  database: "jwt_auth_db"
});

connection.connect((err) => {
  if (err) {
    console.error("Koneksi database gagal:", err);
    return;
  }
  console.log("Koneksi database berhasil!");
});

export default connection;