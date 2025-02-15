import {  Routes, Route } from "react-router-dom";
import Movie from "./components/Movie";
import TVShows from "./components/TvShows";
import MovieDetails from "./components/MovieDetails";
import TVDetails from "./components/TvDetails";

function App() {
  return (
      <Routes>
        <Route path="/" element={<Movie />} />
        <Route path="/tv" element={<TVShows />} />
        <Route path="/movie/:id" element={<MovieDetails />} />
        <Route path="/tv/:id" element={<TVDetails />} />
      </Routes>
  );
}

export default App;
