import { Route, Routes } from "react-router-dom";
import { lazy, Suspense } from "react";

const DashAdm = lazy(() => import("../pages/DashAdm"));
import { Login } from "../pages/Login";
import { PrivateRoute } from "./PrivateRoutes";
import { PesquisaUsuarioParceiro } from "../components/PequisaUserParceiro";
const ConfigCliente = lazy(() => import("../pages/ConfigCliente"));
import EditParceiro from "../pages/EditParceiro";
import GeraTdBoletos from "../components/GeraTdBoletos";
import EnviarBoletos from "../pages/AlterStatus";
import ArquivosClientes from "../pages/ArquivosClientes";
const ContasVencidas = lazy(()=>import("../components/ContasVencidas")) ;
const ContasPagas = lazy(()=>import("../components/ContasPagas")) ;
const DashContador = lazy(() => import("../pages/DashContador"));
const PesquisaContador = lazy(() => import("../pages/PesquisaContador"));
const NewContador = lazy(() => import("../pages/NewContador"));
const SuporteInfo = lazy(() => import("../pages/SuporteInfo"));
const DashCliente = lazy(() => import("../pages/DashCLiente"));
const EditarCliente = lazy(() => import("../pages/EditarCliente"));
const EditValueMensal = lazy(() => import("../components/EditValueMensal"));
const EditValue = lazy(() => import("../components/EditValue"));
const BoletoPagar = lazy(() => import("../components/BoletoPagar"));
const BoletoLiberado = lazy(() => import("../components/BoletoLiberado"));
const BoletosClientesparceiro = lazy(
  () => import("../pages/BoletosClientesParceiro")
);
const EditBoleto = lazy(() => import("../pages/EditBoleto"));

const PesquisaClienteParsa = lazy(
  () => import("../components/PesquisaClienteParsa")
);
const BoletosApi = lazy(() => import("../pages/BoletosApi"));
const GeraBoleto = lazy(() => import("../pages/GeraBoleto"));
const BoletosCli = lazy(() => import("../pages/BoletosCli"));
const ContasAgendadas = lazy(() => import("../pages/ContasAgendadas"));
const Configuracoes = lazy(() => import("../pages/Configuracoes"));
const PesquisaCLienteParceiro = lazy(
  () => import("../pages/PesquisaClienteParceiro")
);
const SegundaVia = lazy(() => import("../pages/SegundaVia"));
const GravaFb = lazy(() => import("../components/GravaFb"));
const ContasApagar = lazy(() => import("../components/ContasAPagar"));
const Financeiro = lazy(() => import("../pages/Financeiro"));
const Splash = lazy(() => import("../pages/Splash"));

const PesquisaUserClient = lazy(() => import("../pages/PesquisaUserClient"));

const NewProduct = lazy(() => import("../pages/NewProduct"));
const CadastroProdutos = lazy(() => import("../pages/CadastroProdutos"));

const DashClient = lazy(() => import("../pages/DashClient"));
const DashParsa = lazy(() => import("../pages/DashParsa"));
const Suporte = lazy(() => import("../pages/Suporte"));
const Usuario = lazy(() => import("../pages/Usuario"));
const CadastroCompleto = lazy(() => import("../pages/CadastroCliente"));

const ServiceParsa = lazy(() => import("../pages/ServiceParsa"));
const NewParsa = lazy(() => import("../pages/NewParsa"));
const RelatorioAt = lazy(() => import("../pages/RelatorioAt"));
const PesquisaCLiente = lazy(() => import("../pages/PesquisaCliente"));

const PesquisaUser = lazy(() => import("../pages/PesquisaUser"));
const ClientSuport = lazy(() => import("../pages/ClientSuport"));
const PesquisaParceiro = lazy(() => import("../pages/PesquisaParsa"));
const Boleto = lazy(() => import("../pages/Boleto"));
const EditCliente = lazy(() => import("../pages/EditCliente"));
const ArquivosFiscais = lazy(() => import("../pages/ArquivosFiscais"));
const ViewClient = lazy(() => import("../pages/ViewClient"));
const Chave = lazy(() => import("../pages/Chaves"));

