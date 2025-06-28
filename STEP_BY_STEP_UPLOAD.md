# Upload Your Arabic Football Streaming Platform

## Quick Upload Guide

### Step 1: Create GitHub Repository
1. Go to **github.com**
2. Click **"New"** (green button)
3. Repository name: **kooralive-streaming**
4. Select **Public**
5. Click **"Create repository"**
6. Copy the URL shown (example: https://github.com/username/kooralive-streaming.git)

### Step 2: Upload Code (Choose One Method)

#### Method A: Using Replit Shell/Terminal
```bash
# Replace YOUR_GITHUB_URL with the actual URL you copied
git remote add origin YOUR_GITHUB_URL
git branch -M main
git push -u origin main
```

#### Method B: Manual File Upload
1. In GitHub repository, click **"uploading an existing file"**
2. Upload these folders one by one:
   - Drag `client` folder
   - Drag `server` folder  
   - Drag `shared` folder
3. Upload these individual files:
   - `package.json`
   - `vercel.json`
   - `tsconfig.json`
   - `vite.config.ts`
   - `tailwind.config.ts`
   - `drizzle.config.ts`

### Step 3: Deploy to Vercel
1. Go to **vercel.com**
2. Click **"Continue with GitHub"**
3. Click **"Import Project"**
4. Select **kooralive-streaming**
5. Click **"Deploy"**

### Step 4: Add Database (Free)
1. Go to **neon.tech**
2. Sign up with GitHub
3. Create database: **kooralive**
4. Copy connection string
5. In Vercel dashboard:
   - Go to **Settings** → **Environment Variables**
   - Add: `DATABASE_URL` = [paste connection string]
6. Redeploy the project

### Result
Your Arabic football streaming platform will be live at:
**yourproject.vercel.app**

Features included:
- Live match streaming
- Real-time score updates
- Admin panel (/admin)
- Arabic RTL interface
- Viewer analytics

Total cost: **$0 (completely free)**