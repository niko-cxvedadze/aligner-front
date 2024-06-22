import { useSetAtom } from "jotai";
import { authTokenAtom } from "./GlobalProvider";
import { useAuth } from "@clerk/clerk-react";
import { PropsWithChildren, useEffect } from "react";
import { privateAxios } from "@/utils/privateAxios.ts";

export function AuthProvider({ children }: PropsWithChildren) {
  const setAuthToken = useSetAtom(authTokenAtom);
  const { isLoaded, isSignedIn, getToken } = useAuth();

  async function fetchToken() {
    const token = await getToken({ template: "basic-token-v1" });
    setAuthToken(token);
    console.log("Token fetched: ", token);
    privateAxios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  }

  useEffect(() => {
    if (isLoaded && isSignedIn) {
      fetchToken();
    }
  }, [isLoaded, isSignedIn]);

  return <>{children}</>;
}