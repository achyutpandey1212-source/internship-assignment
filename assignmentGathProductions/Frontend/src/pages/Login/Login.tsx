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

const loginSchema = z.object({
  email: z.string().email('Please enter a valid email'),
  password: z.string().min(1, 'Password is required'),
});

type LoginFormData = z.infer<typeof loginSchema>;

function LoginPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (data: LoginFormData) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await authService.login(data);

      login(response.accessToken, response.refreshToken, response.user);
      toast.success('Login successful!');
      setTimeout(() => navigate(ROUTES.DASHBOARD), 100);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Login failed';
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
              Welcome back
            </h1>
            <p className="text-gray-600">
              Enter your credentials to access your account
            </p>
          </div>

          <Card className="w-full">
            {error && (
              <div className="mb-6 p-4 rounded-lg bg-red-50 border border-red-200" role="alert" aria-live="assertive">
                <p className="text-sm text-red-700">{error}</p>
              </div>
            )}

            <Form
              schema={loginSchema}
              onSubmit={handleSubmit}
              defaultValues={{ email: '', password: '' }}
              className="space-y-6"
            >
              {({ register, errors }) => (
                <>
                  <Input
                    label="Email"
                    type="email"
                    placeholder="you@example.com"
                    error={errors.email?.message as string | undefined}
                    {...register('email')}
                  />

                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                        Password
                      </label>
                      <button
                        type="button"
                        className="text-sm text-primary-600 hover:text-primary-700 transition-colors"
                      >
                        Forgot password?
                      </button>
                    </div>
                    <Input
                      id="password"
                      label=""
                      type="password"
                      placeholder="••••••••"
                      error={errors.password?.message as string | undefined}
                      {...register('password')}
                    />
                  </div>

                  <Button type="submit" size="lg" className="w-full" disabled={isLoading}>
                    {isLoading ? 'Signing in...' : 'Sign In'}
                  </Button>
                </>
              )}
            </Form>

            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">Or continue with</span>
              </div>
            </div>

            <div className="text-center text-sm text-gray-600">
              Don't have an account?{' '}
              <Link
                to={ROUTES.SIGNUP}
                className="font-medium text-primary-600 hover:text-primary-700 transition-colors"
              >
                Create an account
              </Link>
            </div>
          </Card>
        </div>
      </Container>
    </Section>
  );
}

export default LoginPage;
