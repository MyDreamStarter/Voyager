"use client";
import { Inter } from "next/font/google";
import "./globals.css";
import {
  ThirdwebProvider,
  metamaskWallet,
  coinbaseWallet,
  walletConnect,
  embeddedWallet,

} from "@thirdweb-dev/react";
import { SnackbarProvider, closeSnackbar } from "notistack";
import { IoClose } from "react-icons/io5";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <title>Voyager</title>
        <ThirdwebProvider
          supportedWallets={[
            metamaskWallet(),
            coinbaseWallet({ recommended: true }),
            walletConnect(),
            embeddedWallet(),
          ]}
        >
          <SnackbarProvider
            action={(snackbarId) => (
              <button onClick={() => closeSnackbar(snackbarId)}>
                <IoClose className="h-6 w-6 pr-2 text-xl" />
              </button>
            )}
          >
            <body className="font-raleway text-sm text-gray-800">
              <div>{children}</div>
            </body>
          </SnackbarProvider>
        </ThirdwebProvider>
    </html>
  );
}
