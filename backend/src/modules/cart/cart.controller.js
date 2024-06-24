import ErrorClass from "../../utils/ErrorClass.js";
import bookModel from "../../DB/models/Book.model.js";
import cartModel from "../../DB/models/Cart.model.js";
import { asyncHandler } from "../../utils/errorHandling.js";

//
export const addToCart = asyncHandler(async (req, res, next) => {
  const { bookId, quantity } = req.body;

  const book = await bookModel.findById(bookId);
  if (!book) {
    return next(new ErrorClass("This Book Is Not Found ", 404));
  }
  if (quantity > book.stock) {
    await bookModel.findByIdAndUpdate(bookId, {
      $addToSet: { wishList: req.user._id },
    });

    return next(
      new ErrorClass("Out Of Stock this item quantity not enough", 400)
    );
  }

  const cart = await cartModel.findOne({ userId: req.user._id });
  const bookIndex = cart.books.findIndex(
    (ele) => ele.bookId.toString() == bookId
  );
  if (bookIndex == -1) {
    cart.books.push({
      bookId,
      quantity,
    });
  } else {
    cart.books[bookIndex].quantity = quantity;
  }

  cart.save();
  return res
    .status(200)
    .json({ success: true, message: `Book ${book.title} added from cart` });
});

export const deleteFromCart = asyncHandler(async (req, res, next) => {
  console.log("deleteeeeeee");
  console.log(req.params.id);
  const book = await cartModel.findOne({
    userId: req.user._id,
  });
  if (!book) {
    return next(new ErrorClass("This book Is Not Found ", 404));
  }
  const cart = await cartModel.findOneAndUpdate(
    { userId: req.user._id },
    {
      $pull: {
        books: {
          bookId: req.params.id,
        },
      },
    }
  );

  res
    .status(200)
    .json({ success: true, message: `Book ${book.title} deleted from cart` });
});

//
export const clearAllCart = asyncHandler(async (req, res, next) => {
  if (!req.user._id) return;

  await cartModel.findOneAndUpdate(
    { userId: req.user._id },
    {
      books: [],
    },
    { new: true }
  );

  return res
    .status(200)
    .json({ success: true, message: "Cart is empty now ", results: [] });
});

export const getUserCart = asyncHandler(async (req, res, next) => {

  const cart = await cartModel.findOne({ userId: req.user._id }).populate([
    { path: "books.bookId", select: "title coverImage paymentPrice" },
  ]);


  // console.log("cart",cart);
  if (!cart.books.length) {
    return res
      .status(200)
      .json({ success: true, message: "Done", results: [] });
  }


  let totalPrice = 0;
  cart.books = cart.books.filter((ele) => {
    if (ele?.bookId) {
      totalPrice += ele.bookId.paymentPrice * ele.quantity;
      return ele;
    }
  });
  cart.save();


  return res
    .status(200)
    .json({ success: true, message: "Done", results: { cart, totalPrice } });
});
