import crypto from "crypto";

export const nameInitials = (name: string) => {
  let res = name?.split(" ");

  let initial = res?.map((i) => {
    return i?.charAt(0)?.toUpperCase();
  });

  return initial?.join("");
};

export const createChecksum = (data: string) => {
  const hash = crypto.createHash("sha256");
  hash.update(data);

  return hash.digest("hex");
};
