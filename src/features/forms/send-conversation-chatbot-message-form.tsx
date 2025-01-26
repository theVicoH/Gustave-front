"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Loader2 } from "lucide-react";
import useSendConversationChatbotMessage from "@/hooks/use-send-conversation-chatbot-message";

const FORM_SCHEMA = z.object({
  message: z.string().min(1).max(500),
});

interface SendConversationChatbotMessageFormProps {
  chatbotId: number;
  conversationId: string;
}

const SendConversationChatbotMessageForm: React.FC<SendConversationChatbotMessageFormProps> = ({ 
  chatbotId, 
  conversationId 
}) => {
  const { mutate, isPending } = useSendConversationChatbotMessage();

  const FORM = useForm<z.infer<typeof FORM_SCHEMA>>({
    resolver: zodResolver(FORM_SCHEMA),
    defaultValues: {
      message: "",
    },
  });

  function onSubmit(values: z.infer<typeof FORM_SCHEMA>) {
    const message = values.message;
    FORM.reset();
    mutate({ message, chatbotId, conversationId });
  }

  return (
    <Form {...FORM}>
      <form onSubmit={FORM.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={FORM.control}
          name="message"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input placeholder="Type your message..." {...field} />
              </FormControl>
            </FormItem>
          )}
        />
        <Button disabled={isPending} type="submit">
          {isPending ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Sending...
            </>
          ) : (
            'Send'
          )}
        </Button>
      </form>
    </Form>
  );
}

export default SendConversationChatbotMessageForm;
