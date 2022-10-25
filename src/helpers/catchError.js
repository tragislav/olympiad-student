export function catchError(errorText) {
  switch (errorText) {
    case "Пользователь с таким логином уже существует.":
      return "username";
    case "Пользователь с таким email уже существует.":
      return "email";
    case "HTTP Status 401 - Index: 0, Size: 0\r\n":
      return "activate";
    default:
      return;
  }
}
