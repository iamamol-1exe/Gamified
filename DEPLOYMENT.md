# Vercel Deployment Guide

## Quick Deploy to Vercel

1. **Prepare your repository**:

   - Ensure all changes are committed to your Git repository
   - Push to GitHub/GitLab/Bitbucket

2. **Set up MongoDB Atlas** (if not already done):

   - Go to [MongoDB Atlas](https://cloud.mongodb.com/)
   - Create a new cluster or use existing one
   - Get your connection string (looks like: `mongodb+srv://username:password@cluster.mongodb.net/database`)

3. **Deploy to Vercel**:

   - Go to [Vercel Dashboard](https://vercel.com/)
   - Click "New Project"
   - Import your repository
   - Vercel will auto-detect the configuration

4. **Add Environment Variables** in Vercel Dashboard:

   ```
   MONGO_URI=mongodb+srv://your-atlas-uri
   JWT_SECRET=your-production-jwt-secret-min-32-chars
   JWT_REFRESH_SECRET=your-production-refresh-secret-min-32-chars
   NODE_ENV=production
   CORS_ORIGIN=https://your-app-name.vercel.app
   ```

5. **Deploy**: Click "Deploy" and wait for the build to complete

## Important Notes

- The frontend will be served from the root domain
- All API endpoints are available under `/api/`, `/user/api/`, `/teacher/api/`, `/admin/api/`
- Health check is available at `/health`
- Make sure your MongoDB Atlas allows connections from `0.0.0.0/0` or add Vercel's IP ranges

## After Deployment

1. Update `CORS_ORIGIN` with your actual Vercel domain
2. Test all API endpoints
3. Verify frontend can communicate with backend
4. Check database connections in Vercel function logs

## Troubleshooting

- **Build fails**: Check environment variables are set
- **API not working**: Verify MongoDB connection string
- **CORS errors**: Update CORS_ORIGIN with your domain
- **Database connection issues**: Check MongoDB Atlas network access settings
