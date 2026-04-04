# Fintech Backend Microservices 🚀

A robust and scalable microservices architecture for a Fintech platform, designed to handle secure banking operations and real-time event-driven data flows.

This ecosystem uses an API Gateway as the single entry point, protecting internal microservices via TCP communication and event streaming with Apache Kafka.

## 🛠️ Tech Stack & Architecture

* **Framework:** [NestJS](https://nestjs.com/)
* **Architecture Pattern:** API Gateway & Independent Microservices
* **Communication Protocols:** HTTP (External) / TCP (Internal)
* **Message Broker:** [Apache Kafka](https://kafka.apache.org/) (Running on modern KRaft mode)
* **Database:** PostgreSQL
* **Security:** JWT, Bcrypt, and Throttler (DDoS Protection)
* **Infrastructure:** Docker & Docker Compose
* **External Integrations:** MockAPI (for simulating external banking systems)

## 🚀 Quick Start & Deployment

Thanks to full Dockerization, you don't need to install databases or Kafka locally.

### 1. Clone the repository

```bash
git clone <your-repo-url>
cd fintech-backend-microservices
```

### 2. Configuration (.env)

Create a `.env` file in the root directory with the following content:

```env
# PostgreSQL Database Setup
DB_USER=tu_usuario_local
DB_PASSWORD=tu_contraseña_secreta
DB_NAME=sso_db
DB_PORT=5432
DB_HOST=localhost

# JWT Configuration
JWT_SECRET=your_jwt_secret_key

# Mock API URL for Operations Service
MOCK_API_URL=https://example.mockapi.io/api/v1/operations

# Kafka Configuration
KAFKA_BROKER=localhost:9092
KAFKA_PORT=9092
KAFKAJS_NO_PARTITIONER_WARNING=1

# Microservices Configuration
SSO_SERVICE_HOST=sso
BANK_SERVICE_HOST=bank

```
### 3. Running the Application

#### Option 1: Full Docker Deployment (Recommended)

This command builds all images and starts the Database, Kafka, Gateway, and Microservices automatically:

```bash
docker-compose up --build
```
#### Option 2: Local Development (Manual)

If you prefer to run the services manually (e.g., for debugging), follow these steps:

1. Start PostgreSQL and Kafka using Docker:

```bash
# Starts only Postgres and Kafka
docker-compose up -d postgres-db kafka
```
2. Install dependencies :

```bash
npm install
``` 
3. Launch Microservices (Open 3 separate terminals):

```bash 

# Terminal 1: Auth & User Management
npm run start:dev sso

# Terminal 2: Banking Logic & Kafka
npm run start:dev bank

# Terminal 3: Main Entry Point
npm run start:dev api-gateway
```

## API Endpoints Summary

All external requests must be sent to the API Gateway (Port 3000).


### Authentication (SSO)
- **POST /auth/register**: Register a new user.
- **POST /auth/login**: Authenticate and receive a JWT token.

### Banking Operations (Bank Service)
- **GET /bank/operations**: Retrieve a list of bank operations (Requires JWT).
- **POST /bank/operations**: Creates a new bank operation via Kafka (Requires JWT).

## Documentation
API documentation is available at `http://localhost:3000/api-docs` once the API Gateway is running.