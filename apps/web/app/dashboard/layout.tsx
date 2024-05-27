import { Navbar, Sidebar } from '@repo/ui/'

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <nav>
        <Sidebar />
      </nav>

      <div>
        <Navbar />
        {children}
      </div>
    </div>
  )
}

export default Layout
