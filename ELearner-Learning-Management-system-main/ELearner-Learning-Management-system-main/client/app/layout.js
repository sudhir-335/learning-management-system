"use client"
import "./globals.css";
import { Poppins, Josefin_Sans } from "next/font/google";
import { ThemeProvider } from "./utils/ThemeProvider";
import { Toaster } from 'react-hot-toast';
import { Providers } from "./Provider";
import { SessionProvider } from "next-auth/react";
import { useLoadUserQuery } from "@/redux/features/api/apiSlice";
import Loader from "./components/Loader/Loader";
const poppins = Poppins({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-Poppins",
});

const josefin_sans = Josefin_Sans({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  variable: " -- font-Josefin",
});



export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${poppins.variable} ${josefin_sans.variable} !bg-white bg-no-repeat dark:bg-gradient-to-b dark:from-gray-900 dark:to-black duration-300`}>
        <Providers>
          <SessionProvider>
            <ThemeProvider attribute='class' defaultTheme='system' enableSystem>
              <Custom>
                {children}
              </Custom>
              <Toaster position='top-center' reverseOrder={false} />
            </ThemeProvider>
          </SessionProvider>
        </Providers>
      </body>
    </html >
  );
}


const Custom = ({ children }) => {
  const { isLoading } = useLoadUserQuery({});
  return (
    <>
      {isLoading ? <Loader /> : <>{children}</>}
    </>
  )
}
