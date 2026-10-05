import Search from "../search/Search";

const popularTags = [
  "nature",
  "background",
  "flowers",
  "sunset",
  "forest",
  "landscape",
  "cat",
  "sky",
  "wallpaper",
  "mountains",
];

const Hero = () => {
  return (
    <div className="relative z-10 flex flex-col items-center w-full max-w-5xl px-4 pt-8 pb-8 mx-auto text-center text-white motion-safe:animate-fade-up sm:px-6 sm:pb-12 sm:pt-12 lg:pt-16">
      <h1 className="text-3xl font-extrabold leading-tight sm:text-4xl lg:text-5xl">
        Stunning royalty-free images & royalty-free stock
      </h1>

      <p className="hidden max-w-xl mt-3 text-sm text-white/90 sm:block md:text-base">
        Over 4.4 million+ high quality stock images and videos shared by our
        talented community.
      </p>
      {/* 10 Trending Topics ONLY */}
      <div className="flex flex-wrap justify-center gap-2 my-6">
        {popularTags.map((tag) => (
          <a
            key={tag}
            href={`/search?type=images&search=${encodeURIComponent(tag)}`}
            className="px-3 py-1.5 text-xs font-medium text-white transition-all duration-300 rounded-full bg-white/10 hover:bg-white/20 sm:text-sm"
          >
            {tag}
          </a>
        ))}
      </div>

      {/* Search Bar ONLY */}
      <Search />
    </div>
  );
};

export default Hero;
