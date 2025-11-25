# NFL Play Finder

Explore NFL play data through an intelligent chat interface. Ask questions in natural language and get structured, detailed insights about plays, players, and game statistics.

## Overview

NFL Play Finder is an interactive web application that transforms the way you explore NFL play data. Using a conversational interface powered by AI, you can ask questions about specific plays, player performances, and game statistics—and receive both narrative explanations and beautifully formatted data tables.

## Features

- 💬 **Conversational Interface**: Ask questions in plain English about NFL plays and statistics
- 📊 **Structured Data Tables**: View detailed play information in an elegant, responsive grid layout
- 🎯 **Smart Queries**: Pre-configured example queries to help you get started quickly
- 🔍 **Comprehensive Play Data**: Access 12+ data fields per play including yards, touchdowns, formations, and more
- 🎥 **Video Integration**: Direct links to NFL Next Gen Stats (NGS) video footage when available
- ⚡ **Real-time Results**: Powered by the Lyzr Agent API for fast, intelligent responses
- 🎨 **Modern UI**: Built with shadcn/ui components and Tailwind CSS for a polished experience
- 📱 **Responsive Design**: Works seamlessly on desktop and mobile devices

## Technology Stack

- **Build Tool**: Vite 5.4.19 with Hot Module Replacement (HMR)
- **Framework**: React 18.3.1 with TypeScript 5.8.3
- **Styling**: Tailwind CSS 3.4.17
- **UI Components**: shadcn/ui (built on Radix UI primitives)
- **Icons**: lucide-react 0.462.0
- **State Management**:
  - TanStack Query 5.83.0 (React Query) for server state
  - React Hook Form 7.61.1 for form handling
- **Data Visualization**: recharts 2.15.4
- **Utilities**:
  - date-fns 3.6.0 for date manipulation
  - Zod 3.25.76 for schema validation
  - sonner for toast notifications
- **AI Service**: Lyzr Agent API for natural language query processing

## Demo

### Quick Start Examples

Get started instantly with pre-configured queries:

1. **Player Touchdowns**: "Show me all touchdown plays by Tyreek Hill in the 2023 season"
2. **Impressive Plays**: "Find all players who scored a touchdown of more than 70 yards"
3. **Player Stats**: "List all plays where Justin Fields is involved"
4. **Rushing Analysis**: "Show me all rushing touchdowns in 2023"
5. **Defensive Highlights**: "Find all defensive plays where the defender gained more than 40 yards"

### How It Works

1. **Ask a Question**: Type your query or click a suggested question button
2. **AI Processing**: The Lyzr Agent interprets your question and searches the NFL play database
3. **Get Results**: Receive a narrative explanation along with a structured table of matching plays
4. **Explore Details**: Click on any play to expand and see formation, alignment, and position details

### Example Queries You Can Try

- "Show me all interceptions in week 5 of 2023"
- "Find touchdown plays longer than 50 yards by wide receivers"
- "List all plays by the Kansas City Chiefs against the Buffalo Bills"
- "Show me Patrick Mahomes passing plays in the playoffs"
- "Find all fumbles recovered for touchdowns"

## Getting Started

### Prerequisites

