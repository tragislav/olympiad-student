import { api } from "..";

export function postEnrolleesData(username, password, enrolleesData) {
  return api.post("/api/enrollies", enrolleesData, {
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

export function putUserEnrollee(username, password, enrolleesData) {
  return api.put("/api/enrollies", enrolleesData, {
    auth: {
      username: username,
      password: password,
    },
  });
}
