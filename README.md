# ⚙️ Express API

Project by __ARCAS__ Manon

This project provides a web API built with Express.

This README will guide you through setting up your environment, installing the required packages, and starting the project.

## 📌 Table of Contents


I. [Badges](#🎯-badges)

II. [Prerequisites](#🔧-prerequisites)

III. [Availables Features](#💡-availables-features)

IV. [Endpoints](#📋-endpoints)

V. [Installing the project](#💻-project-installation)

VI. [Docker installation](#💻-use-docker-for-the-project )

## 🎯 Badges

![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=flat&logo=javascript&logoColor=%23F7DF1E)  ![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=flat&logo=express&logoColor=%2361DAFB) ![MongoDB](https://img.shields.io/badge/MongoDB-%234ea94b.svg?style=flat&logo=mongodb&logoColor=white)

## 🔧 Prerequisites :

- [Node](https://nodejs.org/en/download) installed on your system.
- [Docker](https://www.docker.com) installed on your system.

## 💡 Availables Features :

This solution provides a web API in JavaScript using Express and MongoDB. The API offers a CRUD system for user profiles. The different routes are detailed below.

## 📋 Endpoints :

### User Profiles

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET    | /profiles | Retrieve all profiles |
| GET    | /profiles/:id | Retrieve a profile by ID |
| POST   | /profiles | Create a new profile (name and email only) |
| PUT    | /profiles/:id | Update a profile by ID (name and email only) |
| DELETE | /profiles/:id | Delete a profile by ID (Soft-Delete) |

### Profile Experience :

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST   | /profiles/:id/experience | Add an experience to a profile (post JSON with information) |
| DELETE | /profiles/:id/experience/:exp | Delete an experience from a profile by experience ID |

### Profile Skills :

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST   | /profiles/:id/skills | Add a skill to a profile (post string) |
| DELETE | /profiles/:id/skills/:skill | Delete a skill from a profile |

### Profile Information :

| Method | Endpoint | Description |
|--------|----------|-------------|
| PUT    | /profiles/:id/information | Update profile information |

## 💻 Project Installation :

1. Clone the Repository

```bash
git clone https://github.com/Manon-Arc/Express-API.git
```

#### 2. Navigate to the Project Directory :
```bash
cd Expresse-API
```

#### 3. Configure environments variables  :
Complete the .env file with your configuration.


#### 4. Start the project :
```bash
npm start
```

## 💻 Use Docker for the project :

#### 1. Clone the Repository :
```bash
https://github.com/Manon-Arc/Express-API.git
```

#### 2. Navigate to the Project Directory :
```bash
cd Expresse-API
```

#### 3. Configure environments variables  :
Complete the .env file with your configuration. Attention, you need to add the container name of the mondo database instead of the ip and take care of adding the correct credentials (the same as in the [docker compose](./docker-compose.yml))

#### 3. Build the Docker Image :
```bash
docker-compose up -d
```

### Access the API :
Visit http://localhost:3000 in your web browser to access the API.


**✅ Congratulation ! Your API is now available**

You can test it with [Postman](https://www.postman.com) or on your browser directly.