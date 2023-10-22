import React, { useEffect } from 'react';
import { Grid, Typography, Button } from '@mui/material';

const styles = {
    background: {
        height: '100vh',
        backgroundImage: `url("/image/banner-56.png")`,
        backgroundPosition: 'center',
        backgroundSize: '100% 100%',
        backgroundRepeat: 'no-repeat',
        animation: 'waveAnimation 4s linear infinite',
    },
};

const SplashScreen = () => {
    useEffect(() => {
        const splashTimeout = setTimeout(() => {
            window.location.href = '/main';
        }, 50000); // Splash screen ditampilkan selama 50 detik

        return () => {
            clearTimeout(splashTimeout);
        };
    }, []);

    return (
        <Grid
            container
            justifyContent="center"
            alignItems="center"
            sx={styles.background}
        ></Grid>
    );
};

export default SplashScreen;
