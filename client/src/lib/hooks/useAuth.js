import { useEffect, useState } from "react";
import useSWR from 'swr';
import { onAuthStateChanged, signInWithPopup, signOut } from "firebase/auth";

import fetcher from "../utils/fetcher";
import { auth, googleProvider } from "../utils/firebase";
import axios from "axios";

const useAuth = () => {
  const [token, setToken] = useState(null);
  const { data: userId, mutate } = useSWR(["/api/auth/me", token], fetcher);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (!!user) {
        const _token = await user.getIdToken();
        axios.defaults.headers.common["Authorization"] = `Bearer ${_token}`;
        setToken(_token);
      } else {
        setToken(null);
        axios.defaults.headers.common["Authorization"] = undefined;
        mutate(false, false);
      }
    });

    return () => {
      unsubscribe();
    }
  }, []);

  const googleSignIn = async () => {
    await signInWithPopup(auth, googleProvider);
  }

  const googleSignOut = async () => {
    await signOut(auth);
  }

  return {
    userId,
    googleSignIn,
    googleSignOut
  };
}

export default useAuth;