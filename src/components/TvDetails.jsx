import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const TVDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [show, setShow] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTVDetails = async () => {
      try {
        const res = await fetch(`https://api.themoviedb.org/3/tv/${id}?api_key=b67426633ed7359d6c55d9db26f33389`);
        const data = await res.json();
        setShow(data);
      } catch (error) {
        console.error("Error fetching TV show details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTVDetails();
  }, [id]);

  if (loading) return <p className="text-center text-gray-400">Loading show details...</p>;

  if (!show) return <p className="text-center text-red-500">TV Show not found.</p>;

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <button onClick={() => navigate(-1)} className="mb-4 px-4 py-2 bg-gray-700 rounded hover:bg-gray-600 transition">
        ← Back
      </button>

      <div className="max-w-5xl mx-auto bg-gray-800 rounded-lg overflow-hidden shadow-lg">
        <div className="relative">
          <img src={`https://image.tmdb.org/t/p/original${show.backdrop_path}`} alt={show.name} className="w-full h-96 object-cover opacity-80" />
          <h1 className="absolute bottom-4 left-4 text-3xl font-bold">{show.name}</h1>
        </div>

        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex justify-center">
              <img src={`https://image.tmdb.org/t/p/w500${show.poster_path}`} alt={show.name} className="rounded-lg shadow-lg w-72" />
            </div>

            <div className="col-span-2">
              <p className="text-lg mb-4">{show.overview}</p>

              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                <div className="bg-gray-700 p-3 rounded-lg">
                  <p className="text-gray-400">First Air Date</p>
                  <p className="font-semibold">{show.first_air_date}</p>
                </div>

                <div className="bg-gray-700 p-3 rounded-lg">
                  <p className="text-gray-400">Language</p>
                  <p className="font-semibold">{show.original_language.toUpperCase()}</p>
                </div>

                <div className="bg-gray-700 p-3 rounded-lg">
                  <p className="text-gray-400">Popularity</p>
                  <p className="font-semibold">{show.popularity.toFixed(2)}</p>
                </div>

                <div className="bg-gray-700 p-3 rounded-lg">
                  <p className="text-gray-400">Rating</p>
                  <p className="font-semibold">{show.vote_average} / 10</p>
                </div>

                <div className="bg-gray-700 p-3 rounded-lg">
                  <p className="text-gray-400">Votes</p>
                  <p className="font-semibold">{show.vote_count}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Genres */}
          <div className="mt-6">
            <h3 className="text-lg font-semibold mb-2">Genres:</h3>
            <div className="flex flex-wrap gap-2">
              {show.genres?.map((genre) => (
                <span key={genre.id} className="bg-blue-600 px-3 py-1 rounded-full text-sm">
                  {genre.name}
                </span>
              ))}
            </div>
          </div>

          {/* Homepage Link */}
          {show.homepage && (
            <div className="mt-6">
              <a href={show.homepage} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">
                Visit Official Website
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TVDetails;
