import { useGetBanners } from "@/hooks/useBanners";
import { convertToBase64 } from "@/lib/utils";
import { Carousel, Spinner } from "@material-tailwind/react";

export function HomePageCarousel() {
  const { data: banners, isLoading, isError } = useGetBanners();

  if (isLoading) {
    return <div className="flex justify-center items-center h-screen"><Spinner /></div>;
  }

  if (isError) {
    return <div className="flex justify-center items-center h-screen"><Spinner /></div>;
  }

  return (
    <div className="relative">
      <div className="w-full h-full md:w-96 lg:w-96 xl:w-[600px] md:h-full lg:h-full mx-auto md:p-15 md:ml-5">
        <Carousel
          transition={{ duration: 1 }}
          autoplay={true}
          loop={true}
          className="rounded-xl"
          navigation={({ setActiveIndex, activeIndex }) => (
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-50 flex gap-2">
              {banners?.map((banner, i) => (
                <span
                  key={banner.id}
                  className={`block h-1 w-4 cursor-pointer rounded-2xl transition-all ${
                    activeIndex === i ? "bg-white w-8" : "bg-white/50"
                  }`}
                  onClick={() => setActiveIndex(i)}
                />
              ))}
            </div>
          )}
        >
          {banners?.map((banner) => (
            <img
              key={banner.id}
              src={convertToBase64(banner.image.data, 'png')}
              alt={`${banner.id}`}
              className="object-cover w-full h-full"
            />
          ))}
        </Carousel>
      </div>
    </div>
  );
}
