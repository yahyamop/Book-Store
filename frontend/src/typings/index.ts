export interface IImage {
  secure_url: string;
  public_id: string;
}

export interface IBook {
  bookId?:string,
  _id:string
  title:string,
  description:string,
  author:string,
  price: number,
  discount: number,
  paymentPrice: number,
  coverImage: IImage,
  categoryId: string,
  publishedDate: Date,
  totalPages: number,
  stock: number,
  soldItemsNumber:number,
  createdBy: string,
  onSale:boolean
}
export interface ICartItem {
  bookId: string;
  _id: string;
  name: string;
  coverImage: IImage;
  paymentPrice: string;
  quantity: number;
}
