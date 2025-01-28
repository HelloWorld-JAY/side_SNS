import mysql from "mysql2";


// 데이터베이서 연결
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "admin1234",
  database: "basic",
});

connection.connect((err) => {
  if (err) {
    console.error("MySQL 연결 오류: " + err.stack);
    return;
  }
  console.log("MySQL 연결 성공: " + connection.threadId);
});

export default connection;
