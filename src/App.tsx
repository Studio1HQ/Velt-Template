import { Suspense } from "react";
import { Navigate, Route, Routes, useRoutes } from "react-router-dom";
import routes from "tempo-routes";
import LoginForm from "./components/auth/LoginForm";
import SignUpForm from "./components/auth/SignUpForm";
import Dashboard from "./components/pages/dashboard";
import AnalyticsDashboard from "./components/pages/analytics-dashboard";
import Plans from "./components/pages/plans";
import Success from "./components/pages/success";
import Home from "./components/pages/home";
import { AuthProvider, useAuth } from "./context/AuthContext";
import { VeltComments, VeltCursor, VeltProvider } from "@veltdev/react";
import VeltAuth from "./components/velt/VeltAuth";
import { Toaster } from "sonner";

function PrivateRoute({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return <Navigate to="/" />;
  }

  return <>{children}</>;
}

function AppRoutes() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/signup" element={<SignUpForm />} />
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <VeltAuth />
              <Dashboard />
            </PrivateRoute>
          }
        />
        <Route
          path="/analytics"
          element={
            <PrivateRoute>
              <VeltAuth />
              <AnalyticsDashboard />
            </PrivateRoute>
          }
        />
        <Route
          path="/plans"
          element={
            <PrivateRoute>
              <VeltAuth />
              <Plans />
            </PrivateRoute>
          }
        />
        <Route path="/success" element={<Success />} />
      </Routes>
      {import.meta.env.VITE_TEMPO === "true" && useRoutes(routes)}
    </>
  );
}

function App() {
  return (
    <AuthProvider>
      <Suspense fallback={<p>Loading...</p>}>
      <VeltProvider apiKey={import.meta.env.VITE_VELT_API_KEY}>
          <VeltComments popoverMode={true} popoverTriangleComponent={true} />
          <Toaster position="top-right" richColors />
          <AppRoutes />
        </VeltProvider>
      </Suspense>
    </AuthProvider>
  );
}

export default App;
