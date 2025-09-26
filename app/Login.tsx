'use client';

import { useAuth } from './AuthContext';

export default function Login() {
  const { signIn } = useAuth();

  return (
    <div>
      <button onClick={signIn}>Sign in</button>
    </div>
  );
}