'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { useRouter } from 'next/navigation';

type User = {
  email: string | null;
};

export default function Dashboard() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchUser = async () => {
      // Fetch the authenticated user's session
      const { data: { session } } = await supabase.auth.getSession();

      if (session?.user) {
        // Set the user's email or fallback to null if undefined
        setUser({ email: session.user.email ?? null });
      } else {
        // If no user is found, redirect to the login page
        router.push('/login');
      }

      setLoading(false);
    };

    fetchUser();
  }, [router]);

  if (loading) {
    return <p>Loading...</p>; // Show a loading indicator while fetching the session
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold">Dashboard</h1>
      {user ? (
        <div className="mt-4">
          <p className="text-lg">Welcome, {user.email || 'Unknown User'}!</p>
        </div>
      ) : (
        <p>Redirecting...</p>
      )}
    </div>
  );
}
