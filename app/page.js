import Image from "next/image";
import Link from "next/link";

export default async function Home() {
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlOTkwNTdiY2NjNzI4YTIxOTcyNTZiZGMwZTVjODdmNyIsIm5iZiI6MTczMTQ5ODU0Mi4xODIzMDY1LCJzdWIiOiI2NzM0OTBmZWE2N2UzNmJiNjY4ZDkyZWQiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.egwj0ALwfypDNUUjWQiH1pmWiLCkPr14FlDV7oC57Jw",
    },
  };
  const response = await fetch(
    "https://api.themoviedb.org/3/movie/popular",
    options
  );
  const data = await response.json();
  const movies = data.results;

  return (
    <div className="p-8 bg-slate-600">
      <h1 className="text-2xl font-extrabold mb-4 text-gray-300">
        Trending movies
      </h1>
      <div className="grid grid-cols-3 gap-8">
        {movies.map((movie) => (
          <div
            className="bg-gray-800 rounded-lg overflow-hidden drop-shadow-lg"
            key={movie.title}
          >
            <Image
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              width={500}
              height={750}
              className="w-full object-cover"
              alt={movie.title}
            />
            <div className="p-4">
              <h3 className="font-bold text-lg">{movie.title}</h3>
              <p className="text-gray-400 text-base">{movie.release_date}</p>
              <Link href={`/movies/${movie.id}`}>
                <button className="mt-2 px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-500">
                  View Details
                </button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
