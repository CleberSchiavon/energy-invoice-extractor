'use client'
import '@repo/tailwind-config/globals.css'
import 'react-toastify/dist/ReactToastify.css'
import { Inter } from 'next/font/google'
import Image from 'next/image'
import NextLogo from '~/public/next.svg'
import { MenuItems } from '~/data/MenuItems'
import ClientInvoiceProvider from 'store/invoiceStore'
import { getInvoices } from 'api/invoice'
import { getClients } from 'api/client'
import { Navbar, Sidebar } from '@repo/ui'
import { DropdownNavbarOptions } from '@repo/ui/src/Navbar'
import { MdExitToApp, MdMenu } from 'react-icons/md'
import { ToastContainer } from 'react-toastify'

const inter = Inter({ subsets: ['latin'] })

export const dynamic = 'force-dynamic'

export default async function Layout({ children }: { children: React.ReactNode }) {
  const invoices = await getInvoices()
  const clients = await getClients()
  const currentClient = clients[0]
  const currentInvoice = invoices[0]
  const dropdownNavbarOptions: DropdownNavbarOptions[] = [
    {
      name: 'Sair',
      icon: <MdExitToApp />,
      onClick: () => console.log('Saiu'),
    },
  ]
  return (
    <html lang="en">
      <body className={inter.className}>
        <ToastContainer />
        <ClientInvoiceProvider
          loading={false}
          currentClient={currentClient}
          clients={clients}
          currentInvoice={currentInvoice}
          invoices={invoices}
        >
          <div className="flex bg-white">
            <nav className="flex-1 divide-y-4">
              <Sidebar
                sidebarLogo={<Image priority src={NextLogo} width={150} alt="Sidebar Logo" />}
                items={MenuItems}
              />
            </nav>
            <div className="flex-[4] bg-gray-200 p-5">
              <Navbar
                dropdownOptions={dropdownNavbarOptions}
                optionsLogo={<MdMenu />}
                navbarTitle={'Eletric Bills Dashboard'}
              />
              {children}
            </div>
          </div>
        </ClientInvoiceProvider>
      </body>
    </html>
  )
}
