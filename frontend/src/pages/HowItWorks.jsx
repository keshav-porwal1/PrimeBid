import React from "react";
import {
  FaUser,
  FaGavel,
  FaEnvelope,
  FaDollarSign,
  FaFileInvoice,
  FaRedo,
} from "react-icons/fa";

const HowItWorks = () => {
  const steps = [
    {
      icon: <FaUser />,
      title: "User Registration",
      description:
        "Users must register or log in to perform operations such as posting auctions, bidding on items, accessing the dashboard, and sending payment proof.",
    },
    {
      icon: <FaGavel />,
      title: "Role Selection",
      description:
        'Users can register as either a "Bidder" or "Auctioneer." Bidders can bid on items, while Auctioneers can post items.',
    },
    {
      icon: <FaEnvelope />,
      title: "Winning Bid Notification",
      description:
        "After winning an item, the highest bidder will receive an email with the Auctioneer's payment method information, including bank transfer, Easypaisa, and PayPal.",
    },
    {
      icon: <FaDollarSign />,
      title: "Commission Payment",
      description:
        "If the Bidder pays, the Auctioneer must pay 5% of that payment to the platform. Failure to pay results in being unable to post new items, and a legal notice will be sent.",
    },
    {
      icon: <FaFileInvoice />,
      title: "Proof of Payment",
      description:
        "The platform receives payment proof as a screenshot and the total amount sent. Once approved by the Administrator, the unpaid commission of the Auctioneer will be adjusted accordingly.",
    },
    {
      icon: <FaRedo />,
      title: "Reposting Items",
      description:
        "If the Bidder does not pay, the Auctioneer can republish the item without any additional cost.",
    },
  ];

  return (
    <>
      <section className="w-full ml-0 m-0 h-fit px-5 pt-20 lg:pl-[320px] flex flex-col min-h-screen py-4 justify-center bg-white dark:bg-gray-900">
        <h1 className="text-[#d6482b] dark:text-[#f87171] text-2xl font-bold mb-2 min-[480px]:text-4xl md:text-6xl xl:text-7xl 2xl:text-8xl">
          Discover How PrimeBid Operates
        </h1>
        <div className="flex flex-col gap-4 my-5">
          {steps.map((element, index) => (
            <div
              key={index}
              className="bg-white dark:bg-gray-800 rounded-xl p-5 flex flex-col gap-2 group transition-all duration-300 transform hover:scale-105 hover:shadow-[0_0_20px_rgba(253,186,116,0.4)] dark:hover:shadow-[0_0_20px_rgba(253,186,116,0.3)]"
            >
              <div
                aria-hidden="true"
                className="bg-black dark:bg-gray-900 text-white p-3 text-xl rounded-full w-fit transition-all duration-300"
              >
                {element.icon}
              </div>
              <h3 className="text-[#D6482B] dark:text-[#f87171] text-xl font-semibold mb-2 min-[480px]:text-xl md:text-2xl lg:text-3xl group-hover:text-[#fbbf24] dark:group-hover:text-yellow-300 transition-all duration-300">
                {element.title}
              </h3>
              <p className="text-xl text-stone-700 dark:text-stone-300 transition-all duration-300">
                {element.description}
              </p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
};

export default HowItWorks;
