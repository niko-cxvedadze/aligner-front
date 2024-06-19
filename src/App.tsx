import {Routes, Route, Navigate} from "react-router-dom";
import {SignIn, SignUp, useAuth} from "@clerk/clerk-react";

import {AuthLayout} from "./layout/AuthLayout";
import {MainLayout} from "@/layout/MainLayout.tsx";

// views
import {MainView} from "@/views/MainView";

export default function App() {
    const {isSignedIn, isLoaded} = useAuth();

    return (
        <Routes>
            {!isSignedIn && isLoaded && (
                <Route element={<AuthLayout/>}>
                    <Route path="sign-in" element={<SignIn signUpUrl="sign-up"/>}/>
                    <Route path="sign-up" element={<SignUp signInUrl="sign-in"/>}/>
                    <Route path="*" element={<Navigate to="/sign-in"/>}/>
                </Route>
            )}
            {isSignedIn && isLoaded && (
                <Route element={<MainLayout/>}>
                    <Route path={'/'} element={<MainView/>}/>
                </Route>
            )}
        </Routes>
    );
}
