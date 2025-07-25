# Replit.md

## Overview

This is a mystical fortune-telling application that combines modern React frontend with Express.js backend. The app allows users to ask questions and receive mystical AI-generated answers, resembling a magical conch shell experience. It features beautiful animations, a mystical UI theme, and integrates with OpenAI for generating responses.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Routing**: Wouter (lightweight React router)
- **Styling**: Tailwind CSS with shadcn/ui component library
- **State Management**: TanStack Query (React Query) for server state
- **Animations**: Framer Motion for smooth animations and transitions
- **UI Components**: Radix UI primitives with custom styling
- **Build Tool**: Vite for fast development and optimized builds

### Backend Architecture
- **Framework**: Express.js with TypeScript
- **Database**: PostgreSQL with Drizzle ORM
- **Database Provider**: Neon Database (serverless PostgreSQL)
- **API Integration**: OpenAI API for generating mystical responses
- **Session Management**: In-memory storage (expandable to database)
- **Development**: Hot reload with Vite integration

## Key Components

### Database Schema
- **Users Table**: Basic user authentication (id, username, password)
- **Answers Table**: Stores questions, AI-generated answers, timestamps, and optional user associations
- **Database Migrations**: Managed through Drizzle Kit

### Core Features
1. **Question Submission**: Users can ask questions through a mystical interface
2. **AI Response Generation**: OpenAI GPT-4o generates mystical, philosophical answers
3. **Answer Storage**: All Q&A pairs are saved with timestamps
4. **Daily Fortune**: Additional feature for daily mystical predictions
5. **Answer Management**: Users can save and view previous answers (localStorage)

### UI Components
- **Mystical Orb**: Animated central element with shake, glow, and explosion effects
- **Question Form**: Input form with validation and animation triggers
- **Answer Display**: Formatted display of mystical responses with save functionality
- **Floating Particles**: Background animation for mystical atmosphere
- **Additional Features**: Daily fortune and saved answers management

## Data Flow

1. **User Input**: Questions submitted through the QuestionForm component
2. **API Processing**: Express server validates input and calls OpenAI API
3. **AI Generation**: OpenAI generates mystical responses based on system prompts
4. **Data Storage**: Q&A pairs stored in PostgreSQL database via Drizzle ORM
5. **Response Delivery**: Formatted answers returned to frontend with animations
6. **Client Storage**: Users can save favorite answers to localStorage

## External Dependencies

### Core Dependencies
- **OpenAI API**: GPT-4o model for generating mystical responses
- **Neon Database**: Serverless PostgreSQL hosting
- **Drizzle ORM**: Type-safe database operations
- **TanStack Query**: Server state management and caching
- **Framer Motion**: Animation library for smooth transitions

### UI Dependencies
- **shadcn/ui**: Pre-built accessible components
- **Radix UI**: Primitive components for complex UI patterns
- **Tailwind CSS**: Utility-first CSS framework
- **Lucide React**: Icon library

## Deployment Strategy

### Development Environment
- **Local Development**: Vite dev server with Express backend
- **Hot Reload**: Integrated Vite middleware for seamless development
- **Environment Variables**: OpenAI API key and database URL configuration

### Production Build
- **Frontend**: Vite builds optimized React bundle
- **Backend**: esbuild compiles Express server to single file
- **Database**: Drizzle migrations ensure schema consistency
- **Static Assets**: Served through Express with proper caching

### Database Management
- **Schema Changes**: Managed through Drizzle Kit migrations
- **Connection**: Environment-based DATABASE_URL configuration
- **Scalability**: Serverless PostgreSQL allows automatic scaling

### Key Environment Variables
- `DATABASE_URL`: PostgreSQL connection string
- `OPENAI_API_KEY`: API key for OpenAI services
- `NODE_ENV`: Environment mode (development/production)

The application is designed to be easily deployable on platforms like Replit, with all necessary configuration files and a clear separation between development and production environments.