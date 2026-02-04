import { Outlet } from "react-router";
import { AuthProvider } from "../contexts/AuthContext";

export default function AppLayout() {
  return (
    <AuthProvider>
      <Outlet />
    </AuthProvider>
  );
}
