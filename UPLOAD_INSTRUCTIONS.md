# How to Upload Your Code to GitHub

## Method 1: Using Replit Terminal (Easiest)

### Step 1: Create GitHub Repository
1. Go to github.com
2. Click "Sign up" (if you don't have account) or "Sign in"
3. Click the green "New" button
4. Repository name: `kooralive-streaming`
5. Make it Public
6. Click "Create repository"
7. Copy the repository URL (looks like: https://github.com/yourusername/kooralive-streaming.git)

### Step 2: Upload from Replit
Open the Terminal/Shell in Replit and run these commands one by one:

```bash
# Connect to your GitHub repository (replace with your actual URL)
git remote add origin https://github.com/YOURUSERNAME/kooralive-streaming.git

# Upload all files
git branch -M main
git push -u origin main
```

## Method 2: Manual Upload (If Terminal doesn't work)

### Step 1: Download Project Files
1. In Replit, go to each folder and copy the contents
2. Important folders to copy:
   - `client/` (entire folder)
   - `server/` (entire folder) 
   - `shared/` (entire folder)
3. Important files to copy:
   - `package.json`
   - `vercel.json`
   - `tsconfig.json`
   - `vite.config.ts`
   - `tailwind.config.ts`
   - `drizzle.config.ts`

### Step 2: Upload to GitHub
1. In your GitHub repository, click "uploading an existing file"
2. Create folders by typing: `client/src/components/header.tsx`
3. Copy and paste the file contents
4. Repeat for all files and folders
5. Click "Commit changes"

## Method 3: GitHub Desktop (Windows/Mac)
1. Download GitHub Desktop
2. Clone your empty repository
3. Copy all files from Replit to the local folder
4. Commit and push

## After Upload: Deploy to Vercel
1. Go to vercel.com
2. "Continue with GitHub"
3. "Import Project" 
4. Select `kooralive-streaming`
5. Click "Deploy"

## Setup Database (Free)
1. Go to neon.tech
2. Create free account
3. Create database named `kooralive`
4. Copy connection string
5. In Vercel: Settings → Environment Variables
6. Add: `DATABASE_URL` = your connection string

Your site will be live at: yourproject.vercel.app