'use client';

import { Button } from '@/components/ui/button';
import { useAuth } from '../context/AuthContext';

export default function Login() {
  const { signIn } = useAuth();

  return (
    <Button onClick={signIn}>Sign in</Button>
  );
}