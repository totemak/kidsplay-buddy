# Complete Bash Commands Guide
## From Local Repository to GitHub Deployment

This guide provides **copy-paste ready commands** to deploy your Kindred app.

---

## 📋 Prerequisites Checklist

Before running these commands, make sure you have:

- [ ] All project files in `/home/claude/kindred-app/` directory
- [ ] Git installed (`git --version` to check)
- [ ] Node.js 18+ installed (`node --version` to check)
- [ ] GitHub account created
- [ ] Anthropic API key ready

---

## 🚀 STEP 1: Verify Project Files

Run these commands to verify everything is in place:

```bash
# Navigate to project directory
cd /home/claude/kindred-app

# List all files (should see package.json, src/, api/, etc.)
ls -la

# Verify key files exist
ls -la src/App.jsx
ls -la api/claude.js
ls -la package.json
ls -la README.md
```

**Expected Output**: All files should be listed without "No such file" errors.

---

## 🎯 STEP 2: Install Dependencies

```bash
# Make sure you're in the project directory
cd /home/claude/kindred-app

# Install all npm packages
npm install
```

**Expected Output**: Should download packages into `node_modules/` folder.

---

## 🧪 STEP 3: Test Locally (Optional but Recommended)

```bash
# Create .env file from template
cp .env.example .env

# Edit .env to add your API key (use your preferred editor)
nano .env
# OR
vim .env
# OR
code .env

# After adding your API key, test the app locally
npm run dev
```

**What to do in the editor:**
1. Replace `your_api_key_here` with your actual Anthropic API key
2. Save the file (in nano: Ctrl+O, Enter, Ctrl+X)

**Expected Output**: 
- Development server starts at `http://localhost:5173`
- Open in browser and test that activities generate correctly

**Stop the server**: Press `Ctrl+C`

---

## 📦 STEP 4: Initialize Git Repository

```bash
# Navigate to project root (if not already there)
cd /home/claude/kindred-app

# Initialize git repository
git init

# Check git status (should show untracked files)
git status
```

**Expected Output**: Git initialized, untracked files listed in red.

---

## 📝 STEP 5: Stage All Files for Commit

```bash
# Add all files to staging area
git add .

# Verify files are staged
git status
```

**Expected Output**: Files now shown in green (staged for commit).

