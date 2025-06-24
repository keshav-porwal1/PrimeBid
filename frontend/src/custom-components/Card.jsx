import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Card = ({ imgSrc, title, startingBid, startTime, endTime, id }) => {
  const calculateTimeLeft = () => {
    const now = new Date();
    const startDifference = new Date(startTime) - now;
    const endDifference = new Date(endTime) - now;
    let timeLeft = {};

    if (startDifference > 0) {
      timeLeft = {
        type: "Starts In:",
        days: Math.floor(startDifference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((startDifference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((startDifference / 1000 / 60) % 60),
        seconds: Math.floor((startDifference / 1000) % 60),
      };
    } else if (endDifference > 0) {
      timeLeft = {
        type: "Ends In:",
        days: Math.floor(endDifference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((endDifference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((endDifference / 1000 / 60) % 60),
        seconds: Math.floor((endDifference / 1000) % 60),
      };
    }
    return timeLeft;
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);
    return () => clearTimeout(timer);
  }, [timeLeft]);

  const formatTimeLeft = ({ days, hours, minutes, seconds }) => {
    const pad = (num) => String(num).padStart(2, "0");
    return `(${days} Days) ${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
  };

  return (
    <Link
      to={`/auction/item/${id}`}
      className="flex-grow basis-full bg-white dark:bg-gray-800 rounded-md group sm:basis-56 lg:basis-60 2xl:basis-80 shadow-md dark:shadow-gray-700"
    >
      <img
        src={imgSrc}
        alt={title}
        className="w-full aspect-[4/3] m-auto md:p-12 rounded-t-md object-cover"
      />
      <div className="px-2 pt-4 pb-2">
        <h5 className="font-semibold text-[18px] group-hover:text-[#d6482b] dark:group-hover:text-[#ff6f61] mb-2 text-stone-900 dark:text-gray-100">
          {title}
        </h5>
        {startingBid && (
          <p className="text-stone-600 dark:text-stone-400 font-light">
            Starting Bid:{" "}
            <span className="text-[#fdba88] font-bold ml-1">{startingBid}</span>
          </p>
        )}
        <p className="text-stone-600 dark:text-stone-400 font-light">
          {timeLeft.type}
          {Object.keys(timeLeft).length > 1 ? (
            <span className="text-[#fdba88] font-bold ml-1">
              {formatTimeLeft(timeLeft)}
            </span>
          ) : (
            <span className="text-[#fdba88] font-bold ml-1">Time's up!</span>
          )}
        </p>
      </div>
    </Link>
  );
};

export default Card;
