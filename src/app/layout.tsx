import "@/app/globals.css";
import { Toaster } from "@/components/ui/toaster";
import ReactQueryProvider from "@/providers/react-query-provider";
import { Toaster as HotToaster } from "react-hot-toast";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-background font-sans antialiased">
        <ReactQueryProvider>
          {children}
          <Toaster />
          <HotToaster
            position="top-center"
            toastOptions={{
              duration: 6000,
              style: {
                background: "#363636",
                color: "#fff",
                padding: "16px",
                fontSize: "16px",
              },
              success: {
                duration: 6000,
                style: {
                  background: "green",
                },
              },
              error: {
                duration: 6000,
                style: {
                  background: "red",
                },
              },
            }}
          />
        </ReactQueryProvider>
      </body>
    </html>
  );
}
