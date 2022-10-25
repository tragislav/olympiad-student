export function catchError(errorText) {
  switch (errorText) {
    case "Пользователь с таким логином уже существует.":
      return { name: "username", text: "Имя пользователя занято" };
    case "Пользователь с таким email уже существует.":
      return { name: "email", text: "Введённый email занят" };
    case "Логин должен состоять только из латинских букв.":
      return { name: "username", text: "Только латинские буквы" };
    case "Пароль должен состоять только из латинских букв.":
      return { name: "password", text: "Только латинские буквы" };
    default:
      return;
  }
}
