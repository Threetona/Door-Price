import React, { useState } from 'react';
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
        color: 'inherit', // Gunakan warna yang sama dengan tombol
    },
    text2: {
        // color: '#1976D2',
        color: 'inherit',
        fontWeight: 'bold', // Mengatur teks menjadi tebal
        textTransform: 'uppercase', // Mengatur teks menjadi huruf kapital
        transition: 'background-color 0.5s ease-in-out',
    },
};

function Main() {
    const [doorPrizeNumber, setDoorPrizeNumber] = useState(null);
    const [isAutoRandomizing, setIsAutoRandomizing] = useState(false);

    const startAutoRandomizing = () => {
        setIsAutoRandomizing(true);

        // Mengatur interval pengacakan dengan setInterval
        const randomizeInterval = setInterval(() => {
            const randomDoorPrize = Math.floor(Math.random() * 5000) + 1;
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
                        {/* {doorPrizeNumber || 'Klik "Acak Otomatis" untuk memulai'} */}
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
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={stopAutoRandomizing}
                        disabled={!isAutoRandomizing}
                    >
                        Berhenti Acak
                    </Button>
                </Paper>
            </Grid>
        </Grid>
    );
}

export default Main;
