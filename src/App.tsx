import {AuthLayout} from "./layout/AuthLayout";
import {Routes, Route, Navigate} from "react-router-dom";
import {SignIn, SignUp, useAuth} from "@clerk/clerk-react";
import {useEffect} from "react";

export default function App() {
    const {isSignedIn, isLoaded, getToken} = useAuth();

    useEffect(() => {
        (async () => {
            const token = await getToken({template: "basic-token-v1"})
            console.log(token);
        })()
    }, []);


    return (
        <Routes>
            {!isSignedIn && isLoaded && (
                <Route element={<AuthLayout/>}>
                    <Route path="sign-in" element={<SignIn signUpUrl="sign-up"/>}/>
                    <Route path="sign-up" element={<SignUp signInUrl="sign-in"/>}/>
                    <Route path="*" element={<Navigate to="/sign-in"/>}/>
                </Route>
            )}
        </Routes>
    );
}
