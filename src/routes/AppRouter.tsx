import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { PrivateRoutes } from "./PrivateRoutes";
import { PublicRoutes } from "./PublicRoutes";
import { useWalletContext } from "../components/context/WalletContext";

export const AppRouter = () => {
  const { connected } = useWalletContext();

  if (connected === undefined) {
    return <div className="loading">Checking wallet connection...</div>;
  }

  return (
    <BrowserRouter>
      <Routes>
        {connected ? (
          <Route path="/*" element={<PrivateRoutes />} />
        ) : (
          <Route path="/*" element={<PublicRoutes />} />
        )}
      </Routes>
    </BrowserRouter>
  );
};