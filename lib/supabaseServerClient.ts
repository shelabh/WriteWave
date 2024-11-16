// lib/supabaseServerClient.ts
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers'; // Required to access cookies in server-side components

export const supabaseServerClient = () => createServerComponentClient({
  cookies, // Pass cookies to manage sessions on the server
});
