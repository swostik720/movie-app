import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const MovieDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const res = await fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=b67426633ed7359d6c55d9db26f33389`);
        const data = await res.json();
        setMovie(data);
      } catch (error) {
        console.error("Error fetching movie details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMovieDetails();
  }, [id]);

  if (loading) return <p className="text-center text-gray-400">Loading movie details...</p>;

  if (!movie) return <p className="text-center text-red-500">Movie not found.</p>;

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      {/* Back Button */}
      <button onClick={() => navigate(-1)} className="mb-4 px-4 py-2 bg-gray-700 rounded hover:bg-gray-600 transition">
        ← Back
      </button>

      <div className="max-w-5xl mx-auto bg-gray-800 rounded-lg overflow-hidden shadow-lg">
        {/* Movie Banner */}
        <div className="relative">
          <img src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`} alt={movie.title} className="w-full h-96 object-cover opacity-80" />
          <h1 className="absolute bottom-4 left-4 text-3xl font-bold">{movie.title}</h1>
        </div>

        {/* Movie Info */}
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Left Section - Movie Poster */}
            <div className="flex justify-center">
              <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} className="rounded-lg shadow-lg w-72" />
            </div>

            {/* Middle Section - Details */}
            <div className="col-span-2">
              <p className="text-lg mb-4">{movie.overview}</p>

              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                <div className="bg-gray-700 p-3 rounded-lg">
                  <p className="text-gray-400">Release Date</p>
                  <p className="font-semibold">{movie.release_date}</p>
                </div>

                <div className="bg-gray-700 p-3 rounded-lg">
                  <p className="text-gray-400">Language</p>
                  <p className="font-semibold">{movie.original_language.toUpperCase()}</p>
                </div>

                <div className="bg-gray-700 p-3 rounded-lg">
                  <p className="text-gray-400">Popularity</p>
                  <p className="font-semibold">{movie.popularity.toFixed(2)}</p>
                </div>

                <div className="bg-gray-700 p-3 rounded-lg">
                  <p className="text-gray-400">Rating</p>
                  <p className="font-semibold">{movie.vote_average} / 10</p>
                </div>

                <div className="bg-gray-700 p-3 rounded-lg">
                  <p className="text-gray-400">Votes</p>
                  <p className="font-semibold">{movie.vote_count}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Genres */}
          <div className="mt-6">
            <h3 className="text-lg font-semibold mb-2">Genres:</h3>
            <div className="flex flex-wrap gap-2">
              {movie.genres?.map((genre) => (
                <span key={genre.id} className="bg-blue-600 px-3 py-1 rounded-full text-sm">
                  {genre.name}
                </span>
              ))}
            </div>
          </div>

          {/* Homepage Link */}
          {movie.homepage && (
            <div className="mt-6">
              <a href={movie.homepage} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">
                Visit Official Website
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MovieDetails;
