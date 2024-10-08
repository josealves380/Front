import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../services/api";

interface AuthContextState {
  token: TokenState;
  signIn({ email, senha }: UserData): Promise<void>;
  refresh({ refresh: { id } }: UserRefresh): Promise<void>;
  userLogged(): boolean;
  Logout(): Promise<void>;
}
interface UserRefresh {
  refresh: {
    id: string;
  };
}

interface UserData {
  email: string;
  senha: string;
}

interface TokenState {
  token: string | null;
}

const AuthContext = createContext<AuthContextState>({} as AuthContextState);

const AuthProvider = ({ children }: { children: JSX.Element }) => {
  const [id, setId] = useState("");
  const [user, setUser] = useState("");
  const [token, setToken] = useState<TokenState>(() => {
    const token = localStorage.getItem("@PermissionYT:token");

    if (token) {
      api.defaults.headers.authorization = `Bearer ${token}`;

      return { token };
    }

    return {} as TokenState;
  });

  const navigate = useNavigate();

  const signIn = useCallback(async ({ email, senha }: UserData) => {
    try {
      const response = await api.post("/login", {
        email,
        senha,
      });
      const {
        token,
        refreshToken: { id, userId },
      } = response.data;
      //console.log(id)
      setId(id);
      setToken(token);
      setUser(userId);
      localStorage.setItem("new", id);
      localStorage.setItem("Id", userId);
      localStorage.setItem("@PermissionYT:token", token);
      api.defaults.headers.authorization = `Bearer ${token}`;
    } catch (error) {
      alert("Senha ou email incorretos");
      navigate("#")
    }
  }, []);

  const userLogged = useCallback(() => {
    const token = localStorage.getItem("@PermissionYT:token");
    if (token) {
      return true;
    }
    return false;
  }, []);

  async function Logout() {
    localStorage.removeItem("@PermissionYT:token");
    localStorage.removeItem("Id");
    localStorage.removeItem("Nivel");
    localStorage.removeItem("email");
    localStorage.removeItem("name");
    localStorage.removeItem("idParceiro");
    localStorage.removeItem("idParsa");
    localStorage.removeItem("basic");
    localStorage.removeItem("idCliente");
    localStorage.removeItem("emailboleto");
    localStorage.removeItem("mespag");
    localStorage.removeItem("jur");
    localStorage.removeItem("new");
    localStorage.removeItem("boletoid");

    navigate("/");
  }

  const refresh = useCallback(async ({ refresh }: UserRefresh) => {
    const ref = localStorage.getItem("new");
    if(!ref){
      return
    }if(ref){
    const response = await api.post("/refresh-token", {
      ref,
    });

    console.log(response.data);

    //setToken(token);
    //console.log(token)
    //localStorage.setItem("@Permission:token", token);
    api.defaults.headers.authorization = `Bearer ${token}`;
  }
  }, []);
  // useEffect(() => {
  //   api.get(`/getf2b/${user}`).then((response) => {
  //     const [{ basic }] = response.data;
  //     localStorage.setItem("basic", basic);
  //   });
  // }, []);
  return (
    <AuthContext.Provider
      value={{ token, signIn, refresh, userLogged, Logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

function useAuth(): AuthContextState {
  const context = useContext(AuthContext);
  return context;
}

export { AuthProvider, useAuth };
