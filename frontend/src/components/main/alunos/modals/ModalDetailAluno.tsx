import type { Aluno } from "../../../../types/Aluno";

interface ModalDetailAlunoProps {
  isOpen: boolean;
  aluno: Aluno;
  onClose: () => void;
}

export default function ModalDetailAluno({ isOpen, aluno, onClose }: ModalDetailAlunoProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-[#294A5A]">Detalhes do Aluno</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 text-2xl"
          >
            ×
          </button>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-[#294A5A]">Nome</label>
            <p className="text-gray-700">{aluno.nome}</p>
          </div>

          <div>
            <label className="block text-sm font-semibold text-[#294A5A]">Responsável</label>
            <p className="text-gray-700">{aluno.responsavelNome}</p>
          </div>

          <div>
            <label className="block text-sm font-semibold text-[#294A5A]">Endereço</label>
            <p className="text-gray-700">{aluno.endereco}</p>
          </div>

          <div>
            <label className="block text-sm font-semibold text-[#294A5A]">Turno</label>
            <p className="text-gray-700">{aluno.turno}</p>
          </div>

          <div>
            <label className="block text-sm font-semibold text-[#294A5A]">Tipo</label>
            <p className="text-gray-700">{aluno.tipo}</p>
          </div>

          <div>
            <label className="block text-sm font-semibold text-[#294A5A]">Forma de Pagamento</label>
            <p className="text-gray-700">{aluno.formaPagamento}</p>
          </div>

          <div>
            <label className="block text-sm font-semibold text-[#294A5A]">Escola</label>
            <p className="text-gray-700">{aluno.escola}</p>
          </div>
        </div>

        <div className="mt-6 flex justify-end">
          <button
            onClick={onClose}
            className="bg-[#294A5A] text-white px-4 py-2 rounded-md hover:bg-[#1f3644] transition-colors"
          >
            Fechar
          </button>
        </div>
      </div>
    </div>
  );
}
