# Gamified Learning Platform

A full-stack gamified learning platform with React PWA frontend and Node.js/Express backend.

## 🚀 Vercel Deployment

This project is configured for easy deployment on Vercel with the following setup:

### Prerequisites

1. **MongoDB Database**: Set up a MongoDB Atlas database or use another MongoDB hosting service
2. **Environment Variables**: Configure the required environment variables in Vercel

### Deployment Steps

1. **Fork/Clone** this repository to your GitHub account

2. **Connect to Vercel**:

   - Go to [Vercel Dashboard](https://vercel.com/dashboard)
   - Click "New Project"
   - Import your GitHub repository

3. **Configure Environment Variables** in Vercel:

   ```
   MONGO_URI=mongodb+srv://your-atlas-connection-string
   JWT_SECRET=your-super-secret-jwt-key-for-production
   JWT_REFRESH_SECRET=your-refresh-secret-for-production
   JWT_EXPIRES_IN=7d
   JWT_REFRESH_EXPIRES_IN=30d
   NODE_ENV=production
   CORS_ORIGIN=https://your-vercel-domain.vercel.app
   ```

4. **Deploy**: Vercel will automatically build and deploy your application

### Project Structure

```
├── api/                    # Vercel serverless functions
├── Backend/                # Node.js/Express API
├── Frontend-pwa/          # React PWA frontend
├── vercel.json            # Vercel configuration
└── package.json           # Root package configuration
```

### Local Development

1. **Install dependencies**:

   ```bash
   npm run install:all
   ```

2. **Set up environment variables**:

   - Copy `.env.example` to `.env` in the Backend directory
   - Update the values as needed

3. **Start development servers**:
   ```bash
   npm run dev
   ```

### Features

- 🎮 Gamified learning experience
- 📱 Progressive Web App (PWA)
- 🔐 JWT Authentication
- 📊 Progress tracking
- 🏆 Leaderboards
- 👨‍🏫 Teacher dashboard
- 👑 Admin panel

### Tech Stack

**Frontend:**

- React 19
- Vite
- Tailwind CSS
- PWA capabilities
- Phaser.js for games

**Backend:**

- Node.js
- Express.js
- TypeScript
- MongoDB with Mongoose
- JWT Authentication
- Winston logging

### API Endpoints

- `/health` - Health check
- `/user/api/*` - User-related endpoints
- `/teacher/api/*` - Teacher-related endpoints
- `/admin/api/*` - Admin-related endpoints

### Environment Variables

| Variable                 | Description               | Required |
| ------------------------ | ------------------------- | -------- |
| `MONGO_URI`              | MongoDB connection string | ✅       |
| `JWT_SECRET`             | JWT signing secret        | ✅       |
| `JWT_REFRESH_SECRET`     | JWT refresh token secret  | ✅       |
| `JWT_EXPIRES_IN`         | JWT expiration time       | ❌       |
| `JWT_REFRESH_EXPIRES_IN` | Refresh token expiration  | ❌       |
| `NODE_ENV`               | Environment mode          | ❌       |
| `CORS_ORIGIN`            | Allowed CORS origins      | ❌       |

### Troubleshooting

1. **Build Errors**: Ensure all environment variables are set correctly
2. **CORS Issues**: Add your Vercel domain to `CORS_ORIGIN`
3. **Database Connection**: Verify MongoDB URI and network access
4. **API Routes**: All API routes are proxied through `/api/*`

For more information, check the individual README files in the Backend and Frontend-pwa directories.
