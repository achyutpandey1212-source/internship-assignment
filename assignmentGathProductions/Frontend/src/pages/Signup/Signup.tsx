import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { z } from 'zod';
import { ROUTES } from '@/types/routes';
import Card from '@/components/ui/Card';
import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';
import Container from '@/components/ui/Container';
import Section from '@/components/ui/Section';
import Form from '@/components/forms/Form';
import { authService } from '@/services/auth.service';
import { useAuth } from '@/context/AuthContext';

const signupSchema = z.object({
  name: z.string().min(3, 'Name must be at least 3 characters'),
  email: z.string().email('Please enter a valid email'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  confirmPassword: z.string().min(1, 'Please confirm your password'),
}).refine((data) => data.password === data.confirmPassword, {
  message: 'Passwords do not match',
  path: ['confirmPassword'],
});

type SignupFormData = z.infer<typeof signupSchema>;

function SignupPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (data: SignupFormData) => {
    setIsLoading(true);
    setError(null);

    try {
      const { confirmPassword, ...signupData } = data;
      const response = await authService.signup(signupData);

      login(response.accessToken, response.refreshToken, response.user);
      toast.success('Account created successfully!');
      setTimeout(() => navigate(ROUTES.DASHBOARD), 100);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Signup failed';
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Section spacing="md">
      <Container maxWidth="sm">
        <div className="flex flex-col items-center">
          <div className="w-full text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2" style={{ fontFamily: 'var(--font-serif)' }}>
              Create an account
            </h1>
            <p className="text-gray-600">
              Get started with your free account
            </p>
          </div>

          <Card className="w-full">
            {error && (
              <div className="mb-6 p-4 rounded-lg bg-red-50 border border-red-200" role="alert" aria-live="assertive">
                <p className="text-sm text-red-700">{error}</p>
              </div>
            )}

            <Form
              schema={signupSchema}
              onSubmit={handleSubmit}
              defaultValues={{ name: '', email: '', password: '', confirmPassword: '' }}
              className="space-y-5"
            >
              {({ register, errors }) => (
                <>
                  <Input
                    label="Full Name"
                    type="text"
                    placeholder="John Doe"
                    error={errors.name?.message as string | undefined}
                    {...register('name')}
                  />

                  <Input
                    label="Email"
                    type="email"
                    placeholder="you@example.com"
                    error={errors.email?.message as string | undefined}
                    {...register('email')}
                  />

                  <Input
                    label="Password"
                    type="password"
                    placeholder="At least 8 characters"
                    error={errors.password?.message as string | undefined}
                    {...register('password')}
                  />

                  <Input
                    label="Confirm Password"
                    type="password"
                    placeholder="Re-enter your password"
                    error={errors.confirmPassword?.message as string | undefined}
                    {...register('confirmPassword')}
                  />

                  <Button type="submit" size="lg" className="w-full" disabled={isLoading}>
                    {isLoading ? 'Creating account...' : 'Create Account'}
                  </Button>
                </>
              )}
            </Form>

            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">Or</span>
              </div>
            </div>

            <div className="text-center text-sm text-gray-600">
              Already have an account?{' '}
              <Link
                to={ROUTES.LOGIN}
                className="font-medium text-primary-600 hover:text-primary-700 transition-colors"
              >
                Sign in
              </Link>
            </div>
          </Card>
        </div>
      </Container>
    </Section>
  );
}

export default SignupPage;
