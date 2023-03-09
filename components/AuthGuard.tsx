import { useRouter } from "next/router";
import { useAuth } from "../context/AuthContext";

export function AuthGuard({ children }: { children: JSX.Element }) {
  const { currentUser } = useAuth();

  if (currentUser) {
    return <>{children}</>;
  }

  return null;
}
