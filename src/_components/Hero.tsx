import React from 'react'

function Hero() {
  return (
    <section
      className="h-[50vh] lg:h-screen w-full bg-[url(../../public/hero.png)] bg-center bg-cover
       bg-no-repeat
    bg-[#002335] flex items-center pl-2 lg:pl-40
    "
    >
      <div>
        <h1 className="text-4xl lg:text-6xl font-bold text-white max-w-101">
          John Wick 3 : Parabellum
        </h1>
        <p className="text-white max-w-101 mt-6 text-lg">
          John Wick is on the run after killing a member of the international
          assassins' guild, and with a $14 million price tag on his head, he is
          the target of hit men and women everywhere.
        </p>
      </div>
    </section>
  );
}

export default Hero