import React from 'react';
import { Container, Typography, Grid } from '@mui/material';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

const mapContainerStyle = {
  width: '100%',
  height: '400px',
};

// Координаты воронежского офиса dsr
const center = {
  lat: 51.6625757,
  lng: 39.183439,
};

const ContactInfo: React.FC = () => {

  return (
    <Container sx={{ marginTop: '1rem' }}>
      <Typography variant="h4" gutterBottom>
        Контакты
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <Typography variant="h6" gutterBottom>
            Restaurant address
          </Typography>
          <Typography>
            ДЦ "Тезис", Ulitsa Svobody, 69, Voronezh, Voronezh Oblast, 394006
          </Typography>
          <Typography variant="h6" gutterBottom>
            Contact info
          </Typography>
          <Typography>
            Phone number: +8 (473) 277-92-27
          </Typography>
          <Typography>
            Email: contact@dsr-corporation.com
          </Typography>
          <Typography variant="h6" gutterBottom>
            Working hours
          </Typography>
          <Typography>
            9:00 A.M. - 6:00 PM
          </Typography>
        </Grid>
        <Grid item xs={12} md={6}>
          <LoadScript googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY || ''}>
            <GoogleMap mapContainerStyle={mapContainerStyle} center={center} zoom={10}>
              <Marker position={center} />
            </GoogleMap>
          </LoadScript>
        </Grid>
      </Grid>
    </Container>
  );
};

export default ContactInfo;
