import { useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '@/types/routes';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import Container from '@/components/ui/Container';
import Section from '@/components/ui/Section';
import Badge from '@/components/ui/Badge';
import Loader from '@/components/ui/Loader';
import { authService } from '@/services/auth.service';
import { useAuth } from '@/context/AuthContext';
import type { User } from '@/types/auth';

function DashboardPage() {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const { logout, accessToken, refreshToken } = useAuth();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userData = await authService.getCurrentUser();
        setUser(userData);
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Failed to load user data';
        setError(errorMessage);
        toast.error(errorMessage);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUser();
  }, []);

  const handleLogout = async () => {
    try {
      await logout();
      toast.success('Logged out successfully');
      navigate(ROUTES.LOGIN);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Logout failed';
      toast.error(errorMessage);
    }
  };

  const maskToken = (token: string | null) => {
    if (!token) return 'Not available';
    if (token.length <= 20) return token;
    return `${token.slice(0, 10)}...${token.slice(-6)}`;
  };

  if (isLoading) {
    return (
      <Section spacing="md">
        <Container maxWidth="lg">
          <div className="flex items-center justify-center min-h-[50vh]">
            <Loader size="lg" />
          </div>
        </Container>
      </Section>
    );
  }

  if (error || !user) {
    return (
      <Section spacing="md">
        <Container maxWidth="lg">
          <div className="flex flex-col items-center justify-center min-h-[50vh]">
            <h1 className="text-2xl font-bold text-gray-900 mb-4" style={{ fontFamily: 'var(--font-serif)' }}>
              Unable to load dashboard
            </h1>
            <p className="text-gray-600 mb-6">{error || 'User data not available'}</p>
            <Button onClick={handleLogout}>Return to Login</Button>
          </div>
        </Container>
      </Section>
    );
  }

  return (
    <Section spacing="md">
      <Container maxWidth="lg">
        <div className="py-8 md:py-12">
          <div className="mb-10">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2" style={{ fontFamily: 'var(--font-serif)' }}>
              Welcome back, {user.name}
            </h1>
            <p className="text-gray-600">
              Here is your account overview and authentication status.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card className="p-6">
              <div className="flex items-center gap-4">
                <div className="h-12 w-12 rounded-full bg-primary-50 text-primary-600 flex items-center justify-center flex-shrink-0">
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.25h15a1.5 1.5 0 001.5-1.5V19.5a6 6 0 00-6-6h-9a6 6 0 00-6 6v.75a1.5 1.5 0 001.5 1.5z" />
                  </svg>
                </div>
                <div className="min-w-0">
                  <p className="text-sm text-gray-500 mb-1">Full Name</p>
                  <p className="text-lg font-semibold text-gray-900 truncate">{user.name}</p>
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <div className="flex items-center gap-4">
                <div className="h-12 w-12 rounded-full bg-primary-50 text-primary-600 flex items-center justify-center flex-shrink-0">
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                  </svg>
                </div>
                <div className="min-w-0">
                  <p className="text-sm text-gray-500 mb-1">Email</p>
                  <p className="text-lg font-semibold text-gray-900 truncate">{user.email}</p>
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <div className="flex items-center gap-4">
                <div className="h-12 w-12 rounded-full bg-green-50 text-green-600 flex items-center justify-center flex-shrink-0">
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <p className="text-sm text-gray-500 mb-1">Status</p>
                  <Badge variant="success" className="text-sm">Authenticated</Badge>
                </div>
              </div>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            <Card className="p-6 md:p-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-1" style={{ fontFamily: 'var(--font-serif)' }}>
                Account Information
              </h2>
              <p className="text-gray-600 text-sm mb-6">
                Your account is active and you have full access to the dashboard.
              </p>
              <div className="space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 sm:gap-4">
                  <span className="text-sm text-gray-500">User ID</span>
                  <span className="text-sm font-mono text-gray-900 break-all">{user.id}</span>
                </div>
                <div className="h-px bg-gray-100" />
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 sm:gap-4">
                  <span className="text-sm text-gray-500">Email</span>
                  <span className="text-sm text-gray-900 break-all">{user.email}</span>
                </div>
                <div className="h-px bg-gray-100" />
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 sm:gap-4">
                  <span className="text-sm text-gray-500">Account Status</span>
                  <Badge variant="success">Active</Badge>
                </div>
                <div className="h-px bg-gray-100" />
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 sm:gap-4">
                  <span className="text-sm text-gray-500">Authentication Method</span>
                  <span className="text-sm text-gray-900">JWT + Refresh Token</span>
                </div>
              </div>
            </Card>

            <Card className="p-6 md:p-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-1" style={{ fontFamily: 'var(--font-serif)' }}>
                Authentication Status
              </h2>
              <p className="text-gray-600 text-sm mb-6">
                Your session is active and tokens are valid.
              </p>
              <div className="space-y-4">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-gray-500">Access Token</span>
                    <Badge variant="success">Valid</Badge>
                  </div>
                  <div className="p-3 bg-gray-50 rounded-lg border border-gray-200">
                    <code className="text-xs text-gray-700 break-all">{maskToken(accessToken)}</code>
                  </div>
                </div>
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-gray-500">Refresh Token</span>
                    <Badge variant="success">Valid</Badge>
                  </div>
                  <div className="p-3 bg-gray-50 rounded-lg border border-gray-200">
                    <code className="text-xs text-gray-700 break-all">{maskToken(refreshToken)}</code>
                  </div>
                </div>
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-gray-500">Session</span>
                    <Badge variant="success">Active</Badge>
                  </div>
                  <div className="p-3 bg-green-50 rounded-lg border border-green-200">
                    <p className="text-xs text-green-700">
                      Your session is active. Access tokens will auto-refresh when expired.
                    </p>
                  </div>
                </div>
              </div>
            </Card>
          </div>

          <Card className="p-6 md:p-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-1" style={{ fontFamily: 'var(--font-serif)' }}>
              Quick Actions
            </h2>
            <p className="text-gray-600 text-sm mb-6">
              Manage your session and navigation.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button variant="outline" onClick={handleLogout} className="flex-1 sm:flex-none">
                Logout
              </Button>
              <Button onClick={() => navigate(ROUTES.HOME)} className="flex-1 sm:flex-none">
                Return to Home
              </Button>
            </div>
          </Card>
        </div>
      </Container>
    </Section>
  );
}

export default DashboardPage;