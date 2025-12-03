import { createBrowserRouter } from "react-router";
import Root from "./routes/Root";
import AlunosRoot from "./routes/AlunosRoot";
import CadastroAluno from "./routes/CadastroAluno";
import { AlunosService } from "./data/alunosService";

async function cadastroAlunoAction({ request }: { request: Request }) {
  if (request.method === "POST") {
    const formData = await request.formData();
    
    const novoAluno = {
      nome: formData.get("nome") as string,
      responsavelNome: formData.get("responsavelNome") as string,
      endereco: formData.get("endereco") as string,
      turno: formData.get("turno") as string,
      tipo: formData.get("tipo") as string,
      formaPagamento: formData.get("formaPagamento") as string,
      escola: formData.get("escola") as string,
    };

    // Insere o aluno no service
    AlunosService.inserir(novoAluno);

    // Redireciona para a lista de alunos
    return new Response(null, {
      status: 302,
      headers: { Location: "/alunos/" },
    });
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
      },
      {
        path: "alunos/cadastro",
        Component: CadastroAluno,
        action: cadastroAlunoAction,
      },
    ],
  },
]);
