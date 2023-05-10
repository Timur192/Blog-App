const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

export default async function getPosts() {
  const res = await fetch(
    `${SUPABASE_URL}/rest/v1/posts?apikey=${SUPABASE_ANON_KEY}`,
    { cache: "no-store" }
  );

  return res.json();
}
