import type { Aluno } from "../types/Aluno";

/**
 * Mapeia dados da API (snake_case) para o tipo Aluno do frontend (camelCase)
 */
export function mapApiToAluno(apiData: any): Aluno {
  return {
    id: apiData.id,
    nome: apiData.nome,
    endereco: apiData.endereco,
    responsavelNome: apiData.responsavel_nome,
    turno: apiData.turno,
    tipo: apiData.tipo,
    formaPagamento: apiData.forma_pagamento,
    escola: apiData.escola,
  };
}

/**
 * Mapeia dados do frontend (camelCase) para o formato que a API espera (snake_case)
 */
export function mapAlunoToApi(aluno: Partial<Aluno>): any {
  return {
    nome: aluno.nome,
    responsavel_nome: aluno.responsavelNome,
    endereco: aluno.endereco,
    turno: aluno.turno,
    tipo: aluno.tipo,
    forma_pagamento: aluno.formaPagamento,
    escola: aluno.escola,
  };
}
