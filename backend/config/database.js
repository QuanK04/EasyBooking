const sql = require('mssql');
require('dotenv').config();

const poolPromise = new sql.ConnectionPool({
    user: process.env.DB_USER,         // Tài khoản SQL Server
    password: process.env.DB_PASSWORD, // Mật khẩu SQL Server
    server: process.env.DB_HOST,       // Tên server
    database: process.env.DB_NAME,     // Tên cơ sở dữ liệu
    options: {
        encrypt: true,                 // Mã hóa kết nối
        trustServerCertificate: true,  // Cho phép chứng chỉ tự ký
    },
}).connect().then(pool => {
    console.log('Connected to SQL Server');
    return pool;
}).catch(err => {
    console.error('Database connection failed:', err);
    throw err;
});

module.exports = { sql, poolPromise };
