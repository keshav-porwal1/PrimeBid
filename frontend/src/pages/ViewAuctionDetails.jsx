import Spinner from "@/custom-components/Spinner";
import { getAuctionDetail } from "@/store/slices/auctionSlice";
import React, { useEffect } from "react";
import { FaGreaterThan } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";

const ViewAuctionDetails = () => {
  const { id } = useParams();
  const { loading, auctionDetail, auctionBidders } = useSelector(
    (state) => state.auction
  );
  const { isAuthenticated, user } = useSelector((state) => state.user);

  const navigateTo = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (!isAuthenticated || user.role === "Bidder") {
      navigateTo("/");
    }
    if (id) {
      dispatch(getAuctionDetail(id));
    }
  }, [isAuthenticated]);

  return (
    <>
      <section className="w-full ml-0 m-0 h-fit px-5 pt-20 lg:pl-[320px] flex flex-col min-h-screen py-4 justify-start bg-white dark:bg-gray-900">
        <div className="text-[16px] flex flex-wrap gap-2 items-center">
          <Link
            to="/"
            className="font-semibold transition-all duration-300 hover:text-[#D6482B] dark:hover:text-[#ff7b6b] text-gray-900 dark:text-gray-100"
          >
            Home
          </Link>
          <FaGreaterThan className="text-stone-400 dark:text-stone-500" />
          <Link
            to={"/view-my-auctions"}
            className="font-semibold transition-all duration-300 hover:text-[#D6482B] dark:hover:text-[#ff7b6b] text-gray-900 dark:text-gray-100"
          >
            My Auctions
          </Link>
          <FaGreaterThan className="text-stone-400 dark:text-stone-500" />
          <p className="text-stone-600 dark:text-stone-300">{auctionDetail.title}</p>
        </div>
        {loading ? (
          <Spinner />
        ) : (
          <div className="flex gap-4 flex-col 2xl:flex-row">
            <div className="flex-1 flex flex-col gap-3">
              <div className="flex gap-4 flex-col lg:flex-row">
                <div className="bg-white dark:bg-gray-800 w-[100%] lg:w-40 lg:h-40 flex justify-center items-center p-5 rounded-md shadow-md">
                  <img
                    src={auctionDetail.image?.url}
                    alt={auctionDetail.title}
                    className="rounded-md"
                  />
                </div>
                <div className="flex flex-col justify-around pb-4 text-gray-900 dark:text-gray-100">
                  <h3 className="text-[#111] dark:text-gray-100 text-xl font-semibold mb-2 min-[480px]:text-xl md:text-2xl lg:text-3xl">
                    {auctionDetail.title}
                  </h3>
                  <p className="text-xl font-semibold">
                    Condition:{" "}
                    <span className="text-[#D6482B] dark:text-[#ff7b6b]">
                      {auctionDetail.condition}
                    </span>
                  </p>
                  <p className="text-xl font-semibold">
                    Minimum Bid:{" "}
                    <span className="text-[#D6482B] dark:text-[#ff7b6b]">
                      Rs.{auctionDetail.startingBid}
                    </span>
                  </p>
                </div>
              </div>
              <p className="text-xl w-fit font-bold text-gray-900 dark:text-gray-100">
                Auction Item Description
              </p>
              <hr className="my-2 border-t-[1px] border-t-stone-700 dark:border-t-stone-400" />
              {auctionDetail.description &&
                auctionDetail.description.split(". ").map((element, index) => {
                  return (
                    <li
                      key={index}
                      className="text-[18px] my-2 text-gray-900 dark:text-gray-200"
                    >
                      {element}
                    </li>
                  );
                })}
            </div>
            <div className="flex-1">
              <header className="bg-stone-200 dark:bg-stone-700 py-4 text-[24px] font-semibold px-4 text-gray-900 dark:text-gray-100 rounded-t-md">
                BIDS
              </header>
              <div className="bg-white dark:bg-gray-800 px-4 min-h-fit lg:min-h-[650px] rounded-b-md shadow-md">
                {auctionBidders &&
                auctionBidders.length > 0 &&
                new Date(auctionDetail.startTime) < Date.now() &&
                new Date(auctionDetail.endTime) > Date.now() ? (
                  auctionBidders.map((element, index) => {
                    return (
                      <div
                        key={index}
                        className="py-2 flex items-center justify-between border-b border-gray-300 dark:border-gray-700 last:border-none"
                      >
                        <div className="flex flex-1 items-center gap-4">
                          <img
                            src={element.profileImage}
                            alt={element.userName}
                            className="w-12 h-12 rounded-full my-2 hidden md:block"
                          />
                          <p className="text-[18px] font-semibold text-gray-900 dark:text-gray-100">
                            {element.userName}
                          </p>
                        </div>
                        <p className="flex-1 text-center text-gray-900 dark:text-gray-100">
                          {element.amount}
                        </p>
                        {index === 0 ? (
                          <p className="text-[20px] font-semibold text-green-600 dark:text-green-400 flex-1 text-end">
                            1st
                          </p>
                        ) : index === 1 ? (
                          <p className="text-[20px] font-semibold text-blue-600 dark:text-blue-400 flex-1 text-end">
                            2nd
                          </p>
                        ) : index === 2 ? (
                          <p className="text-[20px] font-semibold text-yellow-600 dark:text-yellow-400 flex-1 text-end">
                            3rd
                          </p>
                        ) : (
                          <p className="text-[20px] font-semibold text-gray-600 dark:text-gray-400 flex-1 text-end">
                            {index + 1}th
                          </p>
                        )}
                      </div>
                    );
                  })
                ) : Date.now() < new Date(auctionDetail.startTime) ? (
                  <img
                    src="/notStarted.png"
                    alt="not-started"
                    className="w-full max-h-[650px]"
                  />
                ) : (
                  <img
                    src="/auctionEnded.png"
                    alt="ended"
                    className="w-full max-h-[650px]"
                  />
                )}
              </div>
            </div>
          </div>
        )}
      </section>
    </>
  );
};

export default ViewAuctionDetails;
