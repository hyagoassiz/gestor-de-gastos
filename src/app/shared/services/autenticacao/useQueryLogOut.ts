import { UseQueryOptions } from "@tanstack/react-query";
import { getAuth, signOut } from "firebase/auth";

export const KEY_LOG_OUT = "key-log-out" as const;

export function useQueryLogOut(): UseQueryOptions<{ success: boolean }> {
  const logOut: UseQueryOptions<{ success: boolean }> = {
    queryKey: [KEY_LOG_OUT],
    queryFn: () => queryLogOut(),
    refetchOnWindowFocus: false,
  };

  return logOut;
}

const queryLogOut = async (): Promise<{ success: boolean }> => {
  const auth = getAuth();
  try {
    await signOut(auth);
    return { success: true };
  } catch (error) {
    console.error("Erro ao deslogar o usuário:", error);
    throw error;
  }
};
