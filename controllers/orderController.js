import OrderModel from "../models/orderModel.js";

export const getOrder = async (req, res) => {
  const page = req.query.page || 1;
  const PET_PER_ITEM = 2;
  const skip = (page - 1) * PET_PER_ITEM;

  try {
    const order = await OrderModel.find({})
      .limit(PET_PER_ITEM)
      .skip(skip)
      .sort({ createdAt: -1 })
      .populate("prodectId", "-colors -size -image2 -image3 -value")
      .populate("userId", "-password -admin");
    const totalPage = await OrderModel.countDocuments();
    const pageCount = Math.ceil(totalPage / PET_PER_ITEM);

    res.status(200).json({ order, pageCount });
  } catch (error) {
    res.status(500).json({ message: "server internal error" });
  }
};

export const singleGetOrder = async (req, res) => {
  const { id } = req.params;
  try {
    const singleOrder = await OrderModel.findById({ _id: id })
      .populate("prodectId", "-colors -size -image2 -image3 -value")
      .populate("userId", "-password -admin");
    res.status(200).json(singleOrder);
  } catch (error) {
    res.status(500).json({ message: "server internal error" });
  }
};

export const updateStatus = async (req, res) => {
  const { id } = req.params;
  try {
    await OrderModel.findOneAndUpdate(
      { _id: id },
      { status: true },
      { new: true }
    );
    res.status(200).json({ message: "status update successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateDelevert = async(req,res)=>{
  const { id } = req.params;
  try {
    await OrderModel.findOneAndUpdate({_id:id},{receipet:true},{new:true});
    res.status(200).json({message:"order update successfull"})
  } catch (error) {
    res.status(500).json({message:"server internal error"})
  }
}

export const userOrder = async (req, res) => {
  const { id } = req.params;

  try {
    const orderUser = await OrderModel.find({ userId: id })
      .sort({ createdAt: -1 })
      .populate("prodectId", "-colors -size -image2 -image3 -value")
      .populate("userId", "-password -admin");
    res.status(200).json(orderUser);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
