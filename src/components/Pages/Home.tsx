import React from 'react';
import { Container, Typography, Grid, Card, CardMedia } from '@mui/material';

const Home: React.FC = () => {
  return (
    <Container sx={{ marginTop: '1rem' }}>
      <Typography variant="h4" gutterBottom>
        Welcome to Restaurant DSR
      </Typography>
      <Typography variant="body1" gutterBottom sx={{ fontStyle: 'italic', fontSize: 20 }}>
        Since 1998, DSR has been providing services for the preparation of complex dishes for companies of any level, from startups to world-famous brands. In cooperation, we become part of the client's team, his goal becomes ours.
      </Typography>
      <Grid container spacing={2} sx={{ marginTop: '1rem' }}>
        <Grid item xs={6}>
          <Card sx={{ maxWidth: '100%', height: '100%' }}>
            <CardMedia
              component="img"
              height="auto"
              image="https://sun9-35.userapi.com/impg/Jra9wuwxOyfAjvS1JGlQL_ZLVptmsAP6F7klfg/07k2LWUuhEs.jpg?size=1920x948&quality=95&sign=eb88e26d4de6c8817ccff8a09989c44f&type=album"
              alt="Restaurant DSR 1"
            />
          </Card>
        </Grid>
        <Grid item xs={6}>
          <Card sx={{ maxWidth: '100%', height: '100%' }}>
            <CardMedia
              component="img"
              height="auto"
              image="https://sun9-61.userapi.com/impg/nT3gf-994nyzyFUDwAUdMaNo7JLJxSnMFOdn9A/FHZ56RiL5P4.jpg?size=1920x948&quality=95&sign=2de0efdb873f874a0b9ee0e4c9b13c8b&type=album"
              alt="Restaurant DSR 2"
            />
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Home;
