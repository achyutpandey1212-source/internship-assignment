import { Link } from 'react-router-dom';
import { ROUTES } from '@/types/routes';
import Button from '@/components/ui/Button';
import Container from '@/components/ui/Container';
import Section from '@/components/ui/Section';

function NotFoundPage() {
  return (
    <Section spacing="md">
      <Container maxWidth="sm">
        <div className="flex flex-col items-center justify-center text-center py-20">
          <div className="mb-8">
            <svg className="h-24 w-24 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
            </svg>
          </div>

          <h1 className="text-6xl font-bold text-gray-900 mb-4" style={{ fontFamily: 'var(--font-serif)' }}>
            404
          </h1>
          <h2 className="text-2xl font-semibold text-gray-900 mb-3">
            Page not found
          </h2>
          <p className="text-gray-600 mb-8 max-w-md">
            The page you are looking for doesn't exist or has been moved. Let's get you back on track.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to={ROUTES.HOME}>
              <Button size="lg" className="w-full sm:w-auto">
                Back to Home
              </Button>
            </Link>
            <Link to={ROUTES.LOGIN}>
              <Button variant="outline" size="lg" className="w-full sm:w-auto">
                Go to Login
              </Button>
            </Link>
          </div>
        </div>
      </Container>
    </Section>
  );
}

export default NotFoundPage;

