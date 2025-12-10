import { useState, useEffect } from "react";
import type { Aluno } from "../../../../types/Aluno";

interface ModalUpdateAlunoProps {
  isOpen: boolean;
  aluno: Aluno;
  onClose: () => void;
  onUpdate: () => void;
}

const API_URL = "http://localhost:8000/api";

export default function ModalUpdateAluno({
  isOpen,
  aluno,
  onClose,
  onUpdate,
}: ModalUpdateAlunoProps) {
  const [formData, setFormData] = useState<Aluno>(aluno);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setFormData(aluno);
    setError(null);
  }, [aluno, isOpen]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    // Mapear dados do frontend para o backend (camelCase -> snake_case)
    const dataToSend = {
      nome: formData.nome,
      responsavel_nome: formData.responsavelNome,
      endereco: formData.endereco,
      turno: formData.turno,
      tipo: formData.tipo,
      forma_pagamento: formData.formaPagamento,
      escola: formData.escola,
    };

    try {
      const response = await fetch(`${API_URL}/alunos/${aluno.id}/`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(dataToSend),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || "Erro ao atualizar aluno");
      }

      onUpdate();
      onClose();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erro desconhecido");
      console.error("Erro ao atualizar:", err);
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-[#294A5A]">Atualizar Aluno</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 text-2xl"
          >
            ×
          </button>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-[#294A5A] mb-1">
              Nome
            </label>
            <input
              type="text"
              name="nome"
              value={formData.nome}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#294A5A]"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-[#294A5A] mb-1">
              Responsável
            </label>
            <input
              type="text"
              name="responsavelNome"
              value={formData.responsavelNome}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#294A5A]"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-[#294A5A] mb-1">
              Endereço
            </label>
            <input
              type="text"
              name="endereco"
              value={formData.endereco}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#294A5A]"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-[#294A5A] mb-1">
              Turno
            </label>
            <select
              name="turno"
              value={formData.turno}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#294A5A]"
              required
            >
              <option value="">Selecione um turno</option>
              <option value="matutino">Matutino</option>
              <option value="vespertino">Vespertino</option>
              <option value="integral">Integral</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-semibold text-[#294A5A] mb-1">
              Tipo
            </label>
            <select
              name="tipo"
              value={formData.tipo}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#294A5A]"
              required
            >
              <option value="">Selecione um tipo</option>
              <option value="ida">Ida</option>
              <option value="volta">Volta</option>
              <option value="ida e volta">Ida e Volta</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-semibold text-[#294A5A] mb-1">
              Forma de Pagamento
            </label>
            <select
              name="formaPagamento"
              value={formData.formaPagamento}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#294A5A]"
              required
            >
              <option value="">Selecione uma forma de pagamento</option>
              <option value="pix">PIX</option>
              <option value="cartao">Cartão</option>
              <option value="boleto">Boleto</option>
              <option value="dinheiro">Dinheiro</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-semibold text-[#294A5A] mb-1">
              Escola
            </label>
            <input
              type="text"
              name="escola"
              value={formData.escola}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#294A5A]"
              required
            />
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-700 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-4 py-2 bg-[#294A5A] text-white rounded-md hover:bg-[#1f3644] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Salvando..." : "Salvar Alterações"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
