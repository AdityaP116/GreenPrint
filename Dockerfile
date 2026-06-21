# ---- Stage 1: Build Frontend ----
FROM node:20-alpine AS frontend-build
WORKDIR /app/frontend

# Copy frontend config and install dependencies
COPY frontend/package*.json ./
RUN npm install

# Copy source code and environment variables
COPY frontend/ ./

# Accept build arguments for Firebase (in case they are passed via CI)
ARG VITE_FIREBASE_API_KEY
ARG VITE_FIREBASE_AUTH_DOMAIN
ARG VITE_FIREBASE_PROJECT_ID
ARG VITE_FIREBASE_STORAGE_BUCKET
ARG VITE_FIREBASE_MESSAGING_SENDER_ID
ARG VITE_FIREBASE_APP_ID
ARG VITE_FIREBASE_MEASUREMENT_ID

# Build the static React application
RUN npm run build

# ---- Stage 2: Build Backend & Serve ----
FROM node:20-alpine
WORKDIR /app/backend

# Copy backend config and install dependencies
COPY backend/package*.json ./
RUN npm install --production

# Copy backend source code
COPY backend/ ./

# Copy compiled frontend assets into the backend container
COPY --from=frontend-build /app/frontend/dist /app/frontend/dist

# Expose port for Cloud Run
ENV PORT 8080
EXPOSE 8080

# Start the Express server
CMD ["npm", "start"]
