"use client"
import { Navbar, Sidebar } from '@repo/ui/'
import Image from 'next/image'
import { MenuItems } from '~/data/MenuItems'
import NextLogo from '~/public/next.svg'

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex">
      <nav className="flex-1 bg-white divide-y-4">
        <Sidebar sidebarLogo={<Image priority src={NextLogo} width={150} alt="Sidebar Logo" />} items={MenuItems} />
      </nav>
      <div className="flex-[4] bg-gray-200 p-5">
        <Navbar />
        {children}
      </div>
    </div>
  )
}

export default Layout
