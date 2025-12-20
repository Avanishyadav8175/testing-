import { getSession, signIn as nextAuthSignIn, signOut as nextAuthSignOut } from 'next-auth/react';

export async function getUser() {
  if (typeof window === 'undefined') {
    const { getServerSession } = await import('next-auth');
    const { authOptions } = await import('./auth-options');
    const session = await getServerSession(authOptions);
    return session?.user;
  } else {
    const session = await getSession();
    return session?.user;
  }
}

export async function getSessionUser() {
  return getUser();
}

export const signIn = nextAuthSignIn;
export const signOut = nextAuthSignOut;
