import { Space_Grotesk } from "next/font/google";
import "./globals.css";
import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]/route";
import NextTopLoader from "nextjs-toploader";
import { Toaster } from "react-hot-toast";
import { ThemeProvider } from "@/components/providers/theme-provider";
import Navbar from "@/components/nav/navbar";
import Provider from "@/components/providers/client-provider";
import QueryProvider from "@/components/providers/query-provider";
import Footer from "@/components/footer";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import Head from "next/head";

const inter = Space_Grotesk({ subsets: ["latin"] });

export const metadata = {
  metadataBase: new URL("https://nextjsxvote.vercel.app/"),

  title: {
    template: "%s | NEXT VOTE",
    default: "NEXT VOTE",
  },
  authors: {
    name: "OMAR KHALID",
  },
  description:
    "Cast your vote now and see live updates on the poll results, powered by the Mongodb database integration in our web app",
  openGraph: {
    title: "Next Vote",
    description:
      "Cast your vote now and see live updates on the poll results, powered by the Mongodb database integration in our web app",
    siteName: "Next Vote",
    url: "https://nextjsxvote.vercel.app/",
    siteName: "Next Vote",
    images: "/next.svg",
    type: "website",
  },
  keywords: ["Next Vote", "nextVote", "nextjsxvote"],
};

export default async function RootLayout({ children }) {
  const isDev = process.env.NODE_ENV === "development";
  const session = await getServerSession(authOptions);

  return (
    <html lang="en" suppressHydrationWarning={isDev}>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <body
        className={`${inter.className} bg-[#010106] text-gray-200 antialiased  py-10`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <Provider session={session}>
            <NextTopLoader showSpinner={false} color="rgb(34 197 94)" />
            <QueryProvider>
              <main className="flex flex-col max-w-7xl mx-auto min-h-screen space-y-10 p-5">
                <Navbar />
                <div className="w-full flex-1 ">{children}</div>
                <Footer />
              </main>
              <ReactQueryDevtools initialIsOpen={false} />
            </QueryProvider>
          </Provider>
          <Toaster position="top-center" reverseOrder={false} />
        </ThemeProvider>
      </body>
    </html>
  );
}
