# Blogging Platform Backend

A feature-rich backend for a blogging platform that supports user and admin roles. Users can create, update, and delete their blogs, while admins can manage users and blogs. The platform includes secure authentication, role-based access control, and a public API with search, sorting, and filtering functionalities for blogs.

---

## 🚀 Live URL
🔗 **Backend API**: [https://blog-bro-nine.vercel.app/](https://blog-bro-nine.vercel.app/)

---


## 🚀 Admin Info  
To log in as an admin, use the following credentials:  
- **Email**: tazim@gmail.com  
- **Password**: 123456  

---

## 📋 Features

### User Roles
- **Admin**:
  - Block users.
  - Delete any blog.
  - Cannot update blogs.
- **User**:
  - Register and log in.
  - Create, update, and delete their own blogs.
  - Cannot perform admin actions.

### Authentication & Authorization
- Secure JWT-based authentication for all write operations.
- Role-based access control to differentiate actions between Admin and User.

### Blog API (Public)
- Fetch blogs with:
  - **Search**: Filter blogs by title or content.
  - **Sort**: Sort blogs by fields like title or creation date.
  - **Filter**: Filter blogs by author.

### Admin Actions
- Block or unblock users.
- Delete any blog in the system.

### Error Handling
- Consistent error response format for easy debugging.
- Handles:
  - Input validation errors.
  - Resource not found errors.
  - Authentication and authorization errors.
  - Internal server errors.

---

## 🛠️ Technologies Used

- **Programming Language**: TypeScript
- **Framework**: Node.js with Express.js
- **Database**: MongoDB with Mongoose
- **Authentication**: JSON Web Tokens (JWT)
- **Validation**: Zod for schema validation

---

## 📂 Project Structure

```plaintext
.
├── src
│   ├── controllers        # Request handlers for various endpoints
│   ├── models             # Mongoose models (User, Blog)
│   ├── routes             # Route definitions for APIs
│   ├── middlewares        # Authentication and authorization middlewares
│   ├── utils              # Utility functions
│   └── index.ts           # Entry point of the application
├── .env                   # Environment variables
├── package.json           # Project dependencies and scripts
└── README.md              # Project documentation
```

---

## 🖥️ Installation and Setup

### Prerequisites
- [Node.js](https://nodejs.org/) (v14 or later)
- [MongoDB](https://www.mongodb.com/) (running locally or a connection string to a cloud instance)

### Environment Variables
Create a `.env` file in the root directory with the following variables:

```plaintext
PORT=5000
MONGO_URI=your_mongo_connection_string
JWT_SECRET=your_jwt_secret
```

### Steps to Run
1. Clone the repository:
   ```bash
   git clone https://github.com/tazim5032/blogs-bro.git
   cd blogging-platform-backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the server:
   ```bash
   npm run dev
   ```

4. The API will be available at `http://localhost:5000`.

---

## 🔑 API Endpoints

### Authentication
1. **Register User**
   - `POST /api/auth/register`
2. **Login User**
   - `POST /api/auth/login`

### Blogs
1. **Create Blog**
   - `POST /api/blogs` (Logged-in users)
2. **Update Blog**
   - `PATCH /api/blogs/:id` (Blog owner only)
3. **Delete Blog**
   - `DELETE /api/blogs/:id` (Blog owner or admin)
4. **Get All Blogs**
   - `GET /api/blogs` (Public)

### Admin Actions
1. **Block User**
   - `PATCH /api/admin/users/:userId/block`
2. **Delete Blog**
   - `DELETE /api/admin/blogs/:id`

---

## 🐛 Error Response Format

All errors follow this structure for consistency:

```json
{
  "success": false,
  "message": "Error description",
  "statusCode": 400,
  "error": { "details": "Error details, if available" },
  "stack": "Stack trace, if available"
}
```

---

## 🧪 Testing the APIs
Use tools like [Postman](https://www.postman.com/) or [cURL](https://curl.se/) to interact with the endpoints. Ensure to include the `Authorization` header for authenticated routes.

---

## 📝 License

This project is licensed under the **MIT License**. See the [LICENSE](LICENSE) file for details.

---

## 📧 Contact
For any questions or feedback, feel free to reach out:

- **Email**: mfittazim@gmail.com
- **GitHub**: [https://github.com/tazim5032](https://github.com/tazim5032)
