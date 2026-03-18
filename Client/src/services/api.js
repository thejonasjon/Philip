import { supabase } from "../supabaseClient";

export { supabase };

export async function FetchStatus() {
  const { data, error } = await supabase.from("status").select("id, name");
  if (error) {
    console.error("Error fetching status", error.message);
    throw error;
  }
  return data;
}

export async function FetchTestimonies() {
  const { data, error } = await supabase
    .from("testimonials")
    .select(`
      id,
      full_name,
      email,
      profession,
      country,
      message,
      status(name),
      created_at
    `);

  if (error) {
    console.error("Error fetching testimonials:", error.message);
    throw error;
  }

  return data;
}

export async function AdminFetchTestimonies() {
  const { data, error } = await supabase
    .from("testimonials")
    .select(`id, full_name, email, profession, country, message, status(id, name)`);

  if (error) {
    console.error("Error fetching testimonials", error.message);
    throw error;
  }

  return data;
}

export async function AdminUpdateTestimony(id, updates) {
  const { data, error } = await supabase
    .from("testimonials")
    .update(updates)
    .eq("id", id)
    .select(`
      id,
      full_name,
      email,
      profession,
      country,
      message,
      created_at,
      status(id, name)
    `)
    .single();

  if (error) throw error;
  return data;
}

export async function adminLogin(email, password) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    console.error("Unable to login", error.message);
    throw error;
  }
  return data;
}