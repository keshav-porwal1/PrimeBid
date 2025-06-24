import { deleteAuctionItem } from "@/store/slices/superAdminSlice";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

const AuctionItemDelete = () => {
  const { allAuctions } = useSelector((state) => state.auction);
  const dispatch = useDispatch();

  const handleAuctionDelete = (id) => {
    dispatch(deleteAuctionItem(id));
  };

  return (
    <div className="overflow-x-auto mb-10">
      <table className="min-w-full bg-white dark:bg-[#1e1e1e] border border-gray-300 dark:border-gray-700">
        <thead className="bg-gray-800 dark:bg-gray-900 text-white">
          <tr>
            <th className="py-2 px-4 text-left">Image</th>
            <th className="py-2 px-4 text-left">Title</th>
            <th className="py-2 px-4 text-left">Actions</th>
          </tr>
        </thead>
        <tbody className="text-gray-700 dark:text-gray-300">
          {allAuctions.length > 0 ? (
            allAuctions.map((element) => (
              <tr key={element._id} className="border-b border-gray-200 dark:border-gray-700">
                <td className="py-2 px-4">
                  <img
                    src={element.image?.url}
                    alt={element.title}
                    className="h-12 w-12 object-cover rounded"
                  />
                </td>
                <td className="py-2 px-4">{element.title}</td>
                <td className="py-2 px-4 flex space-x-2">
                  <Link
                    to={`/auction/details/${element._id}`}
                    className="bg-blue-500 hover:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-800 text-white py-1 px-3 rounded-md transition-all duration-300"
                  >
                    View
                  </Link>
                  <button
                    className="bg-red-500 hover:bg-red-700 dark:bg-red-600 dark:hover:bg-red-800 text-white py-1 px-3 rounded-md transition-all duration-300"
                    onClick={() => handleAuctionDelete(element._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td className="py-4 px-4 text-left text-xl text-sky-600 dark:text-sky-400" colSpan="3">
                No Auctions found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default AuctionItemDelete;
