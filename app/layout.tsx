//layout.tsx

"use client";
import dynamic from 'next/dynamic'
import './globals.css';
import { Inter } from 'next/font/google'
import Providers from '@/components/atoms/Provider'
import Header from '@/components/widgets/Header'
import Footer from '@/components/widgets/Footer'
import { LanguageProvider } from '@/components/atoms/LanguageContext'
import { AOSInit } from '@/components/widgets/Aos'
import React, { useEffect } from 'react';


const DynamicComponentWithNoSSR = dynamic(
  () => import('@/components/atoms/ParticlesBg'),
  { ssr: false }
)


export interface LayoutProps {
  children: React.ReactNode;
}


export default function RootLayout({ children }: LayoutProps) {

  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <title>Metabit Network</title>
        <base href="/" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" type="image/x-icon" href="/logo2.png" />
        <link href='https://fonts.googleapis.com/css?family=Poppins' rel='stylesheet' />
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.2.0/css/all.min.css" />
      </head>
      <body className='bg-white'>
        <AOSInit />
        <LanguageProvider>
            <main>
              <DynamicComponentWithNoSSR/>
              {/* <Header /> */}
              {children}
              <Footer />
            </main>
        </LanguageProvider>
      </body>
    </html>
  )
}
