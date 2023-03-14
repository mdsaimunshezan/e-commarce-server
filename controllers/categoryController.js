import CategoryModel from "../models/categoryModel.js";

export const createCategory = async (req, res) => {
  const { name } = req.body;
  try {
    if (name) {
      //CHECK ALREADY EXIST CATEGORY
      const isCategoryExist = await CategoryModel.findOne({ name: name });
      if (isCategoryExist)
        return res.status(400).json({ message: `${name} is Already Exist` });

      const category = new CategoryModel({
        name,
      });

      //SAVE CATEGORY
      await category.save();

      res.status(200).json({ message: "Category Added Successfull" });
    } else {
      res.status(400).json({ message: "name is required" });
    }
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

export const getCategory = async (req, res) => {
  const page = req.query.page || 1;
  const ITEM_PER_PAGE = 6;
  const skip = (page - 1) * ITEM_PER_PAGE;
  try {
    const category = await CategoryModel.find({})
      .sort({ createdAt: -1 })
      .limit(ITEM_PER_PAGE)
      .skip(skip);
    const totalPage = await CategoryModel.countDocuments();
    const pageCount = Math.ceil(totalPage / ITEM_PER_PAGE);

    res.status(200).json({ category, pageCount });
  } catch (error) {
    res.status(500).json({ message: "Server is error" });
  }
};

export const randomCategory = async (req,res)=>{
  try {
    const randomItem = await CategoryModel.aggregate([
      {$sample:{size:5}}
    ]);

    res.status(200).json(randomItem)
  } catch (error) {
    res.status(500).json({message:"Internal Server error"})
  }
}

export const getAllCategory = async (req, res) => {
  try {
    const allCategory = await CategoryModel.find({});
    res.status(200).json(allCategory);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

export const getSingleCategory = async (req, res) => {
  const { id } = req.params;
  try {
    const singleCategory = await CategoryModel.findById({ _id: id });
    res.status(200).json(singleCategory);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

export const updateCategory = async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  try {
    if (name) {
      const exist = await CategoryModel.findOne({ name: name });
      if (!exist) {
        const category = await CategoryModel.findOneAndUpdate(
          { _id: id },
          { name: name },
          { new: true }
        );
        res.status(200).json(category);
      } else {
        res
          .status(400)
          .json({ message: `${name} is Already exist. you can't update` });
      }
    } else {
      res.status(400).json({ message: "Name is required" });
    }
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

export const deleteCategory = async (req, res) => {
  const { id } = req.params;
  try {
    await CategoryModel.findOneAndDelete({ _id: id });
    res.status(200).json({ message: "Delete successfull" });
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};
