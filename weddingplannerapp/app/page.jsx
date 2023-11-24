'use client'
import { Ephesis } from 'next/font/google'

const ephesis = Ephesis({
  subsets: ['latin'],
  weight: ['400'],
})

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col bg-pink-200 items-center justify-between">
      <section className='flex bg-cover bg-no-repeat bg-[url("../public/background.avif")] flex-col h-screen justify-between items-center w-screen p-24'>
        <nav className="flex items-center justify-between w-full text-xl">
          <p className='text-4xl'>🌷</p>
          <ul className="flex items-center space-x-8">
            <li className='hover:bg-white rounded-lg duration-100 p-1 hover:scale-[1.05]'>
              <a href="/login">Login</a>
            </li>
            <li className='hover:bg-white rounded-lg duration-100 p-1 hover:scale-[1.05]'>
              <a href="/signup">Signup</a>
            </li>
          </ul>
        </nav>
        <h1 className={`text-4xl lg:text-8xl font-bold text-white text-center ${ephesis.className}`}>Veere Di Planner</h1>
        <div className='flex flex-col gap-5'>
          <p className="text-xl text-white font-bold text-center bg-gray-400 bg-opacity-60 px-3 rounded-full">
            A wedding plan and budget tracking project
          </p>
          <a href='#about-us' className='bg-pink-400 text-white hover:scale-105 duration-200 w-max self-center p-1 rounded-full px-3 text-xl'>Know more</a>
        </div>
      </section>
      <section id='about-us' className="flex flex-col items-center justify-center gap-24 h-screen w-screen">
        <h2 className="text-4xl font-bold text-center mt-[400px] lg:mt-0">About Us</h2>
        <div className="flex flex-row flex-wrap h-max w-full gap-8 justify-center">
          <div className="bg-white p-6 rounded-lg w-[400px] shadow-md hover:scale-105 duration-200 hover:shadow-md hover:shadow-gray-600">
            <img src="/invite.avif" className='rounded-lg mb-5 h-[200px]' alt="" />
            <h3 className="text-2xl font-bold mb-4">Plan your big day!</h3>
            <p className="text-gray-600">Add the date, time and venue so your guests can save the date.</p>
          </div>
          <div className="bg-white p-6 rounded-lg w-[400px] shadow-md hover:scale-105 duration-200 hover:shadow-lg hover:shadow-gray-600">
            <img src="/budget.avif" className='rounded-lg mb-5 h-[200px]' alt="" />
            <h3 className="text-2xl font-bold mb-4">Budget Tracking</h3>
            <p className="text-gray-600">Select venue and services to generate an estimate so you can stay in your budget.</p>
          </div>
          <div className="bg-white p-6 rounded-lg w-[400px] shadow-md hover:scale-105 duration-200 hover:shadow-lg hover:shadow-gray-600">
            <img src="/bouquet.avif" className='rounded-lg mb-5 h-[200px]' alt="" />
            <h3 className="text-2xl font-bold mb-4">Save Vendors</h3>
            <p className="text-gray-600">Save your vendors to the app so their quote and details are accessible.</p>
          </div>
        </div>
      </section>
    </main>
  )
}
