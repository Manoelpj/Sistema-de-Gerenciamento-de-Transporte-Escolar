import { useState } from "react";
import type { Aluno } from "../../../../types/Aluno";
import ModalDetailAluno from "../modals/ModalDetailAluno";

interface BotaoDetailProps {
  aluno: Aluno;
}

export default function BotaoDetail({ aluno }: BotaoDetailProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="
        h-5 w-19
        bg-[#D6EFF7] rounded-md 
        flex flex-row gap-0.5 items-center
        justify-center hover:bg-[#c3e6f0] transition-colors cursor-pointer
      "
      >
        <svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
          <g clip-path="url(#clip0_86_856)">
            <path d="M8.75 4.58333H6.66667C5.9775 4.58333 5.41667 5.14417 5.41667 5.83333V8.75C5.41667 9.43917 5.9775 10 6.66667 10H8.75C9.43917 10 10 9.43917 10 8.75V5.83333C10 5.14417 9.43917 4.58333 8.75 4.58333ZM9.16667 8.75C9.16667 8.97958 8.98 9.16667 8.75 9.16667H6.66667C6.43667 9.16667 6.25 8.97958 6.25 8.75V5.83333C6.25 5.60375 6.43667 5.41667 6.66667 5.41667H8.75C8.98 5.41667 9.16667 5.60375 9.16667 5.83333V8.75ZM8.75 6.66542C8.75 6.89542 8.56375 7.08208 8.33333 7.08208H7.08333C6.85292 7.08208 6.66667 6.89542 6.66667 6.66542C6.66667 6.43542 6.85292 6.24875 7.08333 6.24875H8.33333C8.56375 6.24875 8.75 6.43542 8.75 6.66542ZM8.75 7.91667C8.75 8.14667 8.56375 8.33333 8.33333 8.33333H7.08333C6.85292 8.33333 6.66667 8.14667 6.66667 7.91667C6.66667 7.68667 6.85292 7.5 7.08333 7.5H8.33333C8.56375 7.5 8.75 7.68667 8.75 7.91667ZM3.75 5C5.12875 5 6.25 3.87875 6.25 2.5C6.25 1.12125 5.12875 0 3.75 0C2.37125 0 1.25 1.12125 1.25 2.5C1.25 3.87875 2.37125 5 3.75 5ZM3.75 0.833333C4.66917 0.833333 5.41667 1.58083 5.41667 2.5C5.41667 3.41917 4.66917 4.16667 3.75 4.16667C2.83083 4.16667 2.08333 3.41917 2.08333 2.5C2.08333 1.58083 2.83083 0.833333 3.75 0.833333ZM4.58333 6.25C4.58333 6.48 4.39708 6.66667 4.16667 6.66667H3.75C2.14208 6.66667 0.833333 7.975 0.833333 9.58333C0.833333 9.81333 0.647083 10 0.416667 10C0.18625 10 0 9.81333 0 9.58333C0 7.51583 1.68208 5.83333 3.75 5.83333H4.16667C4.39708 5.83333 4.58333 6.02 4.58333 6.25Z" fill="#294A5A" />
          </g>
          <defs>
            <clipPath id="clip0_86_856">
              <rect width="10" height="10" fill="white" />
            </clipPath>
          </defs>
        </svg>
        <span className="text-[0.6rem]">Ver detalhes</span>
      </button>

      <ModalDetailAluno isOpen={isOpen} aluno={aluno} onClose={() => setIsOpen(false)} />
    </>
  );
}