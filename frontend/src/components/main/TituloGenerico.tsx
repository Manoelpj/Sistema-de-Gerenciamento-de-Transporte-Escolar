import type { JSX } from "react"

interface TituloGenericoProps{
    texto:string;
    svg: JSX.Element;
}


export default function TituloGenerico({texto, svg}:TituloGenericoProps){
    return(
        <div className="flex flex-row items-center gap-[8px] ml-[10px]">
            {svg}
            <span className="text-[60px] text-[#294A5A]">{texto}</span>
        </div>
    );
}