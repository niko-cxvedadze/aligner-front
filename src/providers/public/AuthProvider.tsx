import { useSetAtom } from "jotai";
import { authTokenAtom } from "./GlobalProvider";
import { useAuth } from "@clerk/clerk-react";
import { PropsWithChildren, useEffect, useState } from "react";
import { privateAxios } from "@/utils/privateAxios.ts";

export function AuthProvider({ children }: PropsWithChildren) {
  const [loading, setLoading] = useState(true);
  const setAuthToken = useSetAtom(authTokenAtom);
  const { isLoaded, isSignedIn, getToken } = useAuth();

  async function fetchToken() {
    try {
      const token = await getToken({ template: "basic-token-v1" });
      console.log(token);
      setAuthToken(token);
      privateAxios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (isLoaded && isSignedIn) {
      fetchToken();
    } else if (isLoaded && !isSignedIn) {
      setLoading(false);
    }
  }, [isLoaded, isSignedIn]);

  if (loading) return <></>;

  return <>{children}</>;
}
