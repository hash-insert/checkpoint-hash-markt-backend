import mongoose from "mongoose";

const customerSchema = mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    favourite: [{ type: mongoose.Schema.Types.ObjectId, ref: "Product" }],
    cart_items: [{ type: mongoose.Schema.Types.ObjectId, ref: "Product" }],
  },
  { timestamps: true }
);


const Customer = mongoose.model("Customer", customerSchema);

export default  Customer;
