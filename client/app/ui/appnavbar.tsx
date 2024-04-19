"use client";

import { Avatar, Dropdown, Navbar } from "flowbite-react";
import { Badge, DarkThemeToggle, Tooltip } from "flowbite-react";
import { LayoutState } from "../interfaces/layoutstate"
import { HiMenuAlt1, HiX } from "react-icons/hi";

export function AppNavBar({ isCollapsed, setCollapsed }: LayoutState) {
  return (
    <div>

<Navbar fluid className="border-solid border-b-2 border-zink-500">
        {isCollapsed ? (
          <button type="button" className="-ml-3 mr-1 p-2 lg:mx-0 lg:hidden" onClick={() => setCollapsed(!isCollapsed)}>
            <HiMenuAlt1 aria-label="Open sidebar" className="size-6 cursor-pointer text-gray-600 dark:text-gray-300" />
          </button>
        ) : (
          <button
            type="button"
            className="-ml-3 mr-1 rounded p-2 lg:mx-0 lg:hidden dark:bg-gray-700"
            onClick={() => setCollapsed(!isCollapsed)}
          >
            <HiX aria-label="Close sidebar" className="size-6 cursor-pointer text-gray-600 dark:text-gray-300" />
          </button>
        )}

      <Navbar.Brand href="https://mindle.ai">
        <img src="/logo_transparent_5.png" className="mr-3 h-6 sm:h-9" alt="Flowbite React Logo" />
        <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">Customer Orders Console</span>
      </Navbar.Brand>
      <div className="flex md:order-2">
        <Dropdown
          arrowIcon={false}
          inline
          label={
            <Avatar alt="User settings" img="/avatar.png" rounded />
          }
        >
          <Dropdown.Header>
            <span className="block text-sm">Ali</span>
            <span className="block truncate text-sm font-medium">ali@mindle.ai</span>
          </Dropdown.Header>
          <Dropdown.Item>Dashboard</Dropdown.Item>
          <Dropdown.Item>Settings</Dropdown.Item>
          <Dropdown.Divider />
          <Dropdown.Item>Sign out</Dropdown.Item>
        </Dropdown>
      </div>
      {/*<Navbar.Collapse>*/}
      {/*  <Navbar.Link href="#" active>*/}
      {/*    Home*/}
      {/*  </Navbar.Link>*/}
      {/*  <Navbar.Link href="#">About</Navbar.Link>*/}
      {/*  <Navbar.Link href="#">Services</Navbar.Link>*/}
      {/*  <Navbar.Link href="#">Pricing</Navbar.Link>*/}
      {/*  <Navbar.Link href="#">Contact</Navbar.Link>*/}
      {/*</Navbar.Collapse>*/}
      <Tooltip animation={false} content="Toggle dark mode">
        <DarkThemeToggle />
      </Tooltip>
    </Navbar>
    </div>
  );
}
