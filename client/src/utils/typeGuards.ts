import type { UserAccount } from "@/types/UserAccount";

export function isApiError(error: any): error is any {
  // 1. Verifica se é um erro do Axios com resposta do servidor
  const data = error?.response?.data;

  // 2. Valida se o corpo da resposta tem o formato que sua API usa
  return (
    typeof data === "object" &&
    data !== null &&
    "success" in data &&
    data.success === false &&
    "message" in data
  );
}

export function isUser(obj: unknown): obj is UserAccount {
  if (typeof obj !== "object" || obj === null) return false;

  const o = obj as Record<string, unknown>;

  // Validar campos básicos
  if (
    typeof o.id !== "number" ||
    typeof o.name !== "string" ||
    typeof o.email !== "string" ||
    typeof o.cpf !== "string"
  ) {
    return false;
  }

  return true;
}
