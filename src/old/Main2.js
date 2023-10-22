import React, { useState, useEffect } from 'react';
import { Button, Grid, Typography, Paper } from '@mui/material';
import { useTheme } from '@mui/material/styles';

const styles = {
    background: {
        height: '100vh',
        backgroundImage: `url("/image/banner-56.png")`,
        backgroundPosition: 'center',
        backgroundSize: '100% 100%',
        backgroundRepeat: 'no-repeat',
        animation: 'waveAnimation 4s linear infinite',
    },
    text: {
        color: 'inherit',
    },
    text2: {
        color: 'inherit',
        fontWeight: 'bold',
        textTransform: 'uppercase',
        transition: 'background-color 0.5s ease-in-out',
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

    const theme = useTheme();

    return (
        <Grid
            container
            justifyContent="center"
            alignItems="center"
            sx={styles.background}
        >
            <Grid item>
                <Paper
                    elevation={4}
                    style={{
                        padding: '60px',
                        background: 'rgba(255, 255, 255, 0.9)',
                    }}
                >
                    <Typography variant="h4" gutterBottom sx={styles.text}>
                        Nomor Undian Door Prize
                    </Typography>
                    <Typography variant="h2" gutterBottom sx={styles.text2}>
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
