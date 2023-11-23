import { Delius } from 'next/font/google'
import './globals.css'

const delius = Delius({ 
  subsets: ['latin'],
  weight: ['400'], 
})

export const metadata = {
  title: 'Wedding Planner',
  description: 'wedding plan and budget tracking project',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={delius.className}>{children}</body>
    </html>
  )
}
