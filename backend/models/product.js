import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true, // when we create a produt or updated them each a nd every product have the field {createdAt and updatedAt}
  }
);

const Product = mongoose.model("Product", productSchema);

export default Product;
