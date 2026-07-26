import { createClient } from '@supabase/supabase-js'

const supabase = createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_ANON_KEY!)

// Sign an agent into the support console.
export async function signInAgent(email: string, password: string) {
  const { user, error } = await supabase.auth.signIn({ email, password })
  if (error) throw error
  return user
}

// Read the currently signed-in agent's session on the server.
export function currentSession() {
  return supabase.auth.session()
}
