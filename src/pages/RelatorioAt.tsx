import { HeaderClient } from "../components/HeaderClient";

import { ResumoAtv } from "../components/ResumoAtv";

export default function RelatorioAt() {
  return (
    <div>
      <header>
        <HeaderClient />
      </header>
      <div className="flex">
        <ResumoAtv title={"cliente"} />
        <ResumoAtv title={"parceiro"} />
      </div>
    </div>
  );
}
