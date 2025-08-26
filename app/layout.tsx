import type { Metadata } from "next";
import "@style/global.css"
export const metadata: Metadata = {
  title: "Promptopia",
  description: "Discover and share Ai prompts",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <div className="main">
          <div className="gradient" />
        </div>

        <main className="app">
          {children}
        </main>
      </body>
    </html>
  );
}
