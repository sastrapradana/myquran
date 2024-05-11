import { supabase } from "./config";

export const getItemsQuery = async (nameTable, eq1, eq2) => {
  const { data, error } = await supabase.from(nameTable).select().eq(eq1, eq2);

  if (error) {
    console.log({ error });
  } else {
    return data;
  }
};

export const deleteItemsQuery = async (nameTable, eq1, eq2) => {
  const { error } = await supabase.from(nameTable).delete().eq(eq1, eq2);

  if (error) {
    console.log({ error });
  }
};

export const insertItemsQuery = async (nameTable, data) => {
  const { error } = await supabase.from(nameTable).insert(data);

  if (error) {
    console.log({ error });
  }
};
