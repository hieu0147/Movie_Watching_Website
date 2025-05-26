import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ScrollToTopButton from "./components/ScrollToTopButton/ScrollToTopButton";
import MovieDetail from "./components/Details/MovieDetails";
import ListMovie from "./components/Movie/Listmovie";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import Hero from "./components/Hero/Hero";
import WatchAMovie from "./components/WatchAMovie/WatchAMovie"

function App() {
  return (
    <Router>
      <div className="font-sans bg-[#112638] w-full min-h-screen flex flex-col">
        <Header />
        <Routes>
          <Route path="/" element={
            <>
              <Hero />
              <ListMovie />
            </>
          } />
          <Route path="/phim/:slug" element={<MovieDetail />} />
          <Route path="/xem-phim/:slug/:serverIndex/:episodeIndex" element={<WatchAMovie />} />
        </Routes>
        <Footer />
        <ScrollToTopButton />
      </div>
    </Router>
  );
}

export default App;
