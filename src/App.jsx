import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import MainLayout from './components/MainLayout/MainLayout';
import Home from './pages/Home';
import Athletes from './pages/Athletes';
import AthleteDetail from './pages/AthleteDetail';
import Coaches from './pages/Coaches';
import CoachDetail from './pages/CoachDetail';
import Schedule from './pages/Schedule';
import Competitions from './pages/Competitions';
import CompetitionDetail from './pages/CompetitionDetail';
import Venues from './pages/Venues';
import VenueDetail from './pages/VenueDetail';
import './App.css';

export default function App() {
  return (
    // Router at the top level so navigation and route rendering share one history context.
    <BrowserRouter>
      <div className="app-shell">
        <Header />
        <MainLayout>
          <Routes>
            <Route path="/"         element={<Home />} />
            <Route path="/athletes" element={<Athletes />} />
            <Route path="/athletes/:publicId" element={<AthleteDetail />} />
            <Route path="/coaches"  element={<Coaches />} />
            <Route path="/coaches/:publicId" element={<CoachDetail />} />
            <Route path="/schedule" element={<Schedule />} />
            <Route path="/competitions" element={<Competitions />} />
            <Route path="/competitions/:publicId" element={<CompetitionDetail />} />
            <Route path="/venues" element={<Venues />} />
            <Route path="/venues/:publicId" element={<VenueDetail />} />
          </Routes>
        </MainLayout>
        <Footer />
      </div>
    </BrowserRouter>
  );
}
