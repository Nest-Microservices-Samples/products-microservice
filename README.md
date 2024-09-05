# 🛒 Products Microservice

<p align="center">
  <img src="https://nestjs.com/img/logo_text.svg" alt="NestJS Logo" width="300"/>
</p>

Microservice built with NestJS to manage product-related operations using TCP communication.

## 🚀 Development Setup

1. **📥 Clone the repository:**
   ```bash
   git clone https://github.com/Nest-Microservices-Samples/products-microservice
   cd products-microservice
   ```

2. **📦 Install dependencies:**
   ```bash
   npm install
   ```

3. **🔧 Set up environment variables:**
   Create a `.env` file based on the provided `.env.template`:
   ```bash
   cp .env.template .env
   ```
   Edit the `.env` file to add the required environment variables.

4. **🗃️ Run Prisma migrations and generate the client:**
   ```bash
   npx prisma migrate dev
   npx prisma generate
   ```

5. **🛠️ Start the application in development mode:**
   ```bash
   npm run start:dev
   ```

6. **🧪 Test the microservice:**
   Use tools like **Postman**, **Insomnia**, or `curl` to send TCP messages and test the microservice endpoints. Both Postman and Insomnia are powerful tools that allow you to easily create requests, view responses, and debug APIs.

## 📂 Data Folder for Testing

- The `data` folder in the root of the project is intended for adding sample product data to the database for testing purposes. You can place JSON or CSV files with product information in this folder and use scripts or commands to import them into your development database.

## 📚 Documentation

- For more details about the endpoints and their usage, refer to the `docs` folder or the Postman/Insomnia collection provided.
- Learn more about NestJS at [nestjs.com](https://nestjs.com).

---

Built with ❤️ using NestJS.
