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
  QrCode,
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
import { useDownloadFlyer } from "@/hooks/use-download-flyer";

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
  const downloadFlyer = useDownloadFlyer();

  console.log("Current selectedChatbotId:", selectedChatbotId);

  useEffect(() => {
    if (!isLoading && chatbots.length > 0 && !selectedChatbotId) {
      setSelectedChatbot(chatbots[0].id.toString());
    }
  }, [isLoading, selectedChatbotId, setSelectedChatbot]);

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
    queryClient.invalidateQueries({ queryKey: ["chatbots"] }).then(() => {
      if (chatbots.length === 0) {
        const newChatbots = queryClient.getQueryData(["chatbots"]) as any[];
        if (newChatbots?.length === 1) {
          setSelectedChatbot(newChatbots[0].id.toString());
        }
      }
    });
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

  const handleDownloadFlyer = (chatbotId: string) => {
    downloadFlyer.mutate(chatbotId);
  };

  return (
    <div className="h-full overflow-hidden">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-8  mb-12">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground">
            Vue d'ensemble de votre chatbot
          </p>
        </div>

        <div className="flex items-center gap-8">
          {chatbots.length > 0 && (
            <Button
              onClick={() => setOpen(true)}
              className="bg-black p-3 text-white hover:bg-gray-800 transition-colors px-6 py-2 h-12"
            >
              <Plus className="mr-3 h-5 w-5" />
              Create Chatbot
            </Button>
          )}
          <Card className="p-3 bg-white border border-gray-200 shadow-sm hover:shadow-md transition-all">
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-primary/10 rounded-lg">
                <Bot className="h-6 w-6 text-primary" />
              </div>

              <div>
                <p className="text-sm font-medium text-muted-foreground mb-1">
                  Chatbots
                </p>
                <h3 className="text-2xl font-bold">{chatbots.length}</h3>
              </div>
            </div>
          </Card>
        </div>
      </div>

      <div className="space-y-8 h-full justify-center">
        <div className="overflow-y-auto justify-center ">
          {isLoading ? (
            <div className="flex justify-center items-center min-h-[300px]">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-black"></div>
            </div>
          ) : chatbots && chatbots.length > 0 ? (
            <div className="overflow-y-auto mt-8">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {chatbots.map((bot) => (
                  <Card
                    key={bot.id}
                    className={`cursor-pointer transition-all duration-200  ${
                      selectedChatbotId === bot.id.toString()
                        ? "border-2 border-black shadow-lg bg-white"
                        : "hover:border-gray-300 opacity-70 hover:opacity-100 bg-gray-50"
                    }`}
                    onClick={() => handleCardClick(bot.id.toString())}
                  >
                    <CardHeader className="flex flex-row items-center justify-between pb-4">
                      <div className="flex items-center gap-3">
                        <div className="p-3 bg-primary/10 rounded-lg">
                          <Bot className="h-6 w-6 text-primary" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-xl">{bot.name}</h3>
                        </div>
                      </div>
                      <DropdownMenu>
                        <DropdownMenuTrigger
                          asChild
                          onClick={(e) => e.stopPropagation()}
                        >
                          <Button
                            variant="ghost"
                            className="h-8 w-8 p-0 hover:bg-gray-100"
                          >
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem
                            onClick={(e) => {
                              e.stopPropagation();
                              setIsEditing(true);
                              setSelectedChatbot(bot.id.toString());
                              setOpen(true);
                            }}
                            className="cursor-pointer hover:bg-gray-100"
                          >
                            <Settings className="mr-2 h-4 w-4" />
                            Edit
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            className="text-red-600 cursor-pointer hover:bg-red-50"
                            onClick={(e) => handleDeleteClick(bot.id)}
                          >
                            <Trash className="mr-2 h-4 w-4" />
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </CardHeader>

                    <CardContent className="border-t pt-4">
                      <div className="flex flex-col space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-1  ">
                            <p className="text-sm text-muted-foreground  w-fit py-1 px-2 bg-gray-100 font-bold text-black rounded-md">
                              Status
                            </p>
                            <div className="flex items-center gap-2 !mt-2">
                              <div
                                className={`w-2 h-2 rounded-full ${
                                  bot.status === "public"
                                    ? "bg-green-500"
                                    : "bg-red-500"
                                }`}
                              />
                              <span className="font-medium capitalize">
                                {bot.status}
                              </span>
                            </div>
                          </div>

                          <div className="space-y-1">
                            <p className="text-sm text-muted-foreground  w-fit py-1 px-2 bg-gray-100 font-bold text-black rounded-md">
                              Abonnement
                            </p>
                            <div className="flex items-center gap-2 !mt-2">
                              <Crown className="h-4 w-4 text-yellow-500" />
                              <span className="font-medium">
                                {bot.active ? "Actif" : "Non actif"}
                              </span>
                            </div>
                          </div>
                        </div>

                        <div className="flex justify-between items-center">
                          <div className="space-y-1">
                            <p className="text-sm text-muted-foreground w-fit py-1 px-2 bg-gray-100 font-bold text-black rounded-md">
                              Créé le
                            </p>
                            <div className="flex items-center gap-2 !mt-2">
                              <Globe className="h-4 w-4 text-blue-500" />
                              <span className="font-medium">
                                {new Date(bot.createdAt).toLocaleDateString()}
                              </span>
                            </div>
                          </div>

                          <Button
                            className="bg-black text-white hover:bg-gray-800 transition-colors self-end gap-2"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleDownloadFlyer(bot.id);
                            }}
                          >
                            <QrCode className="h-4 w-4" />
                            Flyer
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          ) : (
            <div
              className="flex items-center justify-center"
              style={{ minHeight: "calc(100vh - 300px)" }}
            >
              <div className="flex flex-col items-center gap-3 text-center">
                <div className="mb-6 rounded-full bg-gray-100 p-8">
                  <Bot className="h-12 w-12 text-gray-400" />
                </div>
                <h1 className="mb-2 text-2xl font-bold">
                  Créez votre premier chatbot
                </h1>
                <p className="mb-8 text-gray-600">
                  Vous n'avez pas encore de chatbot. Créez-en un maintenant pour
                  commencer.
                </p>
                <Button
                  onClick={() => setOpen(true)}
                  className="bg-black text-white hover:bg-gray-800 transition-colors"
                >
                  <Plus className="mr-2 h-4 w-4" />
                  Créer un chatbot
                </Button>
              </div>
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
