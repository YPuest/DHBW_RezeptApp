import './globals.css'
import { Inter } from 'next/font/google'
import Navbar from "@/components/Navbar";
import RecipeProvider from "@/components/Recipe-Provider";

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Rezept App',
  description: 'Generated by create next app',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" data-theme="light">
      <body className={inter.className}>
      <RecipeProvider>
        {children}
      </RecipeProvider>
      </body>
    </html>
  )
}
