"use client";

import ChatInterface from "@/components/chat/chat-interface";

const ChatBotPageView = ({ trans }: { trans: any }) => {
  return (
    <div>
      <div className="flex items-center flex-wrap justify-between gap-4">
        <div className="text-2xl font-medium text-default-800">
          {/* {trans.chatbot || "Chat Bot"} */}
        </div>
      </div>
      <div className="grid grid-cols-12 gap-6">
        <div className="col-span-12">
          <div className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow">
            <ChatInterface />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatBotPageView;
