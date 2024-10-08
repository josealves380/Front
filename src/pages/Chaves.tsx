import { HeaderClient } from "../components/HeaderClient";
import { Siderbar } from "../components/SiderBar";

export default function Chave(){
  return(
    <div>
      <HeaderClient/>
        <h1 className="flex justify-center items-center mt-32">Chaves cliente</h1>
      <Siderbar/>
    </div>
  )
}