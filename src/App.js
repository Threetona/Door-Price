import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SplashScreen from './components/SplashScreen';
import Main from './components/Main';
import TimerSoal from './components/timerSoal';
import CountdownTimer from './components/CountdownTimer';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<SplashScreen />} />
                <Route path="/door-prize" element={<Main />} />
                <Route path="/ranking-1" element={<TimerSoal />} />
                <Route path="/timer" element={<CountdownTimer />} />
            </Routes>
        </Router>
    );
}
export default App;
