import React from "react";
import { RiAuctionFill } from "react-icons/ri";
import { Link } from "react-router-dom";

const UpcomingAuctions = ({ auctions }) => {
  // Use the auctions prop passed from Home
  const today = new Date();
  const todayString = today.toDateString();

  // Only show auctions starting today and not ended
  const auctionsStartingToday = auctions
    ? auctions.filter((item) => {
        const auctionDate = new Date(item.startTime);
        const auctionEnd = new Date(item.endTime);
        return (
          auctionDate.toDateString() === todayString &&
          auctionEnd.getTime() > Date.now()
        );
      })
    : [];

  return (
    <>
      <section className="my-8">
        <h3 className="text-gray-800 dark:text-gray-100 text-xl font-semibold mb-2 min-[480px]:text-xl md:text-2xl lg:text-3xl">
          Auctions For Today
        </h3>
        <div className="flex flex-wrap gap-6">
          {/* Highlight Box */}
          <div className="bg-yellow-100 dark:bg-gray-700 w-full p-6 gap-10 rounded-xl flex flex-col justify-between transition-all duration-300 transform hover:scale-105 hover:shadow-[0_0_20px_rgba(253,224,71,0.6)] dark:hover:shadow-[0_0_20px_rgba(253,224,71,0.6)] lg:flex-1 lg:h-auto 2xl:flex-none 2xl:basis-64 2xl:flex-grow">
            <span className="rounded-full bg-yellow-500 text-white w-fit p-3">
              <RiAuctionFill />
            </span>
            <div>
              <h3 className="text-yellow-600 text-xl font-semibold mb-2 min-[480px]:text-xl md:text-2xl lg:text-3xl">
                Auctions For
              </h3>
              <div>
                <h3 className="text-gray-900 dark:text-gray-200 text-xl font-semibold mb-2 min-[480px]:text-xl md:text-2xl lg:text-3xl">
                  Today
                </h3>
              </div>
            </div>
          </div>

          {/* Auction lists */}
          {auctionsStartingToday.length === 0 && (
            <p className="text-gray-500 dark:text-gray-400 w-full">No auctions starting today.</p>
          )}
          {[0, 2, 4].map((start) => (
            <div
              key={start}
              className="flex flex-col gap-4 w-full lg:flex-1 2xl:flex-none 2xl:basis-64 2xl:flex-grow"
            >
              {auctionsStartingToday.slice(start, start + 2).map((element) => (
                <Link
                  to={`/auction/item/${element._id}`}
                  key={element._id}
                  className="w-full flex flex-col gap-4 bg-white dark:bg-gray-800 p-2 rounded-md 2xl:gap-2 hover:shadow-md transition-all duration-300"
                >
                  <div className="flex items-center gap-2">
                    <img
                      src={element.image?.url}
                      alt={element.title}
                      className="w-16 h-16 2xl:w-10 2xl:h-10"
                    />
                    <p className="font-extralight text-gray-800 dark:text-gray-100 text-[12px]">
                      {element.title}
                    </p>
                  </div>
                  <div className="flex justify-between">
                    <p className="text-gray-700 dark:text-stone-400 font-semibold">
                      Starting Bid:
                    </p>
                    <p className="text-yellow-600 font-semibold">
                      Rs. {element.startingBid}
                    </p>
                  </div>
                  <div className="flex flex-col">
                    <p className="text-gray-700 dark:text-stone-400 font-bold">
                      Starting Time:
                    </p>
                    <p className="text-gray-800 dark:text-gray-100 text-[12px]">
                      {element.startTime}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          ))}
        </div>
      </section>
    </>
  );
};

export default UpcomingAuctions;