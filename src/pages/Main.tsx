import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { createTheme } from "@mui/material/styles";
import DashboardIcon from "@mui/icons-material/Dashboard";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import HomeIcon from "@mui/icons-material/Home";
import { AppProvider } from "@toolpad/core/AppProvider";
import { DashboardLayout } from "@toolpad/core/DashboardLayout";
import type { Router, Navigation } from "@toolpad/core";
import { WalletActionButton } from "@tronweb3/tronwallet-adapter-react-ui";
import { DigitalIdentity } from "./DigitalIdentity";
import { Market } from "./Market";

const NAVIGATION: Navigation = [
  {
    segment: "dashboard",
    title: "Dashboard",
    icon: <DashboardIcon />,
  },
  {
    segment: "market",
    title: "Market",
    icon: <ShoppingCartIcon />,
  },
  {
    segment: "digital-identity",
    title: "Digital Identity",
    icon: <ShoppingCartIcon />,
  },
];

const deafultTheme = createTheme({
  cssVariables: {
    colorSchemeSelector: "data-toolpad-color-scheme",
  },
  colorSchemes: { light: true, dark: true },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 600,
      lg: 1200,
      xl: 1536,
    },
  },
});

function PageContent({ pathname }: { pathname: string }) {
  const renderContent = () => {
    switch (pathname) {
      case "/digital-identity":
        return <DigitalIdentity />;
      case "/market":
        return <Market />;
      default:
        return this;
    }
  };

  return (
    <Box
      sx={{
        py: 4,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        textAlign: "center",
      }}
    >
      {renderContent()}
    </Box>
  );
}

interface Props {
  window?: () => Window;
}

export default function Main(props: Props) {
  const { window } = props;

  const [pathname, setPathname] = React.useState("/main");

  const router = React.useMemo<Router>(() => {
    return {
      pathname,
      searchParams: new URLSearchParams(),
      navigate: (path) => setPathname(String(path)),
    };
  }, [pathname]);

  const demoWindow = window !== undefined ? window() : undefined;

  return (
    <AppProvider
      navigation={NAVIGATION}
      branding={{ logo: "", title: "Real Estate" }}
      router={router}
      theme={deafultTheme}
      window={demoWindow}
    >
      <DashboardLayout slots={{ toolbarActions: WalletActionButton }}>
        <PageContent pathname={pathname} />
      </DashboardLayout>
    </AppProvider>
  );
}
