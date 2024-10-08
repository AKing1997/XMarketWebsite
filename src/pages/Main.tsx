import React from "react";
import Box from "@mui/material/Box";
import { createTheme } from "@mui/material/styles";
import { AppProvider } from "@toolpad/core/AppProvider";
import { DashboardLayout } from "@toolpad/core/DashboardLayout";
import type { Router, Navigation } from "@toolpad/core";
import { WalletActionButton } from "@tronweb3/tronwallet-adapter-react-ui";
import Market from "./Market";
import DigitalIdentity from "./DigitalIdentity";
import { RealEstateToken } from "./RealEstateToken";
import RealEstateAsset from "./RealEstateAsset";
import Dashboard from "./Dashboard";

import DashboardIcon from '@mui/icons-material/Dashboard';
import StorefrontIcon from '@mui/icons-material/Storefront';
import FingerprintIcon from '@mui/icons-material/Fingerprint';
import TokenIcon from '@mui/icons-material/MonetizationOn'; 
import BusinessIcon from '@mui/icons-material/Business';

const NAVIGATION: Navigation = [
  {
    segment: "dashboard",
    title: "Dashboard",
    icon: <DashboardIcon />,
  },
  {
    segment: "market",
    title: "Market",
    icon: <StorefrontIcon />,
  },
  {
    segment: "digital-identity",
    title: "Digital Identity",
    icon: <FingerprintIcon />,
  },
  {
    segment: "real-estate-token",
    title: "Real Estate Token",
    icon: <TokenIcon  />,
  },
  {
    segment: "real-estate-asset",
    title: "Real Estate Asset",
    icon: <BusinessIcon />,
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
      case "/dashboard":
        return <Dashboard />;
      case "/digital-identity":
        return <DigitalIdentity />;
      case "/market":
        return <Market />;
      case "/real-estate-token":
        return <RealEstateToken />;
      case "/real-estate-asset":
          return <RealEstateAsset />;
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
