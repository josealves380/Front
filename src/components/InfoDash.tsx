import { EyeSlash, Heart, HeartBreak, Users } from "phosphor-react";
interface InfoDashProps {
  qtda: any;
  qtdi: number;
  name: string;
}

export function InfoDash(props: InfoDashProps) {
  return (
    <div>
      <form className="flex flex-col w-52 bg-cyan-700 rounded text-write border-none mt-4">
        <div className="flex justify-around items-stretch mt-2">
          <span className="justify-items-stretch " title="Ativos"><Heart size={32}/></span>
            
          <span title="Desativados"><EyeSlash size={32} /></span>
        </div>
        <span className="flex justify-center items-center font-light text-2xl">
          |
        </span>
        <div>
          <span className="justify-between items-start ml-4 p-8">
            {props.qtda}
          </span>

          <span className="ml-[28%]">{props.qtdi}</span>
        </div>
        <div>
          <span className="flex justify-center items-center gap-5">
            <Users size={20} weight="light" className="m-2 mr-8" />
            {props.name}{" "}
          </span>
        </div>
      </form>
    </div>
  );
}
