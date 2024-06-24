import { Schema, Types, model ,mongoose} from "mongoose";

const bookSchema = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    author: { type: String, required: true },
    price: { type: Number, required: true },
    discount: { type: Number, default: 0 },
    onSale: Boolean,
    paymentPrice: { type: Number, required: true },
    coverImage: {},
    categoryId: { type: Types.ObjectId, ref: "Category" },
    publishedDate: Date,
    totalPages: Number,
    stock: { type: Number, required: true, default: 1 },
    soldItemsNumber: { type: Number, default: 0 },
    createdBy: { type: Types.ObjectId, ref: "User" },
  },
  {
    timestamps: true,
  }
);

const bookModel = mongoose.models.Book || model("Book", bookSchema);
export default bookModel;
