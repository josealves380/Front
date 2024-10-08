import { HeaderClient } from "../components/HeaderClient";

import { Siderbar } from "../components/SiderBar";

export default function SuporteInfo(){
  return(
    <div className="flex flex-col justify-center ml-24 text-cyan-900 inset-1 mt-32 items-center w-[50%]">
      <HeaderClient/>
      <p>Verifique se os cabos da internet, atrás <br/>do equipamento estão conectados.</p>
      
      <Siderbar/>
    </div>
  )
}