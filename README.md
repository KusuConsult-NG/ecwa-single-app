# ECWA Management System - Single App

A comprehensive church management platform for the Evangelical Church Winning All (ECWA) built with Next.js 14.

## Features

- **Dashboard**: Financial overview, member statistics, and recent activity
- **Leader Management**: Add, edit, and manage church leaders
- **Financial Management**: Track income, expenditures, and financial records
- **Member Management**: Manage church members and their information
- **Agencies & Staff**: Manage church agencies and staff members
- **Requisitions & Approvals**: Handle financial requests and approval workflows
- **Reports**: Generate various reports and analytics
- **Data Import**: Import existing ECWA data

## Technology Stack

- **Framework**: Next.js 14.2.5
- **Language**: TypeScript
- **Styling**: Tailwind CSS with custom ECWA branding
- **Authentication**: JWT-based authentication
- **Database**: In-memory database (demo purposes)
- **Package Manager**: Bun

## Getting Started

### Prerequisites

- Node.js 18+ or Bun
- Git

### Installation

1. Clone the repository:
```bash
git clone https://github.com/your-username/ecwa-single-app.git
cd ecwa-single-app
```

2. Install dependencies:
```bash
bun install
# or
npm install
```

3. Run the development server:
```bash
bun run dev
# or
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
src/
├── app/                    # Next.js app directory
│   ├── api/               # API routes
│   │   ├── auth/          # Authentication endpoints
│   │   ├── leaders/       # Leader management
│   │   ├── financials/    # Financial data
│   │   └── ...
│   ├── components/        # React components
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Home page
├── lib/                   # Utility libraries
│   ├── auth.ts           # Authentication utilities
│   ├── database.ts       # Database management
│   └── rbac.ts           # Role-based access control
└── types/                 # TypeScript type definitions
```

## ECWA Branding

The application uses the official ECWA color scheme:
- Primary Blue: `#0ea5e9` (ecwa-500)
- Dark Blue: `#0284c7` (ecwa-600)
- Light Blue: `#f0f9ff` (ecwa-50)

## Features Overview

### Dashboard
- Financial overview with key metrics
- Member statistics
- Recent activity feed
- Quick access to main features

### Leader Management
- Add new leaders with roles and portfolios
- Edit existing leader information
- Track leader status and tenure
- Role-based permissions

### Financial Management
- Track income and expenditures
- Generate financial reports
- Manage budgets and allocations
- Approval workflows

### Member Management
- Member registration and profiles
- Contact information management
- Membership status tracking
- Family relationships

## API Endpoints

- `GET /api/leaders` - Get all leaders
- `POST /api/leaders` - Create new leader
- `GET /api/financials` - Get financial data
- `POST /api/financials` - Add financial record
- `GET /api/members` - Get all members
- `POST /api/members` - Add new member

## Development

### Adding New Features

1. Create API routes in `src/app/api/`
2. Add corresponding pages in `src/app/`
3. Update types in `src/types/`
4. Add database methods in `src/lib/database.ts`

### Styling

The application uses Tailwind CSS with custom ECWA colors. All styling follows the ECWA brand guidelines.

## Deployment

The application is ready for deployment on Vercel:

1. Connect your GitHub repository to Vercel
2. Set environment variables if needed
3. Deploy automatically on push to main branch

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## License

This project is proprietary to ECWA (Evangelical Church Winning All).

## Support

For support and questions, please contact the development team.