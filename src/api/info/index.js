import { api } from "..";

export function getAllSpecialties(username, password) {
  return api.get("/api/specialities", {
    auth: {
      username: username,
      password: password,
    },
  });
}

export function getEducationEstablishments(username, password) {
  return api.get("/api/educational_establishments", {
    auth: {
      username: username,
      password: password,
    },
  });
}
