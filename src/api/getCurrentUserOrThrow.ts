import { getAuth, User } from "firebase/auth";

export function getCurrentUserOrThrow(): User {
  const auth = getAuth();

  const currentUser = auth.currentUser;

  if (!currentUser) {
    throw new Error("Usuário não está autenticado.");
  }

  return currentUser;
}
