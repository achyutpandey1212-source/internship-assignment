import Section from '@/components/ui/Section';
import Container from '@/components/ui/Container';
import Badge from '@/components/ui/Badge';

const TECH_STACK = [
  'React',
  'Vite',
  'TypeScript',
  'Tailwind CSS',
  'Express',
  'MongoDB',
  'JWT',
  'Axios',
  'Node.js',
] as const;

function TechStackSection() {
  return (
    <Section spacing="md" className="bg-gray-50">
      <Container maxWidth="2xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4" style={{ fontFamily: 'var(--font-serif)' }}>
            Technology Stack
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Built with modern, production-grade tools and libraries.
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-3">
          {TECH_STACK.map((tech) => (
            <Badge key={tech} variant="default" className="px-4 py-2 text-sm font-medium">
              {tech}
            </Badge>
          ))}
        </div>
      </Container>
    </Section>
  );
}

export default TechStackSection;
