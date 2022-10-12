import { api } from "..";

export function getByUsername(username, password) {
  return api.get(`/api/users?username=${username}`, {
    auth: {
      username: username,
      password: password,
    },
  });
}
