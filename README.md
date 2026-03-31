# AI Interview Prep Platform 🚀

> **AI-Powered Interview Preparation & Mock Interview Analysis Platform**

An intelligent interview preparation platform that uses AI to analyze resumes and job descriptions, generating personalized mock interviews with detailed performance analysis.

![Status](https://img.shields.io/badge/status-active-success?style=flat-square)
![Node Version](https://img.shields.io/badge/node-18%2B-blue?style=flat-square)
![React Version](https://img.shields.io/badge/react-19.2-blue?style=flat-square)
![License](https://img.shields.io/badge/license-ISC-blue?style=flat-square)

---

## 📋 Table of Contents

- [Overview](#overview)
- [Key Features](#key-features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Installation](#installation)
- [Configuration](#configuration)
- [Running the Application](#running-the-application)
- [API Documentation](#api-documentation)
- [Usage Guide](#usage-guide)
- [Design System](#design-system)
- [Security Features](#security-features)
- [Future Enhancements](#future-enhancements)
- [Contributing](#contributing)
- [License](#license)

---

## 🎯 Overview

The **AI Interview Prep Platform** is a full-stack application that helps job seekers prepare for interviews by:

1. **Analyzing Resumes**: Parsing PDF resumes to extract skills and experience
2. **Matching Job Requirements**: Comparing resume against job descriptions
3. **Generating Mock Interviews**: Using Google Generative AI to create personalized technical and behavioral questions
4. **Providing Analysis**: Offering match scores, skill gap analysis, and preparation roadmaps
5. **Enabling Preparation**: Displaying detailed model answers and structured learning paths

Whether you're a fresh graduate, career changer, or experienced professional, this platform helps you:
- Identify skill gaps with priority levels
- Practice with AI-generated interview questions
- Get personalized preparation recommendations
- Track your interview readiness with match scores

---

## ✨ Key Features

### 🔐 Authentication System
- **User Registration** with email validation
- **Password Strength Enforcement** (8+ chars, uppercase, numbers, special characters)
- **Secure Login** with JWT authentication
- **Password Reset/Recovery** via OTP (One-Time Password)
- **Rate Limiting** on sensitive endpoints
- **Protected Routes** with middleware-based access control

### 📄 Resume & Job Analysis
- **PDF Resume Upload** with validation and parsing
- **Job Description Input** for targeted analysis
- **Self-Description** field for user context
- **AI-Powered Analysis** using Google Generative AI
- **Intelligent Matching** between resume skills and requirements

### 🎤 Personalized Mock Interview Generation
- **10+ Technical Questions** tailored to the job
- **10+ Behavioral Questions** for scenario-based preparation
- **Detailed Model Answers** explaining:
  - Question intention (what interviewer looks for)
  - Comprehensive answers with best practices
- **Match Score** (0-100% based on resume-to-job fit)
- **Color-Coded Display** for visual clarity

### 🎯 Skill Gap Analysis
- **Automated Skill Identification** of missing/weak areas
- **Severity Levels** (Low, Medium, High)
- **Prioritized Recommendations** for improvement

### 📈 AI-Generated Preparation Roadmap
- **5+ Day Learning Plan** with daily focus areas
- **Specific Daily Tasks** for structured learning
- **Progression Path** from gaps to competency

### 📊 Professional Interview Report Dashboard
- **User Profile Section** with avatar and logout
- **Circular Progress Ring** showing match percentage
- **Organized Question Sections** (Technical & Behavioral)
- **Visual Preparation Timeline** with day-by-day tasks
- **Skill Gaps Display** with severity indicators
- **Dark Theme** with pink accent colors
- **Responsive Design** for all devices

---

## 🛠️ Tech Stack

### Backend
| Technology | Purpose |
|------------|---------|
| **Node.js & Express.js** | REST API Server |
| **MongoDB** | NoSQL Database |
| **Mongoose** | MongoDB ODM |
| **Google Generative AI** | AI Question Generation |
| **JWT** | Authentication |
| **bcryptjs** | Password Encryption |
| **Nodemailer** | Email Services |
| **PDF-Parse** | Resume Parsing |
| **Puppeteer** | PDF Generation |
| **Multer** | File Uploads |
| **Zod** | Schema Validation |
| **Express Rate Limit** | Security & Rate Limiting |

### Frontend
| Technology | Purpose |
|------------|---------|
| **React 19.2** | UI Framework |
| **React Router v7** | Navigation & Routing |
| **Axios** | HTTP Client |
| **SCSS** | Styling |
| **React Icons** | Icon Library |
| **Vite** | Build Tool |

---

## 📁 Project Structure

```
ai-interview-prep-platform/
│
├── Backend/
│   ├── src/
│   │   ├── controllers/
│   │   │   ├── auth.controller.js      # Authentication logic
│   │   │   └── interview.controller.js # Interview report generation
│   │   │
│   │   ├── models/
│   │   │   ├── user.model.js           # User schema
│   │   │   ├── interviewReport.model.js # Report schema
│   │   │   └── blacklist.model.js      # Token blacklist
│   │   │
│   │   ├── routes/
│   │   │   ├── auth.routes.js          # Auth endpoints
│   │   │   └── interview.routes.js     # Interview endpoints
│   │   │
│   │   ├── middlewares/
│   │   │   ├── auth.middleware.js      # JWT verification
│   │   │   └── file.middleware.js      # File upload handling
│   │   │
│   │   ├── services/
│   │   │   ├── ai.service.js           # Google AI integration
│   │   │   └── temp.js                 # Temporary utilities
│   │   │
│   │   ├── config/
│   │   │   └── database.js             # MongoDB connection
│   │   │
│   │   ├── utils/
│   │   │   ├── mailer.js               # Email utilities
│   │   │   └── resetPasswordTemplate.js # Email template
│   │   │
│   │   └── app.js                      # Express app setup
│   │
│   ├── server.js                       # Server entry point
│   ├── package.json
│   └── .env                            # Environment variables
│
└── Frontend/
    ├── src/
    │   ├── features/
    │   │   ├── auth/
    │   │   │   ├── components/         # Auth UI components
    │   │   │   ├── hooks/              # useAuth hook
    │   │   │   ├── pages/              # Login, Register, Password Reset
    │   │   │   ├── services/           # Auth API calls
    │   │   │   └── auth.form.scss      # Auth styling
    │   │   │
    │   │   └── interview/
    │   │       ├── hooks/              # useInterview hook
    │   │       ├── pages/              # Home, Interview Report
    │   │       ├── services/           # Interview API calls
    │   │       └── style/              # Interview styling
    │   │
    │   ├── landing/
    │   │   ├── brands/                 # Brand logos section
    │   │   ├── cta/                    # Call-to-action
    │   │   ├── hero/                   # Hero section
    │   │   ├── navbar/                 # Navigation
    │   │   ├── steps/                  # How it works
    │   │   ├── tech/                   # Tech stack display
    │   │   └── testimonial/            # User testimonials
    │   │
    │   ├── style/
    │   │   ├── button.scss             # Button styles
    │   │   └── Allinterviewprep.scss   # Global styles
    │   │
    │   ├── data/
    │   │   └── constants.js            # App constants
    │   │
    │   ├── App.jsx                     # Root component
    │   ├── main.jsx                    # React entry
    │   └── app.routes.jsx              # Route definitions
    │
    ├── vite.config.js                  # Vite configuration
    ├── eslint.config.js                # ESLint configuration
    ├── index.html
    ├── package.json
    └── .env.local                      # Frontend environment

```

---

## 📦 Installation

### Prerequisites
- **Node.js** (v18 or higher)
- **npm** or **yarn**
- **MongoDB** (local or Atlas cloud)
- **Google Generative AI API Key** ([Get one here](https://ai.google.dev))

### Step 1: Clone Repository
```bash
git clone https://github.com/yourusername/ai-interview-prep-platform.git
cd ai-interview-prep-platform
```

### Step 2: Backend Setup
```bash
cd Backend

# Install dependencies
npm install

# Create .env file
# Copy the template below and fill in your values
```

### Step 3: Frontend Setup
```bash
cd ../Frontend

# Install dependencies
npm install

# Create .env.local file
# Copy the template below and fill in your values
```

---

## ⚙️ Configuration

**⚠️ IMPORTANT: Never commit actual credentials to version control. Always use environment variables and .env files (which are in .gitignore).**

### Backend Environment Variables (.env)
Create a `.env` file in the Backend folder with the following variables:
```
PORT=3000
NODE_ENV=development
MONGODB_URI=<your-mongodb-connection-string>
GOOGLE_GENAI_API_KEY=<your-google-genai-api-key>
EMAIL_USER=<your-email@gmail.com>
EMAIL_PASSWORD=<your-app-specific-password>
JWT_SECRET=<your-jwt-secret-key>
JWT_EXPIRE=7d
CORS_ORIGIN=http://localhost:5173
```

### Frontend Environment Variables (.env.local)
Create a `.env.local` file in the Frontend folder with the following variables:
```
VITE_API_BASE_URL=http://localhost:3000/api
VITE_APP_NAME=AI Interview Prep
```

---

## 🚀 Running the Application

### Terminal 1: Backend Server
```bash
cd Backend
npm run dev
# Server runs on http://localhost:3000
```

### Terminal 2: Frontend Dev Server
```bash
cd Frontend
npm run dev
# Frontend runs on http://localhost:5173
```

### Production Build
```bash
# Frontend
cd Frontend
npm run build
npm run preview

# Backend
cd Backend
# Configure for production environment
npm start
```

---

## 📡 API Documentation

### Base URL
```
http://localhost:3000/api
```

### Authentication Endpoints

#### Register User
```http
POST /auth/register
Content-Type: application/json

{
  "username": "john_doe",
  "email": "john@example.com",
  "password": "SecurePass123!"
}

Response: 201 Created
{
  "message": "User registered successfully",
  "user": {
    "_id": "...",
    "username": "john_doe",
    "email": "john@example.com"
  }
}
```

#### Login User
```http
POST /auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "SecurePass123!"
}

Response: 200 OK
{
  "message": "Login successful",
  "token": "eyJhbGciOiJIUzI1NiIs..."
}
```

#### Forgot Password
```http
POST /auth/forgot-password
Content-Type: application/json

{
  "email": "john@example.com"
}

Response: 200 OK
{
  "message": "OTP sent to your email"
}
```

#### Reset Password
```http
POST /auth/reset-password
Content-Type: application/json

{
  "email": "john@example.com",
  "newPassword": "NewPassword123!",
  "otp": "123456"
}

Response: 200 OK
{
  "message": "Password reset successfully"
}
```

### Interview Endpoints

#### Generate Interview Report
```http
POST /interview/generate-report
Content-Type: multipart/form-data
Authorization: Bearer <your_jwt_token>

Form Data:
- file: resume.pdf (PDF file)
- selfDescription: "I am a Full Stack Developer with 3 years of experience"
- jobDescription: "Full Stack Developer needed for MERN stack"

Response: 201 Created
{
  "message": "Interview report generated successfully",
  "interviewReport": {
    "_id": "...",
    "matchScore": 85,
    "technicalQuestions": [...],
    "behavioralQuestions": [...],
    "skillGaps": [...],
    "preparationPlan": [...]
  }
}
```

#### Get Interview Report
```http
GET /interview/report/:interviewId
Authorization: Bearer <your_jwt_token>

Response: 200 OK
{
  "interviewReport": {
    "_id": "...",
    "matchScore": 85,
    "technicalQuestions": [...],
    "behavioralQuestions": [...],
    "skillGaps": [...],
    "preparationPlan": [...]
  }
}
```

#### Get All User Reports
```http
GET /interview/reports
Authorization: Bearer <your_jwt_token>

Response: 200 OK
{
  "reports": [...]
}
```

#### Delete Interview Report
```http
DELETE /interview/report/:interviewId
Authorization: Bearer <your_jwt_token>

Response: 200 OK
{
  "message": "Report deleted successfully"
}
```

---

## 💡 Usage Guide

### 1. Create Account
1. Navigate to Registration page
2. Enter username, email, and password
3. Password must contain: 8+ chars, uppercase, number, special char
4. Confirm registration

### 2. Upload Resume & Job Details
1. Login to dashboard
2. Click "Prepare for Interview"
3. Upload PDF resume
4. Enter target job description
5. Provide brief self-description
6. Click "Generate Report"

### 3. Review Interview Report
The report includes:
- **Match Score**: Your resume-to-job fit percentage
- **Technical Questions**: 10+ questions with:
  - Question text
  - Interview intention explanation
  - Detailed model answer
- **Behavioral Questions**: 10+ scenario-based questions
- **Skill Gaps**: Missing skills ranked by severity
- **Prep Roadmap**: Day-by-day learning plan

### 4. Prepare & Practice
1. Review technical and behavioral questions
2. Study model answers
3. Follow the preparation roadmap
4. Focus on high-severity skill gaps first

### 5. Generate Multiple Reports
- Create reports for different job positions
- Compare match scores
- Track improvement over time

---

## 🎨 Design System

### Color Palette
| Color | Hex Value | Usage |
|-------|-----------|-------|
| **Dark Background** | #0d1117 | Page background |
| **Card Background** | #161b22 | Card/Panel background |
| **Panel Background** | #1c2230 | Section panels |
| **Input Background** | #1e2535 | Form inputs |
| **Primary Text** | #e6edf3 | Main text |
| **Muted Text** | #7d8590 | Secondary text |
| **Primary Accent** | #ff2d78 | Buttons, highlights |
| **Accent Hover** | #ff1462 | Hover states |
| **Accent Alt** | #ff6b9d | Alternative accent |
| **Success** | #3fb950 | Success states |
| **Error** | #ff4d4d | Error states |
| **Warning** | #f5a623 | Warning states |

### Typography
- **Font Stack**: system-ui, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto
- **Headings**: Bold, sizes from 1.2rem to 1.8rem
- **Body Text**: 0.9rem to 1rem
- **Line Height**: 1.5 to 1.6

### Components
- **Buttons**: Primary pink, hover effects with shadow lift
- **Input Fields**: Dark background with pink focus states
- **Cards**: Subtle borders with hover transitions
- **Icons**: React Icons library
- **Animations**: Smooth transitions (0.2s-0.3s)

---

## 🔒 Security Features

| Feature | Implementation |
|---------|-----------------|
| **Password Hashing** | bcryptjs with salt rounds |
| **JWT Authentication** | Secure token-based auth |
| **Rate Limiting** | 5 forgot-password requests per 15 mins |
| **Input Validation** | Zod schema validation |
| **File Validation** | PDF type checking, size limits |
| **CORS Protection** | Origin-based access control |
| **Cookie Security** | HTTP-only, Secure flags |
| **Email Verification** | OTP-based password reset |

---

## 🚧 Future Enhancements

- [ ] **User Dashboard** with analytics
- [ ] **Video Mock Interviews** with recording
- [ ] **Performance Metrics** and progress tracking
- [ ] **Resume Improvement** suggestions
- [ ] **Job Board Integration** (LinkedIn, Indeed)
- [ ] **Multi-Language Support**
- [ ] **Interview History** and attempt tracking
- [ ] **Peer Benchmarking** and comparison
- [ ] **Export Reports as PDF**
- [ ] **Mobile App** (React Native)
- [ ] **Real-time Feedback** during mock interviews
- [ ] **Interview Tips** and best practices database

---

## 🤝 Contributing

Contributions are welcome! To contribute:

1. **Fork** the repository
2. **Create** a feature branch (`git checkout -b feature/amazing-feature`)
3. **Commit** changes (`git commit -m 'Add amazing feature'`)
4. **Push** to branch (`git push origin feature/amazing-feature`)
5. **Open** a Pull Request

### Code Style
- Use consistent indentation (2 spaces)
- Follow component naming conventions
- Add comments for complex logic
- Test changes before submitting PR

---

## 📝 License

This project is licensed under the **ISC License** - see the LICENSE file for details.

---

## 👨‍💻 Author

**Amritha Yadav**

---

## 📞 Support & Contact

For issues, questions, or suggestions:
- Open an [GitHub Issue](https://github.com/yourusername/ai-interview-prep-platform/issues)
- Email: your-email@example.com

---

## 🙏 Acknowledgments

- [Google Generative AI](https://ai.google.dev) for AI capabilities
- [Mongoose](https://mongoosejs.com/) for MongoDB ODM
- [React Router](https://reactrouter.com/) for routing
- [Vite](https://vitejs.dev/) for fast development

---

**Happy Interview Preparing! 🎯**

