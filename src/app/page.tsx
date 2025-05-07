import UpcomingMovies from "@/_components/UpcomingMovies";
import TopRatedMovies from "@/_components/TopRatedMovies";
import PopularMovies from "@/_components/PopularMovies";
import Hero from "@/_components/Hero";
export default function Home() {
  return (
    <div>
      <Hero />
      <UpcomingMovies />
      <TopRatedMovies />
      <PopularMovies />
    </div>
  );
}
