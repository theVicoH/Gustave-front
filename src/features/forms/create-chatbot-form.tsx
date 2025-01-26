"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import useCreateChatbot from "@/hooks/use-create-chatbot";

const FORM_SCHEMA = z.object({
  name: z.string().min(2).max(50),
});

const CreateChatbotForm = () => {
  const { mutate } = useCreateChatbot();

  const FORM = useForm<z.infer<typeof FORM_SCHEMA>>({
    resolver: zodResolver(FORM_SCHEMA),
    defaultValues: {
      name: "",
    },
  });

  function onSubmit(values: z.infer<typeof FORM_SCHEMA>) {
    mutate({ name: values.name, status: "public" });
  }

  return (
    <Form {...FORM}>
      <form onSubmit={FORM.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={FORM.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}

export default CreateChatbotForm;
