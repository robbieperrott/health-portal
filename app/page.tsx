"use client"

import { useAuth } from "./AuthContext";
import Login from "./Login";

export default function Home() {
  const {user, signOut} = useAuth();

  if (!user) {
    return <Login/>
  }

  return (
    <>
      <button onClick={signOut}>Sign out</button>
    </>
  );
}
