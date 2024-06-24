import categoryModel from "../../DB/models/Category.model.js";
import ErrorClass from "../../utils/ErrorClass.js";
import { asyncHandler } from "../../utils/errorHandling.js";

export const createNewCategory = asyncHandler(async (req,res,next) => {
  const { title, description } = req.body;

  const isCategoryTitleExists = await categoryModel.findOne({ title });

  if (isCategoryTitleExists) {
    return next(
      new ErrorClass(`This Category Name : ${title} Exists Before`, 409)
    );
  }

  const createdBy = req.user._id;

  const newCategory = await categoryModel.create({
    title,
    description,
    createdBy,
  });

  return res
    .status(201)
    .json({ success: true, message: `Category Name : ${title} Created`, results: newCategory });
});

export const getAllCategories = asyncHandler(async (req,res,next) => {
  const categories = await categoryModel.find({});

  return res
    .status(200)
    .json({ success: true, message: "Done", results: categories });
});

export const getCategoryById = asyncHandler(async (req,res,next) => {
  const { id } = req.params;

  const isCategoryExists = await categoryModel.findById(id);

  if (!isCategoryExists) {
    return next(new ErrorClass("This Category doesn't exist"));
  }

  return res
    .status(200)
    .json({ success: true, message: "Done", results: isCategoryExists });
});

export const updateCategoryById = asyncHandler(async (req,res,next) => {
  const { id } = req.params;

  const isCategoryExists = await categoryModel.findById(id);

  if (!isCategoryExists) {
    return next(new ErrorClass("This Category doesn't exist"));
  }

  const isCategoryTitleExists = await categoryModel.findOne({
    title: req.body.title,
    _id: { $ne: id },
  });

  if (isCategoryTitleExists) {
    return next(
      new ErrorClass("This Category Name : ${title} Exists Before", 409)
    );
  }

  const categoryToUpdate = await categoryModel.findByIdAndUpdate(
    id,
    { ...req.body },
    { new: true }
  );

  return res
    .status(200)
    .json({ success: true, message: "Done", results: categoryToUpdate });
});

export const deleteCategoryById = asyncHandler(async (req,res,next) => {
  const { id } = req.params;

  const categoryToDelete = await categoryModel.findByIdAndDelete(id);

  if (!categoryToDelete) {
    return next(new ErrorClass("This Category doesn't exist"));
  }

  return res.status(204).json({ success: true, message: "Done" });
});
