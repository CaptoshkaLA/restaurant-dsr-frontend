import React from 'react';
import { Container, Typography } from '@mui/material';

const Home: React.FC = () => {
  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Welcome to Restaurant DSR
      </Typography>
      <Typography variant="body1" gutterBottom>
        We offer the finest cuisine with a cozy atmosphere.
      </Typography>
      {/* Add more content about the restaurant here */}
    </Container>
  );
};

export default Home;
