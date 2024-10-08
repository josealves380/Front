import { SelectedAno } from "./SelectedAno";
import { SelectedMes } from "./SelectedMes";

interface ResumoAtvprops {
  title: string;
}

export function ResumoAtv(props: ResumoAtvprops) {
  return (
    <div className="flex flex-col border rounded border-cyan-300 h-full ml-16 mt-8 px-3 gap-4">
      <span className="font-bold mt-2">
        Resumo das atividades dos {props.title}
      </span>
      <span>Quantidades de chaves geradas:</span>
      <div className="flex gap-2">
        <SelectedMes />
        <SelectedAno />
        <input className="border border-cyan-300 rounded ml-2 cursor-pointer w-28 h-9 appearance-none" />
      </div>
      <span>Quantidade de clientes inadiplentes:</span>
      <div className="flex gap-2">
        <SelectedMes />
        <SelectedAno />
        <input
          className="border border-cyan-300 rounded ml-2 cursor-pointer w-28 h-9"
          type="text"
        />
      </div>
      <span>Quantidade de boletos gerados:</span>
      <div className="flex gap-2">
        <SelectedMes />
        <SelectedAno />
        <input
          className="border border-cyan-300 rounded ml-2 cursor-pointer w-28 h-9"
          type="text"
        />
      </div>
      <span>Quantidade de chaves geradas:</span>
      <div className="flex gap-2">
        <SelectedMes />
        <SelectedAno />
        <input
          className="border border-cyan-300 rounded ml-2 cursor-pointer w-28 h-9"
          type="text"
        />
      </div>
      <span>Quantidade de suporte geradas:</span>
      <div className="flex gap-2">
        <SelectedMes />
        <SelectedAno />
        <input
          className="border border-cyan-300 rounded ml-2 cursor-pointer w-28 h-9"
          type="text"
        />
      </div>
    </div>
  );
}
