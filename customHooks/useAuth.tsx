import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  User,
} from 'firebase/auth';

import { useRouter } from 'next/router';
import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { auth } from '../firebase';

interface IAuth {
  user: User | null;
  //https://bobbyhadz.com/blog/typescript-did-you-forget-to-include-void-in-argument-promise
  signUp: (email: string, password: string) => Promise<void>;
  signIn: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  error: string | null;
  loading: boolean;
}

// https://stackoverflow.com/questions/71788254/react-18-typescript-children-fc
interface AuthProviderProps {
  children: React.ReactNode;
}

// create context
const AuthContext = createContext<IAuth>({
  user: null,
  signUp: async () => {},
  signIn: async () => {},
  logout: async () => {},
  error: null,
  loading: false,
});

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [user, setUser] = useState<User | null>(null);
  const [initialLoading, setInitialLoading] = useState(true);
  const router = useRouter();

  //* useEffect to store user (persist)
  useEffect(
    () =>
      onAuthStateChanged(auth, (user) => {
        if (user) {
          // logged in...
          setUser(user);
          setLoading(false);
        } else {
          // not logged in...
          // if no user pushes user to login page
          setUser(null);
          setLoading(true);
          router.push('/login');
        }

        setInitialLoading(false);
      }),
    [auth]
  );

  //* Note: Signup function

  const signUp = async (email: string, password: string) => {
    setLoading(true);

    // creates a new user account with the passed in email and password
    await createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        setUser(userCredential.user);
        router.push('/');
        setLoading(false);
      })
      .catch((error) => alert(error.message))
      // if error make sure setLoading is back to false
      .finally(() => setLoading(false));
  };

  //* Note: signIn function

  const signIn = async (email: string, password: string) => {
    setLoading(true);

    await signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        setUser(userCredential.user);
        router.push('/');
        setLoading(false);
      })
      .catch((error) => alert('Invalid login details'))
      .finally(() => setLoading(false));
  };

  //* Note: logout function

  const logout = async () => {
    setLoading(true);

    signOut(auth)
      .then(() => {
        // sets user to null
        setUser(null);
      })
      .catch((error) => alert(error.message))
      .finally(() => setLoading(false));
  };

  // https://blog.agney.dev/useMemo-inside-context/
  // will only recompute the memoized value when user or loading have changed
  const memoValue = useMemo(
    () => ({ user, signUp, signIn, loading, logout, error }),
    [user, loading]
  );

  return (
    <AuthContext.Provider value={memoValue}>
      {!initialLoading && children}
    </AuthContext.Provider>
  );
};

// exporting hook directly instead of the context
export default function useAuth() {
  return useContext(AuthContext);
}
