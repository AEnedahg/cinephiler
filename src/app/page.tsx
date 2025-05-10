"use client"
import UpcomingMovies from "@/_components/UpcomingMovies";
import TopRatedMovies from "@/_components/TopRatedMovies";
import PopularMovies from "@/_components/PopularMovies";
import Hero from "@/_components/Hero";
import { auth, currentUser } from "@clerk/nextjs/server";

async function Home() {
  const { userId, redirectToSignIn } = await auth();
  const user = await currentUser();

  if (!userId) return redirectToSignIn();
  if (!user) return <div>Not signed in</div>;
  
  return (
    <div>
      <div className="flex flex-col gap-y-5 bg-[#002335] p-4">
        <h1 className="text-white text-2xl">Hello {user?.firstName}!</h1>
        <p className="text-white text-lg">Welcome back to the Cinephiler</p>
      </div>
      <Hero />
      <UpcomingMovies />
      <TopRatedMovies />
      <PopularMovies />
    </div>
  );
}

export default Home;