import Card from "@/custom-components/Card";
import React from "react";

const FeaturedAuctions = ({ auctions }) => {
  // Use the auctions prop passed from Home, not Redux
  const featured = auctions ? auctions.slice(0, 8) : [];

  return (
    <>
      <section className="my-8">
        <h3 className="text-[#111] dark:text-gray-100 text-xl font-semibold mb-2 min-[480px]:text-xl md:text-2xl lg:text-3xl">
          Featured Auctions
        </h3>
        <div className="flex flex-wrap gap-6">
          {featured.length === 0 && (
            <p className="text-gray-500 dark:text-gray-400">No featured auctions.</p>
          )}
          {featured.map((element) => (
            <Card
              key={element._id}
              title={element.title}
              imgSrc={element.image?.url}
              startTime={element.startTime}
              endTime={element.endTime}
              startingBid={element.startingBid}
              id={element._id}
              className="bg-white dark:bg-gray-800 dark:text-gray-100"
            />
          ))}
        </div>
      </section>
    </>
  );
};

export default FeaturedAuctions;