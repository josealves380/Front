import { Lock, LockOpen, Users } from "phosphor-react";
interface InfoDashProps {
  qtda: any;
  qtdi: number;
  name: string;
}

export function InfoDashBloq(props: InfoDashProps) {
  return (
    <div>
      <form className="flex flex-col w-[100%] bg-cyan-700 rounded text-write border-none m-4">
        <div className="flex justify-around items-stretch mt-2">
          <span className="justify-items-stretch"><Lock size={32}/></span>
          <span><LockOpen size={32}/></span>
            
        </div>
        <span className="flex justify-center items-center font-light text-2xl mr-7">
          |
        </span>
        <div>
          <span className="justify-between items-start ml-1 px-8">
            {props.qtda}
          </span>

          <span className="ml-[28%]">{props.qtdi}</span>
        </div>
        <div>
          <span className="flex justify-center items-center gap-5">
            <Users size={20} weight="light" className="mb-2 mt-2 mr-8" />
            {props.name}{" "}
          </span>
        </div>
      </form>
    </div>
  );
}