export const Rotas = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route
          path="/adm"
          element={
            <Suspense
              fallback={
                <div className="flex justify-center items-center mt-40">
                  Loading...
                </div>
              }
            >
              <PrivateRoute nivel="1">
                <DashAdm />
              </PrivateRoute>
            </Suspense>
          }
        />
        <Route
          path="/cliente"
          element={
            <Suspense
              fallback={
                <div className="flex justify-center items-center mt-40">
                  Loading...
                </div>
              }
            >
              <PrivateRoute nivel="4">
                <DashClient />
              </PrivateRoute>
            </Suspense>
          }
        />

        <Route
          path="/parceiro"
          element={
            <Suspense
              fallback={
                <div className="flex justify-center items-center mt-40">
                  Loading...
                </div>
              }
            >
              <PrivateRoute nivel="3">
                <DashParsa />
              </PrivateRoute>
            </Suspense>
          }
        />
        <Route
          path="/suporte"
          element={
            <Suspense
              fallback={
                <div className="flex justify-center items-center mt-40">
                  Loading...
                </div>
              }
            >
              <PrivateRoute nivel="2">
                <Suporte />
              </PrivateRoute>
            </Suspense>
          }
        />
        <Route
          path="/pesquisaCLiente"
          element={
            <Suspense
              fallback={
                <div className="flex justify-center items-center mt-40">
                  Loading...
                </div>
              }
            >
              <PrivateRoute nivel="1">
                <PesquisaCLiente />
              </PrivateRoute>
            </Suspense>
          }
        />
        <Route
          path="/pesquisaCLienteParsa"
          element={
            <Suspense
              fallback={
                <div className="flex justify-center items-center mt-40">
                  Loading...
                </div>
              }
            >
              <PrivateRoute nivel="1">
                <PesquisaClienteParsa />
              </PrivateRoute>
            </Suspense>
          }
        />
        <Route
          path="/usuario"
          element={
            <Suspense
              fallback={
                <div className="flex justify-center items-center mt-40">
                  Loading...
                </div>
              }
            >
              <PrivateRoute nivel="1">
                <Usuario />
              </PrivateRoute>
            </Suspense>
          }
        />
        <Route
          path="/cadastro"
          element={
            <Suspense
              fallback={
                <div className="flex justify-center items-center mt-40">
                  Loading...
                </div>
              }
            >
              <PrivateRoute nivel="1">
                <CadastroCompleto />
              </PrivateRoute>
            </Suspense>
          }
        />

        <Route
          path="/service"
          element={
            <Suspense
              fallback={
                <div className="flex justify-center items-center mt-40">
                  Loading...
                </div>
              }
            >
              <ServiceParsa />
            </Suspense>
          }
        />

        <Route
          path="/relatorio"
          element={
            <Suspense
              fallback={
                <div className="flex justify-center items-center mt-40">
                  Loading...
                </div>
              }
            >
              <RelatorioAt />
            </Suspense>
          }
        />

        <Route
          path="/pesquisaUser"
          element={
            <Suspense
              fallback={
                <div className="flex justify-center items-center mt-40">
                  Loading...
                </div>
              }
            >
              <PrivateRoute nivel="1">
                <PesquisaUser />
              </PrivateRoute>
            </Suspense>
          }
        />
        <Route
          path="/pesquisaUserCliente"
          element={
            <Suspense
              fallback={
                <div className="flex justify-center items-center mt-40">
                  Loading...
                </div>
              }
            >
              <PesquisaUserClient />
            </Suspense>
          }
        />

        <Route
          path="/pesquisaParceiro"
          element={
            <Suspense
              fallback={
                <div className="flex justify-center items-center mt-40">
                  Loading...
                </div>
              }
            >
              <PesquisaParceiro />
            </Suspense>
          }
        />

        <Route
          path="/newParsa"
          element={
            <Suspense
              fallback={
                <div className="flex justify-center items-center mt-40">
                  Loading...
                </div>
              }
            >
              <NewParsa />
            </Suspense>
          }
        />

        <Route
          path="/suportecliente"
          element={
            <Suspense
              fallback={
                <div className="flex justify-center items-center mt-40">
                  Loading...
                </div>
              }
            >
              <ClientSuport />
            </Suspense>
          }
        />
        <Route
          path="/suportecliente/ZXZhbGRvZnJhbmNpc/2Nvam9zZTRzaWFkc/2lzdGVtYXN1cmxtb2R/:Nivel/:p5/:p6/:p7"
          element={
            <Suspense
              fallback={
                <div className="flex justify-center items-center mt-40">
                  Loading...
                </div>
              }
            >
              <ClientSuport />
            </Suspense>
          }
        />
        <Route
          path="/boleto"
          element={
            <Suspense
              fallback={
                <div className="flex justify-center items-center mt-40">
                  Loading...
                </div>
              }
            >
              <Boleto />
            </Suspense>
          }
        />
        <Route
          path="/boleto/ZXZhbGRvZnJhbmNpc/2Nvam9zZTRzaWFkc/2lzdGVtYXN1cmxtb2R/:Nivel/:p5/:p6/:p7"
          element={
            <Suspense
              fallback={
                <div className="flex justify-center items-center mt-40">
                  Loading...
                </div>
              }
            >
              <Boleto />
            </Suspense>
          }
        />
        <Route
          path="/editclient"
          element={
            <Suspense
              fallback={
                <div className="flex justify-center items-center mt-40">
                  Loading...
                </div>
              }
            >
              <EditCliente />
            </Suspense>
          }
        />

        <Route
          path="/arquivosficais"
          element={
            <Suspense
              fallback={
                <div className="flex justify-center items-center mt-40">
                  Loading...
                </div>
              }
            >
              <ArquivosFiscais />
            </Suspense>
          }
        />
        <Route
          path="/arquivosficais/ZXZhbGRvZnJhbmNpc/2Nvam9zZTRzaWFkc/2lzdGVtYXN1cmxtb2R/:Nivel/:p5/:p6/:p7"
          element={
            <Suspense
              fallback={
                <div className="flex justify-center items-center mt-40">
                  Loading...
                </div>
              }
            >
              <ArquivosFiscais />
            </Suspense>
          }
        />
        <Route
          path="/vercliente"
          element={
            <Suspense
              fallback={
                <div className="flex justify-center items-center mt-40">
                  Loading...
                </div>
              }
            >
              <ViewClient />
            </Suspense>
          }
        />

        <Route
          path="/chaves"
          element={
            <Suspense
              fallback={
                <div className="flex justify-center items-center mt-40">
                  Loading...
                </div>
              }
            >
              <Chave />
            </Suspense>
          }
        />
        <Route
          path="/parceirouser"
          element={<PesquisaUsuarioParceiro />}
        ></Route>

        <Route
          path="/nvproduto"
          element={
            <Suspense
              fallback={
                <div className="flex justify-center items-center mt-40">
                  Loading...
                </div>
              }
            >
              <NewProduct />
            </Suspense>
          }
        ></Route>

        <Route
          path="/cadproduto"
          element={
            <Suspense
              fallback={
                <div className="flex justify-center items-center mt-40">
                  Loading...
                </div>
              }
            >
              <CadastroProdutos />
            </Suspense>
          }
        ></Route>
        <Route
          path="/editparceiro"
          element={
            <Suspense
              fallback={
                <div className="flex justify-center items-center mt-40">
                  Loading...
                </div>
              }
            >
              <EditParceiro />
            </Suspense>
          }
        ></Route>
        <Route
          path="/splash"
          element={
            <Suspense
              fallback={
                <div className="flex justify-center items-center mt-40">
                  Loading...
                </div>
              }
            >
              <Splash />
            </Suspense>
          }
        ></Route>
        <Route
          path="/financeiro"
          element={
            <Suspense
              fallback={
                <div className="flex justify-center items-center mt-40">
                  Loading...
                </div>
              }
            >
              <Financeiro />
            </Suspense>
          }
        ></Route>
        <Route
          path="/contasapagar"
          element={
            <Suspense
              fallback={
                <div className="flex justify-center items-center mt-40">
                  Loading...
                </div>
              }
            >
              <ContasApagar />
            </Suspense>
          }
        ></Route>
        <Route
          path="/gravarf2b"
          element={
            <Suspense
              fallback={
                <div className="flex justify-center items-center mt-40">
                  Loading...
                </div>
              }
            >
              <GravaFb />
            </Suspense>
          }
        ></Route>
        <Route
          path="/segundavia"
          element={
            <Suspense
              fallback={
                <div className="flex justify-center items-center mt-40">
                  Loading...
                </div>
              }
            >
              <SegundaVia />
            </Suspense>
          }
        ></Route>
        <Route
          path="/PesquisaClienteParceiro"
          element={
            <Suspense
              fallback={
                <div className="flex justify-center items-center mt-40">
                  Loading...
                </div>
              }
            >
              <PesquisaCLienteParceiro />
            </Suspense>
          }
        ></Route>
        <Route
          path="/Config"
          element={
            <Suspense
              fallback={
                <div className="flex justify-center items-center mt-40">
                  Loading...
                </div>
              }
            >
              <Configuracoes />
            </Suspense>
          }
        ></Route>
        <Route
          path="/agendamentos"
          element={
            <Suspense
              fallback={
                <div className="flex justify-center items-center mt-40">
                  Loading...
                </div>
              }
            >
              <ContasAgendadas />
            </Suspense>
          }
        ></Route>
        <Route
          path="/boletoscliente"
          element={
            <Suspense
              fallback={
                <div className="flex justify-center items-center mt-40">
                  Loading...
                </div>
              }
            >
              <BoletosCli />
            </Suspense>
          }
        ></Route>
        <Route
          path="/geraboletos"
          element={
            <Suspense
              fallback={
                <div className="flex justify-center items-center mt-40">
                  Loading...
                </div>
              }
            >
              <GeraBoleto />
            </Suspense>
          }
        ></Route>
        <Route
          path="/boletosAPI"
          element={
            <Suspense
              fallback={
                <div className="flex justify-center items-center mt-40">
                  Loading...
                </div>
              }
            >
              <BoletosApi />
            </Suspense>
          }
        ></Route>
        <Route
          path="/geratodosboletos"
          element={
            <Suspense
              fallback={
                <div className="flex justify-center items-center mt-40">
                  Loading...
                </div>
              }
            >
              <GeraTdBoletos />
            </Suspense>
          }
        ></Route>
        <Route
          path="/alterstatus"
          element={
            <Suspense
              fallback={
                <div className="flex justify-center items-center mt-40">
                  Loading...
                </div>
              }
            >
              <EnviarBoletos />
            </Suspense>
          }
        ></Route>
        <Route
          path="/editboleto"
          element={
            <Suspense
              fallback={
                <div className="flex justify-center items-center mt-40">
                  Loading...
                </div>
              }
            >
              <EditBoleto />
            </Suspense>
          }
        ></Route>
        <Route
          path="/boletosclientesparceiro"
          element={
            <Suspense
              fallback={
                <div className="flex justify-center items-center mt-40">
                  Loading...
                </div>
              }
            >
              <BoletosClientesparceiro />
            </Suspense>
          }
        ></Route>
        <Route
          path="/boletoliberado"
          element={
            <Suspense
              fallback={
                <div className="flex justify-center items-center mt-40">
                  Loading...
                </div>
              }
            >
              <BoletoLiberado />
            </Suspense>
          }
        ></Route>
        <Route
          path="/boletopagar"
          element={
            <Suspense
              fallback={
                <div className="flex justify-center items-center mt-40">
                  Loading...
                </div>
              }
            >
              <BoletoPagar />
            </Suspense>
          }
        ></Route>
        <Route
          path="/suporteinfo"
          element={
            <Suspense
              fallback={
                <div className="flex justify-center items-center mt-40">
                  Loading...
                </div>
              }
            >
              <SuporteInfo />
            </Suspense>
          }
        ></Route>
        <Route
          path="/editvalue"
          element={
            <Suspense
              fallback={
                <div className="flex justify-center items-center mt-40">
                  Loading...
                </div>
              }
            >
              <EditValue />
            </Suspense>
          }
        ></Route>
        <Route
          path="/editvaluemensal"
          element={
            <Suspense
              fallback={
                <div className="flex justify-center items-center mt-40">
                  Loading...
                </div>
              }
            >
              <EditValueMensal />
            </Suspense>
          }
        ></Route>
        <Route
          path="/editarcliente"
          element={
            <Suspense
              fallback={
                <div className="flex justify-center items-center mt-40">
                  Loading...
                </div>
              }
            >
              <EditarCliente />
            </Suspense>
          }
        ></Route>
        <Route
          path="/clientes/ZXZhbGRvZnJhbmNpc/2Nvam9zZTRzaWFkc/2lzdGVtYXN1cmxtb2R/:Nivel/:p5/:p6/:p7"
          element={
            <Suspense
              fallback={
                <div className="flex justify-center items-center mt-40">
                  Loading...
                </div>
              }
            >
              <DashCliente />
            </Suspense>
          }
        ></Route>
        <Route
          path="/suporte/ZXZhbGRvZnJhbmNpc/2Nvam9zZTRzaWFkc/2lzdGVtYXN1cmxtb2R/:Nivel/:p5/:p6/:p7"
          element={
            <Suspense
              fallback={
                <div className="flex justify-center items-center mt-40">
                  Loading...
                </div>
              }
            >
              <Suporte />
            </Suspense>
          }
        />
        <Route
          path="/newcontador/ZXZhbGRvZnJhbmNpc/2Nvam9zZTRzaWFkc/2lzdGVtYXN1cmxtb2R/:Nivel/:p5/:p6/:p7"
          element={
            <Suspense
              fallback={
                <div className="flex justify-center items-center mt-40">
                  Loading...
                </div>
              }
            >
              <NewContador />
            </Suspense>
          }
        />
        <Route
          path="/pesquisacontador/ZXZhbGRvZnJhbmNpc/2Nvam9zZTRzaWFkc/2lzdGVtYXN1cmxtb2R/:Nivel/:p5/:p6/:p7"
          element={
            <Suspense
              fallback={
                <div className="flex justify-center items-center mt-40">
                  Loading...
                </div>
              }
            >
              <PesquisaContador />
            </Suspense>
          }
        />
        <Route
          path="/newcontador"
          element={
            <Suspense
              fallback={
                <div className="flex justify-center items-center mt-40">
                  Loading...
                </div>
              }
            >
              <PrivateRoute nivel="2">
                <NewContador />
              </PrivateRoute>
            </Suspense>
          }
        />
        <Route
          path="/pesquisacontador"
          element={
            <Suspense
              fallback={
                <div className="flex justify-center items-center mt-40">
                  Loading...
                </div>
              }
            >
              <PrivateRoute nivel="2">
                <PesquisaContador />
              </PrivateRoute>
            </Suspense>
          }
        />
        <Route
          path="/configcliente/ZXZhbGRvZnJhbmNpc/2Nvam9zZTRzaWFkc/2lzdGVtYXN1cmxtb2R/:Nivel/:p5/:p6/:p7"
          element={
            <Suspense
              fallback={
                <div className="flex justify-center items-center mt-40">
                  Loading...
                </div>
              }
            >
              <ConfigCliente />
            </Suspense>
          }
        />
        <Route
          path="/dashcontador"
          element={
            <Suspense
              fallback={
                <div className="flex justify-center items-center mt-40">
                  Loading...
                </div>
              }
            >
              <PrivateRoute nivel="2">
                <DashContador />
              </PrivateRoute>
            </Suspense>
          }
        />
        <Route
          path="/arquivosclientes/:id"
          element={
            <Suspense
              fallback={
                <div className="flex justify-center items-center mt-40">
                  Loading...
                </div>
              }
            >
              <PrivateRoute nivel="2">
                <ArquivosClientes />
              </PrivateRoute>
            </Suspense>
          }
        />
        <Route
          path="/contaspagas"
          element={
            <Suspense
              fallback={
                <div className="flex justify-center items-center mt-40">
                  Loading...
                </div>
              }
            >
              <PrivateRoute nivel="2">
                <ContasPagas />
              </PrivateRoute>
            </Suspense>
          }
        />
        <Route
          path="/contasvencidas"
          element={
            <Suspense
              fallback={
                <div className="flex justify-center items-center mt-40">
                  Loading...
                </div>
              }
            >
              <PrivateRoute nivel="2">
                <ContasVencidas />
              </PrivateRoute>
            </Suspense>
          }
        />
      </Routes>
    </>
  );
};
