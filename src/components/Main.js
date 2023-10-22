import React, { useState } from 'react';
import { Button, Grid, Typography, Paper } from '@mui/material';
import '../styles.css';

const styles = {
    background: {
        height: '100vh',
        backgroundImage: `url("/image/banner-56.png")`,
        backgroundPosition: 'center',
        backgroundSize: '100% 100%',
        backgroundRepeat: 'no-repeat',
        animation: 'waveAnimation 4s linear infinite',
    },
    // inherit
    title: {
        fontSize: '3em',
        fontWeight: 'bold',
        color: '#07609a',
        textTransform: 'uppercase',
        animation: 'fadeIn 3s',
        marginTop: '-96px',
        animationName: 'zoomIn', // Mulai dengan animasi zoom in
        animationDuration: '5s',
        animationIterationCount: 'infinite',
        animationDirection: 'alternate',
    },
    text: {
        color: '#07609a',
        fontSize: '10em',
        fontWeight: 'bold',
        transition: 'font-size 1s ease-in-out',
        textAlign: 'center',
        animation: 'fadeIn 3s',
    },
    ribbon: {
        position: 'absolute',
        transition: 'transform 1s, opacity 1s',
    },
    ribbonActive: {
        transform: 'translate(-50%, -50%) scale(2)',
        opacity: 0,
    },
};

function Main() {
    const [doorPrizeNumber, setDoorPrizeNumber] = useState('0000');
    const [isAutoRandomizing, setIsAutoRandomizing] = useState(false);
    const [usedNumbers, setUsedNumbers] = useState([]);

    const startAutoRandomizing = () => {
        setIsAutoRandomizing(true);

        // Mengatur interval pengacakan dengan setInterval
        const randomizeInterval = setInterval(() => {
            const randomDoorPrize = generateRandomNumber();

            setDoorPrizeNumber(randomDoorPrize);
        }, 100);

        // Menghentikan pengacakan setelah 5 detik (5000 milidetik)
        setTimeout(() => {
            stopAutoRandomizing(randomizeInterval);
        }, 5000);
    };

    const stopAutoRandomizing = (intervalId) => {
        setIsAutoRandomizing(false);
        // Menghentikan pengacakan dengan clearInterval
        clearInterval(intervalId);
    };

    const generateRandomNumber = () => {
        let randomDoorPrize;
        do {
            randomDoorPrize = formatNumber(
                Math.floor(Math.random() * 5000) + 1,
            );
        } while (usedNumbers.includes(randomDoorPrize));

        // Tandai nomor yang sudah diundi
        setUsedNumbers([...usedNumbers, randomDoorPrize]);
        return randomDoorPrize;
    };

    const formatNumber = (number) => {
        // Mengubah nomor menjadi format '0000'
        return String(number).padStart(4, '0');
    };

    return (
        <Grid
            container
            justifyContent="center"
            alignItems="center"
            sx={styles.background}
        >
            <Grid item>
                <Typography variant="h4" gutterBottom sx={styles.title}>
                    Undian Door Prize
                </Typography>
                <Paper
                    elevation={4}
                    style={{
                        padding: '70px',
                        background: 'rgba(255, 255, 255, 0.9)',
                        animation: 'fadeIn 3s',
                        borderRadius: '30px',
                    }}
                >
                    {/* <Typography variant="h4" gutterBottom sx={styles.title}>
                        Undian Door Prize
                    </Typography> */}
                    <Typography variant="h2" gutterBottom sx={styles.text}>
                        {doorPrizeNumber}
                    </Typography>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={startAutoRandomizing}
                        disabled={isAutoRandomizing}
                    >
                        Acak Otomatis
                    </Button>
                    {/* <Button variant="contained" color="primary" onClick={stopAutoRandomizing} disabled={!isAutoRandomizing}>
                        Berhenti Acak
                    </Button> */}
                </Paper>
            </Grid>
        </Grid>
    );
}

export default Main;
