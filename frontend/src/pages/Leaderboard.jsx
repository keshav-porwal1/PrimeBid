import Spinner from "@/custom-components/Spinner";
import React from "react";
import { useSelector } from "react-redux";

const Leaderboard = () => {
  const { loading, leaderboard } = useSelector((state) => state.user);

  return (
    <section className="w-full ml-0 m-0 h-fit px-5 pt-20 lg:pl-[320px] flex flex-col bg-white dark:bg-gray-900 transition-colors duration-300">
      {loading ? (
        <Spinner />
      ) : (
        <>
          <div className="flex flex-col min-[340px]:flex-row min-[340px]:gap-2 mb-5">
            <h1 className="text-[#D6482B] dark:text-[#d6482b] text-2xl font-bold mb-2 min-[480px]:text-4xl md:text-6xl xl:text-7xl 2xl:text-8xl">
              Bidders Leaderboard
            </h1>
          </div>

          {leaderboard.length === 0 ? (
            <div className="text-center text-gray-600 dark:text-gray-300 py-10">
              No data available.
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white dark:bg-gray-800 border my-5 border-gray-300 dark:border-gray-700">
                <thead className="bg-gray-100 dark:bg-gray-700">
                  <tr>
                    <th className="py-2 px-4 text-left text-gray-900 dark:text-white">Rank & Profile</th>
                    <th className="py-2 px-4 text-left text-gray-900 dark:text-white">Username</th>
                    <th className="py-2 px-4 text-left text-gray-900 dark:text-white">Bid Expenditure</th>
                    <th className="py-2 px-4 text-left text-gray-900 dark:text-white">Auctions Won</th>
                  </tr>
                </thead>
                <tbody className="text-gray-800 dark:text-gray-200">
                  {leaderboard.slice(0, 100).map((element, index) => (
                    <tr key={element._id} className="border-b border-gray-300 dark:border-gray-700">
                      <td className="flex gap-2 items-center py-2 px-4">
                        <span className="text-gray-500 dark:text-gray-400 font-semibold text-xl w-7 hidden sm:block">
                          {index + 1}
                        </span>
                        <img
                          src={element.profileImage?.url}
                          alt={`${element.userName}'s profile`}
                          className="h-12 w-12 object-cover rounded-full"
                        />
                      </td>
                      <td className="py-2 px-4">{element.userName}</td>
                      <td className="py-2 px-4">${element.moneySpent.toLocaleString()}</td>
                      <td className="py-2 px-4">{element.auctionsWon}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </>
      )}
    </section>
  );
};

export default Leaderboard;
