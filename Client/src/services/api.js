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

export async function AdminDeleteTestimony(id) {
  const { data, error } = await supabase
    .from("testimonials")
    .delete()
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

export async function CreateTestimonial(testimonial) {
  const { data: statusData, error: statusError } = await supabase
    .from("status")
    .select("id")
    .eq("name", "draft")
    .single();

  if (statusError || !statusData?.id) {
    console.error("Error fetching draft status:", statusError?.message);
    throw new Error("Draft status not found");
  }

  const payload = {
    full_name: testimonial.name,
    email: testimonial.email,
    profession: testimonial.profession || "Student",
    country: testimonial.country || "",
    message: testimonial.text,
    status: statusData.id,
  };

  const { data, error } = await supabase
    .from("testimonials")
    .insert([payload])

  if (error) {
    console.error("Error creating testimonial:", error);
    throw error;
  }

  return data;
}