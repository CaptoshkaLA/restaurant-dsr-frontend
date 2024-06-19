import React, { useState, useEffect } from 'react';
import { Container, Typography, Grid, Box, Button } from '@mui/material';
import { GoogleMap, Marker, useLoadScript } from '@react-google-maps/api';
import { YMaps, Map, Placemark } from '@pbe/react-yandex-maps';

const mapContainerStyle = {
  width: '100%',
  height: '400px',
  marginBottom: '2rem',
};

// Coordinates of the Voronezh DSR office
const center = {
  lat: 51.6625757,
  lng: 39.183439,
};

const ContactInfo: React.FC = () => {
  const [mapType, setMapType] = useState<'google' | 'yandex'>('google');
  const googleMapsApiKey = process.env.REACT_APP_GOOGLE_MAPS_API_KEY || '';
  const yandexMapsApiKey = process.env.REACT_APP_YANDEX_MAPS_API_KEY || '';

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey,
  });

  useEffect(() => {
    // Temporary workaround to suppress defaultProps warning
    const originalConsoleError = console.error;
    console.error = (message: string, ...args: any[]) => {
      if (typeof message === 'string' && message.includes('defaultProps will be removed')) {
        return;
      }
      originalConsoleError(message, ...args);
    };

    return () => {
      // Restore original console.error
      console.error = originalConsoleError;
    };
  }, []);

  if (loadError) return <Typography>Error loading maps</Typography>;

  return (
    <Container sx={{ marginTop: '1rem' }}>
      <Typography variant="h4" gutterBottom>
        Contacts
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <Typography variant="h6" gutterBottom sx={{ marginTop: '2rem' }}>
            Restaurant address
          </Typography>
          <Typography>
            ДЦ "Тезис", Ulitsa Svobody, 69, Voronezh, Voronezh Oblast, 394006
          </Typography>
          <Typography variant="h6" gutterBottom sx={{ marginTop: '2rem' }}>
            Contact info
          </Typography>
          <Typography>
            Phone number: +8 (473) 277-92-27
          </Typography>
          <Typography>
            Email: contact@dsr-corporation.com
          </Typography>
          <Typography variant="h6" gutterBottom sx={{ marginTop: '2rem' }}>
            Working hours
          </Typography>
          <Typography>
            9:00 A.M. - 6:00 PM
          </Typography>
        </Grid>
        <Grid item xs={12} md={6}>
          <Box display="flex" justifyContent="center" marginBottom={2}>
            <Button
              variant={mapType === 'google' ? 'contained' : 'outlined'}
              onClick={() => setMapType('google')}
              sx={{ marginRight: 1 }}
            >
              Google Maps
            </Button>
            <Button
              variant={mapType === 'yandex' ? 'contained' : 'outlined'}
              onClick={() => setMapType('yandex')}
            >
              Yandex Maps
            </Button>
          </Box>
            {mapType === 'google' && isLoaded ? (
              <GoogleMap mapContainerStyle={mapContainerStyle} center={center} zoom={10}>
                <Marker position={center} />
              </GoogleMap>
            ) : mapType === 'yandex' ? (
                <YMaps query={{ apikey: yandexMapsApiKey, load: 'package.full' }}>
              <Map defaultState={{ center: [center.lat, center.lng], zoom: 10 }} style={mapContainerStyle}>
                <Placemark geometry={[center.lat, center.lng]} />
              </Map>
            </YMaps>
            ) : (
                <Typography>Loading...</Typography>
          )}
        </Grid>
      </Grid>
    </Container>
  );
};

export default ContactInfo;
