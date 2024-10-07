import React from 'react';
import { AppBar, Toolbar, Typography, Box, Button, Container, Grid, Paper } from '@mui/material';
import { Link } from "react-router-dom";
import { WalletActionButton } from '@tronweb3/tronwallet-adapter-react-ui';
export default function HomePage(){
  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Real Estate
          </Typography>
          <WalletActionButton />
        </Toolbar>
      </AppBar>

      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Paper elevation={3} sx={{ padding: 3 }}>
              <Typography variant="h4" gutterBottom>
                Bienvenido a Real Estate Blockchain
              </Typography>
              <Typography variant="body1">
                Explora la plataforma que te permite gestionar propiedades inmobiliarias utilizando la tecnología blockchain.
                Con nuestra plataforma, puedes verificar identidades digitales, registrar activos inmobiliarios y gestionar contratos de forma segura y transparente.
              </Typography>
              <Button variant="contained" color="primary" sx={{ mt: 2 }}>
                Descubre más
              </Button>
            </Paper>
          </Grid>

          {/* Sección 2: Información sobre contratos */}
          <Grid item xs={12}>
            <Paper elevation={3} sx={{ padding: 3 }}>
              <Typography variant="h4" gutterBottom>
                Gestión de Contratos
              </Typography>
              <Typography variant="body1">
                Nuestra plataforma facilita la gestión de contratos en diferentes ramas, incluidos los contratos de migración, identidad digital y activos inmobiliarios.
              </Typography>
              <ul>
                <li>Migrations: (base58) TDoxmTzZZts9tuRQ9nTjxdNYAcPH368RHA</li>
                <li>DigitalIdentity: (base58) TARU1xhmYe6YaEtEL6ePieQN1RHir64G4y</li>
                <li>RealEstateToken: (base58) THVysASgtBi78LEiFKefCZrWyD9eF1fyeH</li>
                <li>RealEstateAsset: (base58) TXDqbGMwwfvb5iwhrXvGjQwpaCcRGXnXNw</li>
                <li>Market: (base58) TYyptmmn7fP8FkAmPT9QzLTjFTf3pxrbaq</li>
              </ul>
            </Paper>
          </Grid>

          {/* Sección 3: Seguridad y Transparencia */}
          <Grid item xs={12}>
            <Paper elevation={3} sx={{ padding: 3 }}>
              <Typography variant="h4" gutterBottom>
                Seguridad y Transparencia
              </Typography>
              <Typography variant="body1">
                Al utilizar blockchain, garantizamos que cada transacción sea transparente y esté asegurada criptográficamente. Esto protege tus activos y asegura que solo las partes autorizadas puedan acceder a los datos.
              </Typography>
              <Button variant="contained" color="secondary" sx={{ mt: 2 }}>
                Aprende más sobre nuestra seguridad
              </Button>
            </Paper>
          </Grid>

          {/* Sección 4: Participa en nuestra plataforma */}
          <Grid item xs={12}>
            <Paper elevation={3} sx={{ padding: 3 }}>
              <Typography variant="h4" gutterBottom>
                Únete a nuestra plataforma
              </Typography>
              <Typography variant="body1">
                Conéctate con tu cartera digital y comienza a gestionar tus propiedades de forma segura con la tecnología blockchain. Nuestra plataforma es compatible con múltiples wallets, incluyendo TronLink y WalletConnect.
              </Typography>
              <WalletActionButton />
            </Paper>
          </Grid>
        </Grid>
      </Container>
        {/* <Link to="/landing" style={{ textDecoration: 'none' }}>
                <Button variant="contained" color="primary" sx={{ mt: 2 }}>
                  Ir a Landing
                </Button>
        </Link> */}
    </div>
  );
};