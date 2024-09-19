import Image from "next/image";
import HeroButtons from "./common/HeroButtons";

export function Hero() {
  return (
    <div className="relative bg-background">
      <div className="max-w-7xl mx-auto">
        <div className="relative z-10 py-8 bg-background sm:py-16 md:py-20 lg:max-w-2xl lg:w-full lg:py-28 xl:py-32 lg:ml-auto">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex flex-col justify-center h-full">
            <div className="sm:text-center lg:text-left">
              <h1 className="text-4xl font-extrabold text-primary sm:text-5xl md:text-6xl">
                Transform{" "}
                <span className="text-red-500 font-bold italic bg-gradient-to-r from-red-500 to-red-700 bg-clip-text text-transparent animate-pulse">
                  YouTube Playlists
                </span>{" "}
                into Courses
              </h1>

              <p className="mt-3 text-base text-muted-foreground sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
                Transform YouTube content into organized lessons. With playlist
                tracking and note-taking tools, you’ll learn faster and more
                effectively.{" "}
              </p>
              <HeroButtons />
            </div>
          </div>
        </div>
      </div>

      {/* Image section with cool effects */}
      <div className="lg:absolute lg:inset-y-0 lg:left-0 lg:w-1/2">
        <div className="relative h-56 w-full overflow-hidden sm:h-72 md:h-96 lg:h-full group">
          <Image
            className="h-full w-full object-cover transition-transform duration-500 ease-in-out transform group-hover:scale-110"
            src="https://plus.unsplash.com/premium_photo-1664372145439-db03f276dbd2?q=80&w=1169&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="Modern business illustration"
            fill
            priority
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/50 to-transparent opacity-80"></div>
        </div>
      </div>
    </div>
  );
}
