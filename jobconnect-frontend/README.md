# JobConnect Frontend

React 18 + Vite frontend for the JobConnect job portal system.

## Prerequisites

- Node.js 16+
- npm 8+
- Backend API running at `http://localhost:8080`

## Project Setup

### 1. Clone Repository
```bash
git clone <repo-url>
cd jobconnect-frontend
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Configure Environment
Create `.env` file:
```
VITE_API_URL=http://localhost:8080/api/v1
VITE_APP_NAME=JobConnect
```

### 4. Run Development Server
```bash
npm run dev
```

Application will be available at: `http://localhost:5173`

## Project Structure

```
src/
├── pages/               # Page components
│   ├── public/         # Public pages (Home, JobDetail)
│   ├── auth/           # Auth pages (Login, Register)
│   ├── candidate/      # Candidate pages
│   ├── recruiter/      # Recruiter pages
│   └── admin/          # Admin pages
├── components/          # Reusable components
│   ├── common/         # Common UI components
│   ├── job/            # Job-related components
│   ├── application/    # Application components
│   └── ...
├── services/            # API services
│   └── api/            # API endpoints
├── store/              # Redux store
├── hooks/              # Custom hooks
├── utils/              # Utility functions
└── styles/             # Global styles
```

## Available Scripts

### Development
```bash
npm run dev        # Start dev server on port 5173
npm run build      # Build for production
npm run preview    # Preview production build
npm run lint       # Run ESLint
npm run test       # Run tests with Vitest
```

## Authentication

The app uses JWT tokens stored in localStorage:
- `accessToken` - Short-lived access token (15 min)
- `refreshToken` - Long-lived refresh token (7 days)

Tokens are automatically included in API requests via axios interceptor.

## Features

### Phase 1 (MVP)
- User registration and login
- Job browsing and search
- Job application workflow
- Candidate profile management
- Recruiter dashboard basics

### Phase 2+
- Advanced filtering
- Saved jobs
- Notifications
- Analytics dashboards
- Admin moderation

## Component Hierarchy

```
App
├── Router
│   ├── Public Routes
│   │   ├── Home
│   │   ├── Login
│   │   └── Register
│   ├── Protected Routes
│   │   ├── Candidate Routes
│   │   ├── Recruiter Routes
│   │   └── Admin Routes
```

## API Integration

All API calls use axios with interceptors:
- Automatic JWT token attachment
- Request/response logging
- Error handling
- Token refresh on 401

Example:
```javascript
import authApi from '@/services/api/authApi'

const login = async (email, password) => {
  const response = await authApi.login(email, password)
  localStorage.setItem('accessToken', response.data.accessToken)
}
```

## Styling

Uses Tailwind CSS for styling:
- Utility-first approach
- Responsive design
- Custom theme in tailwind.config.js
- Dark mode support (extensible)

## Build & Deploy

### Production Build
```bash
npm run build
```

Output in `dist/` directory.

### Docker Deploy
```bash
docker build -t jobconnect-frontend:1.0 .
docker run -p 3000:80 jobconnect-frontend:1.0
```

## Troubleshooting

### API Connection Failed
- Verify backend is running on port 8080
- Check VITE_API_URL in .env
- Check browser console for CORS errors

### Port Already in Use
```bash
# Change port in vite.config.js
server: {
  port: 5174
}
```

### Module Not Found
```bash
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

## Performance Optimization

- Code splitting with React Router
- Lazy loading for pages
- Image optimization
- API response caching

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Contributing

1. Create feature branch: `git checkout -b feature/new-feature`
2. Make changes and test
3. Commit: `git commit -am 'Add feature'`
4. Push: `git push origin feature/new-feature`
5. Create Pull Request

## Support

For issues and questions, please create an issue on GitHub.
