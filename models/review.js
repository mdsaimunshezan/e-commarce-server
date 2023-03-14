import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema(
  {
    rating: {
      type: Number,
      default: 1,
    },
    message: {
      type: String,
    },
    status: {
      default:true,
      type: Boolean
    },
    prodect: {
      type: mongoose.Types.ObjectId,
      ref: "Prodect",
    },
    user: {
      type: mongoose.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

const ReviewModel = mongoose.model("Review",reviewSchema);

export default ReviewModel;
