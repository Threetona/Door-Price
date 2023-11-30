import React, { useState, useRef, useEffect } from 'react';
import { Button, Grid, Typography, Paper } from '@mui/material';
import bankerQuestions from '../data-dummy/bankerQuestion.json';

const styles = {
  background: {
    height: '100vh',
    backgroundImage: `url("/image/bahan/bg-ranking1.png")`,
    backgroundPosition: 'center',
    backgroundSize: '100% 100%',
    backgroundRepeat: 'no-repeat',
    animation: 'waveAnimation 4s linear infinite',
  },
  
  text: {
    color: 'inherit',
    fontSize: '5em',
    fontWeight: 'bold',
    margin: 'auto',
    textAlign: 'center',
    animation: 'fadeIn 3s',
    lineHeight: 1.2,
  },
  textTime: {
    color: 'inherit',
    margin: 'auto',
    fontSize: '5em',
    fontWeight: 'bold',
    textAlign: 'center',
    animation: 'fadeIn 3s',
    lineHeight: 1.2,
  },

  timerPaper: {
    width: '110px',
    height: '110px',
    padding: '10px',
    background: 'rgba(255, 255, 255, 1.0)',
    animation: 'fadeIn 3s, slideInUp 2s',
    borderRadius: '50px',
    opacity: 1,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: '20px',
  },
  
  questionPaper: {
    width: '1500px',
    height: '600px',
    padding: '20px',
    background: 'rgba(255, 255, 255, 1.0)',
    animation: 'fadeIn 3s, slideInUp 2s',
    borderRadius: '15px',
    opacity: 1,
    marginTop: '20px',
    marginBottom: '0px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },

  answerPaper: {
    padding: '20px',
    background: 'rgba(255, 255, 255, 1.0)',
    animation: 'fadeIn 3s',
    borderRadius: '15px',
    opacity: 1,
    marginTop: '20px',
  },

  button: {
    marginTop: '20px',
  },
};

function Question() {
  const [countdown, setCountdown] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const [nextButtonClicked, setNextButtonClicked] = useState(false);
  const [showQuestion, setShowQuestion] = useState(true);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [gameStarted, setGameStarted] = useState(false);
  const timerRef = useRef(null);

  const audioRef = useRef(new Audio('/sound/alert.m4a'));
  const audioAnswer = useRef(new Audio('/sound/answer.m4a'));

  const [timerStarted, setTimerStarted] = useState(false);

  const startTimer = () => {
    clearInterval(timerRef.current);

    if (gameStarted && timerStarted) {
      timerRef.current = setInterval(() => {
        setCountdown((prevCountdown) => {
          if (prevCountdown > 0) {
            return prevCountdown - 1;
          } else {
            clearInterval(timerRef.current);
            audioRef.current.play();
            setShowAnswer(true);
            setShowQuestion(true);
            return prevCountdown;
          }
        });
      }, 1000);
    }
  };

  useEffect(() => {
    if (gameStarted && timerStarted) {
      setCountdown(bankerQuestions[currentQuestion].time);

      timerRef.current = setInterval(() => {
        setCountdown((prevCountdown) => {
          if (prevCountdown > 0) {
            return prevCountdown - 1;
          } else {
            clearInterval(timerRef.current);
            audioRef.current.play();
            setShowAnswer(false);
            setShowQuestion(true);
            return prevCountdown;
          }
        });
      }, 1000);

      return () => {
        clearInterval(timerRef.current);
      };
    }
  }, [currentQuestion, gameStarted, timerStarted]);

  const handleStartGame = () => {
    setGameStarted(true);
    setCountdown(bankerQuestions[currentQuestion].time);
    setShowQuestion(true);

    clearInterval(timerRef.current);
  };

  const handleNextQuestion = () => {
    const nextQuestion = currentQuestion + 1;

    if (nextQuestion < bankerQuestions.length) {
      setCurrentQuestion(nextQuestion);
      setCountdown(bankerQuestions[nextQuestion].time);
      setShowAnswer(false);
      setShowQuestion(true);
      setTimerStarted(false);

      clearInterval(timerRef.current);

       // Set nextButtonClicked menjadi true saat tombol "Next Question" ditekan
        setNextButtonClicked(true);

        // Reset nextButtonClicked setelah beberapa detik untuk mengaktifkan kembali animasi
        setTimeout(() => {
            setNextButtonClicked(false);
        }, 2000); // Sesuaikan durasi sesuai kebutuhan

    } else {
      console.log('Permainan Selesai!');
      clearInterval(timerRef.current);
    }
  };

  const handleStartTimer = () => {
    clearInterval(timerRef.current);
    setTimerStarted(true);
    startTimer();
  };

  const handleShowAnswer = () => {
    setShowAnswer(true);
    audioAnswer.current.play();
  };

  return (
    <Grid
      container
      justifyContent="center"
      alignItems="center"
      sx={styles.background}
    >
      <Grid item sx={{ marginTop: '190px' }}>
        {!gameStarted ? (
          <Button
            variant="contained"
            color="primary"
            onClick={handleStartGame}
            sx={{ ...styles.button, marginRight: '10px' }}
          >
            Start Game
          </Button>
        ) : (
          <>
            <Paper elevation={4} style={styles.timerPaper}>
              <Typography
                variant="h4"
                gutterBottom
                sx={styles.textTime}
                style={{ animation: showAnswer ? 'fadeIn 3s' : 'fadeOut 3s' }}
              >
                {countdown < 10 ? `0${countdown}` : countdown}
              </Typography>
            </Paper>

            <Paper elevation={4} style={styles.questionPaper}>
              {showQuestion && (
                <div>
                   <Typography variant="h5" gutterBottom sx={styles.text} style={{
                        // Menambahkan animasi slideInUp saat nextButtonClicked true
                        animation: `fadeIn 3s, ${nextButtonClicked ? 'slideInUp 2s' : ''}`,
                   }}>
                    {bankerQuestions[currentQuestion].question}
                  </Typography>
                  <Typography variant="h5" gutterBottom sx={styles.text}>
                    {showAnswer ? `Jawaban: ${bankerQuestions[currentQuestion].answer}` : ``}
                  </Typography>
                </div>
              )}
            </Paper>

            <Button
              variant="contained"
              color="primary"
              onClick={handleNextQuestion}
              sx={{ ...styles.button, marginRight: '10px' }}
            >
              Next Question
            </Button>
            <Button
              variant="contained"
              color="secondary"
              onClick={handleStartTimer}
              sx={{ ...styles.button, marginRight: '10px' }}
            >
              Start Timer
            </Button>
            <Button
              variant="contained"
              color="warning"
              onClick={handleShowAnswer}
              sx={styles.button}
            >
              Show Answer
            </Button>
          </>
        )}
      </Grid>
    </Grid>
  );
}

export default Question;
