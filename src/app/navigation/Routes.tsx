import { Suspense, lazy } from 'react';
import { Route, Routes as Switch } from 'react-router-dom';
import { LoadingTemplate } from '@app/modules/common';

import { AuthGuard } from './AuthGuard';
import { UnAuthGuard } from './UnAuthGuard';
import { AuthLayout } from '../components/AuthLayout';

const RegisterRoute = lazy(() => import('@app/modules/user/pages/register.page'));
const LoginRoute = lazy(() => import('@app/modules/user/pages/login.page'));
const NotFoundRoute = lazy(() => import('@app/modules/common/templates/not-found.template'));
const DashboardRoute = lazy(() => import('@app/modules/dashboard/dashboard.page'));
const ReferalRoute = lazy(() => import('@app/modules/referal/referal.page'));

export const Routes = () => (
  <Switch>
    <Route path="/" element={<AuthLayout />}>
      <Route
        path="/"
        element={
          <UnAuthGuard>
            <Suspense fallback={<LoadingTemplate />}>
              <LoginRoute />
            </Suspense>
          </UnAuthGuard>
        }
      />
      <Route
        path="*"
        element={
          <Suspense fallback={<LoadingTemplate />}>
            <NotFoundRoute />
          </Suspense>
        }
      />
    </Route>
    <Route
      path="/register"
      element={
        <UnAuthGuard>
          <Suspense fallback={<LoadingTemplate />}>
            <RegisterRoute />
          </Suspense>
        </UnAuthGuard>
      }
    />
    <Route
      path="/dashboard"
      element={
        <AuthGuard>
          <Suspense fallback={<LoadingTemplate />}>
            <DashboardRoute />
          </Suspense>
        </AuthGuard>
      }
    />

    <Route
      path="/referal"
      element={
        <AuthGuard>
          <Suspense fallback={<LoadingTemplate />}>
            <ReferalRoute />
          </Suspense>
        </AuthGuard>
      }
    />
  </Switch>
);
