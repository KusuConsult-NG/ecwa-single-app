# ECWA Multi-Tenant Management System

A comprehensive multi-tenant church management system built for ECWA (Evangelical Church Winning All) organizations.

## Features

### 🔐 Authentication & Authorization
- JWT-based authentication with tenant isolation
- Role-based access control (Admin, Treasurer, Secretary, Member)
- Secure login/register system for each tenant

### 💰 Financial Management
- Income and expense tracking
- Real-time financial summaries and analytics
- Transaction categorization and reporting
- Financial dashboard with visual charts

### 👥 Member Management
- Complete member directory and profiles
- Member registration and status tracking
- Role assignment and permissions
- Member statistics and analytics

### 🏢 Agency Management
- Church agencies and ministries management
- Fellowship groups (Women, Men, Youth, Children)
- Ministry tracking (Choir, Ushering, Evangelism, etc.)
- Agency leadership and contact management

### 👨‍💼 Staff Management
- Staff directory and HR management
- Department organization and role tracking
- Salary management and compensation tracking
- Staff qualifications and certifications

### 🧾 Expenditure Tracking
- Expenditure request and approval workflow
- Category-based organization
- Status tracking (pending/approved/rejected)
- Request management and reporting

### 📊 Reporting System
- Comprehensive financial reports
- Member analytics and demographics
- Expenditure analysis and trends
- Export options (PDF, Excel, Print)

## Multi-Tenant Architecture

- **Tenant Isolation**: Each organization has completely separate data
- **Dynamic Routing**: `/[tenant]` for tenant-specific pages
- **Shared Styling**: Consistent ECWA branding across all tenants
- **Scalable Structure**: Easy to add new organizations

## Available Organizations

- **ECWA Jos DCC**: `https://your-domain.vercel.app/jos`
- **ECWA Kaduna DCC**: `https://your-domain.vercel.app/kaduna`

## Sample Accounts

### ECWA Jos DCC
- **Admin**: `admin@jos.ecwa.app` / `admin123`
- **Treasurer**: `treasurer@jos.ecwa.app` / `treasurer123`

## Technology Stack

- **Frontend**: Next.js 14, React 18, TypeScript
- **Styling**: Tailwind CSS with custom ECWA theme
- **Authentication**: JWT tokens with secure cookies
- **Database**: In-memory storage (easily replaceable with PostgreSQL/MongoDB)
- **Deployment**: Vercel

## Getting Started

### Prerequisites
- Node.js 18+ or Bun
- Git

### Installation

1. Clone the repository:
```bash
git clone https://github.com/your-username/ecwa-multitenant.git
cd ecwa-multitenant
```

2. Install dependencies:
```bash
bun install
# or
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env.local
```

4. Run the development server:
```bash
bun run dev
# or
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Environment Variables

Create a `.env.local` file with the following variables:

```env
AUTH_SECRET=your-secret-key-here
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

## Deployment

### Vercel Deployment

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Set environment variables in Vercel dashboard
4. Deploy!

### Manual Deployment

```bash
# Build the application
bun run build

# Start production server
bun run start
```

## Project Structure

```
src/
├── app/
│   ├── [tenant]/           # Tenant-specific pages
│   │   ├── api/           # API routes
│   │   ├── agencies/      # Agency management
│   │   ├── expenditures/  # Expenditure tracking
│   │   ├── financials/    # Financial management
│   │   ├── login/         # Authentication
│   │   ├── members/       # Member management
│   │   ├── reports/       # Reporting system
│   │   ├── staff/         # Staff management
│   │   └── page.tsx       # Dashboard
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Landing page
├── components/
│   ├── TenantProvider.tsx # Tenant context
│   ├── TenantSidebar.tsx  # Navigation sidebar
│   └── TenantTopbar.tsx   # Top navigation
├── lib/
│   ├── auth.ts           # Authentication utilities
│   ├── database.ts       # Database layer
│   └── tenant.ts         # Tenant utilities
└── types/
    └── tenant.ts         # TypeScript definitions
```

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Commit your changes: `git commit -am 'Add feature'`
4. Push to the branch: `git push origin feature-name`
5. Submit a pull request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Support

For support and questions, please contact the development team or create an issue in the repository.

---

**Built with ❤️ for ECWA Churches**
