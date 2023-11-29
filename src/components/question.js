import React, { useState, useEffect } from 'react';
import { Button, Grid, Typography } from '@mui/material';
import bankerQuestions from '../data-dummy/bankerQuestion.json';

const styles = {
    background: {
      height: '100vh',
      backgroundImage: `url("/image/layout-question.png")`,
      backgroundPosition: 'center',
      backgroundSize: '100% 100%',
      backgroundRepeat: 'no-repeat',
      animation: 'waveAnimation 4s linear infinite',
    },
    text: {
      color: 'inherit',
      fontSize: '2em',
      fontWeight: 'bold',
      margin: '35px 0px', // Atur margin atas dan bawah
      transition: 'font-size 1s ease-in-out',
      textAlign: 'center',
      animation: 'fadeIn 3s',
    },
    text2: {
      color: 'inherit',
      fontSize: '2em',
      fontWeight: 'bold',
      margin: '40px 0', // Atur margin atas dan bawah
      transition: 'font-size 1s ease-in-out',
      textAlign: 'center',
      animation: 'fadeIn 3s',
    },
    text3: {
      color: 'inherit',
      fontSize: '4em',
      fontWeight: 'bold',
      margin: '30px 0', // Atur margin atas dan bawah
      transition: 'font-size 1s ease-in-out',
      textAlign: 'center',
      animation: 'fadeIn 3s',
    },
    text4: {
        color: 'inherit',
        fontSize: '4em',
        fontWeight: 'bold',
        margin: '30px 0', // Atur margin atas dan bawah
        transition: 'font-size 1s ease-in-out',
        textAlign: 'center',
        animation: 'fadeIn 3s',
    },
  };

function Question() {
  const [countdown, setCountdown] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const [showQuestion, setShowQuestion] = useState(true);
  const [currentQuestion, setCurrentQuestion] = useState(0);

  useEffect(() => {
    // Set countdown sesuai waktu yang diberikan untuk pertanyaan saat ini
    setCountdown(bankerQuestions[currentQuestion].time);

    const timer = setInterval(() => {
      setCountdown((prevCountdown) => {
        if (prevCountdown > 0) {
          return prevCountdown - 1;
        } else {
          setShowAnswer(true);
          setShowQuestion(true);
          clearInterval(timer); // Hentikan timer ketika waktu habis
          return prevCountdown; // Tetapkan ke nilai yang sama agar tidak menjadi negatif
        }
      });
    }, 1000);

    return () => {
      clearInterval(timer); // Hentikan timer saat komponen unmount
    };
  }, [currentQuestion]);

  const handleNextQuestion = () => {
    const nextQuestion = currentQuestion + 1;

    if (nextQuestion < bankerQuestions.length) {
      setCurrentQuestion(nextQuestion);
      // Set countdown sesuai waktu yang diberikan untuk pertanyaan berikutnya
      setCountdown(bankerQuestions[nextQuestion].time);
      setShowAnswer(false);
      setShowQuestion(true);
    } else {
      console.log('Permainan Selesai!');
    }
  };

  return (
    <Grid
      container
      justifyContent="center"
      alignItems="center"
      sx={styles.background}
    >
      <Grid item>
          {showQuestion && (
            <div>
              <Typography variant="h5" gutterBottom sx={styles.text}>
                {bankerQuestions[currentQuestion].category} - Pertanyaan #{bankerQuestions[currentQuestion].questionNumber}
              </Typography>
              <Typography variant="h5" gutterBottom sx={styles.text2}>
                {bankerQuestions[currentQuestion].question}
              </Typography>
            </div>
          )}
          <Typography
            variant="h4"
            gutterBottom
            sx={styles.text3}
            style={{ animation: showAnswer ? 'fadeIn 3s' : 'fadeOut 3s' }}
          >
            {showAnswer ? `Jawaban: ${bankerQuestions[currentQuestion].answer}` : '.....'}
          </Typography>
          <Typography
            variant="h4"
            gutterBottom
            sx={styles.text3}
            style={{ animation: showAnswer ? 'fadeIn 3s' : 'fadeOut 3s' }}
          >
            {countdown < 10 ? `0${countdown}` : countdown}
          </Typography>
          {showAnswer && (
            <Button variant="contained" color="primary" onClick={handleNextQuestion}>
              Next
            </Button>
          )}
      </Grid>
    </Grid>
  );
}

export default Question;
