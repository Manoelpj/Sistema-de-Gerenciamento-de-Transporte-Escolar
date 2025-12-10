import { createBrowserRouter } from "react-router";
import Root from "./routes/Root";
import AlunosRoot from "./routes/AlunosRoot";
import CadastroAluno from "./routes/CadastroAluno";
import { mapApiToAluno } from "./utils/alunoMapper";

const API_URL = "http://localhost:8000/api";

export async function alunosLoader() {
  try {
    const response = await fetch(`${API_URL}/alunos/`);
    if (!response.ok) throw new Error("Erro ao carregar alunos");
    const data = await response.json();
    // Mapear todos os alunos da API para o formato do frontend
    const mapped = Array.isArray(data) ? data.map(mapApiToAluno) : [];
    return mapped;
  } catch (error) {
    console.error("Erro ao carregar alunos:", error);
    return [];
  }
}

async function cadastroAlunoAction({ request }: { request: Request }) {
  if (request.method === "POST") {
    const formData = await request.formData();
    
    const novoAluno = {
      nome: formData.get("nome") as string,
      responsavel_nome: formData.get("responsavelNome") as string,
      endereco: formData.get("endereco") as string,
      turno: formData.get("turno") as string,
      tipo: formData.get("tipo") as string,
      forma_pagamento: formData.get("formaPagamento") as string,
      escola: formData.get("escola") as string,
    };

    try {
      const response = await fetch(`${API_URL}/alunos/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(novoAluno),
      });

      if (!response.ok) {
        throw new Error("Erro ao criar aluno");
      }

      return new Response(null, {
        status: 302,
        headers: { Location: "/alunos/" },
      });
    } catch (error) {
      console.error("Erro ao criar aluno:", error);
      return new Response("Erro ao criar aluno", { status: 400 });
    }
  }
}

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Root,
    children: [
      {
        path: "alunos/",
        Component: AlunosRoot,
        loader: alunosLoader,
      },
      {
        path: "alunos/cadastro",
        Component: CadastroAluno,
        action: cadastroAlunoAction,
      },
    ],
  },
]);
