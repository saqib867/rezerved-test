import React, { useState, useEffect } from "react";

interface Slide {
  url: string;
}

type Direction = "next" | "prev";

const ImageCarousel = ({ slides }: any) => {
  console.log("slider => ", slides);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [isAutoplay, setIsAutoplay] = useState<boolean>(true);
  const [direction, setDirection] = useState<Direction>("next");

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;

    if (isAutoplay) {
      interval = setInterval(() => {
        goToNext();
      }, 3000);
    }

    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [isAutoplay, currentIndex]);

  const goToPrevious = (): void => {
    setDirection("prev");
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? slides.length - 1 : prevIndex - 1
    );
  };

  const goToNext = (): void => {
    setDirection("next");
    setCurrentIndex((prevIndex) =>
      prevIndex === slides.length - 1 ? 0 : prevIndex + 1
    );
  };

  const goToSlide = (index: number): void => {
    setDirection(index > currentIndex ? "next" : "prev");
    setCurrentIndex(index);
  };

  const toggleAutoplay = (): void => {
    setIsAutoplay(!isAutoplay);
  };

  return (
    <div className="">
      {/* Carousel Container */}
      <div className="relative w-full overflow-hidden rounded-2xl shadow-xl ">
        {/* Slides */}
        <div className="relative h-96 w-full md:h-[500px]">
          {slides.map((slide: any, index: number) => (
            <div
              key={index}
              className={`absolute w-full inset-0 transition-all duration-700 ease-in-out ${
                index === currentIndex
                  ? "opacity-100 translate-x-0"
                  : direction === "next"
                  ? index < currentIndex
                    ? "opacity-0 -translate-x-full"
                    : "opacity-0 translate-x-full"
                  : index > currentIndex
                  ? "opacity-0 translate-x-full"
                  : "opacity-0 -translate-x-full"
              }`}
            >
              <img src={slide} className="w-full h-full object-cover" />
            </div>
          ))}
        </div>

        <div className="flex items-center justify-center my-3">
          <div className="flex gap-2">
            {slides?.map((_: Slide, index: number) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`transition-all duration-300 rounded-full ${
                  index === currentIndex
                    ? "w-8 h-3 bg-white"
                    : "w-3 h-3 bg-gray-300 hover:bg-gray-400"
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="flex items-center justify-between mt-8">
        {/* Indicators */}

        {/* Autoplay Toggle */}
        {/* <button
            onClick={toggleAutoplay}
            className={`flex items-center gap-2 px-6 py-3 rounded-full font-semibold transition-all shadow-lg hover:scale-105 active:scale-95 ${
              isAutoplay
                ? "bg-gradient-to-r from-purple-600 to-indigo-600 text-white"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
          >
            {isAutoplay ? (
              <>
                <Pause className="w-5 h-5" />
                <span>Pause</span>
              </>
            ) : (
              <>
                <Play className="w-5 h-5" />
                <span>Autoplay</span>
              </>
            )}
          </button> */}
      </div>

      {/* Slide Counter */}
    </div>
  );
};

export default ImageCarousel;
