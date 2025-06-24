import {
  deletePaymentProof,
  getSinglePaymentProofDetail,
  updatePaymentProof,
} from "@/store/slices/superAdminSlice";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

const PaymentProofs = () => {
  const { paymentProofs, singlePaymentProof } = useSelector(
    (state) => state.superAdmin
  );
  const [openDrawer, setOpenDrawer] = useState(false);
  const dispatch = useDispatch();

  const handlePaymentProofDelete = (id) => {
    dispatch(deletePaymentProof(id));
  };

  const handleFetchPaymentDetail = (id) => {
    dispatch(getSinglePaymentProofDetail(id));
  };

  useEffect(() => {
    if (singlePaymentProof && Object.keys(singlePaymentProof).length > 0) {
      setOpenDrawer(true);
    }
  }, [singlePaymentProof]);

  return (
    <>
      <div className="overflow-x-auto">
        <table className="min-w-full mt-5 bg-white dark:bg-gray-900 rounded-md shadow">
          <thead className="bg-gray-800 text-white">
            <tr>
              <th className="w-1/3 py-2">User ID</th>
              <th className="w-1/3 py-2">Status</th>
              <th className="w-1/3 py-2">Actions</th>
            </tr>
          </thead>
          <tbody className="text-gray-700 dark:text-gray-300">
            {paymentProofs.length > 0 ? (
              paymentProofs.map((element, index) => (
                <tr key={index} className="border-b dark:border-gray-700">
                  <td className="py-2 px-4 text-center">{element.userId}</td>
                  <td className="py-2 px-4 text-center">{element.status}</td>
                  <td className="flex items-center py-4 justify-center gap-3">
                    <button
                      className="bg-blue-500 text-white py-1 px-3 rounded hover:bg-blue-700 transition-all duration-300"
                      onClick={() => handleFetchPaymentDetail(element._id)}
                    >
                      Update
                    </button>
                    <button
                      className="bg-red-500 text-white py-1 px-3 rounded hover:bg-red-700 transition-all duration-300"
                      onClick={() => handlePaymentProofDelete(element._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr className="text-center text-xl text-sky-600 py-3">
                <td colSpan="3">No payment proofs are found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <Drawer setOpenDrawer={setOpenDrawer} openDrawer={openDrawer} />
    </>
  );
};

export default PaymentProofs;

export const Drawer = ({ setOpenDrawer, openDrawer }) => {
  const { singlePaymentProof, loading } = useSelector(
    (state) => state.superAdmin
  );
  const [amount, setAmount] = useState(singlePaymentProof.amount || "");
  const [status, setStatus] = useState(singlePaymentProof.status || "");
  const dispatch = useDispatch();

  const handlePaymentProofUpdate = () => {
    dispatch(updatePaymentProof(singlePaymentProof._id, status, amount));
  };

  useEffect(() => {
    setAmount(singlePaymentProof.amount || "");
    setStatus(singlePaymentProof.status || "");
  }, [singlePaymentProof]);

  return (
    <section
      className={`fixed ${
        openDrawer && singlePaymentProof.userId ? "bottom-0" : "-bottom-full"
      } left-0 w-full transition-all duration-300 h-full bg-black bg-opacity-60 flex items-end z-50`}
    >
      <div className="bg-white dark:bg-gray-900 w-full sm:max-w-[640px] sm:mx-auto rounded-t-lg p-6">
        <h3 className="text-[#D6482B] text-3xl font-semibold text-center mb-1">
          Update Payment Proof
        </h3>
        <p className="text-stone-600 dark:text-stone-300">
          You can update payment status and amount.
        </p>
        <form className="flex flex-col gap-5 my-5">
          <div className="flex flex-col gap-3">
            <label className="text-[16px] text-stone-600 dark:text-stone-300">
              User ID
            </label>
            <input
              type="text"
              value={singlePaymentProof.userId || ""}
              disabled
              className="text-xl px-3 py-2 bg-transparent border border-stone-600 rounded-md focus:outline-none text-stone-600 dark:text-gray-300 dark:border-gray-500"
            />
          </div>
          <div className="flex flex-col gap-3">
            <label className="text-[16px] text-stone-600 dark:text-stone-300">
              Amount
            </label>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="text-xl px-3 py-2 bg-transparent border border-stone-600 rounded-md focus:outline-none text-stone-600 dark:text-gray-300 dark:border-gray-500"
            />
          </div>
          <div className="flex flex-col gap-3">
            <label className="text-[16px] text-stone-600 dark:text-stone-300">
              Status
            </label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="text-xl px-3 py-2 bg-transparent border border-stone-600 rounded-md focus:outline-none text-stone-600 dark:text-gray-300 dark:border-gray-500"
            >
              <option value="Pending">Pending</option>
              <option value="Approved">Approved</option>
              <option value="Rejected">Rejected</option>
              <option value="Settled">Settled</option>
            </select>
          </div>
          <div className="flex flex-col gap-3">
            <label className="text-[16px] text-stone-600 dark:text-stone-300">
              Comment
            </label>
            <textarea
              rows={5}
              value={singlePaymentProof.comment || ""}
              disabled
              className="text-xl px-3 py-2 bg-transparent border border-stone-600 rounded-md focus:outline-none text-stone-600 dark:text-gray-300 dark:border-gray-500"
            />
          </div>
          <div>
            <Link
              to={singlePaymentProof.proof?.url || ""}
              className="bg-[#D6482B] flex justify-center w-full py-2 rounded-md text-white font-semibold text-xl transition-all duration-300 hover:bg-[#b8381e]"
              target="_blank"
            >
              Payment Proof (SS)
            </Link>
          </div>
          <div>
            <button
              type="button"
              className="bg-blue-500 flex justify-center w-full py-2 rounded-md text-white font-semibold text-xl transition-all duration-300 hover:bg-blue-700"
              onClick={handlePaymentProofUpdate}
            >
              {loading ? "Updating Payment Proof" : "Update Payment Proof"}
            </button>
          </div>
          <div>
            <button
              type="button"
              className="bg-yellow-500 flex justify-center w-full py-2 rounded-md text-white font-semibold text-xl transition-all duration-300 hover:bg-yellow-700"
              onClick={() => setOpenDrawer(false)}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};
