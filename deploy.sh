#!/bin/bash

# Kindred App - Automated Deployment Script
# This script helps you deploy the app to Vercel

echo "🎉 Kindred Family App - Deployment Helper"
echo "=========================================="
echo ""

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
    echo "❌ Error: package.json not found. Please run this script from the kindred-deploy directory."
    exit 1
fi

# Check for git
if ! command -v git &> /dev/null; then
    echo "❌ Git is not installed. Please install git first."
    exit 1
fi

echo "📋 Pre-flight checklist:"
echo "  1. Do you have a GitHub account? (y/n)"
read -r HAS_GITHUB
if [ "$HAS_GITHUB" != "y" ]; then
    echo "Please create a GitHub account at https://github.com and try again."
    exit 1
fi

echo "  2. Do you have an Anthropic API key? (y/n)"
read -r HAS_API_KEY
if [ "$HAS_API_KEY" != "y" ]; then
    echo "Please get an API key at https://console.anthropic.com/ and try again."
    exit 1
fi

echo ""
echo "🔐 Security Setup"
echo "-----------------"
echo "The default password is: family2025"
echo ""
echo "Would you like to change it now? (y/n)"
read -r CHANGE_PASSWORD

if [ "$CHANGE_PASSWORD" = "y" ]; then
    echo "Enter your new password:"
    read -r NEW_PASSWORD
    
    # Replace password in App.jsx
    if [[ "$OSTYPE" == "darwin"* ]]; then
        # macOS
        sed -i '' "s/family2025/$NEW_PASSWORD/g" App.jsx
    else
        # Linux
        sed -i "s/family2025/$NEW_PASSWORD/g" App.jsx
    fi
    
    echo "✅ Password updated to: $NEW_PASSWORD"
    echo "   (Make sure to save this!)"
else
    echo "⚠️  Remember to change the password later in App.jsx"
fi

echo ""
echo "📦 Installing dependencies..."
npm install

if [ $? -ne 0 ]; then
    echo "❌ Failed to install dependencies"
    exit 1
fi

echo ""
echo "🔧 Initializing Git repository..."
if [ ! -d ".git" ]; then
    git init
    git add .
    git commit -m "Initial commit - Kindred Family App"
    echo "✅ Git repository initialized"
else
    echo "ℹ️  Git repository already exists"
fi

echo ""
echo "📝 Next Steps:"
echo "-------------"
echo "1. Create a new repository on GitHub:"
echo "   https://github.com/new"
echo ""
echo "2. Link your local repository:"
echo "   git remote add origin https://github.com/YOUR-USERNAME/YOUR-REPO.git"
echo "   git push -u origin main"
echo ""
echo "3. Deploy to Vercel:"
echo "   - Go to https://vercel.com"
echo "   - Import your GitHub repository"
echo "   - Add environment variable: ANTHROPIC_API_KEY"
echo "   - Click Deploy!"
echo ""
echo "4. Share with your family:"
echo "   - URL: (from Vercel dashboard)"
if [ "$CHANGE_PASSWORD" = "y" ]; then
    echo "   - Password: $NEW_PASSWORD"
else
    echo "   - Password: family2025 (CHANGE THIS!)"
fi
echo ""
echo "📚 For detailed instructions, read:"
echo "   - QUICKSTART.md (5 minute guide)"
echo "   - CHECKLIST.md (step by step)"
echo "   - README.md (full documentation)"
echo ""
echo "🎉 Setup complete! Follow the next steps above to deploy."
