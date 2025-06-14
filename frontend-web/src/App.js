
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import NavBar    from './components/NavBar/NavBar';
import LandingPage from './pages/LandingPage'; 
import ProfilePage from './pages/ProfilePage';
import ThingstodoPage from './pages/ThingstodoPage';
import LanguagePage from './pages/LanguagePage';
import KidsPage from './pages/KidsPage';
import Footer from './components/Footer/Footer';
import HistoryPage from './pages/HistoryPage';

import SamoaHome from './pages/SamoaHome';
import TongaHome from './pages/TongaHome';
import FijiHome from './pages/FijiHome';




function App() {
  return (
    <BrowserRouter>
      <NavBar />

    
      <div className="page-wrapper">
        <Routes>
        <Route path="/" element={<LandingPage/>} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/things-to-do" element={<ThingstodoPage />} />
        <Route path="/:country/things-to-do" element={<ThingstodoPage />} />
        <Route path="/language" element={<LanguagePage />} />
        <Route path="/:country/language"     element={<LanguagePage />} />
        <Route path="/history" element={<HistoryPage />} />
        <Route path="/:country/history" element={<HistoryPage />} />
        <Route path="/kids"         element={<KidsPage />} />
        <Route path="/samoa"         element={<SamoaHome />} />
        <Route path="/fiji"         element={<FijiHome />} />
        <Route path="/tonga"         element={<TongaHome />} />
          
        </Routes>
      </div>

      <Footer/>
      
    </BrowserRouter>
  );
}

export default App;