- Node.js 18+ and npm (recommended: use [nvm](https://github.com/nvm-sh/nvm#installing-and-updating))
- Lyzr API credentials (API key, User ID, and Agent ID)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/harshit-lyzr/nfl-play-finder.git
   cd nfl-play-finder
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**

   Copy the example environment file:
   ```bash
   cp env.example .env
   ```

   Edit `.env` and add your Lyzr API credentials. See [Environment Variables](#environment-variables) section for details.

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**

   Navigate to [http://localhost:8080](http://localhost:8080) (or the port shown in your terminal)

## Environment Variables

Create a `.env` file in the root directory with the following variables. See `env.example` for a template.

### Required Variables

- `VITE_AGENT_API_URL`: The full Lyzr Agent API endpoint URL
  - Example: `https://agent-prod.studio.lyzr.ai/v3/inference/chat/`

- `VITE_AGENT_API_KEY`: Your Lyzr API authentication key
  - Get this from your Lyzr dashboard

- `VITE_AGENT_USER_ID`: User identifier for Lyzr API calls
  - Unique identifier for your application user

- `VITE_AGENT_ID`: The specific Lyzr agent ID for NFL play queries
  - This agent is configured to understand NFL play data

**Note**: The application automatically generates a unique session ID per browser session, so no session environment variable is required.

## Project Structure

```
nfl-play-finder/
├── src/
│   ├── pages/
│   │   └── Index.tsx          # Main chat interface and application logic
│   ├── components/
│   │   ├── PlayTable.tsx      # Structured play data table component
│   │   ├── ChatMessage.tsx    # Role-based message bubbles (user/assistant)
│   │   ├── ThoughtLoader.tsx  # Animated loading indicator
│   │   ├── ui/                # shadcn/ui component primitives
│   │   └── ...
│   ├── hooks/
│   │   └── use-toast.ts       # Toast notification helpers
│   ├── lib/
│   │   └── utils.ts           # Utility functions
│   ├── main.tsx               # Application entry point
│   └── index.css              # Global styles and Tailwind config
├── public/                    # Static assets
├── env.example                # Environment variables template
├── vite.config.ts             # Vite configuration
├── tailwind.config.ts         # Tailwind CSS customization
└── package.json               # Dependencies and scripts
```

## How It Works

### Application Flow

1. **User Input**: You type a natural language question or select a pre-configured query

2. **API Request**: The application sends your query to the Lyzr Agent API with:
   - Your user credentials
   - A unique session ID (maintains conversation context)
   - The query text

3. **AI Processing**: The Lyzr Agent:
   - Interprets your natural language question
   - Queries the NFL play database
   - Generates a narrative explanation
   - Returns structured play data

4. **Response Parsing**: The application processes the response:
   - Extracts the narrative "thought" text
   - Parses the structured play results
   - Validates data format

5. **Display**: Results are rendered as:
   - A chat message with the narrative explanation
   - An interactive table with play details (if results are found)
   - Expandable rows for additional play information

### Play Data Structure

Each play in the results table includes:

- **play_id**: Unique identifier
- **season**: NFL season year
- **week**: Week number
- **game_date**: Date of the game
- **team**: Team executing the play
- **opponent**: Opposing team
- **player_name**: Primary player involved
- **position**: Player's position
- **play_type**: Type of play (rushing, passing, defensive, etc.)
- **yards**: Yards gained/lost
- **touchdown**: Touchdown indicator (0 or 1)
- **interception**: Interception indicator (0 or 1)
- **formation**: Offensive formation used
- **alignment**: Defensive alignment
- **play_description**: Detailed play description
- **media_link**: NFL Next Gen Stats video URL (when available)

## Available Scripts

- `npm run dev` - Start the Vite development server with hot module replacement
- `npm run build` - Create an optimized production build
- `npm run preview` - Preview the production build locally
- `npm run lint` - Run ESLint to check code quality

## Usage Tips

### Getting the Best Results

1. **Be Specific**: Include player names, teams, seasons, or specific play types for more targeted results
   - Good: "Show me Travis Kelce receiving touchdowns in 2023"
   - Less specific: "Show me some touchdowns"

2. **Use Suggested Queries**: The pre-configured buttons demonstrate the types of questions that work well

3. **Explore Play Details**: Click on table rows to expand and see formation, alignment, and position information

4. **Watch Videos**: Click the media links to view NFL Next Gen Stats video footage of the plays

5. **Multiple Queries**: Ask follow-up questions in the same session to maintain context

### Troubleshooting

- **"Configuration Error" Toast**: Check that all environment variables in `.env` are correctly set
- **No Results**: Try rephrasing your query or making it more specific
- **Network Errors**: Verify your internet connection and that the Lyzr API endpoint is accessible

## Deployment

This application can be deployed to any static hosting platform that supports Vite applications.

### Vercel (Recommended)

1. Connect your GitHub repository to Vercel
2. Add environment variables in the Vercel dashboard
3. Deploy automatically on push

### Netlify

1. Connect your repository
2. Set build command: `npm run build`
3. Set publish directory: `dist`
4. Add environment variables in Netlify dashboard

### Self-Hosted

```bash
npm run build
# Serve the dist/ directory with any static file server
```

**Important**: Ensure all environment variables are set in your deployment platform.

## Security Notes

- All API calls to Lyzr are made client-side (as configured for this application)
- API keys are exposed in the client bundle via Vite's `VITE_` prefix
- **Do not commit** your `.env` file to version control
- The `env.example` file serves as a template without actual credentials
- Consider implementing a backend proxy for production deployments to keep API keys secure

## Contributing

Contributions are welcome! Here's how you can help:

1. **Fork the repository**
2. **Create a feature branch**: `git checkout -b feature/amazing-feature`
3. **Make your changes**: Implement your feature or bug fix
4. **Test thoroughly**: Ensure the app works as expected
5. **Commit your changes**: `git commit -m 'Add amazing feature'`
6. **Push to the branch**: `git push origin feature/amazing-feature`
7. **Open a Pull Request**: Describe your changes and submit for review

### Development Guidelines

- Follow the existing code style and TypeScript conventions
- Use shadcn/ui components when adding new UI elements
- Test with multiple query types to ensure compatibility
- Update documentation for any new features

## Support

For issues, questions, or feature requests:

- Open an issue on [GitHub Issues](https://github.com/harshit-lyzr/nfl-play-finder/issues)
- Check existing issues before creating a new one
- Provide detailed information about bugs (browser, error messages, steps to reproduce)

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Built with [Lyzr AI](https://www.lyzr.ai/) for intelligent query processing
- NFL play data provided through the Lyzr Agent API
- UI components from [shadcn/ui](https://ui.shadcn.com/)
- Icons from [Lucide](https://lucide.dev/)

---

**Made with ❤️ for NFL data enthusiasts**
