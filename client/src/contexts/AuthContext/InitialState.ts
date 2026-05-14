import { LocalStorageWrapper } from "@/utils/LocalStorage";
import type { AuthContextState } from "./types";
import { isUser } from "@/utils/typeGuards";

export const getOldAuthData = (): AuthContextState => {
  const savedUser = LocalStorageWrapper.get('user');
  const savedToken = LocalStorageWrapper.get('auth_token');


  // Se faltar algum dado, retorna estado não autenticado
  if (!savedUser || !savedToken) {
    return {
      isAuthenticated: false,
      user: undefined,
      isLoading: false
    };
  }

  try {

    // O user era um json então precisa decodificar
    const parsedUser = JSON.parse(savedUser);

    // Valida com type guards
    if (isUser(parsedUser)) {
      return {
        isAuthenticated: true,
        user: parsedUser,
        isLoading: true
      };
    }

    // Se inválido, retorna não autenticado
    return {
      isAuthenticated: false,
      user: undefined,
      isLoading: false
    };
  } catch (e) {
    // Se der erro na decodificação ou parse, também não autentica
    return {
      isAuthenticated: false,
      user: undefined,
      isLoading: false
    };
  }
};
