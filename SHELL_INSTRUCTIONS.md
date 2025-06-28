# How to Use Replit Shell for Upload

## Finding the Shell in Replit

### Method 1: Using the Shell Tab
1. Look at the bottom of your Replit screen
2. You should see tabs like "Console", "Shell", or "Terminal"
3. Click on the **"Shell"** tab
4. You'll see a command prompt like: `$` or `runner@replit:~/workspace$`

### Method 2: Opening Shell from Tools
1. Look for a "Tools" menu in Replit
2. Click "Shell" or "Terminal"
3. A new pane will open at the bottom

### Method 3: Keyboard Shortcut
- Press `Ctrl + Shift + S` (on Windows/Linux)
- Press `Cmd + Shift + S` (on Mac)

## Upload Commands to Run

Once you have the Shell open, run these commands **one by one**:

### Step 1: First, create your GitHub repository
- Go to github.com
- Create new repository: `kooralive-streaming`
- Copy the URL (like: https://github.com/username/kooralive-streaming.git)

### Step 2: Run these commands in Shell
```bash
# Connect to your GitHub (replace URL with yours)
git remote add origin https://github.com/YOURUSERNAME/kooralive-streaming.git

# Switch to main branch
git branch -M main

# Upload all files
git push -u origin main
```

### If you get errors:
```bash
# Remove existing remote and try again
git remote remove origin
git remote add origin YOUR_GITHUB_URL
git push -u origin main
```

## What the Shell looks like:
```
runner@replit:~/workspace$ git remote add origin https://github.com/username/repo.git
runner@replit:~/workspace$ git push -u origin main
```

## Alternative: Manual Upload
If Shell doesn't work, you can:
1. Download files manually from Replit
2. Upload to GitHub through web interface
3. Use "uploading an existing file" option

Your project is ready - all files are prepared for deployment!