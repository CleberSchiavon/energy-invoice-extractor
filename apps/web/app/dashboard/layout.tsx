"use client"
import { Navbar, Sidebar } from '@repo/ui/';
import { MenuItemType } from '@repo/ui/src/MenuItem';
import { DropdownNavbarOptions } from '@repo/ui/src/Navbar';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { MdExitToApp, MdMenu } from 'react-icons/md';
import { MenuItems } from '~/data/MenuItems';
import NextLogo from '~/public/next.svg';

const Layout = ({ children }: { children: React.ReactNode }) => {
  const [currentRoute, setCurrentRoute] = useState<MenuItemType | undefined>(undefined);
  const pathName = usePathname();


const dropdownNavbarOptions:DropdownNavbarOptions[] = [
  {
    name: 'Sair',
    icon: <MdExitToApp />,
    onClick: () => console.log('Saiu')
  }
]

  useEffect(() => {
    const defineCurrentRoute = () => {
      const foundRoute = MenuItems.find((item) => item.route === pathName);
      if (foundRoute) {
        setCurrentRoute(foundRoute);
      } else {
        setCurrentRoute(undefined);
      }
    };
    defineCurrentRoute();
  }, [pathName]);

  return (
    <div className="flex">
      <nav className="flex-1 bg-white divide-y-4">
        <Sidebar sidebarLogo={<Image priority src={NextLogo} width={150} alt="Sidebar Logo" />} items={MenuItems} />
      </nav>
      <div className="flex-[4] bg-gray-200 p-5">
        <Navbar dropdownOptions={dropdownNavbarOptions} optionsLogo={<MdMenu />} currentRouteTitle={currentRoute ? currentRoute.title : ''} />
        {children}
      </div>
    </div>
  );
};

export default Layout;