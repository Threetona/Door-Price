import React, { useState, useEffect } from 'react';
import { Grid, Typography } from '@mui/material';
import '../styles.css';

const styles = {
    background: {
        height: '100vh',
        backgroundImage: `url("/image/Layou-DOOR-PRIZE.png")`,
        backgroundPosition: 'center',
        backgroundSize: '100% 100%',
        backgroundRepeat: 'no-repeat',
        animation: 'waveAnimation 4s linear infinite',
    },
    text: {
        color: '#07609a',
        fontSize: '28em',
        fontWeight: 'bold',
        margin: '0 auto',
        transition: 'font-size 1s ease-in-out',
        textAlign: 'center',
        animation: 'fadeIn 3s',
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

        // Menghentikan pengacakan setelah 20 detik (20000 milidetik)
        setTimeout(() => {
        stopAutoRandomizing(randomizeInterval);
        }, 20000);
    };

    const stopAutoRandomizing = (intervalId) => {
        setIsAutoRandomizing(false);
        // Menghentikan pengacakan dengan clearInterval
        clearInterval(intervalId);
    };

    const generateRandomNumber = () => {
        let randomDoorPrize;
        do {
        randomDoorPrize = formatNumber(Math.floor(Math.random() * 5000) + 1);
        } while (usedNumbers.includes(randomDoorPrize));

        // Tandai nomor yang sudah diundi
        setUsedNumbers([...usedNumbers, randomDoorPrize]);
        return randomDoorPrize;
    };

    const formatNumber = (number) => {
        // Mengubah nomor menjadi format '0000'
        return String(number).padStart(4, '0');
    };

    useEffect(() => {
        const handleKeyPress = (event) => {
        if (event.key === 'm' || event.key === 'M') {
            startAutoRandomizing();
        }
        };

        // Menambahkan event listener untuk tombol 'M'
        window.addEventListener('keypress', handleKeyPress);

        // Membersihkan event listener setelah komponen di-unmount
        return () => {
        window.removeEventListener('keypress', handleKeyPress);
        };
    }, []); // Efek ini hanya dijalankan sekali saat komponen dimount

    return (
        <Grid
            container
            justifyContent="center"
            alignItems="center"
            sx={styles.background}
        >
            <Grid item>
                <div>
                    <Typography variant="h2" gutterBottom sx={styles.text}>
                        {doorPrizeNumber}
                    </Typography>
                </div>
            </Grid>
        </Grid>
    );
}

export default Main;
