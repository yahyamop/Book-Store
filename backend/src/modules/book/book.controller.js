import bookModel from "../../DB/models/Book.model.js";
import categoryModel from "../../DB/models/Category.model.js";
import userModel from "../../DB/models/User.model.js";
import ErrorClass from "../../utils/ErrorClass.js";
import { ApiFeatures } from "../../utils/apiFeatures.js";
import cloudinary from "../../utils/cloudinary.js";
import { asyncHandler } from "../../utils/errorHandling.js";

export const createNewBook = asyncHandler(async (req, res, next) => {
  if (req.body.discount > 0 ) {
    req.body.paymentPrice =
      req.body.price - (req.body.price * req.body.discount) / 100;
      req.body.onSale = true
  } else {
    req.body.paymentPrice = req.body.price;
    req.body.onSale = false
  }

  const isCategoryExists = categoryModel.findById(req.body.categoryId);

  if (!isCategoryExists) {
    return next(new ErrorClass("This Category doesn't exist"));
  }


  if (req.file) {
    const { secure_url, public_id } = await cloudinary.uploader.upload(
      req.file.path,
      { folder: `Book-Store/Book/${req.body.title}/CoverImage` }
    );
    req.body.coverImage = { secure_url, public_id };
  }

  //ToDo add Image Url

  req.body.createdBy = req.user._id;

  const newBook = await bookModel.create({ ...req.body });

  return res
    .status(200)
    .json({
      success: true,
      message: `Book ${req.body.title} Created`,
      results: newBook,
    });
});

export const getAllBooks = asyncHandler(async (req, res, next) => {

  const { results, metaData } = await ApiFeatures(bookModel, req.query);


  return res
    .status(200)
    .json({ success: true, message: "Done", results: {books:results , metaData} });
});

export const getBookById = asyncHandler(async (req, res, next) => {
  const {id} = req.params;


  const book = await bookModel.findById(id);

  if (!book) {
    return next(new ErrorClass("Cannot Find This Doc", 404));
  }


  return res
    .status(200)
    .json({ success: true, message: "Done", results: book });
});

export const updateBookById = asyncHandler(async (req, res, next) => {
  const { id } = req.params;

  const bookToUpdate = await bookModel.findByIdAndUpdate(
    id,
    {
      ...req.body,
    },
    {
      new: true,
    }
  );

  if (!bookToUpdate) {
    return next(new ErrorClass("This book doesn't exist"));
  }

  return res
    .status(204)
    .json({ success: true, message: "Done", results: bookToUpdate });
});

export const deleteBookById = asyncHandler(async (req, res, next) => {
  const { id } = req.params;

  const bookToDelete = await bookModel.findByIdAndDelete(id);

  if (!bookToDelete) {
    return next(new ErrorClass("This book doesn't exist"));
  }

  return res.status(204).json({ success: true, message: `Book ${bookToDelete.title} Deleted . ` });
});

//Wish List
export const getWishList = asyncHandler(async (req, res, next) => {
  const userId = req.user._id;

  if (!userId)
    return next(new ErrorClass("Cannot access you have log in first", 401));

  const user = await userModel.findById(userId).populate({
    path: "wishList",
  });
  const wishList = user.wishList;

  return res
    .status(200)
    .json({ success: true, message: "Done", results: wishList });
});

export const addToWishList = asyncHandler(async (req, res, next) => {
  const { bookId } = req.params;

  const isBookExists = await bookModel.findById(bookId);
  if (!isBookExists) {
    return next(new ErrorClass("No Product Found", 404));
  }

  if (req.user.wishList.includes(bookId)) {
    return next(new ErrorClass("Added before", 400));
  }

  const { wishList } = await userModel.findOneAndUpdate(
    { _id: req.user._id },
    {
      $addToSet: {
        wishList: bookId,
      },
    }
  );
  return res.status(200).json({
    success: true,
    message: `Book: ${isBookExists.title} added to wish list`,
    results: wishList,
  });
});
//Remove
export const removeFromWishList = asyncHandler(async (req, res, next) => {
  const { bookId } = req.params;

  if (!req.user.wishList.includes(bookId)) {
    return next(new ErrorClass("No Book Found", 404));
  }

  const { wishList } = await userModel.findOneAndUpdate(
    { _id: req.user._id },
    {
      $pull: {
        wishList: bookId,
      },
    }
  );
  return res.status(200).json({
    success: true,
    message: `Book  Removed From  wish list`, //${isProductExist.name}
    results: wishList,
  });
});
//Clear
export const clearAllWishList = asyncHandler(async (req, res, next) => {
  if (!req.user.wishList.length) {
    return next(new ErrorClass("Cart Is Empty", 200));
  }
  await userModel.findOneAndUpdate(
    { _id: req.user._id },
    {
      wishList: [],
    }
  );
  return res.status(200).json({ message: "Done" });
});
