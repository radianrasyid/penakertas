export const nameInitials = (name: string) => {
  let res = name?.split(" ");

  let initial = res?.map((i) => {
    return i?.charAt(0)?.toUpperCase();
  });

  return initial?.join("");
};
