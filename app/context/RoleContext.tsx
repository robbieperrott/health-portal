'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useAuth } from './AuthContext';
import { Role } from '../types';

interface RoleContext {
  role: Role | null;
  setRole: (role: Role) => void;
}

const RoleContext = createContext<RoleContext | undefined>(undefined);

interface RoleProviderProps {
  children: ReactNode;
}

export function RoleProvider({ children }: RoleProviderProps) {
  const [role, setRoleState] = useState<Role | null>(null);

  const { user } = useAuth();

  useEffect(() => {
    if (user) {
        const storedRole = localStorage.getItem(user.uid) as Role | null;
        if (storedRole === 'patient' || storedRole === 'clinician') {
            setRoleState(storedRole);
        }
    }
  }, [user]);

  const setRole = (newRole: Role) => {
    if (user) {
        setRoleState(newRole);
        localStorage.setItem(user.uid, newRole);
    }
  };

  return (
    <RoleContext.Provider value={{ role, setRole }}>
      {children}
    </RoleContext.Provider>
  );
};

export function useRole(): RoleContext {
  const context = useContext(RoleContext);
  if (!context) {
    throw new Error('useRole must be used within a RoleProvider');
  }
  return context;
};
