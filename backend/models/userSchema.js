import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const userSchema = new mongoose.Schema({
  userName: {
    type: String,
    required: [true, "Username is required."],
    minLength: [3, "Username must be at least 3 characters."],
    maxLength: [40, "Username must be under 40 characters."],
  },
  password: {
    type: String,
    required: [true, "Password is required."],
    select: false,
    minLength: [8, "Password must be at least 8 characters."],
  },
  email: {
    type: String,
    required: [true, "Email is required."],
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      "Please enter a valid email address.",
    ],
  },
  address: String,
  phone: {
    type: String,
    required: [true, "Phone number is required."],
    match: [
      /^[6-9]\d{9}$/,
      "Please enter a valid 10-digit phone number.",
    ],
  },
  profileImage: {
    public_id: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
  },
  paymentMethods: {
    bankTransfer: {
      bankAccountNumber: {
        type: String,
        match: [/^\d{9,18}$/, "Enter a valid bank account number."],
      },
      bankAccountName: String,
      bankName: String,
    },
    upi: {
      upiId: {
        type: String,
        match: [
          /^[\w.\-_]{2,256}@[a-zA-Z]{2,64}$/,
          "Enter a valid UPI ID (e.g., name@bank)",
        ],
      },
    },
    paypal: {
      paypalEmail: {
        type: String,
        match: [
          /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
          "Enter a valid PayPal email.",
        ],
      },
    },
  },
  role: {
    type: String,
    enum: ["Auctioneer", "Bidder", "Super Admin"],
    required: true,
  },
  unpaidCommission: {
    type: Number,
    default: 0,
  },
  auctionsWon: {
    type: Number,
    default: 0,
  },
  moneySpent: {
    type: Number,
    default: 0,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
});

userSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

userSchema.methods.generateJsonWebToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET_KEY, {
    expiresIn: process.env.JWT_EXPIRE,
  });
};

export const User = mongoose.model("User", userSchema);
