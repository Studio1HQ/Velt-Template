# Tempo + Velt Starter Kit

A modern, dark-themed analytics dashboard starter kit built with React, TypeScript, Tailwind CSS, Supabase, and Velt collaboration features. Powered by TempoLabs AI development tools for enhanced productivity.

![image](https://github.com/user-attachments/assets/3ac2f5d3-50e6-4e27-8752-39048f79e7cf)


https://github.com/user-attachments/assets/441ff997-ceab-435b-8a22-c85aa2a275b5


## Features

- 🌙 **Dark-themed UI**: Sleek, modern interface designed for extended use with reduced eye strain
- 📊 **Analytics Dashboard**: Interactive visualizations and data insights
- 🔐 **Authentication**: Complete auth flow with Supabase (sign up, sign in, password reset)
- 💳 **Subscription Payments**: Integrated Stripe payment processing with subscription plans
- 👥 **Real-time Collaboration**: Velt integration for presence awareness, comments, and cursor following
- 🎨 **UI Components**: Comprehensive set of accessible UI components using Radix UI and shadcn/ui
- 📱 **Responsive Design**: Fully responsive layout that works on all devices
- 🚀 **Performance**: Built with React + Vite for fast development and optimal performance
- 🧠 **TempoLabs Integration**: Enhanced development experience with AI-powered tools

## About TempoLabs

[TempoLabs](https://www.tempo.new/) is a platform where designers and developers collaborate on code. It provides AI-powered tools to build React applications up to 10x faster with features like:

- Visual editing of React components
- Design system integration
- AI code generation and assistance
- Seamless GitHub integration
- Drag-and-drop interface that feels like a design tool

This starter kit integrates TempoLabs' development tools to enhance workflow and productivity.

## Tech Stack

- **Frontend**: React, TypeScript, Vite
- **Styling**: Tailwind CSS, shadcn/ui components
- **Backend**: Supabase (Authentication, Database, Edge Functions)
- **Payments**: Stripe integration
- **Collaboration**: Velt for real-time collaboration features
- **Development Tools**: TempoLabs AI-powered development suite
- **Routing**: React Router
- **Forms**: React Hook Form with Zod validation

## Getting Started

### Prerequisites

- Node.js (v16+)
- npm or yarn
- Supabase account
- Stripe account (for payment processing)
- Velt account (for collaboration features)
- TempoLabs account (for enhanced development experience)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/Studio1HQ/Velt-Template.git
   cd veltic
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

3. Set up environment variables:
   Create a `.env` file in the root directory with the following variables:
   ```
   VITE_SUPABASE_URL=your_supabase_url
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
   VITE_VELT_API_KEY=your_velt_api_key
   ```

4. Start the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. Open your browser and navigate to `http://localhost:5173`

## Supabase Setup

1. Create a new Supabase project
2. Set up authentication providers (Email, OAuth, etc.)
3. Deploy the included Edge Functions:
   ```bash
   supabase functions deploy get-plans
   supabase functions deploy create-checkout
   supabase functions deploy payments-webhook
   ```

## Velt Setup

1. Create a Velt account at [velt.dev](https://www.velt.dev/)
2. Create a new project and get your API key
3. Add the API key to your `.env` file

## TempoLabs Setup

1. Create a TempoLabs account at [tempo.new](https://www.tempo.new/)
2. Use TempoLabs' visual editor and AI tools to enhance your development workflow
3. Checkout complete documentation guide for [Vite React + Supabase + Stripe](https://tempolabsinc.mintlify.app/ViteSupabaseStripe) setup

## Project Structure

```
├── public/                  # Static assets
├── src/
│   ├── components/          # UI components
│   │   ├── auth/            # Authentication components
│   │   ├── dashboard/       # Dashboard components
│   │   ├── pages/           # Page components
│   │   ├── ui/              # UI components (shadcn/ui)
│   │   └── velt/            # Velt integration components
│   ├── context/             # React context providers
│   ├── lib/                 # Utility functions
│   ├── types/               # TypeScript type definitions
│   ├── App.tsx              # Main application component
│   └── main.tsx             # Application entry point
├── supabase/
│   ├── functions/           # Supabase Edge Functions
│   │   ├── create-checkout/ # Stripe checkout function
│   │   ├── get-plans/       # Get subscription plans function
│   │   └── payments-webhook/# Stripe webhook handler
│   └── migrations/          # Database migrations
├── tempo.config.json        # TempoLabs configuration
└── ...                      # Configuration files
```

## Features in Detail

### Authentication

The starter kit includes a complete authentication system powered by Supabase Auth, with:
- Email/password authentication
- Social login (Google, GitHub, etc.)
- Password reset flow
- Protected routes

### Subscription Plans

Integrated Stripe subscription management:
- Multiple subscription tiers (Basic, Pro, Enterprise)
- Secure checkout process
- Webhook integration for subscription events

### Analytics Dashboard

A beautiful dark-themed dashboard with:
- Interactive data visualizations
- Filtering capabilities
- User management
- Settings and profile management

### Collaboration Features

Velt integration provides:
- Presence awareness (see who's online)
- Cursor following (see where teammates are pointing)
- Comments and annotations
- Task management

### TempoLabs Integration

Enhance your development workflow with:
- Visual editing of React components
- AI-powered code generation
- Design system integration
- Error handling and debugging tools

## Customization

### Styling

The project uses Tailwind CSS for styling. You can customize the theme in `tailwind.config.js`.

### Components

UI components are built with shadcn/ui and can be customized in the `src/components/ui` directory.

### Adding Pages

1. Create a new page component in `src/components/pages`
2. Add the route in `App.tsx`

## Deployment

### Vercel

1. Push your code to GitHub
2. Import the project in Vercel
3. Set up environment variables
4. Deploy

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## Acknowledgements

- [TempoLabs](https://www.tempo.new/) for AI-powered development tools
- [Supabase](https://supabase.io/) for authentication and backend services
- [Velt](https://www.velt.dev/) for collaboration features
- [shadcn/ui](https://ui.shadcn.com/) for UI components
- [Tailwind CSS](https://tailwindcss.com/) for styling
- [Vite](https://vitejs.dev/) for the build system
- [Stripe](https://stripe.com/) for payment processing
