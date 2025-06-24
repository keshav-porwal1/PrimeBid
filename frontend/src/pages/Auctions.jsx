import Card from "@/custom-components/Card";
import Spinner from "@/custom-components/Spinner";
import React from "react";
import { useSelector } from "react-redux";

const Auctions = () => {
  const { allAuctions, loading } = useSelector((state) => state.auction);

  // Filter auctions by end time
  const now = Date.now();
  const activeAuctions = allAuctions.filter(
    (auction) => new Date(auction.endTime).getTime() > now
  );
  const endedAuctions = allAuctions.filter(
    (auction) => new Date(auction.endTime).getTime() <= now
  );

  return (
    <>
      {loading ? (
        <Spinner />
      ) : (
        <article className="w-full ml-0 m-0 h-fit px-5 pt-20 lg:pl-[320px] flex flex-col dark:bg-gray-950 dark:text-white">
          <section className="my-8">
            <h1 className="text-[#d6482b] dark:text-[#d6482b] text-2xl font-bold mb-2 min-[480px]:text-4xl md:text-6xl xl:text-7xl 2xl:text-8xl">
              Auctions
            </h1>
            <div className="flex flex-wrap gap-6">
              {activeAuctions.length === 0 && (
                <p className="text-gray-500 dark:text-gray-400">No active auctions.</p>
              )}
              {activeAuctions.map((element) => (
                <Card
                  title={element.title}
                  startTime={element.startTime}
                  endTime={element.endTime}
                  imgSrc={element.image?.url}
                  startingBid={element.startingBid}
                  id={element._id}
                  key={element._id}
                />
              ))}
            </div>
          </section>
          <section className="my-8">
            <h2 className="text-[#d6482b] dark:text-[#d6482b] text-xl font-bold mb-4">
              Ended Auctions
            </h2>
            <div className="flex flex-wrap gap-6">
              {endedAuctions.length === 0 && (
                <p className="text-gray-500 dark:text-gray-400">No ended auctions.</p>
              )}
              {endedAuctions.map((element) => (
                <Card
                  title={element.title}
                  startTime={element.startTime}
                  endTime={element.endTime}
                  imgSrc={element.image?.url}
                  startingBid={element.startingBid}
                  id={element._id}
                  key={element._id}
                  ended // Optionally pass a prop to style ended auctions differently
                />
              ))}
            </div>
          </section>
        </article>
      )}
    </>
  );
};

export default Auctions;