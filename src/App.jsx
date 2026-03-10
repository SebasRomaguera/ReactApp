import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import MainLayout from './components/MainLayout/MainLayout';
import Home from './pages/Home';
import Athletes from './pages/Athletes';
import Coaches from './pages/Coaches';
import Schedule from './pages/Schedule';
import './App.css';

export default function App() {
  return (
    <BrowserRouter>
      <div className="app-shell">
        <Header />
        <MainLayout>
          <Routes>
            <Route path="/"         element={<Home />} />
            <Route path="/athletes" element={<Athletes />} />
            <Route path="/coaches"  element={<Coaches />} />
            <Route path="/schedule" element={<Schedule />} />
          </Routes>
        </MainLayout>
        <Footer />
      </div>
    </BrowserRouter>
  );
}
