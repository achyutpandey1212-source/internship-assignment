import { Link } from 'react-router-dom';
import { ROUTES } from '@/types/routes';
import Button from '@/components/ui/Button';
import Container from '@/components/ui/Container';
import Section from '@/components/ui/Section';

function HeroSection() {
  return (
    <Section spacing="lg">
      <Container maxWidth="2xl">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
          <div className="flex-1 text-center lg:text-left">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight" style={{ fontFamily: 'var(--font-serif)' }}>
              Authentication built for modern applications
            </h1>
            <p className="text-lg sm:text-xl text-gray-600 mb-8 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
              A production-inspired authentication system with secure JWT flows, refresh token rotation, and clean architecture.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
              <Link to={ROUTES.SIGNUP}>
                <Button size="lg" className="w-full sm:w-auto">
                  Get Started
                </Button>
              </Link>
              <Link to={ROUTES.LOGIN}>
                <Button variant="outline" size="lg" className="w-full sm:w-auto">
                  Sign In
                </Button>
              </Link>
            </div>
            <div className="flex items-center justify-center lg:justify-start gap-6 mt-8 text-sm text-gray-500">
              <div className="flex items-center gap-2">
                <svg className="h-5 w-5 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
                <span>JWT Authentication</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="h-5 w-5 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
                <span>Type Safe</span>
              </div>
            </div>
          </div>
          <div className="flex-1 flex justify-center">
              <div className="relative w-full max-w-md">
                <div className="absolute -inset-4 bg-primary-50 rounded-3xl" />
              <div className="relative bg-white border border-gray-200 rounded-2xl shadow-lg p-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="h-10 w-10 rounded-lg bg-primary-600 flex items-center justify-center">
                    <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-900">Secure Access</p>
                    <p className="text-xs text-gray-500">End-to-end encrypted</p>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="h-2 bg-gray-100 rounded-full w-full" />
                  <div className="h-2 bg-gray-100 rounded-full w-5/6" />
                  <div className="h-2 bg-gray-100 rounded-full w-4/6" />
                </div>
                <div className="mt-6 flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-green-500" />
                  <span className="text-xs text-gray-600">Token verified</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}

export default HeroSection;
