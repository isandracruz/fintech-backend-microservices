# Fintech Backend Microservices 🚀

A robust, event-driven backend architecture for a fintech application. This project is built using **NestJS**, following a microservices pattern to ensure high scalability, fault tolerance, and a clean separation of concerns.

The architecture features an API Gateway that securely routes HTTP requests to internal TCP microservices, real-time event streaming for banking operations, and external data integration.

## 🛠️ Tech Stack & Architecture

* **Framework:** [NestJS](https://nestjs.com/)
* **Architecture Pattern:** API Gateway & TCP Microservices
* **Message Broker:** [Apache Kafka](https://kafka.apache.org/) (Running on modern KRaft mode)
* **Database:** PostgreSQL
* **Security:** JWT (JSON Web Tokens) Authentication Guards
* **Infrastructure:** Docker & Docker Compose
* **External Integrations:** MockAPI (for simulating external banking systems)

## 🚀 Getting Started

### 1. Installation

```bash
git clone <your-repo-url>
cd fintech-backend-microservices
npm install
```

### 2. Configuration (.env)

Create a `.env` file in the root directory with the following content:

```env
DB_USER=postgres
DB_PASSWORD=secret
DB_NAME=fintech_db
DB_PORT=5432
KAFKA_PORT=9092
JWT_SECRET=your_jwt_secret
MOCK_API_URL=[https://your-id.mockapi.io/api/v1/operations](https://your-id.mockapi.io/api/v1/operations)
```
### 3. Running the Application
```bash
# 1. Start database and Kafka
docker-compose up -d

# 2. Start API Gateway (Terminal 1)
npm run start:dev api-gateway

# 3. Start Bank Microservice (Terminal 2)
npm run start:dev bank

# 4. Start SSO Microservice (Terminal 3)
npm run start:dev sso
```

