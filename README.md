# Kindred - Family Activity Companion

A personalized activity suggestion app for families with children.

## 🚀 Quick Deploy to Vercel (Recommended - FREE)

### Prerequisites
- A GitHub account
- An Anthropic API key ([get one here](https://console.anthropic.com/))
- A Vercel account (free tier)

### Step-by-Step Deployment

#### 1. Push to GitHub

```bash
# Initialize git repository
cd kindred-deploy
git init
git add .
git commit -m "Initial commit"

# Create a new repository on GitHub, then:
git remote add origin https://github.com/YOUR-USERNAME/kindred-app.git
git branch -M main
git push -u origin main
```

#### 2. Deploy to Vercel

**Option A: Using Vercel Dashboard (Easiest)**

1. Go to [vercel.com](https://vercel.com) and sign in
2. Click "Add New Project"
3. Import your GitHub repository
4. Configure:
   - Framework Preset: **Vite**
   - Build Command: `npm run build`
   - Output Directory: `dist`
5. Add Environment Variable:
   - Name: `ANTHROPIC_API_KEY`
   - Value: Your Anthropic API key (starts with `sk-ant-`)
6. Click "Deploy"

**Option B: Using Vercel CLI**

```bash
# Install Vercel CLI
npm install -g vercel

# Login to Vercel
vercel login

# Deploy
vercel

# Add your API key as environment variable
vercel env add ANTHROPIC_API_KEY
# Paste your API key when prompted
# Select: Production, Preview, Development (all)

# Redeploy to apply environment variable
vercel --prod
```

#### 3. Set Your Password

Edit `App.jsx` line ~711:

```javascript
// CHANGE THIS - Replace "family2025" with your own secure password
if (password === "family2025") {
```

Replace `"family2025"` with your chosen password, commit and push:

```bash
git add App.jsx
git commit -m "Update access password"
git push
```

Vercel will automatically redeploy with your new password.

---

## 🔒 Security Notes

### Password Protection
- The app has a simple password screen to limit access
- **Current password: `family2025`** - CHANGE THIS immediately
- Password is stored in localStorage after first login
- Not suitable for highly sensitive data (it's client-side only)

### API Key Security
- Your Anthropic API key is stored as an environment variable in Vercel
- It's never exposed to the browser
- All API calls go through the `/api/claude` proxy

---

## 💰 Cost Breakdown

### Vercel (FREE Tier)
- ✅ Hosting: FREE
- ✅ Serverless Functions: FREE (100GB-Hrs/month)
- ✅ Bandwidth: 100GB/month FREE
- ✅ Custom domain: FREE
- For 5 users: Well within free limits

### Anthropic API Costs
Claude Sonnet 4 pricing (as of March 2026):
- Input: $3 per million tokens
- Output: $15 per million tokens

**Estimated monthly cost for 5 light users:**
- ~500 activity generations/month
- Each generation: ~800 input + ~300 output tokens
- **Total: ~$3-5/month**

**Budget management:**
```bash
# Set spending limits in Anthropic Console
# https://console.anthropic.com/settings/limits
```

---

## 🛠️ Local Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

**Note:** For local development, you need to:
1. Create `.env.local` file
2. Add: `ANTHROPIC_API_KEY=your-key-here`
3. The API proxy won't work locally without a serverless function runner

---

## 📱 Sharing with Your 5 Users

Once deployed, share:
1. **URL**: `https://your-app-name.vercel.app`
2. **Password**: Whatever you set in App.jsx
3. **Instructions**: 
   - Open the link
   - Enter the access code
   - Add children profiles
   - Start generating activities!

---

## 🔄 Making Updates

```bash
# Make your changes
# Then commit and push
git add .
git commit -m "Your changes"
git push

# Vercel auto-deploys on push!
```

---

## 🌐 Alternative Deployment Options

### Netlify (Also FREE)
1. Drag & drop the `dist` folder to netlify.com
2. Add environment variable in dashboard
3. Enable serverless functions

### Cloudflare Pages (FREE, Unlimited Bandwidth)
1. Connect GitHub repo
2. Build command: `npm run build`
3. Output: `dist`
4. Add environment variable
5. Note: Requires Cloudflare Workers for API proxy

---

## 📊 Monitoring Usage

### Vercel Analytics
- Free analytics included
- View in Vercel dashboard
- Track page views, users

### Anthropic Console
- Monitor API usage
- Set budget alerts
- View costs in real-time
- https://console.anthropic.com/usage

---

## 🐛 Troubleshooting

### "Invalid access code" on login
- Check you changed the password in App.jsx
- Redeploy after changing password
- Clear browser cache

### API calls failing
- Verify ANTHROPIC_API_KEY is set in Vercel
- Check API key is valid in Anthropic Console
- Check Vercel function logs

### App not loading
- Check Vercel deployment logs
- Verify build succeeded
- Try clearing browser cache

---

## 📞 Support

For issues:
1. Check Vercel deployment logs
2. Check browser console (F12)
3. Verify environment variables are set
4. Check Anthropic API status page

---

## 🎉 You're Done!

Your app is now live, secure, and costs <$5/month for 5 users!

**Your deployment checklist:**
- [ ] Pushed code to GitHub
- [ ] Deployed to Vercel
- [ ] Added ANTHROPIC_API_KEY environment variable
- [ ] Changed default password
- [ ] Shared URL and password with users
- [ ] Set spending limits in Anthropic Console

---

Built with ❤️ for families
