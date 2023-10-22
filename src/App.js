import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SplashScreen from './components/SplashScreen';
import Main from './components/Main';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<SplashScreen />} />
                <Route path="/door-prize" element={<Main />} />
            </Routes>
        </Router>
    );
}
export default App;
