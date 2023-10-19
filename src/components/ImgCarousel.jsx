import { React, useState } from "react";
import { useSpringCarousel } from "react-spring-carousel";
import banner from "../assets/img/banner.jpg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAngleLeft,
  faAngleRight,
  faCirclePlay,
} from "@fortawesome/free-solid-svg-icons";
import { FaHeart, FaHeartCircleBolt, FaHeartCirclePlus } from "react-icons/fa6";
import HeartReaction from "./HeartReaction";

export const mockedItems = [
  {
    id: 1,
    title: "Item 1",
    creator: "Adam",
    image: banner,
  },
  {
    id: 2,
    title: "Item 2",
    creator: "Adam",
    image: banner,
  },
  {
    id: 3,
    title: "Item 3",
    creator: "Bryan",
    image: banner,
  },
  {
    id: 4,
    title: "Item 4",
    creator: "Adam",
    image: banner,
  },
  {
    id: 5,
    title: "Item 5",
    creator: "Bryan",
    image: banner,
  },
  {
    id: 6,
    title: "Item 5",
    creator: "Bryan",
    image: banner,
  },
];

const ImgCarousel = () => {
  // console.log("hi" + props.podcastData);
  //console.log(podcastData);
  // const podcastData = props.podcastData;
  // console.log("hello" + podcastData);

  const [hoveredItem, setHoveredItem] = useState(null);

  const { carouselFragment, slideToPrevItem, slideToNextItem } =
    useSpringCarousel({
      itemsPerSlide: 5,
      withLoop: true,
      items: mockedItems.map((i) => ({
        id: i.id,
        renderItem: (
          <div key={i.id} className="p-2 my-3 flex flex-wrap">
            <div
              className="object-center obiect-cover h-[200px] relative "
              onMouseEnter={() => setHoveredItem(i.id)}
              onMouseLeave={() => setHoveredItem(null)}
            >
              <img
                src={banner}
                alter="my image"
                className={`w-full h-full rounded-lg opacity-100 ${
                  hoveredItem == i.id && "opacity-90"
                }`}
              />
              <div className="absolute bottom-2 left-3">
                <span>
                  <HeartReaction />
                </span>
              </div>
              {hoveredItem === i.id && (
                <div className="absolute bottom-0 right-0">
                  <span>
                    <FontAwesomeIcon
                      icon={faCirclePlay}
                      className="text-white text-2xl"
                      style={{
                        position: "relative",
                        animation: "mymove 500ms forwards",
                      }}
                    />
                  </span>
                </div>
              )}
            </div>
            <div className="dark:text-fontdark">
              <div className="font-semibold text-lg">{i.title}</div>
              <div className="font-light text-sm">{i.creator}</div>
            </div>
          </div>
        ),
      })),
    });

  return (
    <div className="relative dark:bg-dark">
      <button
        onClick={slideToPrevItem}
        className="absolute dark:text-fontdark text-baseblue text-3xl top-1/2 left-0 transform -translate-y-1/2 z-10"
      >
        <FontAwesomeIcon icon={faAngleLeft} />
      </button>

      {carouselFragment}

      <button
        onClick={slideToNextItem}
        className="absolute dark:text-fontdark text-baseblue text-3xl top-1/2 right-0 transform -translate-y-1/2"
      >
        <FontAwesomeIcon icon={faAngleRight} />
      </button>
    </div>
  );
};
export default ImgCarousel;
