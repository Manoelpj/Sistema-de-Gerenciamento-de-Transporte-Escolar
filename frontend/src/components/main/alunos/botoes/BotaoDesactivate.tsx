import type { Aluno } from "../../../../types/Aluno";

interface BotaoDesactivateProps {
  aluno: Aluno;
  onDelete: (alunoId: number) => void;
}

export default function BotaoDesactivate({ aluno, onDelete }: BotaoDesactivateProps) {
  const handleDelete = () => {
    if (window.confirm(`Tem certeza que deseja excluir o aluno ${aluno.nome}?`)) {
      onDelete(aluno.id);
    }
  };

  return (
    <button
      onClick={handleDelete}
      className="
        h-5 w-23
        bg-[#D6EFF7] rounded-md 
        flex flex-row gap-0.5 items-center
        justify-center hover:bg-[#c3e6f0] transition-colors cursor-pointer
      "
    >
      <svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g clip-path="url(#clip0_86_860)">
          <path d="M9.27125 9.26208C9.72125 8.80958 10 8.18667 10 7.5C10 6.12125 8.87875 5 7.5 5C6.12167 5 5.00042 6.12167 5 7.5C5 8.87875 6.12125 10 7.5 10C8.19167 10 8.81875 9.71708 9.27125 9.26208ZM9.16667 7.5C9.16667 7.80833 9.07667 8.09333 8.93042 8.34125L6.65875 6.06917C6.90667 5.92292 7.19167 5.83292 7.5 5.83292C8.41917 5.83292 9.16667 6.58083 9.16667 7.5ZM5.83333 7.5C5.83333 7.19167 5.92333 6.90667 6.06958 6.65875L8.34125 8.93083C8.09333 9.07708 7.80833 9.16708 7.5 9.16708C6.58083 9.16708 5.83333 8.41917 5.83333 7.5ZM3.75 5C5.12875 5 6.25 3.87875 6.25 2.5C6.25 1.12125 5.12875 0 3.75 0C2.37125 0 1.25 1.12125 1.25 2.5C1.25 3.87875 2.37125 5 3.75 5ZM3.75 0.833333C4.66917 0.833333 5.41667 1.58083 5.41667 2.5C5.41667 3.41917 4.66917 4.16667 3.75 4.16667C2.83083 4.16667 2.08333 3.41917 2.08333 2.5C2.08333 1.58083 2.83083 0.833333 3.75 0.833333ZM4.58 6.32792C4.55167 6.55583 4.34542 6.71875 4.115 6.68958C3.99542 6.67458 3.87375 6.66708 3.75 6.66708C2.14208 6.66708 0.833333 7.97542 0.833333 9.58375C0.833333 9.81375 0.647083 10.0004 0.416667 10.0004C0.18625 10.0004 0 9.81375 0 9.58375C0 7.51625 1.68208 5.83375 3.75 5.83375C3.90708 5.83375 4.06458 5.84333 4.21833 5.86292C4.44708 5.89167 4.60875 6.09917 4.58 6.32792Z" fill="#294A5A" />
        </g>
        <defs>
          <clipPath id="clip0_86_860">
            <rect width="10" height="10" fill="white" />
          </clipPath>
        </defs>
      </svg>
      <span className="text-[0.6rem]">Desativar aluno</span>
    </button>
  );
}