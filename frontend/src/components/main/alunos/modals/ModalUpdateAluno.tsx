import { useState, useEffect } from "react";
import type { Aluno } from "../../../../types/Aluno";
import { AlunosService } from "../../../../data/alunosService";

interface ModalUpdateAlunoProps {
  isOpen: boolean;
  aluno: Aluno;
  onClose: () => void;
  onUpdate: () => void;
}

export default function ModalUpdateAluno({
  isOpen,
  aluno,
  onClose,
  onUpdate,
}: ModalUpdateAlunoProps) {
  const [formData, setFormData] = useState<Aluno>(aluno);

  useEffect(() => {
    setFormData(aluno);
  }, [aluno, isOpen]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    AlunosService.atualizar(formData);
    onUpdate();
    onClose();
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
              <option value="Matutino">Matutino</option>
              <option value="Vespertino">Vespertino</option>
              <option value="Noturno">Noturno</option>
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
              <option value="Dinheiro">Dinheiro</option>
              <option value="Cartão de Crédito">Cartão de Crédito</option>
              <option value="Cartão de Débito">Cartão de Débito</option>
              <option value="Boleto">Boleto</option>
              <option value="PIX">PIX</option>
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
              className="px-4 py-2 bg-[#294A5A] text-white rounded-md hover:bg-[#1f3644] transition-colors"
            >
              Salvar Alterações
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
