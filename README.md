# ☁️ Bucket List Tracker – Serverless AWS Application

A full-stack, serverless Bucket List Tracker built with **React** and **AWS Amplify Gen 2**.  
This project demonstrates authentication, GraphQL APIs, serverless data storage, and CI/CD deployment using managed AWS services.

---

## 📸 Application Screenshots

> Screenshots showing authentication flow, dashboard, and item creation.

<!-- INSERT: Login Screen Screenshot -->
<!-- ![Login Screen](screenshots/auth-login.png) -->

<!-- INSERT: Signup Screen Screenshot -->
<!-- ![Signup Screen](screenshots/auth-signup.png) -->

<!-- INSERT: Bucket List Dashboard Screenshot -->
<!-- ![Dashboard](screenshots/dashboard.png) -->

---

## 📌 Features
- Secure user authentication (Login / Signup)
- Create, view, and delete bucket list items
- Image uploads per bucket list item
- Serverless backend with automatic scaling
- CI/CD deployment via AWS Amplify Hosting

---

## 🏗️ Architecture Overview

This application follows a **serverless cloud architecture** using AWS managed services.

<!-- INSERT: Architecture Diagram -->
<!-- ![Architecture Diagram](screenshots/architecture.png) -->

### Services Used
- **AWS Amplify Hosting** – Frontend hosting and CI/CD
- **Amazon Cognito** – User authentication
- **AWS AppSync** – GraphQL API layer
- **Amazon DynamoDB** – NoSQL data storage
- **Amazon S3** – Image storage
- **AWS IAM** – Permissions and access control

---

## 🔄 Application Flow

1. User accesses the React application hosted on Amplify
2. Authentication handled via Amazon Cognito
3. Frontend communicates with AWS AppSync using GraphQL
4. Bucket list data is stored in DynamoDB
5. Images are uploaded and retrieved from S3
6. UI updates dynamically based on API responses

---

## 🛠️ Tech Stack

| Layer | Technology |
|-----|-----------|
| Frontend | React 18, Vite |
| UI | @aws-amplify/ui-react |
| Authentication | Amazon Cognito |
| API | AWS AppSync (GraphQL) |
| Database | Amazon DynamoDB |
| Storage | Amazon S3 |
| Hosting | AWS Amplify Hosting |
| Infrastructure | AWS Amplify Gen 2 |

---

## 🚀 Local Development

### Prerequisites
- Node.js 18+
- AWS account
- Amplify Gen 2 CLI

### Install Dependencies
```bash
npm install

