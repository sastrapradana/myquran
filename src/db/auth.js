import { supabase } from "./config";

export const signUp = async (data) => {
  console.log({ data });
  const { user, error } = await supabase.auth.signUp({
    email: data.email,
    password: data.password,
  });

  if (error) {
    return { status: false, error };
  } else {
    console.log({ user });
    return { status: true };
  }
};

export const signIn = async (datas) => {
  console.log({ datas });
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
