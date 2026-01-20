import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "AI Trading Assistant",
  description: "AI-powered trading assistant using Next.js, FastAPI, and Gemma 3",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-gray-50 text-gray-900">
        {/* Top Navbar */}
        <header className="w-full border-b bg-white shadow-sm">
          <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
            <h1 className="text-xl font-bold">🧠 AI Trading Assistant</h1>
            <span className="text-sm text-gray-500">Educational Use Only</span>
          </div>
        </header>

        {/* Main Content */}
        <main className="max-w-6xl mx-auto px-6 py-10">
          {children}
        </main>

        {/* Footer */}
        <footer className="w-full border-t bg-white mt-10">
          <div className="max-w-6xl mx-auto px-6 py-4 text-center text-sm text-gray-500">
            Built by Ayush • Next.js • FastAPI • Gemma 3 (Ollama)
          </div>
        </footer>
      </body>
    </html>
  );
}
