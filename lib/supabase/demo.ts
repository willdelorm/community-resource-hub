import { createClient } from "./server";

export async function isDemoUser(): Promise<boolean> {
  const demoEmail = process.env.DEMO_ACCOUNT_EMAIL;
  if (!demoEmail) return false;
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  return user?.email === demoEmail;
}
