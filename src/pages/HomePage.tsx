import React from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Container,
  Grid,
  Paper,
  Button,
  Snackbar,
  Alert,
  Avatar,
} from "@mui/material";
import { WalletActionButton } from "@tronweb3/tronwallet-adapter-react-ui";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import Grid2 from "@mui/material/Grid2";
export default function HomePage() {
  const [openSnackbar, setOpenSnackbar] = React.useState(false);
  const [snackbarMessage, setSnackbarMessage] = React.useState("");

  const handleSnackbarClose = () => {
    setOpenSnackbar(false);
  };

  const handleLearnMoreClick = () => {
    setSnackbarMessage("Learn more about our services!");
    setOpenSnackbar(true);
  };

  const baseUrl = `${window.location.origin}`;
  return (
    <div>
      <AppBar position="static">
        <Container maxWidth="xl">
          <Toolbar>
            <Avatar
              alt="XRealEstate Logo"
              src={`${baseUrl}/XRealEstate_192.jpg`}
              sx={{ width: 40, height: 40, marginRight: 2 }}
            />
            <Typography
              variant="h6"
              noWrap
              component="a"
              href="#app-bar-with-responsive-menu"
              sx={{
                flexGrow: 1,
                mr: 2,
                display: { xs: "none", md: "flex" },
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".3rem",
                color: "inherit",
                textDecoration: "none",
              }}
            >
              XRealEstate
            </Typography>
            <WalletActionButton />
          </Toolbar>
        </Container>
      </AppBar>

      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        {/* Slider Section */}
        <Carousel
          showArrows={true}
          infiniteLoop={true}
          autoPlay
          interval={3000}
        >
          <div>
            <img
              src={`${baseUrl}/assets/RealEstateAsset.jpeg`}
              alt="Tokenization of Real Estate"
            />
            <p className="legend">Tokenization of Real Estate</p>
          </div>
          <div>
            <img
              src={`${baseUrl}/assets/SecureDigitalIdentity.jpeg`}
              alt="Secure Digital Identity"
            />
            <p className="legend">Secure Digital Identity</p>
          </div>
          <div>
            <img src={`${baseUrl}/assets/Kyc.jpeg`} alt="KYC Compliance" />
            <p className="legend">KYC Compliance</p>
          </div>
        </Carousel>

        {/* Information Section */}
        <Grid2 container spacing={4} sx={{ mt: 4 }}>
          <Grid2 component="div">
            <Paper elevation={3} sx={{ padding: 3 }}>
              <Typography variant="h4" gutterBottom>
                Welcome to Real Estate Blockchain
              </Typography>
              <Typography variant="body1" paragraph>
                Explore the platform that allows you to manage real estate
                properties using blockchain technology. With our platform, you
                can verify digital identities, register real estate assets, and
                manage contracts securely and transparently.
              </Typography>
              {/* <Button
                variant="contained"
                color="primary"
                onClick={handleLearnMoreClick}
              >
                Learn More
              </Button> */}
            </Paper>
          </Grid2>

          {/* Contracts Information Section */}
          <Grid2 component="div">
            <Paper elevation={3} sx={{ padding: 3 }}>
              <Typography variant="h4" gutterBottom>
                Contract Management
              </Typography>
              <Typography variant="body1" paragraph>
                Our platform facilitates the management of contracts across
                various domains, including migration contracts, digital
                identity, and real estate assets.
              </Typography>
              <ul>
                <li>
                  Migrations:{" "}
                  <strong>(base58) TESwu1FFLbGLNB6JranN42DdSnji6yU1R3</strong>
                </li>
                <li>
                  DigitalIdentity:{" "}
                  <strong>(base58) TLMsMxLtt3wrarUs9JHbSC7oNpdb4FdAGJ</strong>
                </li>
                <li>
                  RealEstateToken:{" "}
                  <strong>(base58) TCfs2yAR2U1yjK8TyH49zjzWkpGumMSqFr</strong>
                </li>
                <li>
                  RealEstateAsset:{" "}
                  <strong>(base58) TNPFgBB2hBXHZPbJvh9uUmqciZuEtrPtTM</strong>
                </li>
                <li>
                  Market:{" "}
                  <strong>(base58) TBPLWiaL3eyZS2v6rpdpTTij3ftffKMS1E</strong>
                </li>
              </ul>
            </Paper>
          </Grid2>

          {/* Security and Transparency Section */}
          <Grid2 component="div">
            <Paper elevation={3} sx={{ padding: 3 }}>
              <Typography variant="h4" gutterBottom>
                Security and Transparency
              </Typography>
              <Typography variant="body1" paragraph>
                By utilizing blockchain, we ensure that every transaction is
                transparent and cryptographically secured. This protects your
                assets and ensures that only authorized parties can access the
                data.
              </Typography>
              {/* <Button variant="contained" color="secondary" sx={{ mt: 2 }}>
                Learn more about our security
              </Button> */}
            </Paper>
          </Grid2>

          {/* Join Our Platform Section */}
          <Grid2 component="div">
            <Paper elevation={3} sx={{ padding: 3 }}>
              <Typography variant="h4" gutterBottom>
                Join Our Platform
              </Typography>
              <Typography variant="body1" paragraph>
                Connect with your digital wallet and start managing your
                properties securely using blockchain technology. Our platform
                supports multiple wallets, including TronLink and WalletConnect.
              </Typography>
              <WalletActionButton />
            </Paper>
          </Grid2>
        </Grid2>
      </Container>

      {/* Snackbar for notifications */}
      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          onClose={handleSnackbarClose}
          severity="info"
          sx={{ width: "100%" }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </div>
  );
}
