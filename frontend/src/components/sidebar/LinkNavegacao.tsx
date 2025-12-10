import type { JSX } from "react"
import { NavLink } from "react-router";

interface LinkNavegacaoProps{
    texto:string;
    url:string;
    svg: JSX.Element;
}

// className={({ isActive }) => `flex items-center w-[245px] h-[50px] rounded-[5px] transition-all duration-200 cursor-pointer ${isActive ? "bg-[#D9F0E7]" : "bg-transparent hover:bg-[#E6E6E6]"}`
// }
export default function LinkNavegacao({texto, url, svg}:LinkNavegacaoProps){
    return(
            <NavLink to={url} className={({isActive})=>
            `flex items-center w-[245px] h-[50px] rounded-[5px] transition-all duration-200 cursor-pointer ${isActive ? "bg-[#E6E6E6]" : "bg-transparent hover:bg-[#E6E6E6]" }`}>
                    <div className="flex flex-row items-center gap-[8px] ml-[10px]">
                        {svg}
                        <span className="text-[16px] text-[#294A5A]">{texto}</span>
                    </div>
            </NavLink>
    );
}