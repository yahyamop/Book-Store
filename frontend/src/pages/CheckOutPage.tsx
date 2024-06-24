import { useQuery, useQueryClient } from "react-query";
import { useAuthContext } from "@/contexts/AuthContextProvider";
import { fetcher } from "@/lib/utils";
import axios from "axios";
import { toast } from "sonner";
import CartItem from "@/components/cart/CartItem";
import { IBook } from "@/typings";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { FaSpinner } from "react-icons/fa";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

const formSchema = z.object({
  cardholderName: z.string().min(2, "this field is required").max(50),
  cardNumber: z.string().min(2, "this field is required").max(50),
  expirationDate: z.string().min(2, "this field is required").max(50),
  cvc: z.string().min(2, "this field is required").max(50),
});

const CheckOutPage = () => {
  const { authUser } = useAuthContext();
  const userId = authUser?.id;
  const useQueryVariable = useQueryClient();

  const { data } = useQuery({
    queryKey: ["UserCart", userId],
    queryFn: () => fetcher("http://localhost:5000/api/cart/", `${authUser}`),
    // refetchOnWindowFocus: false,
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      cardholderName: "",
      cardNumber: "",
      expirationDate: "",
      cvc: "",
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);

    await axios
      .put(
        "http://localhost:5000/api/cart/",
        {},
        {
          withCredentials: true,
          headers: {
            authorization: `${authUser}` || "",
          },
        }
      )
      .then(() => {
        toast.success("Payment has succeed");
        useQueryVariable.invalidateQueries({
          queryKey: ["UserCart", userId],
        });
        form.reset()
        
      })
      .catch((error) => toast.error(error.response.message));
  }

  if (!data) {
    return (
      <div className="min-h-[600px] flex justify-center items-center">
      <FaSpinner className="animate-spin size-10" />
      </div>
    );
  }

  const cartItems = data?.cart?.books || [];

  const clearCartHandler = async () => {
    await axios
      .put(
        "http://localhost:5000/api/cart/",
        {},
        {
          withCredentials: true,
          headers: {
            authorization: `${authUser}` || "",
          },
        }
      )
      .then((res) => {
        toast.success(res.data.message);
        useQueryVariable.invalidateQueries({
          queryKey: ["UserCart", userId],
        });
      })
      .catch((error) => toast.error(error.response.message));
  };

  return (
    <div className="grid md:grid-cols-2 min-h-[600px]">
      <div>
        {cartItems?.length > 0 ? (
          <div className="relative p-1 h-[90%]">
            <div className="overflow-auto  h-[70%] mt-1  p-1">
              {cartItems?.map((cartItem: IBook) => (
                <CartItem
                  key={cartItem.bookId}
                  data={cartItem}
                  userId={userId as string}
                />
              ))}
            </div>
            <div className="w-full flex flex-col items-center gap-4 absolute bottom-4">
              <p className="w-full text-start text-xl font-semibold">
                Total Price :$ {data?.totalPrice}
              </p>
              <Button
                onClick={clearCartHandler}
                className=" border rounded-3xl  w-72 "
                variant={"ghost"}
              >
                Clear Cart
              </Button>
            </div>
          </div>
        ) : (
          <div className="flex flex-col justify-center items-center gap-4 mt-40">
            <p>Cart Is Empty Start shopping Now</p>
            <Button>
              <Link to={"/books"}>Shop Now</Link>
            </Button>
          </div>
        )}
      </div>
      <div className="flex  justify-center p-4 mt-8">
        <div className="w-full max-w-md space-y-6">
          <h1 className="text-2xl font-bold  text-gray-900">
            Complete Payment
          </h1>
          <Card className="p-4 space-y-2">
            <CardContent className="space-y-4">
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-8"
                >
                  <FormField
                    control={form.control}
                    name="cardholderName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Cardholder Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Cardholder Name" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="cardNumber"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Card Number</FormLabel>
                        <FormControl>
                          <Input placeholder="4111 1111 1111 1111" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <div className="grid grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="expirationDate"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Expiration Date</FormLabel>
                          <FormControl>
                            <Input placeholder="MM/YY" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="cvc"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>CVC</FormLabel>
                          <FormControl>
                            <Input placeholder="123" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <Button type="submit" className="w-full">
                    Pay
                  </Button>
                </form>
              </Form>
            </CardContent>
            <CardFooter></CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default CheckOutPage;
