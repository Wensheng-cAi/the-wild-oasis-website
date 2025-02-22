// 1. 从google或者local导入字体
import { Josefin_Sans } from 'next/font/google';

// 2. configure字体（subsets, display, weight）
const josefin = Josefin_Sans({
  subsets: ['latin'],
  display: 'swap',
})
import '@/app/_styles/globals.css';
import Header from "./_components/Header";
import { ReservationProvider } from './_components/ReservationContext';


// by exporting 'metadata', we can manuelly set the title
export const metadata = {
  title: {
    template: '%s / The Wild Oasis',
    default: 'Welcome / The Wild Oasis',
  },
  description: 'Luxurious cabin hotel, located in the heart of the Italian'
}

export default function RootLayout({ children }) {
  return <html>
    {/* 插入字体 */}
    <body className={`${josefin.className} antialiased bg-primary-950 text-primary-100 min-h-screen relative flex flex-col`}>
      <Header />
      <div className="flex-1 px-8 py-12 grid">
        <main className="max-w-7xl mx-auto w-full">
          <ReservationProvider>
            {children}
          </ReservationProvider>
        </main>
      </div>
    </body>
  </html>
}