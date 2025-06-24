import { register } from "@/store/slices/userSlice";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [role, setRole] = useState("");
  const [password, setPassword] = useState("");

  const [bankAccountName, setBankAccountName] = useState("");
  const [bankAccountNumber, setBankAccountNumber] = useState("");
  const [bankName, setBankName] = useState("");
  const [upiId, setUpiId] = useState("");
  const [paypalEmail, setPaypalEmail] = useState("");

  const [profileImage, setProfileImage] = useState(null);
  const [profileImagePreview, setProfileImagePreview] = useState("");

  const { loading, isAuthenticated } = useSelector((state) => state.user);
  const navigateTo = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (isAuthenticated) {
      navigateTo("/");
    }
  }, [isAuthenticated, navigateTo]);

  const handleRegister = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("userName", userName);
    formData.append("email", email);
    formData.append("phone", phone);
    formData.append("password", password);
    formData.append("address", address);
    formData.append("role", role);
    formData.append("profileImage", profileImage);

    if (role === "Auctioneer") {
      formData.append("bankAccountName", bankAccountName);
      formData.append("bankAccountNumber", bankAccountNumber);
      formData.append("bankName", bankName);
      formData.append("upiId", upiId);
      formData.append("paypalEmail", paypalEmail);
    }

    dispatch(register(formData));
  };

  const imageHandler = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setProfileImagePreview(reader.result);
      setProfileImage(file);
    };
  };

  return (
    <section className="w-full ml-0 m-0 h-fit px-5 pt-20 lg:pl-[320px] flex flex-col min-h-screen py-4 justify-center bg-white dark:bg-gray-900">
      <div className="bg-white dark:bg-gray-800 mx-auto w-full max-w-3xl px-6 py-6 flex flex-col gap-6 items-center justify-center rounded-md shadow-md">
        <h1 className="text-[#d6482b] dark:text-[#f87171] text-2xl font-bold mb-2 min-[480px]:text-4xl md:text-6xl xl:text-7xl 2xl:text-8xl">
          Register
        </h1>
        <form className="flex flex-col gap-6 w-full" onSubmit={handleRegister}>
          <p className="font-semibold text-xl md:text-2xl">Personal Details</p>

          <div className="flex flex-col gap-6 sm:flex-row">
            <div className="flex flex-col sm:flex-1">
              <label htmlFor="userName" className="text-[16px] text-stone-600 dark:text-stone-300">
                Full Name
              </label>
              <input
                id="userName"
                type="text"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                className="text-[16px] py-2 bg-transparent border-b-[1px] border-b-stone-500 dark:border-b-stone-400 focus:outline-none focus:ring-2 focus:ring-[#d6482b] dark:focus:ring-[#f87171]"
                required
              />
            </div>

            <div className="flex flex-col sm:flex-1">
              <label htmlFor="email" className="text-[16px] text-stone-600 dark:text-stone-300">
                Email
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="text-[16px] py-2 bg-transparent border-b-[1px] border-b-stone-500 dark:border-b-stone-400 focus:outline-none focus:ring-2 focus:ring-[#d6482b] dark:focus:ring-[#f87171]"
                required
              />
            </div>
          </div>

          <div className="flex flex-col gap-6 sm:flex-row">
            <div className="flex flex-col sm:flex-1">
              <label htmlFor="phone" className="text-[16px] text-stone-600 dark:text-stone-300">
                Phone
              </label>
              <input
                id="phone"
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="text-[16px] py-2 bg-transparent border-b-[1px] border-b-stone-500 dark:border-b-stone-400 focus:outline-none focus:ring-2 focus:ring-[#d6482b] dark:focus:ring-[#f87171]"
                required
                pattern="[6-9]{1}[0-9]{9}"
                title="Enter valid 10-digit phone number"
              />
            </div>

            <div className="flex flex-col sm:flex-1">
              <label htmlFor="address" className="text-[16px] text-stone-600 dark:text-stone-300">
                Address
              </label>
              <input
                id="address"
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="text-[16px] py-2 bg-transparent border-b-[1px] border-b-stone-500 dark:border-b-stone-400 focus:outline-none focus:ring-2 focus:ring-[#d6482b] dark:focus:ring-[#f87171]"
              />
            </div>
          </div>

          <div className="flex flex-col gap-6 sm:flex-row">
            <div className="flex flex-col sm:flex-1">
              <label htmlFor="role" className="text-[16px] text-stone-600 dark:text-stone-300">
                Role
              </label>
              <select
                id="role"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="text-[16px] py-2 bg-white text-black dark:bg-gray-700 dark:text-white border-b-[1px] border-b-stone-500 dark:border-b-stone-400 focus:outline-none focus:ring-2 focus:ring-[#d6482b] dark:focus:ring-[#f87171]"
                required
              >
                <option value="">Select Role</option>
                <option value="Auctioneer">Auctioneer</option>
                <option value="Bidder">Bidder</option>
                <option value="Super Admin">Super Admin</option>
              </select>
            </div>

            <div className="flex flex-col sm:flex-1">
              <label htmlFor="password" className="text-[16px] text-stone-600 dark:text-stone-300">
                Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="text-[16px] py-2 bg-transparent border-b-[1px] border-b-stone-500 dark:border-b-stone-400 focus:outline-none focus:ring-2 focus:ring-[#d6482b] dark:focus:ring-[#f87171]"
                required
                minLength={8}
              />
            </div>
          </div>

          <div className="flex flex-col sm:flex-1 gap-2">
            <label className="text-[16px] text-stone-600 dark:text-stone-300" htmlFor="profileImage">
              Profile Image
            </label>
            <div className="flex items-center gap-3">
              <img
                src={profileImagePreview || "/imageHolder.jpg"}
                alt="profile preview"
                className="w-14 h-14 rounded-full object-cover"
              />
              <input
                id="profileImage"
                type="file"
                accept="image/*"
                onChange={imageHandler}
                className="text-stone-600 dark:text-stone-300"
              />
            </div>
          </div>

          {role === "Auctioneer" && (
            <div className="flex flex-col gap-6 mt-4 w-full">
              <label className="font-semibold text-xl md:text-2xl flex flex-col text-stone-600 dark:text-stone-300">
                Payment Method Details
                <span className="text-[12px] text-stone-500 dark:text-stone-400 mt-1">
                  Fill Payment Details Only If you are registering as an Auctioneer
                </span>
              </label>

              <div className="flex flex-col gap-4">
                <label className="text-[16px] text-stone-500 dark:text-stone-400">Bank Details</label>
                <div className="flex flex-col gap-2 sm:flex-row sm:gap-4">
                  <select
                    value={bankName}
                    onChange={(e) => setBankName(e.target.value)}
                    className="text-[16px] py-2 bg-white text-black dark:bg-gray-700 dark:text-white border-b-[1px] border-b-stone-500 dark:border-b-stone-400 focus:outline-none focus:ring-2 focus:ring-[#d6482b] dark:focus:ring-[#f87171]"
                  >
                    <option value="">Select Your Bank</option>
                    <option value="State Bank of India">State Bank of India (SBI)</option>
                    <option value="Punjab National Bank">Punjab National Bank (PNB)</option>
                    <option value="HDFC Bank">HDFC Bank</option>
                    <option value="ICICI Bank">ICICI Bank</option>
                    <option value="Axis Bank">Axis Bank</option>
                    <option value="Bank of Baroda">Bank of Baroda</option>
                    <option value="Canara Bank">Canara Bank</option>
                    <option value="Union Bank of India">Union Bank of India</option>
                    <option value="IndusInd Bank">IndusInd Bank</option>
                    <option value="Kotak Mahindra Bank">Kotak Mahindra Bank</option>
                  </select>
                  <input
                    type="text"
                    value={bankAccountNumber}
                    placeholder="IFSC"
                    onChange={(e) => setBankAccountNumber(e.target.value)}
                    className="text-[16px] py-2 bg-transparent border-b-[1px] border-b-stone-500 dark:border-b-stone-400 focus:outline-none focus:ring-2 focus:ring-[#d6482b] dark:focus:ring-[#f87171] sm:flex-1"
                  />
                  <input
                    type="text"
                    value={bankAccountName}
                    placeholder="Bank Account UserName"
                    onChange={(e) => setBankAccountName(e.target.value)}
                    className="text-[16px] py-2 bg-transparent border-b-[1px] border-b-stone-500 dark:border-b-stone-400 focus:outline-none focus:ring-2 focus:ring-[#d6482b] dark:focus:ring-[#f87171] sm:flex-1"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="upiId" className="text-[16px] text-stone-500 dark:text-stone-400">
                  UPI ID
                </label>
                <input
                  id="upiId"
                  type="text"
                  value={upiId}
                  placeholder="e.g. username@bank"
                  onChange={(e) => setUpiId(e.target.value)}
                  className="text-[16px] py-2 bg-transparent border-b-[1px] border-b-stone-500 dark:border-b-stone-400 focus:outline-none focus:ring-2 focus:ring-[#d6482b] dark:focus:ring-[#f87171]"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="paypalEmail" className="text-[16px] text-stone-500 dark:text-stone-400">
                  PayPal Details
                </label>
                <input
                  id="paypalEmail"
                  type="email"
                  value={paypalEmail}
                  placeholder="Paypal Email"
                  onChange={(e) => setPaypalEmail(e.target.value)}
                  className="text-[16px] py-2 bg-transparent border-b-[1px] border-b-stone-500 dark:border-b-stone-400 focus:outline-none focus:ring-2 focus:ring-[#d6482b] dark:focus:ring-[#f87171]"
                />
              </div>
            </div>
          )}

          <button
            className={`bg-[#d6482b] w-full max-w-xl font-semibold hover:bg-[#b8381e] transition-all duration-300 text-xl py-3 px-6 rounded-md text-white mx-auto ${
              loading ? "opacity-70 cursor-not-allowed" : ""
            }`}
            type="submit"
            disabled={loading}
          >
            {loading ? "Registering..." : "Register"}
          </button>
        </form>
      </div>
    </section>
  );
};

export default SignUp;
