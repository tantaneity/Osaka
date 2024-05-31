import { Carousel } from "@material-tailwind/react";

export function HomePageCarousel() {
  return (
    <div className="relative">
      <div className="w-full h-full md:w-96 lg:w-96 xl:w-[600px] md:h-full lg:h-full mx-auto md:p-15 md:ml-5">
        <Carousel
          transition={{ duration: 1 }}
          autoplay={true}
          loop={true}
          className="rounded-xl"
          navigation={({ setActiveIndex, activeIndex, length }) => (
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-50 flex gap-2">
              {new Array(length).fill("").map((_, i) => (
                <span
                  key={i}
                  className={`block h-1 w-4 cursor-pointer rounded-2xl transition-all ${
                    activeIndex === i ? "bg-white w-8" : "bg-white/50"
                  }`}
                  onClick={() => setActiveIndex(i)}
                />
              ))}
            </div>
          )}
        >
          <img
            src="/src/assets/refreshing_soft_drinks.png"
            alt="banner 1"
            className="object-cover w-full h-full"
          />
          <img
            src="/src/assets/milk_drinks_banner.png"
            alt="banner 2"
            className="object-cover w-full h-full" 
          />
          <img
            src="/src/assets/natural_fruit_juices_banner.png"
            alt="banner 3"
            className="object-cover w-full h-full"
          />
          <img
            src="/src/assets/carbonated_drinks.png"
            alt="banner 3"
            className="object-cover w-full h-full"
          />
        </Carousel>
      </div>
    </div>
  );
}
