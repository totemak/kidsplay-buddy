# Kindred - Family Activity Companion

**Version:** 5.3 (Consistency Update)  
**Last Updated:** April 24, 2026

Kindred is a personalized family activity app that generates age-appropriate play and learning activities tailored to your children's profiles. Built with React and powered by Claude AI.

## 🌟 Features

- **Personalized Activities**: Generate custom play and learning activities based on children's ages and interests
- **4 Play Categories**: Active & Sports, Creative & Arts, Pretend & Story, Games & Puzzles
- **4 Learning Focuses**: How to Learn, Soft Skills, Financial Literacy, Interdisciplinary
- **Activity History**: Track completed activities with difficulty and enjoyment ratings
- **Nearby Places**: Discover kid-friendly locations near you
- **Community**: Share and rate activity ideas with other families
- **Multi-language Support**: 9 languages including English, Spanish, French, Portuguese, and more
- **Persistent State**: All data saved locally in browser

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ and npm
- An Anthropic API key ([get one here](https://console.anthropic.com/))

### Local Development

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/kindred-app.git
   cd kindred-app
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   
   Create a `.env` file in the root directory:
   ```
   ANTHROPIC_API_KEY=your_api_key_here
   ```

4. **Start development server**
   ```bash
   npm run dev
   ```

5. **Open in browser**
   
   Navigate to `http://localhost:5173`

## 📦 Deployment to Vercel

### One-Click Deploy

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/yourusername/kindred-app)

### Manual Deployment

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

4. **Set Environment Variables**
   
   In your Vercel dashboard:
   - Go to Settings > Environment Variables
   - Add `ANTHROPIC_API_KEY` with your API key
   - Redeploy to apply changes

## 🔧 Configuration

### API Backend

The app uses a serverless function at `/api/claude` to proxy requests to the Anthropic API. This keeps your API key secure and works seamlessly on Vercel.

### Storage

All user data is stored in `localStorage` with the key `kidsplay_v5`. Data includes:
- Children profiles
- Saved activities
- Completed activities history
- Community contributions
- User preferences

## 📁 Project Structure

```
kindred-app/
├── src/
│   └── App.jsx              # Main application component
├── api/
│   └── claude.js            # Anthropic API proxy endpoint
├── public/
│   └── index.html           # HTML template
├── package.json             # Dependencies and scripts
├── vite.config.js           # Vite configuration
├── vercel.json              # Vercel deployment config
└── README.md                # This file
```

## 🛠️ Technology Stack

- **Frontend**: React 18, Vite
- **Icons**: Lucide React
- **API**: Anthropic Claude (Sonnet 4)
- **Styling**: Inline CSS (custom design system)
- **Deployment**: Vercel (serverless functions)
- **Storage**: Browser localStorage

## 📝 Version History

### v5.3 - Consistency Update (Current)
- Fixed Learning Focuses to single-select behavior
- Unified visual style between Play and Learn categories
- Enhanced sticky Generate button visibility
- Improved environment filter (mutually exclusive options)
- Fixed onboarding flow for first-time users
- Optimized state management for better performance

### v5.0 - Major Redesign
- Redesigned Play categories (activity types vs environments)
- Added persistent user preferences
- Simplified navigation (2 main tabs)
- Enhanced Generate button as sticky FAB
- Improved onboarding experience

## 🤝 Contributing

Contributions are welcome! Please follow the [KINDRED_DEVELOPMENT_PROTOCOL.md](KINDRED_DEVELOPMENT_PROTOCOL.md) for all changes.

### Development Workflow

1. Read the full codebase before making changes
2. Follow existing patterns and conventions
3. Test all user flows thoroughly
4. Update documentation as needed
5. Submit PR with detailed description

## 📄 License

MIT License - see LICENSE file for details

## 🔒 Privacy & Security

- All data stored locally in your browser
- No user accounts or authentication required
- API key never exposed to client
- No personal data collected or transmitted

## 🆘 Support

For issues, questions, or feature requests:
- Open an issue on GitHub
- Check existing documentation
- Review the development protocol

## 🙏 Acknowledgments

- Built with [Anthropic Claude](https://www.anthropic.com/claude)
- Icons by [Lucide](https://lucide.dev/)
- Deployed on [Vercel](https://vercel.com/)

---

**Made with ❤️ for families everywhere**
