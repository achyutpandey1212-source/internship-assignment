import Section from '@/components/ui/Section';
import Container from '@/components/ui/Container';

const STEPS = [
  {
    title: 'Sign Up',
    description: 'Create an account with your name, email, and password.',
    icon: (
      <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.25h15a1.5 1.5 0 001.5-1.5V19.5a6 6 0 00-6-6h-9a6 6 0 00-6 6v.75a1.5 1.5 0 001.5 1.5z" />
      </svg>
    ),
  },
  {
    title: 'Login',
    description: 'Authenticate with your email and password.',
    icon: (
      <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 5.25a3 3 0 013 3m3 0a6 6 0 01-7.029 5.474c-.906-.538-1.89-.844-2.97-.844a5.25 5.25 0 00-5.25 5.25c0 .714.166 1.402.477 2.048M15 19.5a2.25 2.25 0 01-2.25-2.25V18a2.25 2.25 0 01-2.25-2.25h-1.5A2.25 2.25 0 017.5 18v.75a2.25 2.25 0 01-2.25 2.25H6m12 0v.75a2.25 2.25 0 01-2.25 2.25H18" />
      </svg>
    ),
  },
  {
    title: 'Access Token',
    description: 'Receive a short-lived access token for authenticated requests.',
    icon: (
      <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 5.25a3 3 0 013 3m3 0a6 6 0 01-7.029 5.474c-.906-.538-1.89-.844-2.97-.844a5.25 5.25 0 00-5.25 5.25c0 .714.166 1.402.477 2.048M15 19.5a2.25 2.25 0 01-2.25-2.25V18a2.25 2.25 0 01-2.25-2.25h-1.5A2.25 2.25 0 017.5 18v.75a2.25 2.25 0 01-2.25 2.25H6" />
      </svg>
    ),
  },
  {
    title: 'Protected Dashboard',
    description: 'Access protected routes and view your authenticated session.',
    icon: (
      <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6A2.25 2.25 0 016 3.75h12A2.25 2.25 0 0120.25 6v12a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18V6z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4" />
      </svg>
    ),
  },
  {
    title: 'Logout',
    description: 'Securely end your session and invalidate refresh tokens.',
    icon: (
      <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9" />
      </svg>
    ),
  },
] as const;

function AuthFlowSection() {
  return (
    <Section spacing="md">
      <Container maxWidth="2xl">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4" style={{ fontFamily: 'var(--font-serif)' }}>
            How it works
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            A simple, secure authentication flow designed for modern web applications.
          </p>
        </div>

        <div className="relative">
          <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-px bg-gray-200 -translate-x-1/2" />

          <div className="space-y-12 lg:space-y-0">
            {STEPS.map((step, index) => (
              <div
                key={step.title}
                className="relative flex flex-col lg:flex-row items-center gap-8 lg:gap-16"
              >
                <div className={`flex-1 ${index % 2 === 0 ? 'lg:text-right' : 'lg:text-left'} order-2 lg:order-1`}>
                  <div className="inline-flex items-center gap-3 mb-3">
                    <div className="h-10 w-10 rounded-full bg-primary-50 text-primary-600 flex items-center justify-center">
                      {step.icon}
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900">
                      {step.title}
                    </h3>
                  </div>
                  <p className="text-gray-600 max-w-md mx-auto lg:mx-0">
                    {step.description}
                  </p>
                </div>

                <div className="order-1 lg:order-2 flex items-center justify-center">
                  <div className="h-12 w-12 rounded-full bg-gray-900 text-white flex items-center justify-center text-lg font-semibold">
                    {index + 1}
                  </div>
                </div>

                <div className="hidden lg:block flex-1 order-3" />

                {index < STEPS.length - 1 && (
                  <div className="lg:hidden flex justify-center -my-4">
                    <svg className="h-6 w-6 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 13.5L12 21m0 0l-7.5-7.5M12 21V3" />
                    </svg>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </Container>
    </Section>
  );
}

export default AuthFlowSection;
