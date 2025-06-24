import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import FeaturedAuctions from "./home-sub-components/FeaturedAuctions";
import UpcomingAuctions from "./home-sub-components/UpcomingAuctions";
import Leaderboard from "./home-sub-components/Leaderboard";

const Home = () => {
  const howItWorks = [
    { title: "Post Items", description: "Auctioneer posts items for bidding." },
    { title: "Place Bids", description: "Bidders place bids on listed items." },
    {
      title: "Win Notification",
      description: "Highest bidder receives a winning email.",
    },
    {
      title: "Payment & Fees",
      description: "Bidder pays; auctioneer pays 5% fee.",
    },
  ];

  const { isAuthenticated } = useSelector((state) => state.user);
  const { allAuctions } = useSelector((state) => state.auction);

  // Filter out auctions whose endTime is in the past
  const now = Date.now();
  const activeAuctions = allAuctions
    ? allAuctions.filter((auction) => new Date(auction.endTime).getTime() > now)
    : [];

  return (
    <>
      <section className="w-full ml-0 m-0 h-fit px-5 pt-20 lg:pl-[320px] flex flex-col min-h-screen py-4 justify-center bg-white dark:bg-gray-900">
        <div>
          <p className="text-[#e5a879] font-bold text-xl mb-8 dark:text-[#DECCBE]">
            Transparency Leads to Your Victory
          </p>
          <h1 className="text-[#111] dark:text-gray-100 text-2xl font-bold mb-2 min-[480px]:text-4xl md:text-6xl xl:text-7xl 2xl:text-8xl">
            Transparent Auctions
          </h1>
          <h1 className="text-[#d6482b] dark:text-[#f87171] text-2xl font-bold mb-2 min-[480px]:text-4xl md:text-6xl xl:text-7xl 2xl:text-8xl">
            Be The Winner
          </h1>
          <div className="flex gap-4 my-8">
            {!isAuthenticated && (
              <>
                <Link
                  to="/sign-up"
                  className="bg-[#d6482b] font-semibold hover:bg-[#b8381e] rounded-md px-8 flex items-center py-2 text-white transition-all duration-300"
                >
                  Sign Up
                </Link>
                <Link
                  to={"/login"}
                  className="text-[#DECCBE] bg-transparent border-2 border-[#DECCBE] hover:bg-[#fff3fd] hover:text-[#fdba88] font-bold text-xl rounded-md px-8 flex items-center py-2 transition-all duration-300 dark:text-[#DECCBE] dark:hover:bg-gray-700 dark:hover:text-[#fdba88]"
                >
                  Login
                </Link>
              </>
            )}
          </div>
        </div>
        <div className="flex flex-col gap-6">
          <h3 className="text-[#111] dark:text-gray-100 text-xl font-semibold mb-2 min-[480px]:text-xl md:text-2xl lg:text-3xl">
            How it works
          </h3>
          <div className="flex flex-col gap-4 md:flex-row md:flex-wrap w-full">
            {howItWorks.map((element) => (
              <div
                key={element.title}
                className="bg-white dark:bg-gray-800 flex flex-col gap-2 p-4 rounded-xl h-[120px] justify-center md:w-[48%] lg:w-[47%] 2xl:w-[24%] transition-all duration-300 transform hover:scale-105 hover:shadow-[0_0_20px_rgba(255,180,120,0.6)] dark:hover:shadow-[0_0_20px_rgba(255,180,120,0.6)]"
              >
                <h5 className="font-bold text-gray-900 dark:text-gray-100">{element.title}</h5>
                <p className="text-gray-700 dark:text-gray-300">{element.description}</p>
              </div>
            ))}
          </div>
        </div>
        {/* Pass only activeAuctions to FeaturedAuctions and UpcomingAuctions */}
        <FeaturedAuctions auctions={activeAuctions} />
        <UpcomingAuctions auctions={activeAuctions} />
        <Leaderboard />
      </section>
    </>
  );
};

export default Home;