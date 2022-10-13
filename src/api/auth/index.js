import { api } from "..";

export function authByUsername(username, password) {
  return api.get(`/api/users/username?username=${username}`, {
    auth: {
      username: username,
      password: password,
    },
  });
}

export function userRegistration(email, username, password) {
  return api.post(`/api/users/registration`, {
    email: email,
    username: username,
    password: password,
    roles: [
      {
        id: 1,
        name: "ROLE_USER",
      },
    ],
  });
}
