import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SplashScreen from './components/SplashScreen';
import Main from './components/Main';
import TimerSoal from './components/timerSoal';
import CountdownTimer from './components/CountdownTimer';
import CountdownTimer2 from './components/CountdownTimer2';
import Question from './components/question';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<SplashScreen />} />
                <Route path="/door-prize" element={<Main />} />
                <Route path="/ranking-1" element={<TimerSoal />} />
                <Route path="/timer" element={<CountdownTimer />} />
                <Route path="/timer-two" element={<CountdownTimer2 />} />
                <Route path="/question" element={<Question />} />
            </Routes>
        </Router>
    );
}
export default App;
