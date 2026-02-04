import { createBrowserRouter, Navigate } from "react-router";
import AppLayout from "./routes/AppLayout";
import Root from "./routes/Root";
import AlunosRoot from "./routes/AlunosRoot";
import CadastroAluno from "./routes/CadastroAluno";
import Login from "./routes/Login";
import Register from "./routes/Register";
import ProtectedRoute from "./components/ProtectedRoute";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: AppLayout,
    children: [
      {
        path: "login",
        Component: Login,
      },
      {
        path: "register",
        Component: Register,
      },
      {
        path: "/",
        Component: Root,
        children: [
          {
            index: true,
            element: <Navigate to="/alunos/" replace />,
          },
          {
            path: "alunos/",
            element: (
              <ProtectedRoute>
                <AlunosRoot />
              </ProtectedRoute>
            ),
          },
          {
            path: "alunos/cadastro",
            element: (
              <ProtectedRoute>
                <CadastroAluno />
              </ProtectedRoute>
            ),
          },
        ],
      },
    ],
  },
]);
