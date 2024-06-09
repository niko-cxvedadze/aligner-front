import { Routes, Route } from "react-router-dom";
import { AuthLayout } from "./layout/AuthLayout";
import { SignIn, SignUp, useAuth } from "@clerk/clerk-react";

export default function App() {
  const { isSignedIn } = useAuth();

  return (
    <Routes>
      {!isSignedIn && (
        <Route path="/auth/*" element={<AuthLayout />}>
          <Route path="sign-in" element={<SignIn signUpUrl="sign-up" />} />
          <Route path="sign-up" element={<SignUp signInUrl="sign-in" />} />
        </Route>
      )}
    </Routes>
  );
}
