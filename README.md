# GreenPrint - AI Personal Sustainability Coach

GreenPrint is a production-quality SaaS platform designed to help users understand, track, and reduce their carbon footprint through actionable insights, gamified progression, and personalized AI coaching. The application evaluates user lifestyle choices and calculates environmental impacts, offering tailored steps to adopt a greener lifestyle.

## Features

**Authentication & Security**
* Secure Email/Password Signup and Login
* JWT-based API protection
* Rate-limiting and strict CORS policies
* Secure non-root Docker deployments

**Carbon Coaching**
* Interactive carbon footprint assessment
* Custom emission calculation engine
* AI-generated personalized sustainability insights and user personas

**Cloud Native Architecture**
* 100% Stateless backend architecture
* Automated Google Cloud Build CI/CD pipelines
* Dual Cloud Run service deployment (Frontend via NGINX, Backend via Node)

## Tech Stack

* **Frontend:** React 19, React Router v7, Vite, Recharts, Lucide React, Custom Eco-Sophisticate Vanilla CSS System
* **Backend:** Node.js 20, Express 5, Morgan, Helmet, CORS, Express-Rate-Limit
* **Database & Auth:** Google Firebase (Firestore & Authentication), Firebase Admin SDK
* **Testing:** Jest (Backend), Vitest (Frontend), React Testing Library
* **Infrastructure:** Docker, NGINX, Google Cloud Run, Google Cloud Build

## Architecture Overview

GreenPrint utilizes a decoupled monorepo architecture:
1. **Frontend Service:** A statically built React SPA served securely by an Alpine NGINX container.
2. **Backend Service:** A Node.js Express API that processes carbon logic, generates insights, and validates JWTs from the frontend.
3. **Data Layer:** Firebase Firestore stores user profiles, assessments, and historical footprint data. Firebase Authentication handles credential management and issues JWTs.

During local development, the backend can optionally serve built static frontend files. In production, requests flow through Google Cloud Run's managed load balancers independently to each service.

## Project Structure

```text
GreenPrint/
├── backend/
│   ├── src/
│   │   ├── config/          # Firebase Admin SDK initialization
│   │   ├── controllers/     # API request handlers (Assessment, Users)
│   │   ├── middleware/      # JWT Validation (auth.js)
│   │   ├── routes/          # Express route definitions
│   │   ├── services/        # Core business logic (carbonEngine.js)
│   │   └── server.js        # Express application entry point
│   ├── __tests__/           # Jest unit tests
│   └── Dockerfile           # Node 20 Production Dockerfile
├── frontend/
│   ├── src/
│   │   ├── components/      # Reusable UI components
│   │   ├── contexts/        # React Context (AuthContext.jsx)
│   │   ├── pages/           # Route views (Login, Signup, Dashboard)
│   │   └── firebase.js      # Firebase Client SDK initialization
│   ├── nginx.conf.template  # NGINX configuration for SPA routing
│   └── Dockerfile           # Vite Build & NGINX Production Dockerfile
├── cloudbuild.yaml          # Google Cloud Build deployment pipeline
└── README.md
```

## Prerequisites

* Node.js v20+
* Docker Desktop (for container testing)
* A Google Firebase account and project
* A Google Cloud Platform (GCP) account (for deployment)

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/AdityaP116/GreenPrint.git
   cd GreenPrint
   ```

2. Install dependencies for both services:
   ```bash
   # Install Backend dependencies
   cd backend
   npm install

   # Install Frontend dependencies
   cd ../frontend
   npm install
   ```

## Environment Variables

You must configure environment variables for both the frontend and backend. Copy `.env.example` to `.env` in both directories if available, or create them based on the tables below.

### Backend (`backend/.env`)

| Variable | Required | Description |
| -------- | -------- | ----------- |
| `NODE_ENV` | No | Set to `production` in deployed environments. |
| `PORT` | No | Port the server listens on (defaults to 8080). |
| `FRONTEND_URL` | No | Strict CORS origin. Example: `https://greenprint.a.run.app`. Defaults to local dev if not set. |
| `FIREBASE_PROJECT_ID` | Yes | Your Firebase Project ID. |
| `GOOGLE_APPLICATION_CREDENTIALS` | Yes* | Path to your Firebase service account JSON. (*Only required for local backend development, Cloud Run uses Application Default Credentials). |

### Frontend (`frontend/.env`)

| Variable | Required | Description |
| -------- | -------- | ----------- |
| `VITE_FIREBASE_API_KEY` | Yes | Firebase Web API Key. |
| `VITE_FIREBASE_AUTH_DOMAIN` | Yes | Firebase Auth Domain. |
| `VITE_FIREBASE_PROJECT_ID` | Yes | Firebase Project ID. |
| `VITE_FIREBASE_STORAGE_BUCKET` | Yes | Firebase Storage Bucket URL. |
| `VITE_FIREBASE_MESSAGING_SENDER_ID` | Yes | Firebase Messaging Sender ID. |
| `VITE_FIREBASE_APP_ID` | Yes | Firebase Web App ID. |
| `VITE_FIREBASE_MEASUREMENT_ID` | No | Firebase Analytics ID. |

