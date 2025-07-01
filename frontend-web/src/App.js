
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
import AddCountry from './pages/AddCountry';
import AddActivity from './pages/AddActivity';
import Login from './pages/Login';
import Register from './pages/Register';





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
        <Route path="/admin/add-country"  element={<AddCountry />} />
        <Route path="/admin/add-activity/:slug" element={<AddActivity />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        </Routes>
      </div>

      <Footer/>
      
    </BrowserRouter>
  );
}

export default App;
