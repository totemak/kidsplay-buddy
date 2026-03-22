# 📋 DEPLOYMENT CHECKLIST

Copy this checklist and check off items as you complete them!

## Pre-Deployment
- [ ] Have an Anthropic API key ready
- [ ] Have a GitHub account
- [ ] Have a Vercel account (or create one - it's free)

## GitHub Setup
- [ ] Created a new repository on GitHub
- [ ] Pushed all code to GitHub:
  ```bash
  git init
  git add .
  git commit -m "Initial commit"
  git remote add origin https://github.com/YOUR-USERNAME/kindred-app.git
  git push -u origin main
  ```

## Vercel Deployment
- [ ] Connected GitHub repository to Vercel
- [ ] Set Framework to "Vite"
- [ ] Added environment variable: `ANTHROPIC_API_KEY`
- [ ] Clicked "Deploy"
- [ ] Deployment succeeded (green checkmark)
- [ ] Tested the live URL

## Security Configuration
- [ ] Changed default password in `App.jsx` (line ~711)
- [ ] Committed and pushed password change
- [ ] Tested login with new password
- [ ] Confirmed old password doesn't work

## Cost Management
- [ ] Set spending limit in Anthropic Console
- [ ] Added budget alert email
- [ ] Noted your Vercel project URL

## User Access
- [ ] Shared app URL with your 5 users
- [ ] Shared the password (securely!)
- [ ] Explained how to use the app
- [ ] Told them to bookmark it

## Testing
- [ ] Logged in successfully
- [ ] Added a child profile
- [ ] Generated activity suggestions
- [ ] Saved an activity
- [ ] Marked activity as complete
- [ ] Checked all 5 sections work (Play, Map, Learn, History, Community)

## Optional But Recommended
- [ ] Set up custom domain (optional)
- [ ] Saved the deployment in password manager
- [ ] Backed up localStorage data instructions
- [ ] Set calendar reminder to check costs monthly

---

## Post-Deployment Monitoring

### Week 1
- [ ] Check Anthropic Console for API usage
- [ ] Verify costs are as expected
- [ ] Get feedback from users
- [ ] Fix any reported issues

### Month 1
- [ ] Review total costs
- [ ] Adjust budget if needed
- [ ] Check user engagement
- [ ] Consider feature requests

---

## Troubleshooting Reference

**Problem: Can't log in**
- Solution: Check password in App.jsx, redeploy

**Problem: API calls fail**
- Solution: Verify ANTHROPIC_API_KEY in Vercel environment variables

**Problem: App won't load**
- Solution: Check Vercel deployment logs, rebuild if needed

**Problem: Costs too high**
- Solution: Reduce max_tokens in callClaude function

---

## Emergency Contacts

- Vercel Status: https://www.vercel-status.com/
- Anthropic Status: https://status.anthropic.com/
- Your deployment URL: _________________
- Your GitHub repo: _________________

---

## Success Criteria

✅ App is live and accessible
✅ Password protection works
✅ Activity generation works
✅ Data persists across sessions
✅ Costs are under $10/month
✅ All 5 users have access

---

**Date Deployed:** _________________
**Vercel Project Name:** _________________
**Monthly Budget:** $_________________ 

🎉 Congratulations! Your app is live!
