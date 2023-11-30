import React, { useState, useEffect } from 'react';
import { Grid, Typography } from '@mui/material';
import '../styles.css';

const styles = {
    background: {
        height: '100vh',
        backgroundImage: `url("/image/bahan/bg-doorprize.png")`,
        backgroundPosition: 'center',
        backgroundSize: '100% 100%',
        backgroundRepeat: 'no-repeat',
        animation: 'waveAnimation 4s linear infinite',
    },
    text: {
        color: '#07609a',
        fontSize: '26em',
        fontWeight: 'bold',
        margin: '20px auto', // Atur margin atas dan bawah sebanyak 20px
        transition: 'font-size 1s ease-in-out',
        textAlign: 'center',
        animation: 'fadeIn 3s',
    },
};

function Main() {
    const [doorPrizeNumber, setDoorPrizeNumber] = useState('0000');
    // eslint-disable-next-line no-unused-vars
    const [isAutoRandomizing, setIsAutoRandomizing] = useState(false);
    const [usedNumbers, setUsedNumbers] = useState([]);

    const startAutoRandomizing = () => {
        setIsAutoRandomizing(true);

        const randomizeInterval = setInterval(() => {
            const randomDoorPrize = generateRandomNumber();
            setDoorPrizeNumber(randomDoorPrize);
        }, 100);

        setTimeout(() => {
            stopAutoRandomizing(randomizeInterval);
        }, 20000);
    };

    const stopAutoRandomizing = (intervalId) => {
        setIsAutoRandomizing(false);
        clearInterval(intervalId);
    };

    const generateRandomNumber = () => {
        let randomDoorPrize;
        do {
            randomDoorPrize = formatNumber(
                Math.floor(Math.random() * 5000) + 1,
            );
        } while (usedNumbers.includes(randomDoorPrize));

        setUsedNumbers([...usedNumbers, randomDoorPrize]);
        return randomDoorPrize;
    };

    const formatNumber = (number) => {
        return String(number).padStart(4, '0');
    };

    const handleKeyPress = (event) => {
        if (event.key === 'm' || event.key === 'M') {
            startAutoRandomizing();
        } else if (event.key === ' ') {
            setDoorPrizeNumber('0000');
        }
    };

    useEffect(() => {
        window.addEventListener('keypress', handleKeyPress);

        return () => {
            window.removeEventListener('keypress', handleKeyPress);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

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
