import ProdectModel from "../models/prodectModel.js";

// create prodect
export const createProdect = async (req, res) => {
  const { title, category, discount, price, stock, colors, value, size } =
    req.body;

  console.log(req?.files);

  try {
    if (
      title &&
      category &&
      discount &&
      price &&
      stock &&
      colors &&
      value &&
      size
    ) {
      if (req?.files) {
        const prodect = new ProdectModel({
          title,
          category,
          discount,
          price,
          stock,
          colors: JSON.parse(colors),
          value,
          size: JSON.parse(size),
          image1: req.files?.image1[0].filename,
          image2: req.files?.image2[0].filename,
          image3: req.files?.image3[0].filename,
        });

        await prodect.save();

        res.status(200).json({ message: "Prodect added successfull" });
      } else {
        res.status(400).json({ message: "Image Field Are Required" });
      }
    } else {
      res.status(400).json({ message: "All Field Are Required" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// get prodect
export const getProdect = async (req, res) => {
  const page = req.query.page || 1;
  const PAGE_PER_ITEM = 10;
  const skip = (page - 1) * PAGE_PER_ITEM;

  try {
    const prodect = await ProdectModel.find({})
      .limit(PAGE_PER_ITEM)
      .skip(skip)
      .sort({ createdAt: -1 })
      .where("stock")
      .gt(0)
    const totalPageCount = await ProdectModel.countDocuments();
    const pageCount = Math.ceil(totalPageCount / PAGE_PER_ITEM);
    res.status(200).json({ prodect, pageCount });
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

// single prodect
export const getSingleProdect = async (req, res) => {
  const { id } = req.params;
  try {
    const singleProdect = await ProdectModel.findById({ _id: id });
    res.status(200).json(singleProdect);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

// update prodect
export const updateProdect = async (req, res) => {
  const { id } = req.params;
  const { title, category, discount, price, stock, colors, value, size } =
    req.body;

  try {
    if (
      title &&
      category &&
      discount &&
      price &&
      stock &&
      colors.length &&
      value &&
      size.length
    ) {
      const update = await ProdectModel.findOneAndUpdate(
        { _id: id },
        {
          $set: {
            title,
            category,
            discount,
            price,
            stock,
            colors: JSON.parse(colors),
            value,
            size: JSON.parse(size),
          },
        },
        { new: true }
      );
      res.status(200).json(update);
    } else {
      res.status(400).json({ message: "All Field Are Required" });
    }
  } catch (error) {}
};

// delete prodect
export const deleteProdect = async (req, res) => {
  const { id } = req.params;
  try {
    await ProdectModel.findOneAndDelete({ _id: id });
    res.status(200).json({ message: "Prodect Delete Successfull" });
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};
