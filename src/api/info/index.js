import { api } from "..";

export function getAllSpecialties(username, password) {
  return api.get("/api/specialities", {
    auth: {
      username: username,
      password: password,
    },
  });
}
