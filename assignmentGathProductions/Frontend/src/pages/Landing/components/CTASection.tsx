import { Link } from 'react-router-dom';
import { ROUTES } from '@/types/routes';
import Section from '@/components/ui/Section';
import Container from '@/components/ui/Container';
import Button from '@/components/ui/Button';

function CTASection() {
  return (
    <Section spacing="md">
      <Container maxWidth="2xl">
        <div className="bg-gray-900 rounded-2xl px-8 py-16 sm:px-16 sm:py-20 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4" style={{ fontFamily: 'var(--font-serif)' }}>
            Ready to get started?
          </h2>
          <p className="text-lg text-gray-300 mb-8 max-w-2xl mx-auto">
            Create an account and experience a production-ready authentication system built with modern best practices.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to={ROUTES.SIGNUP}>
              <Button size="lg" className="w-full sm:w-auto">
                Create Account
              </Button>
            </Link>
            <Link to={ROUTES.LOGIN}>
              <Button variant="outline" size="lg" className="w-full sm:w-auto border-gray-600 text-gray-300 hover:bg-gray-800 hover:text-white">
                Sign In
              </Button>
            </Link>
          </div>
        </div>
      </Container>
    </Section>
  );
}

export default CTASection;
