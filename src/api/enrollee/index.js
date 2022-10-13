import { api } from "..";

export function postEnrolliesData(username, password, enrolliesData) {
  return api.post("/api/enrollies", enrolliesData, {
    auth: {
      username: username,
      password: password,
    },
  });
}

export function getEnrolleeByUsername(username, password) {
  return api.get(`/api/enrollies/username?username=${username}`, {
    auth: {
      username: username,
      password: password,
    },
  });
}
