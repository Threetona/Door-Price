import React, { useState, useEffect } from 'react';
import { Button, Grid, Typography, Paper } from '@mui/material';

const styles = {
    background: {
    height: '100vh',
    backgroundImage: `url("/image/layout-blank.png")`,
    backgroundPosition: 'center',
    backgroundSize: '100% 100%',
    backgroundRepeat: 'no-repeat',
    animation: 'waveAnimation 4s linear infinite',
    },
    text: {
    color: 'inherit',
    fontSize: '2em',
    fontWeight: 'bold',
    transition: 'font-size 1s ease-in-out',
    textAlign: 'center',
    animation: 'fadeIn 3s',
    },
    paper: {
        padding: '35px',
        background: 'rgba(255, 255, 255, 1.0)',
        animation: 'fadeIn 3s',
        borderRadius: '30px',
        transition: 'opacity 0.5s ease-in-out', 
        opacity: 1,
        margin: '0 auto', // Menengahkan elemen
        maxWidth: '1000px', // Sesuaikan dengan lebar maksimum yang diinginkan
    },    
    time: {
        fontSize: '30em',
        fontWeight: 'bold',
        color: '#07609a',
        margin: '0 auto',
        transition: 'font-size 1s ease-in-out',
        textAlign: 'center',
        animation: 'fadeIn 3s',
    }
};

const CountdownTimer2 = () => {
    const [countdown, setCountdown] = useState(11);

    useEffect(() => {
        const timer = setTimeout(() => {
            if (countdown > 0) {
                setCountdown(countdown - 1);
            }
        }, 1000)

        return () => clearTimeout(timer);
    }, [countdown]);

    return (
        <Grid
            container
            justifyContent="center"
            alignItems="center"
            sx={styles.background}
        >
            <Grid item>
                <div>
                    <Typography variant="h2" gutterBottom sx={styles.time}>
                        {`${countdown < 10 ? `0${countdown}` : countdown}`}
                    </Typography>
                </div>
            </Grid>
        </Grid>
    );
}

export default CountdownTimer2;