**Important**: `.env` file should NOT be in the list (it's in `.gitignore`).

---

## ✅ STEP 6: Create Initial Commit

```bash
# Create your first commit
git commit -m "Initial commit - Kindred v5.3 Consistency Update"

# Verify commit was created
git log --oneline
```

**Expected Output**: Commit message shown with a hash ID.

---

## 🌐 STEP 7: Create GitHub Repository

**Manual Steps** (do this in your browser):

1. Go to https://github.com/new
2. Repository name: `kindred-app` (or your choice)
3. Description: "Family Activity Companion - Personalized activities for children"
4. Choose **Public** or **Private**
5. **DO NOT** check any initialization options (README, .gitignore, license)
6. Click **"Create repository"**

**After creation**, GitHub will show you commands. **KEEP THIS PAGE OPEN** - we'll use a modified version below.

---

## 🔗 STEP 8: Link Local Repo to GitHub

**IMPORTANT**: Replace `YOUR_USERNAME` with your actual GitHub username in the commands below!

```bash
# Add GitHub as remote origin
# REPLACE 'YOUR_USERNAME' WITH YOUR ACTUAL GITHUB USERNAME!
git remote add origin https://github.com/YOUR_USERNAME/kindred-app.git

# Verify remote was added
git remote -v

# Rename branch to 'main' (if needed)
git branch -M main

# Verify branch name
git branch
```

**Expected Output**: 
- `origin` remote points to your GitHub URL
- Current branch is `main` (shown with asterisk)

---

## 🚀 STEP 9: Push to GitHub

```bash
# Push your code to GitHub
git push -u origin main
```

**Expected Output**: 
- "Enumerating objects..."
- "Writing objects: 100%"
- "Branch 'main' set up to track remote branch 'main'"

**If you get an authentication error**, you may need to:

### Option A: Use Personal Access Token (Recommended)

```bash
# GitHub will prompt for credentials
# Username: your_github_username
# Password: use a Personal Access Token (NOT your GitHub password)
```

**To create a token:**
1. Go to https://github.com/settings/tokens
2. Click "Generate new token" → "Generate new token (classic)"
3. Give it a name: "Kindred App"
4. Check scopes: `repo` (full control)
5. Click "Generate token"
6. **COPY THE TOKEN** (you won't see it again!)
7. Use this as your password when pushing

### Option B: Use SSH (Alternative)

If you prefer SSH:
```bash
# Change remote URL to SSH
git remote set-url origin git@github.com:YOUR_USERNAME/kindred-app.git

# Push again
git push -u origin main
```

---

## ✅ STEP 10: Verify GitHub Upload

```bash
# Open your GitHub repository in browser
# Replace YOUR_USERNAME with your actual username
# You can also just refresh the GitHub page from Step 7
```

Visit: `https://github.com/YOUR_USERNAME/kindred-app`

**Expected**: All your files should be visible on GitHub!

---

## 🎉 STEP 11: Deploy to Vercel

### Option A: Via Vercel Dashboard (Easiest)

**Manual Steps** (in browser):

1. **Go to Vercel**: https://vercel.com/login
2. **Sign in** (use GitHub to sign in for easier integration)
3. **Import Project**:
   - Click "Add New..." → "Project"
   - Click "Import Git Repository"
   - Authorize Vercel to access your GitHub (if asked)
   - Find `kindred-app` repository
   - Click "Import"

4. **Configure Build**:
   - Framework: Vite (auto-detected)
   - Root Directory: `./` (leave as is)
   - Build Command: `npm run build` (auto-detected)
   - Output Directory: `dist` (auto-detected)
   - Click "Deploy"

5. **Wait for Build** (will fail - this is expected!)

6. **Add Environment Variable**:
   - After deploy fails, click "Settings" tab
   - Click "Environment Variables"
   - Add new variable:
     - **Name**: `ANTHROPIC_API_KEY`
     - **Value**: Your Anthropic API key
     - **Environments**: Check all 3 (Production, Preview, Development)
   - Click "Save"

7. **Redeploy**:
   - Go to "Deployments" tab
   - Find the failed deployment
   - Click "..." menu → "Redeploy"
   - Wait for success!

8. **Visit Your Live App**:
   - Click "Visit" button
   - Or copy the URL (e.g., `https://kindred-app.vercel.app`)

### Option B: Via Vercel CLI (Advanced)

```bash
# Install Vercel CLI globally
npm install -g vercel

# Login to Vercel
vercel login

# Deploy (follow the prompts)
vercel

# Add environment variable
vercel env add ANTHROPIC_API_KEY
# When prompted:
# - What's the value of ANTHROPIC_API_KEY? [paste your key]
# - Add to which environments? [select all: Production, Preview, Development]

# Deploy to production
vercel --prod
```

**Expected Output**: Vercel URL provided (e.g., `https://kindred-app.vercel.app`)

---

## 🔄 Future Updates Workflow

When you make changes to your code:

```bash
# 1. Make your code changes in your editor

# 2. Test locally
npm run dev
# Test in browser, then Ctrl+C to stop

# 3. Stage changes
git add .

# 4. Commit changes
git commit -m "Description of what you changed"

# 5. Push to GitHub
git push origin main

# 6. Vercel automatically deploys!
# Check Vercel dashboard to see deployment progress
```

---

## 🐛 Troubleshooting

### Problem: `git: command not found`

```bash
# Install git (Ubuntu/Debian)
sudo apt-get update
sudo apt-get install git

# Install git (macOS with Homebrew)
brew install git

# Verify installation
git --version
```

### Problem: `npm: command not found`

```bash
# Install Node.js and npm
# Visit: https://nodejs.org/
# Or use package manager

# Verify installation
node --version
npm --version
```

### Problem: Permission denied when pushing to GitHub

```bash
# Use HTTPS with Personal Access Token (see Step 9)
# OR set up SSH keys (see GitHub docs)
```

### Problem: Vercel deployment fails

```bash
# Check build logs in Vercel dashboard
# Common issues:
# 1. Missing ANTHROPIC_API_KEY environment variable
# 2. Build errors (check Vercel build logs)
# 3. Wrong build command (should be: npm run build)

# To debug locally:
npm run build
# Check for errors
```

### Problem: App deployed but activities don't generate

**Check browser console (F12)**:
- Look for API errors
- Verify API key is set in Vercel
- Check network tab for failed requests

---

## 📋 Quick Reference - All Commands in Order

```bash
# Navigate and verify
cd /home/claude/kindred-app
ls -la

# Install dependencies
npm install

# Set up environment (optional for local testing)
cp .env.example .env
# Edit .env to add your API key
npm run dev  # Test locally, then Ctrl+C

# Initialize git
git init
git add .
git commit -m "Initial commit - Kindred v5.3 Consistency Update"

# Link to GitHub (REPLACE YOUR_USERNAME!)
git remote add origin https://github.com/YOUR_USERNAME/kindred-app.git
git branch -M main
git push -u origin main

# Deploy via Vercel CLI (or use dashboard)
npm install -g vercel
vercel login
vercel
vercel env add ANTHROPIC_API_KEY
vercel --prod
```

---

## ✅ Success Checklist

After completing all steps:

- [ ] All files visible on GitHub repository
- [ ] Vercel deployment succeeded
- [ ] Environment variable added to Vercel
- [ ] App loads at Vercel URL
- [ ] Can add children
- [ ] Generate button works
- [ ] Activities display correctly
- [ ] No errors in browser console

---

## 🎉 Congratulations!

Your Kindred app is now:
- ✅ Version controlled with Git
- ✅ Backed up on GitHub
- ✅ Deployed and live on Vercel
- ✅ Accessible from anywhere!

**Next Steps**:
- Share your Vercel URL with users
- Set up a custom domain (optional)
- Enable Vercel Analytics (optional)
- Start collecting feedback!

---

## 📞 Need Help?

- Review `DEPLOYMENT_GUIDE.md` for detailed explanations
- Check `README.md` for project overview
- Review `KINDRED_DEVELOPMENT_PROTOCOL.md` for development guidelines
- Open an issue on GitHub if you encounter problems

**Happy deploying! 🚀**
