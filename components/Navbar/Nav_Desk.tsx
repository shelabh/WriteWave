'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { supabase } from '@/lib/supabaseClient'; // Supabase client

// Define the User type to handle cases where email might be undefined
type User = {
  email: string | null;
};

const Nav_Desk = () => {
  const [user, setUser] = useState<User | null>(null);

  // Fetch the user's session to check if they are logged in
  useEffect(() => {
    const fetchUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      
      // Set user if session exists, handling possible undefined email
      if (session?.user) {
        setUser({ email: session.user.email ?? null });
      } else {
        setUser(null);
      }
    };

    fetchUser();
  }, []);

  return (
    <div className="flex max-w-7xl mx-auto flex-row justify-between items-center py-5 px-10">
      <Link href="/">
        <div className="text-2xl font-bold cursor-pointer">Write Wave</div>
      </Link>

      <div className="flex flex-row items-center gap-5">
        <Link href="/write">
          <div className="cursor-pointer">Write</div>
        </Link>
        <Link href="/blogs">
          <div className="cursor-pointer">Blogs</div>
        </Link>
      </div>

      {user ? (
        // Show the dashboard link if the user is logged in
        <Link href="/dashboard">
          <div className="cursor-pointer">Dashboard</div>
        </Link>
      ) : (
        // Show the sign-up link if the user is not logged in
        <Link href="/signup">
          <div className="cursor-pointer">Sign Up</div>
        </Link>
      )}
    </div>
  );
};

export default Nav_Desk;
