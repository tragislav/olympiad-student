import { api } from "..";

export function postEnrolliesData(username, password, enrolliesData) {
  return api.post("/api/enrollies", enrolliesData, {
    auth: {
      username: username,
      password: password,
    },
  });
}
