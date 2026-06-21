# GreenPrint - AI Personal Sustainability Coach

GreenPrint is a production-quality SaaS platform designed to help users understand, track, and reduce their carbon footprint through actionable insights and gamified progression.

## Project Structure
- `frontend/`: React + Vite SPA using a custom Eco-Sophisticate Design System.
- `backend/`: Node.js + Express API handling Firebase Auth validation and Carbon calculations.

## Setup Instructions

### Environment Variables
**Backend (`backend/.env`)**:
```env
PORT=8080
FIREBASE_PROJECT_ID=your_firebase_project_id
# Provide GOOGLE_APPLICATION_CREDENTIALS path for local Firebase Admin functionality.
```

**Frontend (`frontend/.env`)**:
```env
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
VITE_FIREBASE_APP_ID=your_app_id
```

### Local Development
1. **Backend**:
   ```bash
   cd backend
   npm install
   node src/server.js
   ```
2. **Frontend**:
   ```bash
   cd frontend
   npm install
   npm run dev
   ```

### Firebase Configuration
1. Create a Firebase project.
2. Enable Authentication (Email/Password).
3. Enable Firestore Database.
4. Apply the security rules defined in the implementation plan.

### Cloud Run Deployment
The project includes a `cloudbuild.yaml` for Google Cloud Build.
1. Connect your repository to Cloud Build.
2. Set the trigger to run on pushes to `main`.
3. Cloud Build will automatically build and deploy both frontend and backend to Google Cloud Run.

## Production Checklist
- [ ] Update Firebase config variables in Production.
- [ ] Ensure Firestore security rules are strictly enforced.
- [ ] Verify CORS policy in backend allows only frontend domain.
- [ ] Add rate limiting strictly on authentication endpoints.
