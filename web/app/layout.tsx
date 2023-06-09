import './globals.css'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Diary App',
  description: 'Make diary with a friend of mine',
}

import Header from './_layouts/Header'
import MUIDateProvider from './MUIDateProvider'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang='en'>
      <body className={inter.className}>
        <MUIDateProvider>
          <div className='min-w-min w-auto max-w-3xl min-h-screen bg-white mx-auto'>
            <Header>日記</Header>
            <main>
              {children}
            </main>
          </div>
        </MUIDateProvider>
      </body>
    </html>
  )
}
