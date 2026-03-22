# 🚀 QUICK START GUIDE

## Deploy in 5 Minutes

### 1️⃣ Get Your API Key
1. Go to https://console.anthropic.com/
2. Sign up / Log in
3. Go to API Keys
4. Create new key → Copy it

### 2️⃣ Deploy to Vercel

**Fastest way:**
1. Go to https://vercel.com
2. Sign in with GitHub
3. Click "Add New Project"
4. Import this repository
5. Under "Environment Variables":
   - Name: `ANTHROPIC_API_KEY`
   - Value: [paste your API key]
6. Click "Deploy"
7. Wait 2 minutes ☕

### 3️⃣ Change the Password

Edit `App.jsx` around line 711:

```javascript
if (password === "family2025") {  // ← CHANGE THIS
```

Replace `"family2025"` with your own password, then:

```bash
git add App.jsx
git commit -m "Update password"
git push
```

### 4️⃣ Share with Your Family

Your app is live at: `https://your-project-name.vercel.app`

Send them:
- The URL
- The password you set
- Tell them to bookmark it!

---

## That's It! 🎉

**Costs:** ~$3-5/month for 5 users
**Time to deploy:** 5 minutes
**Maintenance:** Zero (Vercel auto-updates)

---

## Pro Tips

### Set a Budget Alert
1. Go to https://console.anthropic.com/settings/limits
2. Set monthly budget: $10
3. Add your email for alerts

### Custom Domain (Optional)
1. In Vercel dashboard → Settings → Domains
2. Add your domain (e.g., family.yourname.com)
3. Follow DNS instructions
4. Done! ✨

### Backup Your Data
Data is stored in browser localStorage. To backup:
1. Open browser console (F12)
2. Run: `console.log(localStorage.getItem('kidsplay_v3'))`
3. Copy the output
4. Save somewhere safe

---

## Need Help?

**Deployment Issues:**
- Check Vercel deployment logs
- Verify API key is set correctly
- Try redeploying: `vercel --prod`

**App Issues:**
- Clear browser cache
- Check browser console (F12) for errors
- Verify you're using the latest code

**API Costs Too High?**
- Reduce max_tokens in App.jsx (currently 1200)
- Check usage at console.anthropic.com
- Set stricter budget limits

---

## Files You Can Edit

### To change password:
- `App.jsx` → Line ~711

### To change colors/design:
- `App.jsx` → Lines 4-12 (color constants)

### To reduce API costs:
- `App.jsx` → Line 78 (max_tokens: 1200 → 800)

### To change language options:
- `App.jsx` → Line 14

---

**Questions?** Check the full README.md for detailed docs.
