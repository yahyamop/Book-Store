import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

import { format } from "date-fns";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { CalendarIcon } from "@radix-ui/react-icons";
import { BookSchema } from "@/schemas";
import { cn, convertFileToUrl } from "@/lib/utils";
import { ElementRef, useEffect, useRef, useState } from "react";
import { BiX } from "react-icons/bi";
import { toast } from "sonner";
import axios from "axios";
import { useAuthContext } from "@/contexts/AuthContextProvider";

const AddNewBookPage = () => {
  const {authUser} = useAuthContext()
  const [isPending, setIsPending] = useState<boolean>(false);
  const [file, setFile] = useState<File | null>();
  const [fileError, setFileError] = useState("");

  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      await axios
        .get("http://localhost:5000/api/category")
        .then((res) => setCategories(res.data.results))
        .catch((error) => toast.error(error.response.data.message));
    };

    fetchCategories();
  }, []);

  const fileRef = useRef<ElementRef<"input">>(null);
  let imagePreview =
    file && file.type.startsWith("image") && convertFileToUrl(file);

  const form = useForm<z.infer<typeof BookSchema>>({
    resolver: zodResolver(BookSchema),
    defaultValues: {
      title: "", // No validation currently
      description: "", // No validation currently
      author: "", // No validation currently
      price: "1", // Consider changing to number for calculations
      discount: "0", // Consider changing to number for calculations
      coverImage: "", // Might want to consider validation for image format/size
      categoryId: "", // Likely needs validation for existing category options
      publishedDate: new Date(), // Consider using z.date() for date manipulation
      totalPages: "1", // Already defined as number
      stock: "1", // Already defined as number
      soldItemsNumber: "0", // Already defined as number
    },
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof BookSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);

    if (!file) {
      return setFileError("cover image is required");
    }

    form.setValue("coverImage", file);
    setIsPending(true);
    const formData = new FormData();
    formData.append("title", values.title);
    formData.append("description", values.description);
    formData.append("author", values.author);
    formData.append("categoryId", values.categoryId);
    formData.append("discount", values.discount);
    formData.append("price", values.price);
    formData.append("totalPages", values.totalPages);
    formData.append("stock", values.stock);
    formData.append("soldItemsNumber", values.soldItemsNumber);
    formData.append("publishedDate", values.publishedDate);
    formData.append("coverImage", file as File);

    axios
      .post(`http://localhost:5000/api/book/`, formData, {
        withCredentials: true,
        headers:{
          authorization:`${authUser}`
        }
      })
      .then((res) => {
        toast.success(res.data.message);
        form.reset();
        form.setValue("categoryId", "");
        setFile(null);
      })
      .catch((error) => {
        console.log(error);
        toast.error(error.response.data.message);
      })
      .finally(() => setIsPending(false));

    //   if (method === "Create") {

    //  }
    //  if (method === "Update") {
    //    setIsPending(true);
    //    const formData = new FormData();
    //    if (file) {
    //      form.setValue("coverImage", file);
    //      formData.append("coverImage", file as File);
    //    }
    //    formData.append("name", values.name);
    //    await axios
    //      .put(`/api/category/${data?._id}`, formData)
    //      .then(async (res) => {
    //        toast.success(res.data.message);
    //        await useQuery.invalidateQueries({
    //          queryKey: ["Category", data?._id],
    //        });
    //        form.reset();
    //        setFile(null);
    //      })
    //      .catch((error) => toast.error(error.response.data.message))
    //      .finally(() => setIsPending(false));
    //  }
  }

  return (
    <div className="border shadow-sm rounded-lg p-4 md:p-6 ">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 max-w-3xl mt-10 mx-auto">
          <h1 className="text-center text-3xl font-semibold ">
            Add New Book
          </h1>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-2">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input placeholder="Title" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="author"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Author</FormLabel>
                  <FormControl>
                    <Input placeholder="Author" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="categoryId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Category</FormLabel>
                  <FormControl>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        {categories?.map(
                          (category: { _id: string; title: string }) => (
                            <SelectItem value={category._id}>
                              {category.title}
                            </SelectItem>
                          )
                        )}
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="grid gap-2">
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="description"
                      className="resize-none"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Price</FormLabel>
                  <FormControl>
                    <Input placeholder="Price" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="discount"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Discount</FormLabel>
                  <FormControl>
                    <Input placeholder="Discount" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="publishedDate"
              render={({ field }) => (
                <FormItem className="flex flex-col mt-2.5 ">
                  <FormLabel>Published Date</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "w-full pl-3 text-left font-normal",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          {field.value ? (
                            format(field.value, "PPP")
                          ) : (
                            <span>Pick a date</span>
                          )}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        disabled={(date) =>
                          date > new Date() || date < new Date("1900-01-01")
                        }
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>

                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            <FormField
              control={form.control}
              name="totalPages"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Total Pages</FormLabel>
                  <FormControl>
                    <Input placeholder="Total Pages" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="stock"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Stock</FormLabel>
                  <FormControl>
                    <Input placeholder="Stock" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="soldItemsNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Sold Items</FormLabel>
                  <FormControl>
                    <Input placeholder="Sold Items" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* File */}

          <div
            className="relative cursor-pointer w-[250px] h-[250px] mx-auto border rounded-md flex justify-center items-center  bg-cover bg-no-repeat bg-center"
            style={{ backgroundImage: `url(${imagePreview || ""})` }}
            onClick={() => fileRef?.current?.click()}
          >
            <Button
              className={cn(imagePreview && "hidden")}
              type="button"
              variant={"ghost"}
              size={"sm"}
            >
              Upload Image
            </Button>

            <Input
              ref={fileRef}
              className="absolute w-full h-full hidden"
              disabled={isPending}
              placeholder="File"
              type="file"
              onChange={(e) => {
                setFile(e.target?.files?.[0]);
                setFileError("");
              }}
            />
            <Button
              className={cn(
                "absolute top-1 right-1 h-fit p-2 hidden hover:bg-transparent z-50",
                imagePreview && "block"
              )}
              type="button"
              variant={"ghost"}
              onClick={() => {
                setFile(null);
                imagePreview = "";
              }}
            >
              <BiX className="size-8 text-xl text-pinkBackgroundColor" />
            </Button>
          </div>

          <p
            className={cn(
              "hidden text-sm font-semibold text-red-600",
              fileError.length > 0 && "block mx-auto mt-4"
            )}
          >
            {fileError}
          </p>

          <Button className="block mx-auto w-[70%]" type="submit" disabled={isPending}>
            {isPending ? "Loading" : "Submit"}
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default AddNewBookPage;
