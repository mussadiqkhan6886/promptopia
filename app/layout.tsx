import type { Metadata } from "next";
import "@style/global.css"
import Nav from "@components/Nav";
import Provider from "@components/Provider";
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
        <Provider >
        <div className="main">
          <div className="gradient" />
        </div>

        <main className="app">
          <Nav />
          {children}
        </main>
        </Provider>
      </body>
    </html>
  );
}
