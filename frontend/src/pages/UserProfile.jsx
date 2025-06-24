import Spinner from "@/custom-components/Spinner";
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { updateProfile } from "@/store/slices/userSlice";

const UserProfile = () => {
  const { user, isAuthenticated, loading } = useSelector((state) => state.user);
  const navigateTo = useNavigate();
  const dispatch = useDispatch();

  const [editMode, setEditMode] = useState(false);
  const [form, setForm] = useState({});
  const [imagePreview, setImagePreview] = useState("");
  const [imageFile, setImageFile] = useState(null);

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      navigateTo("/");
    }
    if (user) {
      setForm({
        userName: user.userName || "",
        email: user.email || "",
        phone: user.phone || "",
        address: user.address || "",
        bankAccountNumber: user.paymentMethods?.bankTransfer?.bankAccountNumber || "",
        bankAccountName: user.paymentMethods?.bankTransfer?.bankAccountName || "",
        bankName: user.paymentMethods?.bankTransfer?.bankName || "",
        upiId: user.paymentMethods?.upi?.upiId || "",
        paypalEmail: user.paymentMethods?.paypal?.paypalEmail || "",
      });
      setImagePreview(user?.profileImage?.url);
    }
  }, [isAuthenticated, loading, navigateTo, user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImageFile(file);
    setImagePreview(URL.createObjectURL(file));
  };

  const handleSave = (e) => {
    e.preventDefault();
    const formData = new FormData();
    Object.entries(form).forEach(([key, value]) => formData.append(key, value));
    if (imageFile) formData.append("profileImage", imageFile);
    dispatch(updateProfile(formData));
    setEditMode(false);
  };

  return (
    <>
      <section className="w-full ml-0 m-0 h-fit px-5 pt-20 lg:pl-[320px] flex flex-col min-h-screen py-4 justify-start bg-white dark:bg-gray-900 text-black dark:text-white">
        {loading ? (
          <Spinner />
        ) : (
          <form
            className="bg-white dark:bg-gray-800 mx-auto w-full h-auto px-2 flex flex-col gap-4 items-center py-4 justify-center rounded-md"
            onSubmit={handleSave}
            encType="multipart/form-data"
          >
            <div className="relative flex flex-col items-center">
              <img
                src={imagePreview}
                alt="User Profile"
                className="w-36 h-36 rounded-full border-4 border-blue-400 dark:border-yellow-400 shadow-md object-cover"
                style={{
                  boxShadow:
                    "0 4px 16px 0 rgba(0,0,0,0.10), 0 1.5px 4px 0 rgba(0,0,0,0.08)",
                  background: "linear-gradient(135deg, #f3f4f6 0%, #e5e7eb 100%)",
                }}
              />
              {editMode && (
                <label
                  className="mt-3 inline-block px-3 py-1 bg-gray-200 dark:bg-gray-700 text-sm text-gray-700 dark:text-gray-200 rounded cursor-pointer border border-gray-300 dark:border-gray-600 transition hover:bg-gray-300 dark:hover:bg-gray-600"
                  style={{ width: "fit-content" }}
                >
                  Edit Profile Picture
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="hidden"
                  />
                </label>
              )}
            </div>
            <div className="self-end mb-2 flex gap-2">
              {!editMode ? (
                <button
                  type="button"
                  className="px-4 py-1 rounded bg-blue-500 text-white"
                  onClick={() => setEditMode(true)}
                >
                  Edit
                </button>
              ) : (
                <>
                  <button
                    type="button"
                    className="px-4 py-1 rounded bg-gray-400 text-white"
                    onClick={() => setEditMode(false)}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-1 rounded bg-green-600 text-white hover:bg-green-700"
                  >
                    Save
                  </button>
                </>
              )}
            </div>

            <div className="mb-6 w-full">
              <h3 className="text-xl font-semibold mb-4">Personal Details</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Username
                  </label>
                  <input
                    type="text"
                    name="userName"
                    value={form.userName}
                    onChange={handleChange}
                    className="w-full mt-1 p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-black dark:text-white focus:outline-none"
                    disabled={!editMode}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Email
                  </label>
                  <input
                    type="text"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    className="w-full mt-1 p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-black dark:text-white focus:outline-none"
                    disabled
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Phone
                  </label>
                  <input
                    type="text"
                    name="phone"
                    value={form.phone}
                    onChange={handleChange}
                    className="w-full mt-1 p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-black dark:text-white focus:outline-none"
                    disabled={!editMode}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Address
                  </label>
                  <input
                    type="text"
                    name="address"
                    value={form.address}
                    onChange={handleChange}
                    className="w-full mt-1 p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-black dark:text-white focus:outline-none"
                    disabled={!editMode}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Role
                  </label>
                  <input
                    type="text"
                    value={user?.role}
                    className="w-full mt-1 p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-black dark:text-white focus:outline-none"
                    disabled
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Joined On
                  </label>
                  <input
                    type="text"
                    value={user?.createdAt?.substring(0, 10) || ""}
                    className="w-full mt-1 p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-black dark:text-white focus:outline-none"
                    disabled
                  />
                </div>
              </div>
            </div>

            {user?.role === "Auctioneer" && (
              <div className="mb-6 w-full">
                <h3 className="text-xl font-semibold mb-4">Payment Details</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                      Bank Name
                    </label>
                    <input
                      type="text"
                      name="bankName"
                      value={form.bankName}
                      onChange={handleChange}
                      className="w-full mt-1 p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-black dark:text-white focus:outline-none"
                      disabled={!editMode}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                      Bank Account (IBAN)
                    </label>
                    <input
                      type="text"
                      name="bankAccountNumber"
                      value={form.bankAccountNumber}
                      onChange={handleChange}
                      className="w-full mt-1 p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-black dark:text-white focus:outline-none"
                      disabled={!editMode}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                      User Name On Bank Account
                    </label>
                    <input
                      type="text"
                      name="bankAccountName"
                      value={form.bankAccountName}
                      onChange={handleChange}
                      className="w-full mt-1 p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-black dark:text-white focus:outline-none"
                      disabled={!editMode}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                      UPI ID
                    </label>
                    <input
                      type="text"
                      name="upiId"
                      value={form.upiId}
                      onChange={handleChange}
                      className="w-full mt-1 p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-black dark:text-white focus:outline-none"
                      disabled={!editMode}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                      Paypal Email
                    </label>
                    <input
                      type="text"
                      name="paypalEmail"
                      value={form.paypalEmail}
                      onChange={handleChange}
                      className="w-full mt-1 p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-black dark:text-white focus:outline-none"
                      disabled={!editMode}
                    />
                  </div>
                </div>
              </div>
            )}

            <div className="mb-6 w-full">
              <h3 className="text-xl font-semibold mb-4">Other User Details</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {user?.role === "Auctioneer" && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                      Unpaid Commissions
                    </label>
                    <input
                      type="text"
                      value={user?.unpaidCommission}
                      className="w-full mt-1 p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-black dark:text-white focus:outline-none"
                      disabled
                    />
                  </div>
                )}
                {user?.role === "Bidder" && (
                  <>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                        Auctions Won
                      </label>
                      <input
                        type="text"
                        value={user?.auctionsWon}
                        className="w-full mt-1 p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-black dark:text-white focus:outline-none"
                        disabled
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                        Money Spent
                      </label>
                      <input
                        type="text"
                        value={user?.moneySpent}
                        className="w-full mt-1 p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-black dark:text-white focus:outline-none"
                        disabled
                      />
                    </div>
                  </>
                )}
              </div>
            </div>
          </form>
        )}
      </section>
    </>
  );
};

export default UserProfile;