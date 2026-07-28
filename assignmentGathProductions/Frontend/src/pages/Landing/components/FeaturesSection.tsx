import Card from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';
import Container from '@/components/ui/Container';
import Section from '@/components/ui/Section';

const FEATURES = [
  {
    title: 'Secure JWT Authentication',
    description: 'Industry-standard JSON Web Tokens with short-lived access tokens and secure refresh token rotation.',
    badge: 'Core',
  },
  {
    title: 'Refresh Token Rotation',
    description: 'Automatic token renewal with database-backed validation. Old tokens are invalidated on every use.',
    badge: 'Security',
  },
  {
    title: 'Protected Routes',
    description: 'Server-side route protection with middleware-based access control and typed request augmentation.',
    badge: 'Routing',
  },
  {
    title: 'Production Architecture',
    description: 'Layered backend architecture with controllers, services, utilities, and centralized error handling.',
    badge: 'Backend',
  },
  {
    title: 'Responsive UI',
    description: 'Mobile-first design system with consistent spacing, typography, and accessibility across all breakpoints.',
    badge: 'Frontend',
  },
  {
    title: 'End-to-End Type Safety',
    description: 'TypeScript from database models to API responses to frontend forms. No runtime surprises.',
    badge: 'TypeScript',
  },
] as const;

function FeaturesSection() {
  return (
    <Section spacing="md" className="bg-gray-50">
      <Container maxWidth="2xl">
        <div className="text-center mb-16">
          <Badge variant="default" className="mb-4">
            Features
          </Badge>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4" style={{ fontFamily: 'var(--font-serif)' }}>
            Built for production
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Every feature is designed with security, maintainability, and developer experience in mind.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {FEATURES.map((feature) => (
            <Card key={feature.title} className="h-full hover:shadow-md transition-shadow">
              <div className="flex flex-col h-full">
                <div className="mb-4">
                  <Badge variant="default" className="text-xs">
                    {feature.badge}
                  </Badge>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed flex-1">
                  {feature.description}
                </p>
              </div>
            </Card>
          ))}
        </div>
      </Container>
    </Section>
  );
}

export default FeaturesSection;
