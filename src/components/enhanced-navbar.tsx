"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X, Search, ChevronDown, Sun, Moon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import Avatar from "@/components/Avatar"; // Added Avatar import

export function EnhancedNavbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    const storedMode = localStorage.getItem("isDarkMode");
    return storedMode === "true"; // Convert string to boolean
  });
  useEffect(() => {
    const root = window.document.documentElement;

    if (isDarkMode) {
      root.classList.add("dark");
      localStorage.setItem("isDarkMode", "true");
    } else {
      root.classList.remove("dark");
      localStorage.setItem("isDarkMode", "false");
    }
  }, [isDarkMode]); 


  
  const toggleMenu = () => setIsOpen(!isOpen);
  const toggleDarkMode = () => setIsDarkMode(!isDarkMode);

  return (
    <nav className="bg-background shadow-md transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="flex-shrink-0">
              <span className="text-2xl font-bold text-primary">
                <span className="text-red-500">You</span> Course
              </span>
            </Link>
            <div className="hidden md:block ml-10">
              <div className="flex items-baseline space-x-4">
                <Link
                  href="/"
                  className="text-foreground hover:bg-accent hover:text-accent-foreground px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200"
                >
                  Home
                </Link>
                <DropdownMenu>
                  <DropdownMenuTrigger className="text-foreground hover:bg-accent hover:text-accent-foreground px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 flex items-center">
                    Services <ChevronDown className="ml-1 h-4 w-4" />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuItem>
                      <Link href="/services/web-development" className="w-full">
                        Web Development
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Link href="/services/app-development" className="w-full">
                        App Development
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Link href="/services/consulting" className="w-full">
                        Consulting
                      </Link>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
                <Link
                  href="/about"
                  className="text-foreground hover:bg-accent hover:text-accent-foreground px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200"
                >
                  About
                </Link>
                <Link
                  href="/contact"
                  className="text-foreground hover:bg-accent hover:text-accent-foreground px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200"
                >
                  Contact
                </Link>
              </div>
            </div>
          </div>
          <div className="hidden md:flex items-center">
            <div className="relative mr-4">
              <Input
                type="search"
                placeholder="Search..."
                className="pl-10 pr-4 py-2 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            </div>
            <Button
              variant="ghost"
              onClick={toggleDarkMode}
              className="ml-2"
              aria-label="Toggle dark mode"
            >
              {isDarkMode ? (
                <Sun className="h-5 w-5 dark:text-white" />
              ) : (
                <Moon className="h-5 w-5 dark:text-white" />
              )}
            </Button>
            <Avatar /> {/* Added Avatar component */}
          </div>
          <div className="md:hidden flex items-center">
            <Button
              variant="ghost"
              onClick={toggleDarkMode}
              className="mr-2"
              aria-label="Toggle dark mode"
            >
              {isDarkMode ? (
                <Sun className="h-5 w-5 dark:text-white" />
              ) : (
                <Moon className="h-5 w-5 dark:text-white" />
              )}
            </Button>
            <Button
              variant="ghost"
              onClick={toggleMenu}
              aria-label="Toggle menu"
            >
              {isOpen ? (
                <X className="h-6 w-6 dark:text-white" />
              ) : (
                <Menu className="h-6 w-6 dark:text-white" />
              )}
            </Button>
            <Avatar /> {/* Added Avatar component */}
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        className={`md:hidden transition-all duration-300 ease-in-out ${
          isOpen
            ? "max-h-screen opacity-100"
            : "max-h-0 opacity-0 overflow-hidden"
        }`}
      >
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          <Link
            href="/"
            className="text-foreground hover:bg-accent hover:text-accent-foreground block px-3 py-2 rounded-md text-base font-medium transition-colors duration-200"
          >
            Home
          </Link>
          <DropdownMenu>
            <DropdownMenuTrigger className="text-foreground hover:bg-accent hover:text-accent-foreground w-full text-left px-3 py-2 rounded-md text-base font-medium transition-colors duration-200 flex items-center justify-between">
              Services <ChevronDown className="h-4 w-4" />
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem>
                <Link href="/services/web-development" className="w-full">
                  Web Development
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Link href="/services/app-development" className="w-full">
                  App Development
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Link href="/services/consulting" className="w-full">
                  Consulting
                </Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <Link
            href="/about"
            className="text-foreground hover:bg-accent hover:text-accent-foreground block px-3 py-2 rounded-md text-base font-medium transition-colors duration-200"
          >
            About
          </Link>
          <Link
            href="/contact"
            className="text-foreground hover:bg-accent hover:text-accent-foreground block px-3 py-2 rounded-md text-base font-medium transition-colors duration-200"
          >
            Contact
          </Link>
        </div>
        <div className="pt-4 pb-3 border-t border-border">
          <div className="px-2 space-y-1">
            <div className="relative mb-4">
              <Input
                type="search"
                placeholder="Search..."
                className="w-full pl-10 pr-4 py-2 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            </div>
            <Button
              variant="outline"
              className="w-full mb-2 bg-white dark:bg-black text-black dark:text-white dark:border-zinc-700"
            >
              Log in
            </Button>
            <Button className="w-full">Sign up</Button>
          </div>
        </div>
      </div>
    </nav>
  );
}
