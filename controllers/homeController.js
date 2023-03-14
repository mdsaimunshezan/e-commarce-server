import ProdectModel from "../models/prodectModel.js";

export const getCategoryProdect = async (req, res) => {
  const name = req.params.name;
  const keyword = req.params.keyword;
  const page = req.params.page;
  const PEG_PER_ITEM = 12;
  const skip = (page - 1) * PEG_PER_ITEM;
  try {
    const options = name
      ? { category: name }
      : keyword && { title: { $regex: keyword, $options: "i" } };

    if (page) {
      const prodect = await ProdectModel.find({ ...options })
        .limit(PEG_PER_ITEM)
        .skip(skip)
        .where("stock")
        .gt(0)
        .populate("reviews")
      const count = await ProdectModel.find({
        ...options,
      })
        .countDocuments()
        .where("stock")
        .gt(0);

      const pageCount = Math.ceil(count / PEG_PER_ITEM);

      res.status(200).json({ prodect, count, pageCount });
    } else {
      const prodect = await ProdectModel.find({ ...options })
        .limit(5)
        .where("stock")
        .gt(0)
        .populate("reviews")
      const count = await ProdectModel.find({
        ...options,
      }).countDocuments();

      res.status(200).json({ prodect, count });
    }
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};
