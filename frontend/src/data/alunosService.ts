import type { Aluno } from '../types/Aluno';

// O array em memória agora é tipado como Aluno[]
let alunos: Aluno[] = [
  { 
    id: 1, 
    nome: "Fulano de Tal da Silva Azevedo Neto", 
    endereco: "Rua Exemplo", 
    responsavelNome: "Fulana de Tal Montenegro Light da Silva",
    turno: "integral",
    tipo: "ida e volta",
    formaPagamento: "pix",
    escola: "Colégio Pinheiros Natal"
  },

];
let nextId = 2;

export const AlunosService = {
  // READ (LISTAR TUDO): Retorna um array de Aluno
  listar: (): Aluno[] => alunos,

  // READ (DETALHAR UM): Recebe string (params da rota) ou number, retorna Aluno ou undefined
  detalhar: (id: string | number): Aluno | undefined => {
    return alunos.find(aluno => aluno.id === Number(id));
  },

  // CREATE (INSERIR): Recebe um objeto parcial de Aluno
  inserir: (alunoData: Omit<Aluno, 'id'>): void => {
    const novoAluno: Aluno = { 
      ...alunoData as Aluno, // Omitimos o ID na entrada, mas adicionamos aqui
      id: nextId++,
    };
    alunos.push(novoAluno);
  },

  // UPDATE (ATUALIZAR): Recebe um objeto com o ID obrigatório
  atualizar: (alunoAtualizado: Partial<Aluno> & { id: number }): void => {
    const index = alunos.findIndex(a => a.id === alunoAtualizado.id);
    if (index !== -1) {
      // Mescla os dados existentes com os novos
      alunos[index] = { ...alunos[index], ...alunoAtualizado } as Aluno;
    }
  },

  // DELETE (REMOVER): Remove um aluno pelo ID
  remover: (id: number): boolean => {
    const index = alunos.findIndex(a => a.id === id);
    if (index !== -1) {
      alunos.splice(index, 1);
      return true;
    }
    return false;
  }
};