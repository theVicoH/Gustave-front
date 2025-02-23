"use client";

import {
  Sidebar,
  SidebarContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarProvider,
  SidebarTrigger,
  SidebarFooter,
  useSidebar,
} from "@/components/ui/sidebar";
import {
  LayoutDashboard,
  BarChart3,
  ShoppingCart,
  Menu,
  X,
  Eye,
  FormInput,
} from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { usePathname } from "next/navigation";
import { UserNav } from "@/components/user-nav";
import { useChatbotStore } from "@/stores/chatbot-store";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider>
      <DashboardContent>{children}</DashboardContent>
    </SidebarProvider>
  );
}

function DashboardContent({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { setOpenMobile } = useSidebar();
  const selectedChatbotId = useChatbotStore((state) => state.selectedChatbotId);
  const chatbots = useChatbotStore((state) => state.chatbots);

  // Trouver le bot sélectionné
  const selectedBot = chatbots.find(
    (bot) => bot.id.toString() === selectedChatbotId
  );

  return (
    <div className="h-full relative flex overflow-x-hidden">
      {/* Sidebar - conditionnellement rendu */}
      {selectedChatbotId && (
        <Sidebar>
          <SidebarContent className="bg-white">
            <div className="p-4 flex justify-between items-center">
              <h1 className="text-2xl font-bold text-black">Gustave</h1>
              <Button
                variant="ghost"
                size="icon"
                className="md:hidden text-black"
                onClick={() => setOpenMobile(false)}
              >
                <X className="h-6 w-6" />
              </Button>
            </div>
            <SidebarMenu className="md:p-3 p-6">
              <SidebarMenuButton asChild active={pathname === "/dashboard"}>
                <Link href="/dashboard">
                  <div className="flex items-center flex-1">
                    <LayoutDashboard className="h-5 w-5 mr-3" />
                    Dashboard
                  </div>
                </Link>
              </SidebarMenuButton>
              <SidebarMenuButton
                asChild
                active={pathname === "/dashboard/source"}
              >
                <Link href="/dashboard/source">
                  <div className="flex items-center flex-1">
                    <BarChart3 className="h-5 w-5 mr-3" />
                    Source
                  </div>
                </Link>
              </SidebarMenuButton>
              <SidebarMenuButton
                asChild
                active={pathname === "/dashboard/subscriptions"}
              >
                <Link href="/dashboard/subscriptions">
                  <div className="flex items-center flex-1">
                    <ShoppingCart className="h-5 w-5 mr-3" />
                    Abonnements
                  </div>
                </Link>
              </SidebarMenuButton>
              <SidebarMenuButton
                asChild
                active={pathname === "/dashboard/preview"}
              >
                <Link href="/dashboard/preview">
                  <div className="flex items-center flex-1">
                    <Eye className="h-5 w-5 mr-3" />
                    Aperçu
                  </div>
                </Link>
              </SidebarMenuButton>
              <SidebarMenuButton
                asChild
                active={pathname === "/dashboard/form"}
              >
                <Link href="/dashboard/form">
                  <div className="flex items-center flex-1">
                    <FormInput className="h-5 w-5 mr-3" />
                    Form
                  </div>
                </Link>
              </SidebarMenuButton>
            </SidebarMenu>
          </SidebarContent>
          <SidebarFooter className="mt-auto">
            <div className="p-4 bg-black rounded-lg mx-2 mb-2 text-white">
              <h3 className="font-medium mb-1">Activez votre Gustave</h3>
              <p className="text-sm opacity-90 mb-4">
                Votre chatbot n'est pas encore activé. Tant qu'il reste inactif,
                il ne peut pas être publié ni utilisé. Activez Gustave
                maintenant pour le rendre opérationnel !
              </p>
              <button className="text-sm flex items-center">
                Activer mon Gustave
                <span className="ml-1">→</span>
              </button>
            </div>
          </SidebarFooter>
        </Sidebar>
      )}

      {/* Main content with header */}
      <div className="flex-1 flex flex-col min-h-screen w-screen">
        <header className="h-16 border-b bg-white flex items-center justify-between px-4 w-full">
          <div className="flex items-center">
            <SidebarTrigger>
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
              </Button>
            </SidebarTrigger>
            <h1 className="text-l font-semibold ml-4">
              {selectedBot && `ChatBot Sélectionné: " ${selectedBot.name} "`}
            </h1>
          </div>
          <UserNav />
        </header>
        <main className="flex-1 overflow-y-auto p-6 bg-gray-50">
          {children}
        </main>
      </div>
    </div>
  );
}
