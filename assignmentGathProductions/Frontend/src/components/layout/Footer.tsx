import { Link } from 'react-router-dom';
import { ROUTES } from '@/types/routes';

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-gray-200 bg-white" role="contentinfo">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-6">
            <Link
              to={ROUTES.HOME}
              className="text-sm font-semibold text-gray-900 hover:text-gray-700 transition-colors"
              style={{ fontFamily: 'var(--font-serif)' }}
            >
              AuthFlow
            </Link>
            <p className="text-sm text-gray-500">
              © {currentYear} AuthFlow. All rights reserved.
            </p>
          </div>

          <div className="flex items-center gap-6">
            <Link to={ROUTES.HOME} className="text-sm text-gray-600 hover:text-gray-900 transition-colors">
              Home
            </Link>
            <Link to={ROUTES.LOGIN} className="text-sm text-gray-600 hover:text-gray-900 transition-colors">
              Login
            </Link>
            <Link to={ROUTES.SIGNUP} className="text-sm text-gray-600 hover:text-gray-900 transition-colors">
              Sign Up
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
