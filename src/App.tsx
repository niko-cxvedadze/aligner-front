import { Routes, Route, Navigate } from "react-router-dom";
import { SignIn, SignUp, useAuth } from "@clerk/clerk-react";

import { AuthLayout } from "./layout/AuthLayout";
import { MainLayout } from "@/layout/MainLayout";

// views
import { HomeView } from "./views/HomeView";
import { WorkspaceView } from "@/views/WorkspaceView";
import { PrivateProviders } from "@/providers/private/PrivateProviders.tsx";

export default function App() {
  const { isSignedIn, isLoaded } = useAuth();

  return (
    <Routes>
      {!isSignedIn && isLoaded && (
        <Route element={<AuthLayout />}>
          <Route path="sign-in" element={<SignIn signUpUrl="sign-up" />} />
          <Route path="sign-up" element={<SignUp signInUrl="sign-in" />} />
          <Route path="*" element={<Navigate to="/sign-in" />} />
        </Route>
      )}
      {isSignedIn && isLoaded && (
        <Route
          element={
            <PrivateProviders>
              <MainLayout />
            </PrivateProviders>
          }
        >
          <Route path="/" element={<HomeView />} />
          <Route
            path={"/workspace/:workspaceId/*"}
            element={<WorkspaceView />}
          />
          <Route path="*" element={<Navigate to="/" />} />
        </Route>
      )}
    </Routes>
  );
}
