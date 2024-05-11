import { supabase } from "./config";

export const signUp = async (data) => {
  const { user, error } = await supabase.auth.signUp({
    email: data.email,
    password: data.password,
  });

  if (error) {
    return { status: false, error };
  } else {
    return { status: true, user };
  }
};

export const signIn = async (datas) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email: datas.email,
    password: datas.password,
  });

  if (error) {
    return { status: false, error };
  } else {
    return { status: true, data };
  }
};
