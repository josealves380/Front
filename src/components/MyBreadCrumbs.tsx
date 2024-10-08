import { Link } from "react-router-dom";

export function MyBreadCrumbs() {
  return (
    <>
      <nav
        className="md:relative md:flex w-full flex-wrap md:text-xl text-xs items-center justify-between py-3 hover:text-neutral-700 focus:text-neutral-700 dark:bg-neutral-600 lg:flex-wrap lg:justify-center"
        data-te-navbar-ref
      >
        <div className="md:flex text-cyan-300 w-full flex-wrap items-center justify-between ">
          <nav
            className="bg-grey-light md:w-full rounded-md"
            aria-label="breadcrumb"
          >
            <ol className="list-reset flex">
              <li>
                <Link
                  to={"/adm"}
                  className="text-cyan-700  hover:text-cyan-900  dark:text-neutral-200"
                >
                  Home
                </Link>
              </li>
              <li>
                <span className="mx-2 text-neutral-500 dark:text-neutral-200">
                  /
                </span>
              </li>
              <li>
                <Link
                  to={"/PesquisaCliente"}
                  className="text-cyan-700  hover:text-cyan-900 dark:text-neutral-200"
                >
                  Pesquisa
                </Link>
              </li>
              <li>
                <span className="mx-2 text-neutral-500 dark:text-neutral-200">
                  /
                </span>
              </li>
              <li>
                <Link
                  to={"/cadastro"}
                  className="text-cyan-900 dark:text-neutral-200"
                >
                  Cadastro
                </Link>
              </li>
              <span className="mx-2 text-neutral-500 dark:text-neutral-200">
                /
              </span>
              {/* <li>
                <Link
                  to={"/financeiro"}
                  className="text-cyan-700  hover:text-cyan-900 dark:text-neutral-200"
                >
                  Financeiro
                </Link>
              </li> */}
            </ol>
          </nav>
        </div>
      </nav>
    </>
  );
}
