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
        <Grid item xs={6}>
          <Card sx={{ maxWidth: '100%', height: '100%' }}>
            <CardMedia
              component="img"
              height="auto"
              image="https://sun1-27.userapi.com/impf/QOOReQmDv7qLNMJgEOLPQSezfTyC4VHPCCwBrg/qtSYj4yfZ-w.jpg?quality=95&as=32x16,48x24,72x36,108x53,160x79,240x118,360x178,480x237,540x267,640x316,720x355,1080x533,1280x632,1440x711,1920x948&sign=4d375d5903d4ff3601c14c6cb85dc638&from=bu&u=MwbAxziC-DGvspWRgFi-eI7nnzhquYhvB48sCDbzEN0&cs=604x298"
              alt="Restaurant DSR 3"
            />
          </Card>
        </Grid>
        <Grid item xs={6}>
          <Card sx={{ maxWidth: '100%', height: '100%' }}>
            <CardMedia
              component="img"
              height="auto"
              image="https://sun9-64.userapi.com/impf/W0gOj5r9Jf5-S-7nfxzPHQC3W04BXjbhcqLejA/mcsAe6IMHQ0.jpg?quality=95&as=32x16,48x24,72x36,108x53,160x79,240x118,360x178,480x237,540x267,640x316,720x355,1080x533,1280x632,1440x711,1920x948&sign=3f48efc6bdd02bc65b81965fc4daa4e9&from=bu&u=NxBigkNX0OrOCE_DZqN3cTi5BlRhSzhG_7L9G6q7JQg&cs=604x298"
              alt="Restaurant DSR 4"
            />
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Home;
