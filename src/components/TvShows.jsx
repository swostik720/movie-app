import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaFilm, FaSearch } from "react-icons/fa";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const TVShows = () => {
  const [tvList, setTVList] = useState([]);
  const [trendingList, setTrendingList] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Fetch TV Shows
  const getTVShows = async () => {
    try {
      const response = await fetch(
        "https://api.themoviedb.org/3/discover/tv?api_key=b67426633ed7359d6c55d9db26f33389"
      );
      if (!response.ok) throw new Error("Failed to fetch TV shows");

      const data = await response.json();
      setTVList(data.results);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  // Fetch Trending Shows
  const getTrendingTV = async () => {
    try {
      const response = await fetch(
        "https://api.themoviedb.org/3/trending/tv/day?api_key=b67426633ed7359d6c55d9db26f33389"
      );
      if (!response.ok) throw new Error("Failed to fetch trending TV shows");

      const data = await response.json();
      setTrendingList(data.results);
    } catch (error) {
      console.error("Error fetching trending TV shows:", error);
    }
  };

  // Fetch Search Results
  const searchTVShows = async (query) => {
    if (!query) {
        getTVShows(); // Show default movies when search is empty
        return;
      }

    setLoading(true);
    try {
      const url = `https://api.themoviedb.org/3/search/tv?api_key=b67426633ed7359d6c55d9db26f33389&query=${encodeURIComponent(query)}`
      const response = await fetch(url);
      if (!response.ok) throw new Error("Failed to fetch TV shows");

      const data = await response.json();
      setTVList(data.results);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getTVShows();
    getTrendingTV();
  }, []);

  // Trigger search when searchTerm changes
    useEffect(() => {
      searchTVShows(searchTerm);
    }, [searchTerm]);

  // Slider Settings
  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: true,
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white py-10 px-4">
      {/* Navigation Buttons */}
      <div className="flex justify-center gap-4 mb-8">
        <button
          className="flex items-center gap-2 bg-blue-600 px-6 py-3 rounded-lg text-lg font-semibold shadow-lg hover:bg-blue-500 transition"
          onClick={() => navigate(`/`)}
        >
          <FaFilm className="text-xl" />
          Movies
        </button>
      </div>

      {/* Search Box */}
      <div className="flex justify-center mb-6">
        <div className="relative w-full max-w-md">
          <FaSearch className="absolute left-3 top-3 text-gray-400" />
          <input
            type="text"
            className="w-full pl-10 pr-4 py-2 rounded-lg bg-gray-800 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Search TV Shows..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* Trending TV Shows Slider */}
      <h2 className="text-2xl font-bold text-center mb-6">Trending TV Shows</h2>
      <Slider {...sliderSettings} className="mb-10">
        {trendingList.map((show) => (
          <div key={show.id} className="px-2">
            <img
              src={`https://image.tmdb.org/t/p/w500${show.poster_path}`}
              alt={show.name}
              className="rounded-lg shadow-lg"
              onClick={() => navigate(`/tv/${show.id}`, { state: { show } })}
            />
            <h3 className="text-center mt-2 text-lg font-semibold">
              {show.name}
            </h3>
          </div>
        ))}
      </Slider>

      {loading && <p className="text-center text-gray-400">Loading TV Shows...</p>}
      {error && <p className="text-center text-red-500">Error: {error}</p>}

      {/* TV Shows Grid */}
      <h2 className="text-2xl font-bold text-center mb-6">Popular TV Shows</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {tvList.map((show) => (
          <div
            key={show.id}
            className="bg-gray-800 rounded-lg overflow-hidden shadow-lg transform transition duration-300 hover:scale-105 cursor-pointer"
            onClick={() => navigate(`/tv/${show.id}`, { state: { show } })}
          >
            <div className="relative">
              <img
                src={`https://image.tmdb.org/t/p/w500${show.poster_path}`}
                alt={show.name}
                className="w-full h-64 object-cover"
              />
            </div>
            <div className="p-4">
              <h2 className="text-xl font-semibold mb-2">{show.name}</h2>
              <p className="text-gray-400 text-sm truncate">{show.overview}</p>
              <p className="text-gray-400 text-sm mt-2">
                First Air Date: {show.first_air_date}
              </p>
              <p className="text-gray-400 text-sm">
                Language: {show.original_language.toUpperCase()}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TVShows;
