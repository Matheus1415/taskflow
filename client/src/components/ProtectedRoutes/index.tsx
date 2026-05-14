import { useAuthContext } from "@/contexts/AuthContext/hook";
import { Navigate, useLocation } from "react-router";

interface ProtectedRouteProps {
  children: React.ReactNode;
  publicRoute?: boolean;
  allowedRoles?: string[];
}

// Rotas que usuários logados NÃO devem acessar
const GUEST_ONLY_ROUTES = [
  "/login",
  "/cadastro",
  "/recuperar-senha",
  "/resetar-senha"
];

export function ProtectedRoutes({
  children,
  publicRoute = false,
}: ProtectedRouteProps) {
  const { state: { isAuthenticated, isLoading } } = useAuthContext();
  const location = useLocation();

  // 1. Loading State: Bloqueia qualquer renderização enquanto verifica a sessão.
  if (isLoading) {
    return null; 
  }

  // 2. Lógica para Usuários Autenticados
  if (isAuthenticated) {
    if (publicRoute && GUEST_ONLY_ROUTES.includes(location.pathname)) {
      return <Navigate to="/" replace />;
    }
    return <>{children}</>;
  }

  // 3. Lógica para Usuários NÃO Autenticados
  if (!isAuthenticated) {
    if (publicRoute) return <>{children}</>;
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  
  // Fallback de segurança
  return null;
}