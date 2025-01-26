import ChatbotConversationMessagesFeed from "@/features/feeds/chatbot-conversation-messages-feed";
import SendConversationChatbotMessageForm from "@/features/forms/send-conversation-chatbot-message-form";

interface PageProps {
  params: {
    chatbotId: string;
    conversationId: string;
  };
}

const ConversationPage = async ({ params }: PageProps) => {
  const { chatbotId, conversationId } = await params;
  return (
    <div className="pb-96">
      <ChatbotConversationMessagesFeed chatbotId={chatbotId} conversationId={conversationId} />
      <SendConversationChatbotMessageForm chatbotId={Number(chatbotId)} conversationId={conversationId} />
    </div>
  )
}

export default ConversationPage
