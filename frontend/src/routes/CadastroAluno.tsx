import { useNavigate } from "react-router";
import { Form } from "react-router";

export default function CadastroAluno() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-2xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-[#294A5A] mb-2">
            Cadastro de Aluno
          </h1>
          <p className="text-gray-600">
            Preencha os dados abaixo para registrar um novo aluno
          </p>
        </div>

        <Form method="post" className="bg-white p-8 rounded-lg shadow-md space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Nome */}
            <div className="md:col-span-2">
              <label htmlFor="nome" className="block text-sm font-medium text-[#294A5A] mb-2">
                Nome do Aluno *
              </label>
              <input
                type="text"
                id="nome"
                name="nome"
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#294A5A]"
                placeholder="Ex: João Silva"
              />
            </div>

            {/* Responsável */}
            <div>
              <label htmlFor="responsavelNome" className="block text-sm font-medium text-[#294A5A] mb-2">
                Nome do Responsável *
              </label>
              <input
                type="text"
                id="responsavelNome"
                name="responsavelNome"
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#294A5A]"
                placeholder="Ex: Maria Silva"
              />
            </div>

            {/* Endereço */}
            <div className="md:col-span-2">
              <label htmlFor="endereco" className="block text-sm font-medium text-[#294A5A] mb-2">
                Endereço *
              </label>
              <input
                type="text"
                id="endereco"
                name="endereco"
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#294A5A]"
                placeholder="Ex: Rua Principal, 123"
              />
            </div>

            {/* Turno */}
            <div>
              <label htmlFor="turno" className="block text-sm font-medium text-[#294A5A] mb-2">
                Turno *
              </label>
              <select
                id="turno"
                name="turno"
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#294A5A]"
              >
                <option value="">Selecione um turno</option>
                <option value="matutino">Matutino</option>
                <option value="vespertino">Vespertino</option>
                <option value="integral">Integral</option>
              </select>
            </div>

            {/* Tipo */}
            <div>
              <label htmlFor="tipo" className="block text-sm font-medium text-[#294A5A] mb-2">
                Tipo *
              </label>
              <select
                id="tipo"
                name="tipo"
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#294A5A]"
              >
                <option value="">Selecione um tipo</option>
                <option value="ida">Ida</option>
                <option value="volta">Volta</option>
                <option value="ida e volta">Ida e Volta</option>
              </select>
            </div>

            {/* Forma de Pagamento */}
            <div>
              <label htmlFor="formaPagamento" className="block text-sm font-medium text-[#294A5A] mb-2">
                Forma de Pagamento *
              </label>
              <select
                id="formaPagamento"
                name="formaPagamento"
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#294A5A]"
              >
                <option value="">Selecione uma forma</option>
                <option value="pix">PIX</option>
                <option value="cartao">Cartão</option>
                <option value="boleto">Boleto</option>
                <option value="dinheiro">Dinheiro</option>
              </select>
            </div>

            {/* Escola */}
            <div>
              <label htmlFor="escola" className="block text-sm font-medium text-[#294A5A] mb-2">
                Escola *
              </label>
              <input
                type="text"
                id="escola"
                name="escola"
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#294A5A]"
                placeholder="Ex: Colégio Pinheiros"
              />
            </div>
          </div>

          <div className="flex gap-4 pt-4">
            <button
              type="submit"
              className="flex-1 bg-[#294A5A] text-white py-2 px-4 rounded-lg hover:bg-[#1f3a47] transition-colors font-medium"
            >
              Cadastrar Aluno
            </button>
            <button
              type="reset"
              className="flex-1 bg-gray-200 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-300 transition-colors font-medium"
            >
              Limpar
            </button>
          </div>
        </Form>

        <button
          onClick={() => navigate("/alunos/")}
          className="mt-6 px-6 py-2 text-gray-600 hover:text-gray-800 border border-gray-300 rounded-lg hover:bg-gray-100 transition-colors"
        >
          ← Voltar para Alunos
        </button>
      </div>
    </div>
  );
}
