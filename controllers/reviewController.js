import OrderModel from "../models/orderModel.js";
import ProdectModel from "../models/prodectModel.js";
import ReviewModel from "../models/review.js";

export const addReview = async (req, res) => {
  const { rating, message, prodect, user, id } = req.body;
  console.log(req.body);
  try {
    const review = new ReviewModel({
      rating,
      message,
      prodect,
      user,
    });

    const svaeReview = await review.save();
    await ProdectModel.findOneAndUpdate(
      { _id: prodect },
      { $push: { reviews: svaeReview._id } }
    );
    await OrderModel.findOneAndUpdate(
      { _id: id },
      { confirmReview: true },
      { new: true }
    );
    res.status(200).json({ message: "review added successfull" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getReivew = async (req, res) => {
  try {
    const review = await ReviewModel.find({})
      .populate("prodect")
      .populate("user");
    res.status(200).json(review);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const singelReview = async (req,res)=>{
 
  const { id } = req.params;
  console.log(id)
  try {
    const review = await ReviewModel.find({prodect:id}).populate("user")
    res.status(200).json(review)
  } catch (error) {
    res.status(500).json({message:"server internal error"})
  }
}
