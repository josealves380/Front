export function SelectedMes() {
  return (
    <div className="flex justify-center">
       <div className="flex md:ml-24 gap-2 ml-6">
      <label className="md:flex flex-col mb-3 md:ml-10">
          Dia de vencimento
          <select
            id="dia"
            name="dia"
            className="h-10 w-48 border border-cyan-900 rounded outline-none px-1 font-bold text-xs"
            //value={dia}
            onChange={(e) => {
              //setDia(e.target.value);
            }}
            aria-required
            required={true}
            title="Essa consulta trará somente os boletos do determinado dia"
          >
            <option>Dia de gerar os boletos</option>
            <option value="01">1</option>
            <option value="02">2</option>
            <option value="03">3</option>
            <option value="04">4</option>
            <option value="05">5</option>
            <option value="06">6</option>
            <option value="07">7</option>
            <option value="08">8</option>
            <option value="09">9</option>
            <option value="10">10</option>
            <option value="11">11</option>
            <option value="12">12</option>
            <option value="13">13</option>
            <option value="14">14</option>
            <option value="15">15</option>
            <option value="16">16</option>
            <option value="17">17</option>
            <option value="18">18</option>
            <option value="19">19</option>
            <option value="20">20</option>
            <option value="21">21</option>
            <option value="22">22</option>
            <option value="23">23</option>
            <option value="24">24</option>
            <option value="25">25</option>
            <option value="26">26</option>
            <option value="27">27</option>
            <option value="28">28</option>
            <option value="29">29</option>
            <option value="30">30</option>
          </select>
        </label>
        <label className="flex flex-col ml-1 mb-3 ">
          Referente ao mês:
          <select
            id="mes_pag"
            name="mes_pag"
            className="h-10 w-48 border  border-cyan-900 rounded outline-none px-1 font-bold "
            //value={mespag}
            onChange={(e) => {
              localStorage.setItem("mespag", e.target.value);
              //setMespag(e.target.value);
            }}
            aria-required
            required={true}
            title="É necessário definir o mês referente"
          >
            <option>Referente ao mês</option>
            <option value="Janeiro">Janeiro</option>
            <option value="Fervereiro">Fervereiro</option>
            <option value="Março">Março</option>
            <option value="Abril">Abril</option>
            <option value="Maio">Maio</option>
            <option value="Junho">Junho</option>
            <option value="Julho">Julho</option>
            <option value="Agosto">Agosto</option>
            <option value="Setembro">Setembro</option>
            <option value="Outubro">Outubro</option>
            <option value="Novembro">Novembro</option>
            <option value="Dezembro">Dezembro</option>
          </select>
        </label>
        <label className="flex flex-col mb-3 ">
          Mês da cobrança:
          <select
            id="mes"
            name="mes"
            className="h-10 w-48 border  border-cyan-900 rounded outline-none px-1 font-bold "
            //value={mes}
            onChange={(e) => {
              //setMes(e.target.value);
            }}
            aria-required
            required={true}
            title="É necessário definir o mês que será cobrado"
          >
            <option>Mês da Cobrança</option>
            <option value="01">Janeiro</option>
            <option value="02">Fervereiro</option>
            <option value="03">Março</option>
            <option value="04">Abril</option>
            <option value="05">Maio</option>
            <option value="06">Junho</option>
            <option value="07">Julho</option>
            <option value="08">Agosto</option>
            <option value="09">Setembro</option>
            <option value="10">Outubro</option>
            <option value="11">Novembro</option>
            <option value="12">Dezembro</option>
          </select>
        </label>
       
        <label className="flex flex-col mb-3 ">
          Referente ao ano:
          <select
            id="data_pag"
            name="data_pag"
            className="h-10 w-48 border  border-cyan-900 rounded outline-none px-1 font-bold "
            //value={ano}
            onChange={(e) => {
              //setAno(e.target.value);
            }}
            aria-required
            required={true}
            title="É necessário definir o mês referente"
          >
            <option>Referente ao Ano</option>
            <option value="2023">2023</option>
            <option value="2024">2024</option>
            <option value="2025">2025</option>
            <option value="2026">2026</option>
            <option value="2027">2027</option>
            <option value="2028">2028</option>
            <option value="2029">2029</option>
            <option value="2030">2030</option>
            <option value="2031">2031</option>
            <option value="2032">2032</option>
            <option value="2033">2033</option>
            <option value="2034">2034</option>
          </select>
        </label>
      </div>
    </div>
  );
}
