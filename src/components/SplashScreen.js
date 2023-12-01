import React, { useEffect } from 'react';
import { Grid } from '@mui/material';

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
        const currentDate = new Date();
        const targetDate2 = new Date('2023-12-01'); // Ganti dengan tanggal yang diinginkan
        const targetDate3 = new Date('2023-12-03'); // Ganti dengan tanggal yang diinginkan

        const splashTimeout = setTimeout(() => {
            // Memeriksa tanggal hari ini
            if (currentDate.toDateString() === targetDate2.toDateString()) {
                // Jika tanggal hari ini sama dengan tanggal 2, arahkan ke '/question'
                window.location.href = '/question';
            } else if (
                currentDate.toDateString() === targetDate3.toDateString()
            ) {
                // Jika tanggal hari ini sama dengan tanggal 3, arahkan ke '/doorprize'
                window.location.href = '/doorprize';
            } else {
                // Tambahkan logika untuk tanggal lain jika diperlukan
                // Misalnya, arahkan ke halaman default
                window.location.href = '/';
            }
        }, 5000); // Splash screen ditampilkan selama 5 detik

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
