"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const MoviesDetailsPage = ({ params }) => {
  const router = useRouter();
  const id = params.id;
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    getMovieDetails();
  }, [id]);
  const getMovieDetails = async () => {
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlOTkwNTdiY2NjNzI4YTIxOTcyNTZiZGMwZTVjODdmNyIsIm5iZiI6MTczMTQ5ODU0Mi4xODIzMDY1LCJzdWIiOiI2NzM0OTBmZWE2N2UzNmJiNjY4ZDkyZWQiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.egwj0ALwfypDNUUjWQiH1pmWiLCkPr14FlDV7oC57Jw",
      },
    };
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/${id}`,
      options
    );
    const data = await response.json();
    setMovie(data);
  };

  if (!movie) {
    return <p>Loading detail...</p>;
  }
  return (
    <div className="p-8 bg-slate-600">
      <h2 className="text-xl text-gray-300 mb-4">{movie.title} Details</h2>
      <Image
        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
        width={500}
        height={750}
        className="rounded-lg"
        alt={movie.title}
      />
      <p className="text-base mt-8 text-white">{movie.overview}</p>
      <p className="text-xl text-gray-300">{movie.relaease_date}</p>
      <p className="text-xl text-gray-300">{`Rating: ${movie.vote_average}/10`}</p>
      <button
        onClick={() => router.push("/")}
        className="mt-2 px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg"
      >
        Back to Home
      </button>
    </div>
  );
};

export default MoviesDetailsPage;
