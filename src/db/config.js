import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://alejffgiefcdkraslgau.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFsZWpmZmdpZWZjZGtyYXNsZ2F1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTUyNTc4NjAsImV4cCI6MjAzMDgzMzg2MH0.tRW1Vw-4ZUo2SkgwDqn-y0cRngPg9T0d9FQBwoQh2zQ";

export const supabase = createClient(supabaseUrl, supabaseKey);
