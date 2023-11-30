import React, { useState, useEffect } from 'react';
import { Grid } from '@mui/material';

const styles = {
    background: {
        height: '100vh',
        backgroundImage: `url("/image/bahan/bg-masak.png")`,
        backgroundPosition: 'center',
        backgroundSize: '100% 100%',
        backgroundRepeat: 'no-repeat',
        animation: 'waveAnimation 4s linear infinite',
    },
    winnerImage: {
        width: '100%',
        height: 'auto',
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        opacity: 0,
        transition: 'opacity 1s ease-in-out',
    },
};

const winnerImages = ['/logo192.png', '/logo512.png'];

function ShowWinner() {
    const [currentImageIndex, setCurrentImageIndex] = useState(null);

    useEffect(() => {
        const handleKeyPress = (event) => {
            if (event.key === '1') {
                setCurrentImageIndex(0);
            } else if (event.key === '2') {
                setCurrentImageIndex(1);
            }
        };

        // Menambahkan event listener untuk tombol "1" dan "2"
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
            {/* Menampilkan gambar latar belakang */}
            <img
                src={styles.background}
                alt="Background"
                style={{
                    ...styles.winnerImage,
                    zIndex: currentImageIndex !== null ? 0 : -1,
                }}
            />

            {/* Menampilkan gambar pemenang */}
            {currentImageIndex !== null && (
                <img
                    src={winnerImages[currentImageIndex]}
                    alt={`Winner ${currentImageIndex + 1}`}
                    style={styles.winnerImage}
                />
            )}
        </Grid>
    );
}

export default ShowWinner;
