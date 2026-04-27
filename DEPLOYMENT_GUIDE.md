# Kindred App - Deployment Guide

This guide walks you through deploying the Kindred app from your local repository to GitHub and Vercel.

## 📋 Prerequisites

Before you begin, make sure you have:

- ✅ Node.js 18+ installed
- ✅ Git installed
- ✅ A GitHub account
- ✅ A Vercel account (sign up at [vercel.com](https://vercel.com))
- ✅ An Anthropic API key ([get one here](https://console.anthropic.com/))

## 🚀 Step-by-Step Deployment

### Part 1: Set Up Local Repository

#### 1. Initialize Git Repository (if not already done)

```bash
cd kindred-app
git init
```

#### 2. Add All Files to Git

```bash
git add .
```

#### 3. Create Initial Commit

```bash
git commit -m "Initial commit - Kindred v5.3 Consistency Update"
```

### Part 2: Push to GitHub

#### 1. Create a New Repository on GitHub

1. Go to [github.com](https://github.com)
2. Click the `+` icon in the top right
3. Select "New repository"
4. Name it: `kindred-app` (or your preferred name)
5. Leave it **public** or **private** (your choice)
6. **DO NOT** initialize with README, .gitignore, or license (we already have these)
7. Click "Create repository"

#### 2. Link Local Repository to GitHub

GitHub will show you commands like these (use your actual repository URL):

```bash
# Add GitHub as remote origin
git remote add origin https://github.com/YOUR_USERNAME/kindred-app.git

# Rename branch to main (if needed)
git branch -M main

# Push to GitHub
git push -u origin main
```

Replace `YOUR_USERNAME` with your actual GitHub username.

#### 3. Verify Upload

Refresh your GitHub repository page. You should see all your files uploaded.

### Part 3: Deploy to Vercel

#### Option A: Deploy via Vercel Dashboard (Recommended)

1. **Go to Vercel Dashboard**
   - Visit [vercel.com/dashboard](https://vercel.com/dashboard)
   - Log in with your account

2. **Import Project**
   - Click "Add New..." → "Project"
   - Click "Import Git Repository"
   - Find and select your `kindred-app` repository
   - Click "Import"

3. **Configure Project**
   - **Framework Preset**: Vite
   - **Root Directory**: `./` (leave as is)
   - **Build Command**: `npm run build` (auto-detected)
   - **Output Directory**: `dist` (auto-detected)
   - Click "Deploy"

4. **Add Environment Variables** (IMPORTANT!)
   
   After deployment fails (expected - needs API key):
   - Go to your project Settings
   - Click "Environment Variables"
   - Add variable:
     - **Name**: `ANTHROPIC_API_KEY`
     - **Value**: Your Anthropic API key
     - **Environment**: Production, Preview, Development (select all)
   - Click "Save"

5. **Redeploy**
   - Go to "Deployments" tab
   - Click the "..." menu on the latest deployment
   - Click "Redeploy"
   - Your app should now work!

#### Option B: Deploy via Vercel CLI

1. **Install Vercel CLI**
   ```bash
   npm install -g vercel
   ```

2. **Login to Vercel**
   ```bash
   vercel login
   ```

3. **Deploy**
   ```bash
   vercel
   ```
   
   Follow the prompts:
   - Set up and deploy? `Y`
   - Which scope? (Select your account)
   - Link to existing project? `N`
   - Project name? `kindred-app` (or press Enter)
   - Directory? `./` (press Enter)
   - Override settings? `N`

4. **Add Environment Variable**
   ```bash
   vercel env add ANTHROPIC_API_KEY
   ```
   
   When prompted:
   - Enter your Anthropic API key
   - Select environments: Production, Preview, Development (all)

5. **Deploy to Production**
   ```bash
   vercel --prod
   ```

### Part 4: Verify Deployment

1. **Visit Your Deployed App**
   - Vercel will provide you with a URL (e.g., `kindred-app.vercel.app`)
   - Open it in your browser

2. **Test Core Functions**
   - Add a child profile
   - Select an activity type
   - Click "Generate" button
   - Verify activities load correctly

3. **Check for Errors**
   - Open browser console (F12)
   - Look for any error messages
   - If you see API errors, double-check your environment variable

## 🔄 Making Updates

### Update Local Code

1. **Make your changes** in the code

2. **Test locally**
   ```bash
   npm run dev
   ```

3. **Commit changes**
   ```bash
   git add .
   git commit -m "Description of your changes"
   ```

4. **Push to GitHub**
   ```bash
   git push origin main
   ```

5. **Automatic Deployment**
   - Vercel automatically deploys on push to `main`
   - Check deployment status in Vercel dashboard

### Manual Deployment (if needed)

```bash
vercel --prod
```

## 🐛 Troubleshooting

### Issue: "API key not configured"

**Solution**: Add `ANTHROPIC_API_KEY` to Vercel environment variables
1. Go to Vercel Dashboard → Your Project → Settings → Environment Variables
2. Add the key
3. Redeploy

### Issue: "Cannot find module" or build errors

**Solution**: Clear cache and reinstall
```bash
rm -rf node_modules package-lock.json
npm install
npm run build
```

### Issue: Activities not generating

**Solution**: Check browser console for errors
- Open DevTools (F12)
- Look in Console tab
- Common issues:
  - API key invalid
  - Network request blocked
  - localStorage disabled

### Issue: Deployment succeeds but app shows blank page

**Solution**: Check build output
1. Run `npm run build` locally
2. Check for build errors
3. Verify `dist` folder is created
4. Check Vercel build logs for errors

## 📊 Monitoring

### View Deployment Logs

1. Go to Vercel Dashboard
2. Select your project
3. Click "Deployments"
4. Click on any deployment
5. View "Build Logs" and "Function Logs"

### Check API Usage

1. Go to [Anthropic Console](https://console.anthropic.com/)
2. View API usage and costs
3. Set up usage limits if needed

## 🔐 Security Best Practices

1. **Never commit `.env` file**
   - Already in `.gitignore`
   - Use `.env.example` as template

2. **Rotate API keys regularly**
   - Generate new key in Anthropic Console
   - Update in Vercel environment variables
   - Delete old key

3. **Monitor API usage**
   - Set up billing alerts in Anthropic Console
   - Review usage weekly

4. **Use environment-specific keys**
   - Development: Use separate API key
   - Production: Use different API key
   - Helps track usage and debug issues

## 🎉 Success Checklist

After deployment, verify:

- ✅ App loads at Vercel URL
- ✅ Can add children profiles
- ✅ Can select activity categories
- ✅ Generate button works and produces activities
- ✅ Activities display correctly
- ✅ History tracking works
- ✅ Community features work
- ✅ Language selector works
- ✅ No console errors

## 📞 Getting Help

If you encounter issues:

1. Check this guide's troubleshooting section
2. Review Vercel build logs
3. Check browser console for errors
4. Review `KINDRED_DEVELOPMENT_PROTOCOL.md`
5. Open an issue on GitHub

## 🔄 Next Steps

After successful deployment:

1. **Set up custom domain** (optional)
   - Add custom domain in Vercel Dashboard
   - Configure DNS settings

2. **Enable analytics** (optional)
   - Vercel Analytics: Built-in, easy to enable
   - Google Analytics: Add tracking code

3. **Set up monitoring** (optional)
   - Vercel Speed Insights
   - Error tracking (Sentry, etc.)

4. **Share with users**
   - Share your Vercel URL
   - Gather feedback
   - Iterate and improve!

---

**Congratulations! Your Kindred app is now live! 🎊**
