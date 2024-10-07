import { Toaster } from "react-hot-toast";  // Si usas toast para notificaciones
import { WalletProvider } from "./components/context/WalletContext";
import { AppRouter } from "./routes/AppRouter";

export function App() {
  return (
    <WalletProvider>
      <Toaster />
      <AppRouter />
    </WalletProvider>
  );
}

export default App;