// swagger.js
const swaggerJSDoc = require('swagger-jsdoc');

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Student Management API',
            version: '1.0.0',
            description: 'API documentation for student management system',
        },
        tags: [
            { name: 'Đăng ký', description: 'Tạo tài khoản người dùng mới' },
            { name: 'Xác thực', description: 'Đăng nhập và xử lý xác thực người dùng' },
            { name: 'Người dùng', description: 'Quản lý thông tin người dùng' },
            { name: 'Lớp học', description: 'Quản lý lớp học' },
            { name: 'Thông báo', description: 'Quản lý thông báo' },
            { name: 'Điểm số', description: 'Quản lý điểm học sinh' },
        ],
        servers: [
            {
                url: 'https://student-management-api-64hl.onrender.com/api',
            },
        ],
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: 'http',
                    scheme: 'bearer',
                    bearerFormat: 'JWT',
                },
            },
        },
        security: [
            {
                bearerAuth: [],
            },
        ],
    },
    apis: ['./routes/*.js'], // Đường dẫn tới các file định nghĩa API bằng swagger comments
};

const swaggerSpec = swaggerJSDoc(options);

module.exports = swaggerSpec;
