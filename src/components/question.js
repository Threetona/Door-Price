import React, { useState, useRef, useEffect } from 'react';
import { Button, Grid, Typography, Paper } from '@mui/material';
import bankerQuestions2 from '../data-dummy/bankerQuestion.json';
// eslint-disable-next-line no-unused-vars
import bankerQuestions from '../data-dummy/bankerQuestion2.json';

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
    text2: {
        color: '#1976D2',
        fontSize: '5em',
        fontWeight: 'bold',
        margin: 'auto',
        textAlign: 'center',
        animation: 'fadeIn 3s',
        lineHeight: 1.3,
    },
    text3: {
        color: 'inherit',
        fontSize: '3em',
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
    const [showQuestion, setShowQuestion] = useState(true);
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [gameStarted, setGameStarted] = useState(false);

    const [nextButtonClicked, setNextButtonClicked] = useState(false);
    const [timerStarted, setTimerStarted] = useState(false);
    const [animateQuestion, setAnimateQuestion] = useState(false);
    const [animateAnswer, setAnimateAnswer] = useState(false);
    const [openingMessage, setOpeningMessage] = useState(''); // Tambahkan state untuk pesan pembuka
    const [closingMessage, setClosingMessage] = useState(''); // Tambahkan state untuk pesan penutup

    const timerRef = useRef(null);

    const audioRef = useRef(new Audio('/sound/alert.m4a'));
    const audioAnswer = useRef(new Audio('/sound/answer.m4a'));

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

        // Inisialisasi pesan pembuka di sini
        const text = 'Ayo mulai';
        setOpeningMessage(text); // Set pesan pembuka ke state

        // Setel state yang diperlukan ke nilai awalnya
        setCurrentQuestion(0);
        setCountdown(bankerQuestions[0].time);
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

            // Set animateQuestion menjadi true untuk memicu animasi
            setAnimateQuestion(true);

            // Reset nextButtonClicked dan animateQuestion setelah beberapa detik untuk mengaktifkan kembali animasi
            setTimeout(() => {
                setNextButtonClicked(false);
                setAnimateQuestion(false);
            }, 2000);
        } else {
            // pesan penutup
            setOpeningMessage('');
            // const text =
            //     'Seluruh Panitia HUT SAMBU GROUP 56 mengucapkan terimakasih';
            clearInterval(timerRef.current);
            setShowQuestion(false);
            setShowAnswer(false);
            setGameStarted(false);
            setClosingMessage(''); // Set pesan penutup ke state
        }
    };

    const handleStartTimer = () => {
        clearInterval(timerRef.current);
        setTimerStarted(true);
        startTimer();
    };

    const handleShowAnswer = () => {
        setShowAnswer(true);
        setAnimateAnswer(true);
        audioAnswer.current.play();

        // Reset animateAnswer setelah beberapa detik untuk mengaktifkan kembali animasi
        setTimeout(() => {
            setAnimateAnswer(false);
        }, 2000);
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
                    <div
                        style={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}
                    >
                        <Typography
                            variant="h5"
                            gutterBottom
                            sx={{
                                ...styles.text,
                                animation: animateAnswer
                                    ? 'fadeInSlide 2s ease-in-out'
                                    : 'none',
                            }}
                        >
                            {openingMessage}
                        </Typography>

                        <Button
                            variant="contained"
                            color="primary"
                            onClick={handleStartGame}
                            sx={{ ...styles.button, marginRight: '10px' }}
                        >
                            Start Game
                        </Button>
                    </div>
                ) : (
                    <>
                        {/* timer */}
                        <Paper elevation={4} style={styles.timerPaper}>
                            <Typography
                                variant="h4"
                                gutterBottom
                                sx={styles.textTime}
                                style={{
                                    animation: showAnswer
                                        ? 'fadeIn 3s'
                                        : 'fadeOut 3s',
                                }}
                            >
                                {countdown < 10 ? `0${countdown}` : countdown}
                            </Typography>
                        </Paper>
                        {/* question */}
                        <Paper elevation={4} style={styles.questionPaper}>
                            {showQuestion && !showAnswer && (
                                <div>
                                    <Typography
                                        variant="h5"
                                        gutterBottom
                                        sx={{
                                            ...styles.text,
                                            animation:
                                                animateQuestion &&
                                                nextButtonClicked
                                                    ? 'fadeInSlide 2s ease-in-out'
                                                    : 'none',
                                        }}
                                    >
                                        {
                                            bankerQuestions[currentQuestion]
                                                .question
                                        }
                                    </Typography>
                                    <Typography
                                        variant="h5"
                                        gutterBottom
                                        sx={{
                                            ...styles.text,
                                            animation:
                                                animateQuestion &&
                                                nextButtonClicked
                                                    ? 'fadeInSlide 2s ease-in-out'
                                                    : 'none',
                                        }}
                                    >
                                        {bankerQuestions[
                                            currentQuestion
                                        ].question2
                                            .split(' ')
                                            .map((word, index) => (
                                                <span
                                                    key={index}
                                                    style={{
                                                        color:
                                                            word === 'Benar'
                                                                ? 'green'
                                                                : word ===
                                                                  'Salah'
                                                                ? 'red'
                                                                : 'inherit',
                                                    }}
                                                >
                                                    {`${word} `}
                                                </span>
                                            ))}
                                    </Typography>
                                </div>
                            )}
                            {showAnswer && (
                                <div>
                                    {/* answer */}
                                    <Typography
                                        variant="h5"
                                        gutterBottom
                                        sx={{
                                            ...styles.text2,
                                            animation: animateAnswer
                                                ? 'fadeInSlide 2s ease-in-out'
                                                : 'none',
                                            color: bankerQuestions[
                                                currentQuestion
                                            ].answer.includes('Benar')
                                                ? 'green'
                                                : bankerQuestions[
                                                      currentQuestion
                                                  ].answer.includes('Salah')
                                                ? 'red'
                                                : '#1976D2',
                                        }}
                                    >
                                        {showAnswer
                                            ? bankerQuestions[currentQuestion]
                                                  .answer
                                            : ``}
                                    </Typography>
                                    <Typography
                                        variant="h5"
                                        gutterBottom
                                        sx={{
                                            ...styles.text3,
                                            animation: animateAnswer
                                                ? 'fadeInSlide 2s ease-in-out'
                                                : 'none',
                                        }}
                                    >
                                        {showAnswer
                                            ? bankerQuestions[currentQuestion]
                                                  .explanation
                                            : ``}
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
            {closingMessage && (
                <Typography
                    variant="h5"
                    gutterBottom
                    sx={{
                        ...styles.text,
                        animation: animateAnswer
                            ? 'fadeInSlide 2s ease-in-out'
                            : 'none',
                    }}
                >
                    {closingMessage}
                </Typography>
            )}
        </Grid>
    );
}

export default Question;
