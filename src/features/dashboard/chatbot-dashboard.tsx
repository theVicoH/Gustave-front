"use client";

import { Card, CardHeader, CardContent } from "@/components/ui/card";
import {
  Bot,
  Settings,
  Globe,
  Crown,
  MoreVertical,
  Plus,
  Trash,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useState, useEffect } from "react";
import { useChatbotStore } from "@/stores/chatbot-store";
import CreateChatbotForm from "@/features/forms/create-chatbot-form";
import { useDeleteChatbot } from "@/hooks/use-delete-chatbot";
import { useGetAllChatbots } from "@/hooks/use-get-all-chatbots";
import { useQueryClient } from "@tanstack/react-query";

export function ChatbotDashboard() {
  const { data: chatbots = [], isLoading } = useGetAllChatbots();
  const [open, setOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [isCreating, setIsCreating] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const queryClient = useQueryClient();
  const deleteChat = useDeleteChatbot();
  const setSelectedChatbot = useChatbotStore(
    (state) => state.setSelectedChatbot
  );
  const selectedChatbotId = useChatbotStore((state) => state.selectedChatbotId);

  console.log("Current selectedChatbotId:", selectedChatbotId);

  const handleCardClick = (botId: string) => {
    console.log("Card clicked with botId:", botId);
    setSelectedChatbot(selectedChatbotId === botId ? null : botId);
  };

  useEffect(() => {
    console.log("selectedChatbotId changed to:", selectedChatbotId);
  }, [selectedChatbotId]);

  const handleSuccess = () => {
    setIsCreating(false);
    setOpen(false);
    setIsEditing(false);
    queryClient.invalidateQueries({ queryKey: ["chatbots"] });
  };

  const handleDeleteClick = (botId: number) => {
    setSelectedChatbot(botId.toString());
    setDeleteOpen(true);
  };

  const handleConfirmDelete = () => {
    if (selectedChatbotId) {
      deleteChat.mutate(selectedChatbotId, {
        onSuccess: () => {
          setDeleteOpen(false);
          setSelectedChatbot(null);
          queryClient.invalidateQueries({ queryKey: ["chatbots"] });
        },
        onError: () => {
          setDeleteOpen(false);
          setSelectedChatbot(null);
        },
      });
    }
  };

  return (
    <div className="h-full overflow-hidden">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground mt-2">
            Vue d'ensemble de votre chatbot
          </p>
        </div>

        <div className="flex gap-4">
          <Card className="p-3 bg-white border border-gray-200">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-primary/10 rounded-lg">
                <Bot className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  Chatbots
                </p>
                <h3 className="text-2xl font-bold">{chatbots.length}</h3>
              </div>
            </div>
          </Card>
        </div>
      </div>

      <div className="flex flex-col gap-6">
        {chatbots.length > 0 && (
          <div className="flex justify-end">
            <Button
              onClick={() => setOpen(true)}
              className="bg-black text-white hover:bg-gray-800 transition-colors"
            >
              <Plus className="mr-2 h-4 w-4" />
              Create Chatbot
            </Button>
          </div>
        )}

        <div className="overflow-y-auto">
          {isLoading ? (
            <div>Loading...</div>
          ) : chatbots && chatbots.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {chatbots.map((bot) => (
                <Card
                  key={bot.id}
                  className={`cursor-pointer transition-all duration-200 ${
                    selectedChatbotId === bot.id.toString()
                      ? "border-2 border-black shadow-lg"
                      : "hover:border-gray-300"
                  }`}
                  onClick={() => handleCardClick(bot.id.toString())}
                >
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <h3 className="font-semibold text-lg">{bot.name}</h3>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem
                          onClick={() => {
                            setIsEditing(true);
                            setSelectedChatbot(bot.id.toString());
                            setOpen(true);
                          }}
                        >
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          className="text-red-600"
                          onClick={() => handleDeleteClick(bot.id)}
                        >
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex items-center text-gray-600">
                      <Bot className="mr-2 h-4 w-4" />
                      <span>Status: {bot.status}</span>
                    </div>
                    <div className="flex items-center text-gray-600">
                      <Crown className="mr-2 h-4 w-4" />
                      <span>
                        Abonnement: {bot.active ? "Actif" : "Non actif"}
                      </span>
                    </div>
                    <div className="flex items-center text-gray-600">
                      <Globe className="mr-2 h-4 w-4" />
                      <span>
                        Created: {new Date(bot.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="flex min-h-[70vh] gap-4 flex-col items-center justify-center text-center">
              <div className="mb-6 rounded-full bg-gray-100 p-8">
                <Bot className="h-12 w-12 text-gray-400" />
              </div>
              <h1 className="mb-2 text-2xl font-bold">
                Start Creating Your First Chatbot
              </h1>
              <p className="mb-8 text-gray-600">
                Looks like you haven&apos;t set up a chatbot yet. Create one now
                and start to help your client.
              </p>
              <Button
                onClick={() => setOpen(true)}
                className="bg-black text-white hover:bg-gray-800 transition-colors"
              >
                <Plus className="mr-2 h-4 w-4" />
                Create Chatbot
              </Button>
            </div>
          )}
        </div>
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {isEditing ? "Edit Chatbot" : "Create a New Chatbot"}
            </DialogTitle>
          </DialogHeader>
          <CreateChatbotForm
            chatbotId={selectedChatbotId}
            isEditing={isEditing}
            onSuccess={handleSuccess}
            onSubmitStarted={() => setIsCreating(true)}
          />
        </DialogContent>
      </Dialog>

      <Dialog open={deleteOpen} onOpenChange={setDeleteOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Chatbot</DialogTitle>
          </DialogHeader>
          <p>Are you sure you want to delete this chatbot?</p>
          <div className="flex justify-end gap-3 mt-4">
            <Button variant="outline" onClick={() => setDeleteOpen(false)}>
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={handleConfirmDelete}
              disabled={deleteChat.isLoading}
            >
              Delete
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
