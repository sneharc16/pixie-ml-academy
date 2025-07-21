# 🎀 Pixie Perceptron's ML Academy

A fun and interactive machine learning education platform featuring multiple themed experiences, with a special focus on making AI/ML concepts accessible through engaging, themed interfaces.

## ✨ Features

### 🎓 Learning Modules
- **Beginner Content** - Introduction to ML concepts
- **Intermediate Content** - Advanced ML topics
- **Advanced Content** - Expert-level machine learning
- **Interactive Quiz Games** - Test your knowledge
- **Daily Trivia** - Stay engaged with daily challenges

### 🎨 Theme System
- **Barbie Theme** - Pink, glamorous ML learning experience
- **Dark/Light Mode** - Seamless theme switching
- **Responsive Design** - Mobile-first approach

### 🚀 Interactive Features
- **Real-time Chat** - AI-powered assistance
- **Progress Tracking** - Monitor your learning journey
- **Leaderboards** - Compete with other learners
- **Notes System** - Take and organize your notes
- **Community Features** - Connect with fellow learners

### 🎵 Enhanced Experience
- **Background Music** - Themed audio experience
- **Animated Elements** - Engaging visual effects
- **Motivational Quotes** - Daily inspiration
- **ML News Feed** - Stay updated with latest trends

## 🛠️ Tech Stack

### Frontend Framework
- **React 18.3.1** - Modern React with hooks
- **TypeScript** - Type-safe development
- **Vite** - Lightning-fast build tool

### Styling & UI
- **Tailwind CSS** - Utility-first CSS framework
- **shadcn/ui** - High-quality component library
- **Radix UI** - Accessible component primitives
- **Lucide React** - Beautiful icon library
- **tailwindcss-animate** - Smooth animations

### State Management & Data
- **TanStack React Query** - Server state management
- **React Context** - Global state management
- **React Hook Form** - Form handling
- **Zod** - Schema validation

### Routing & Navigation
- **React Router DOM** - Client-side routing
- **React Resizable Panels** - Flexible layouts

### Development Tools
- **ESLint** - Code linting
- **PostCSS** - CSS processing
- **Lovable Tagger** - Development tooling

### Additional Libraries
- **date-fns** - Date manipulation
- **DOMPurify** - XSS protection
- **class-variance-authority** - Component variants
- **clsx & tailwind-merge** - Conditional styling
- **Sonner** - Toast notifications
- **Recharts** - Data visualization
- **next-themes** - Theme management

## 🚀 Getting Started

### Prerequisites
- **Node.js** (v18 or higher)
- **npm** or **yarn** package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone <YOUR_GIT_URL>
   cd pixie-perceptron-playground
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open in browser**
   ```
   http://localhost:8080
   ```

### Available Scripts

```bash
# Development
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
npm run lint         # Run ESLint

# Type checking
npm run type-check   # Check TypeScript types
```

## 📁 Project Structure

```
src/
├── components/           # Reusable UI components
│   ├── ui/              # shadcn/ui components
│   ├── home/            # Home page sections
│   ├── AdvancedContent.tsx
│   ├── BeginnerContent.tsx
│   ├── ChatbotPage.tsx
│   ├── Community.tsx
│   ├── DailyTrivia.tsx
│   ├── FunProjectsGame.tsx
│   ├── IntermediateContent.tsx
│   ├── LeaderboardPage.tsx
│   ├── LoginPage.tsx
│   ├── MLNews.tsx
│   ├── MotivationalQuotes.tsx
│   ├── MusicButton.tsx
│   ├── Navigation.tsx
│   ├── NotesPage.tsx
│   ├── QuizGame.tsx
│   ├── QuizTrivia.tsx
│   ├── RoadmapSection.tsx
│   ├── SecurityHeaders.tsx
│   ├── ShareProgressModal.tsx
│   ├── SlipperButton.tsx
│   └── ThemeToggle.tsx
├── contexts/            # React contexts
│   ├── AuthContext.tsx
│   └── ThemeContext.tsx
├── hooks/               # Custom React hooks
│   ├── use-mobile.tsx
│   └── use-toast.ts
├── lib/                 # Utility libraries
│   └── utils.ts
├── pages/               # Page components
│   ├── Index.tsx
│   └── NotFound.tsx
├── utils/               # Utility functions
│   └── security.ts
├── assets/              # Static assets
├── App.tsx              # Main app component
├── main.tsx             # App entry point
└── index.css            # Global styles
```

## 🎨 Design System

The project uses a comprehensive design system built with:
- **CSS Custom Properties** - Semantic color tokens
- **HSL Color Format** - Consistent color management
- **Component Variants** - Using class-variance-authority
- **Responsive Design** - Mobile-first approach
- **Accessibility** - WCAG compliant components

### Theme Customization

Themes are managed through CSS custom properties in `index.css`:
```css
:root {
  --primary: [hsl values];
  --secondary: [hsl values];
  --background: [hsl values];
  /* ... more theme tokens */
}
```

## 🔐 Security Features

- **XSS Protection** - DOMPurify integration
- **Security Headers** - Custom security component
- **Type Safety** - Full TypeScript coverage
- **Input Validation** - Zod schema validation

## 🌟 Key Features Breakdown

### Authentication System
- Context-based auth management
- Secure login/logout flow
- Protected routes

### Theme System
- Multiple theme support (Barbie, Default)
- Dark/Light mode toggle
- Smooth theme transitions
- Mobile-responsive design

### Learning Management
- Progress tracking
- Interactive quizzes
- Difficulty levels (Beginner → Advanced)
- Achievement system

### Community Features
- Leaderboards
- Social sharing
- Notes and progress sharing

## 🚀 Deployment

### Custom Deployment
The built application can be deployed to any static hosting service:
- Vercel
- Netlify
- GitHub Pages
- AWS S3 + CloudFront

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 Development Guidelines

- Use TypeScript for all new code
- Follow the existing component structure
- Use semantic tokens from the design system
- Write accessible components
- Test on mobile devices
- Keep components focused and reusable
