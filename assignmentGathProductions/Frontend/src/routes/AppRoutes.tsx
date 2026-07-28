import { lazy, Suspense } from 'react';
import { createBrowserRouter } from 'react-router-dom';
import MainLayout from '@/layouts/MainLayout';
import AuthLayout from '@/layouts/AuthLayout';
import ProtectedRoute from './ProtectedRoute';
import { ROUTES } from '@/types/routes';

const LandingPage = lazy(() => import('@/pages/Landing/Landing'));
const LoginPage = lazy(() => import('@/pages/Login/Login'));
const SignupPage = lazy(() => import('@/pages/Signup/Signup'));
const DashboardPage = lazy(() => import('@/pages/Dashboard/Dashboard'));
const NotFoundPage = lazy(() => import('@/pages/NotFound/NotFound'));

function LoadingFallback() {
  return (
    <div className="flex items-center justify-center min-h-screen" role="status" aria-label="Loading page">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
    </div>
  );
}

export const router = createBrowserRouter([
  {
    path: ROUTES.HOME,
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: (
          <Suspense fallback={<LoadingFallback />}>
            <LandingPage />
          </Suspense>
        ),
      },
    ],
  },
  {
    path: ROUTES.LOGIN,
    element: <AuthLayout />,
    children: [
      {
        index: true,
        element: (
          <Suspense fallback={<LoadingFallback />}>
            <LoginPage />
          </Suspense>
        ),
      },
    ],
  },
  {
    path: ROUTES.SIGNUP,
    element: <AuthLayout />,
    children: [
      {
        index: true,
        element: (
          <Suspense fallback={<LoadingFallback />}>
            <SignupPage />
          </Suspense>
        ),
      },
    ],
  },
  {
    path: ROUTES.DASHBOARD,
    element: (
      <ProtectedRoute>
        <MainLayout />
      </ProtectedRoute>
    ),
    children: [
      {
        index: true,
        element: (
          <Suspense fallback={<LoadingFallback />}>
            <DashboardPage />
          </Suspense>
        ),
      },
    ],
  },
  {
    path: ROUTES.NOT_FOUND,
    element: (
      <Suspense fallback={<LoadingFallback />}>
        <NotFoundPage />
      </Suspense>
    ),
  },
]);
