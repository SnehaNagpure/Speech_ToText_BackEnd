
# Speech-to-Text Backend

This is the backend server for the Speech-to-Text MERN application.  
It provides REST APIs to handle audio file uploads, transcriptions via Deepgram, and data storage in MongoDB.

## Features
- Audio file upload handling using Multer
- Integration with Deepgram for speech-to-text transcription
- User authentication with JWT 
- MongoDB data storage for audio metadata and transcription results
- CORS enabled for frontend-backend communication

## Technologies Used

- Node.js
- Express.js
- MongoDB with Mongoose
- Multer for file uploads
- Axios (for API calls)
- dotenv for environment variable management
- CORS middleware

## Getting Started

### Prerequisites

- Node.js installed (v14+ recommended)
- MongoDB Atlas account and cluster setup
- Deepgram API key
- Git

### Installation

1. **Clone the repo:**
   ```bash
   git clone https://github.com/yourusername/speech-backend.git
   cd speech-backend

2. **Install dependencies:**
   ```bash
   npm install
3. **Create the uploads folder manually, since it is ignored by Git:**
   ```bash
   mkdir uploads
   ```
4.**Create a .env file in the project root based on .env.example, with contents like:**

   ```ini
    PORT=5000
    MONGO_URI=mongodb://localhost:27017/speechtotext
    DEEPGRAM_API_KEY=your_deepgram_api_key
    JWT_SECRET=your_jwt_secret
    CLIENT_ORIGIN=http://localhost:5173
   ```

5.**Start Server:**
  
   ```bash
   node app.js
   ```

###  Production Deployment
📦 Backend Deployment (Render)
1. Push your code to GitHub
Make sure your backend code is pushed to a public or private GitHub repository.
```bash
git init
git remote add origin https://github.com/your-username/Speech_ToText_BackEnd.git
git push -u origin master
```
### 2. 🚀 Deploy on Render

1. Go to [**Render.com**](https://render.com)  
2. Click **“New Web Service”**  
3. Connect your **GitHub repository**  
4. Set the following **build settings**:

   - **Build Command**:  
     ```bash
     npm install
     ```

   - **Start Command**:  
     ```bash
     node app.js
     ```

   - **Environment Variables**:
     ```
     PORT=5000
     MONGO_URI=your_mongodb_connection_string
     JWT_SECRET=your_jwt_secret
     DEEPGRAM_API_KEY=your_deepgram_key
     CLIENT_ORIGIN=https://your-frontend.vercel.app
     ```

5. ✅ **Enable Auto Deploy** (optional)  
   - Render will **automatically redeploy** whenever you push changes to GitHub.

