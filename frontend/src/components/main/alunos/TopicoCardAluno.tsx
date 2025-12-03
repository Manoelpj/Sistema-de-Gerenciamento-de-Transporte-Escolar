import type { JSX } from "react"

interface TopicoCardAlunoProps{
    textoTitulo:string;
    texto:string;
    svg: JSX.Element;
}

export default function TopicoCardAluno({textoTitulo, texto, svg}:TopicoCardAlunoProps){
    return(
        <div className="flex flex-col mt-1.5">
            <div className="flex flex-row items-center gap-[2px]">
                {svg}
                <div className="text-[#294A5A] text-[8px] font-semibold">{textoTitulo}</div>
            </div>
            <div className="text-[#294A5A] text-[8px] font-normal">{texto}</div>
        </div>

    )
}