import React, { useState, useEffect, useRef } from 'react';
import { Grid, Typography } from '@mui/material';

const styles = {
  background: {
    height: '100vh',
    backgroundImage: `url("/image/layout-ranking.png")`,
    backgroundPosition: 'center',
    backgroundSize: '100% 100%',
    backgroundRepeat: 'no-repeat',
    animation: 'waveAnimation 4s linear infinite',
  },
  time: {
    fontSize: '30em',
    fontWeight: 'bold',
    color: '#07609a',
    margin: '0 auto',
    transition: 'font-size 1s ease-in-out',
    textAlign: 'center',
    animation: 'fadeIn 3s',
  },
};

const CountdownTimer2 = () => {
  const [countdown, setCountdown] = useState(20);
  const intervalRef = useRef(null);
  const audioRef = useRef(new Audio('/sound/times-up.mp4'));

  useEffect(() => {
    const handleKeyPress = (event) => {
      if (event.key === 'm' || event.key === 'M') {
        // Hanya mulai countdown jika belum ada interval yang berjalan
        if (!intervalRef.current) {
          startCountdown();
        }
      } else if (event.key === 'b' || event.key === 'B') {
        // Hentikan countdown jika tombol 'b' atau 'B' ditekan
        stopCountdown();
      }
    };

    window.addEventListener('keypress', handleKeyPress);

    return () => {
      window.removeEventListener('keypress', handleKeyPress);
    };
  }, []);

    const startCountdown = () => {
        intervalRef.current = setInterval(() => {
            setCountdown((prevCountdown) => {
                console.log('prevCountdown:', prevCountdown); // Tambahkan ini
                if (prevCountdown > 0) {
                    // Mainkan suara setiap kali nomor berubah
                    if (prevCountdown !== countdown) {
                        audioRef.current.play();
                    }
            
                    // Jalankan audio jika countdown mencapai 2
                    if (prevCountdown === 2) {
                        audioRef.current.play();
                    }
            
                    return prevCountdown - 1;
                } else {
                    // Countdown selesai, hentikan interval
                    clearInterval(intervalRef.current);
                    intervalRef.current = null; // Nolkan referensi interval
                    return 0;
                }
            });
        }, 1000);
    };
  

  const stopCountdown = () => {
    // Hentikan countdown dan reset nilai
    clearInterval(intervalRef.current);
    intervalRef.current = null;
    setCountdown(10);
  };

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
};

export default CountdownTimer2;