## Local Development

GreenPrint supports concurrent local development:

**Start the API Server (Backend)**
```bash
cd backend
npm run start
```
*The API will run on http://localhost:8080.*

**Start the Development Server (Frontend)**
```bash
cd frontend
npm run dev
```
*The React app will run on http://localhost:5173 with Vite Hot-Module Replacement.*

**Alternatively, test the built frontend through the backend:**
```bash
cd frontend
npm run build
cd ../backend
npm run start
```
*The backend will automatically detect the built `frontend/dist` folder and serve it at http://localhost:8080.*

## Firebase Setup

1. Create a new project in the [Firebase Console](https://console.firebase.google.com/).
2. **Authentication:** Go to Build > Authentication. Enable the **Email/Password** sign-in provider.
3. **Firestore Database:** Go to Build > Firestore Database. Create the database.
4. **Service Account:** Go to Project Settings > Service Accounts. Generate a new private key for your backend `.env` file.
5. **Web Config:** Go to Project Settings > General. Add a Web App to get the `VITE_FIREBASE_*` variables for your frontend `.env`.

## Docker

The application is fully containerized using optimized Dockerfiles.

**Build and Run the Backend:**
```bash
cd backend
docker build -t greenprint-backend .
docker run -p 8080:8080 --env-file .env greenprint-backend
```

**Build and Run the Frontend (NGINX):**
```bash
cd frontend
docker build -t greenprint-frontend .
docker run -p 8080:8080 greenprint-frontend
```

## Testing

**Backend (Jest):**
Runs health checks and route validation.
```bash
cd backend
npm test
```

**Frontend (Vitest):**
Runs UI component and hook tests.
```bash
cd frontend
npm test
```

## Deployment

GreenPrint is configured for automated deployment to **Google Cloud Run** using Google Cloud Build. The pipeline is defined in `cloudbuild.yaml`.

1. Ensure your Google Cloud Project has Cloud Build, Cloud Run, and Artifact Registry APIs enabled.
2. Authenticate the Google Cloud CLI:
   ```bash
   gcloud auth login
   gcloud config set project YOUR_GOOGLE_CLOUD_PROJECT
   ```
3. Submit the build manually from the repository root:
   ```bash
   gcloud builds submit --config cloudbuild.yaml .
   ```
4. **Important Post-Deployment Step:** After deployment, note the Frontend Cloud Run URL. Navigate to your Backend service in the Google Cloud Console, edit the environment variables, and set `FRONTEND_URL` to match the frontend's deployed URL to ensure CORS allows the traffic.

## API Documentation

The backend API is RESTful and consumes/produces JSON.

### Base Routes
* `GET /api/health` - Returns 200 OK and API status.

### Users (`/api/users`)
Requires `Authorization: Bearer <JWT_TOKEN>`.
* `GET /profile` - Retrieve the current authenticated user's profile data.
* `PUT /profile` - Update the current user's profile data.

### Assessments (`/api/assessments`)
Requires `Authorization: Bearer <JWT_TOKEN>`.
* `POST /submit` - Submit a new carbon footprint assessment. Returns calculated footprint and AI insights.
* `GET /latest` - Retrieve the user's most recent footprint calculation and insights.

## Troubleshooting

* **`"API route not found"` in browser on `localhost:8080`:** If you see this, you are running the backend without having run `npm run build` in the frontend directory. Either build the frontend, or use `npm run dev` in the frontend directory and access `localhost:5173`.
* **Firebase Auth Error (CSP Blocked):** Ensure your backend `server.js` disables Helmet's strict CSP during local development. In production, NGINX handles the frontend without restrictive Node CSPs.
* **Firebase Admin Initialization Error:** Your backend needs `GOOGLE_APPLICATION_CREDENTIALS` to run locally without crashing. Provide the path to a valid service account JSON.

## Security Notes

* The `zod` dependency was removed to reduce the attack surface.
* Docker images run on Alpine Linux using the least-privileged `node` user.
* All mock database fallbacks are strictly gated behind `process.env.NODE_ENV !== 'production'` and will throw hard errors in production to prevent silent data loss or security bypasses.
* Secrets and API Keys should NEVER be committed. They are excluded via `.gitignore` and `.dockerignore`.

## Contributing
1. Fork the repository.
2. Create your feature branch (`git checkout -b feature/amazing-feature`).
3. Commit your changes (`git commit -m 'Add amazing feature'`).
4. Push to the branch (`git push origin feature/amazing-feature`).
5. Open a Pull Request.

## License
ISC License.
