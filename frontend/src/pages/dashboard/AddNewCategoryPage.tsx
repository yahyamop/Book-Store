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
import { Textarea } from "@/components/ui/textarea";
import { CategorySchema } from "@/schemas";
import axios from "axios";
import { toast } from "sonner";
import { useState } from "react";
import { useAuthContext } from "@/contexts/AuthContextProvider";

const AddNewCategoryPage = () => {
  const {authUser} = useAuthContext()
  const [isPending, setIsPending] = useState(false);
  // 1. Define your form.
  const form = useForm<z.infer<typeof CategorySchema>>({
    resolver: zodResolver(CategorySchema),
    defaultValues: {
      title: "",
      description: "",
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof CategorySchema>) {
    setIsPending(true)
    await axios
      .post("http://localhost:5000/api/category", values, {
        withCredentials: true,
        headers:{
          authorization:`${authUser}`
        }
      })
      .then((res) => {
        toast.success(res.data.message);
        form.reset()
      })
      .catch((error) => toast.error(error.response.data.message))
      .finally(() => setIsPending(false));
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 p-10 max-w-2xl mx-auto mt-20">
      <h1 className="text-center text-3xl font-semibold ">Add New Category</h1>

        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input placeholder="Title" {...field} disabled={isPending} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea
                  disabled={isPending}
                  placeholder="Description"
                  className="resize-none"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button 
        className="w-96 block mx-auto"
        disabled={isPending}
        type="submit">{isPending ? "Loading" : "Add"}</Button>
      </form>
    </Form>
  );
};

export default AddNewCategoryPage;
