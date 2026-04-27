# Changelog

All notable changes to the Kindred app will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [5.3.0] - 2026-04-24

### Fixed
- **Learning Focuses**: Changed from multi-select to single-select behavior for consistency with Play Categories
- **Onboarding Flow**: Fixed "Add Your First Child" button to properly trigger the Children dropdown
- **Environment Filter**: Changed to mutually exclusive single-select (No Preference, Indoor, OR Outdoor)
- **Visual Consistency**: Unified card styling between Play Categories and Learning Focuses
  - Both now use 4-column grid layout
  - Matching icon circle dimensions (46x46px)
  - Consistent border width (3px)
  - Same active state animations and shadows
- **Generate Button**: Enhanced sticky FAB with better visibility and separation
  - Added backdrop blur container
  - Improved shadow and border styling
  - Better disabled state feedback
- **Group Mode Labels**: Added clear "Optionally add:" label for Adults/Extra kids steppers

### Changed
- Learning activities now generate with single focus instead of multiple
- API prompts updated to handle single focus value
- State management simplified for activeLearnFocus (null or string, not array)

### Technical
- Updated defaultState schema
- Fixed IdeaCard to handle both array and single focus values
- Improved ref-based child addition trigger
- Enhanced state persistence for user preferences

## [5.0.0] - 2026-04-18

### Added
- **New Play Categories**: Redesigned from environment-based (Indoor/Outdoor) to activity-type-based:
  - Active & Sports
  - Creative & Arts
  - Pretend & Story
  - Games & Puzzles
- **Persistent User Preferences**: State now saves last selection (kids, mode, adults, extra kids)
- **Sticky Generate Button**: Moved Generate to always-visible FAB for better UX
- **Hamburger Menu**: Added for Nearby Places and Our Journey navigation
- **Onboarding Card**: Welcome screen for first-time users
- **Environment Filter**: Optional Indoor/Outdoor preference (separate from activity type)

### Changed
- **Navigation**: Simplified from 5 tabs to 2 main tabs (Activities, Community)
- **Activity Type Selector**: Unified Play and Learn categories in single view
- **State Schema**: Updated to v5 with new persistent preferences structure
- **Learning Focuses**: Now single-select instead of multi-select

### Removed
- Separate Play/Learn tabs (now unified in Activities section)
- Map and History from bottom navigation (moved to hamburger menu)

## [4.0.0] - 2026-03-15

### Added
- Play/Learn intent toggle
- Learning focuses: How to Learn, Soft Skills, Financial Literacy, Interdisciplinary
- Learning outcomes display in activity cards
- Environment filter (Indoor/Outdoor)

### Changed
- Unified Activities section combining Play and Learn
- Updated API prompts for learning activities
- Enhanced activity cards with learning-specific fields

## [3.0.0] - 2026-02-10

### Added
- Community section for sharing ideas
- Community feedback system (relevance, suitability ratings)
- Vote system for community ideas
- Multi-language support (9 languages)

### Changed
- Updated storage key to "kidsplay_v3"
- Enhanced feedback loop tracking

## [2.0.0] - 2026-01-20

### Added
- Activity History section
- Completion tracking with difficulty and enjoyment ratings
- Statistics display (total done, average enjoyment)
- Timeline view of completed activities

### Changed
- Improved activity card UI with expandable details
- Enhanced discard flow with reason tracking

## [1.0.0] - 2025-12-01

### Added
- Initial release
- Child profile management
- Play activity categories (Indoor, Outdoor, Creative, Trip-based)
- Learning topics (Science, History, Nature, Math, Art, Geography, Biology)
- Nearby places discovery
- Activity generation using Claude AI
- Save/bookmark functionality
- localStorage persistence
- Individual/Group mode selection
- Multi-child support
- Material requirements display
- Age-appropriate activity suggestions

### Technical
- React 18 with Vite
- Lucide React icons
- Anthropic Claude API integration
- Vercel serverless deployment
- localStorage-based state management

---

## Version Numbering Guide

- **Major (X.0.0)**: Breaking changes, major rewrites, significant UX changes
- **Minor (x.Y.0)**: New features, non-breaking changes, enhancements
- **Patch (x.x.Z)**: Bug fixes, minor tweaks, performance improvements

## Links

- [Development Protocol](KINDRED_DEVELOPMENT_PROTOCOL.md)
- [Deployment Guide](DEPLOYMENT_GUIDE.md)
- [README](README.md)
