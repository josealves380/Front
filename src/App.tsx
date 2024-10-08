import "./styles/global.css";

import { Rotas } from "./routes/index";

import { AuthProvider } from "./contexts/AuthContext";

export function App() {
  return (
    <div>
      <AuthProvider>
        <Rotas />
      </AuthProvider>
    </div>
  );
}
