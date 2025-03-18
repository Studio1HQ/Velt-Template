import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Menu, Settings, User, Zap, X } from "lucide-react";

interface HeaderProps {
  user: any;
  signOut: () => void;
}

const Header: React.FC<HeaderProps> = ({ user, signOut }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <header className="fixed top-0 z-50 w-full border-b border-gray-800 bg-gray-950/95 backdrop-blur supports-[backdrop-filter]:bg-gray-950/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center space-x-4">
          <Link
            to="/"
            className="font-bold text-xl flex items-center text-white"
          >
            <Zap className="h-6 w-6 mr-2 text-blue-400" />
            <span className="hidden sm:inline">Tempo + Velt Starter Kit</span>
            <span className="sm:hidden">Tempo</span>
          </Link>
        </div>

        {/* Mobile menu button */}
        <button className="md:hidden text-white p-2" onClick={toggleMobileMenu}>
          {mobileMenuOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <Menu className="h-6 w-6" />
          )}
        </button>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-4">
          {user ? (
            <div className="flex items-center gap-4">
              <Link to="/dashboard">
                <Button variant="ghost" className="text-white hover:text-black">
                  Dashboard
                </Button>
              </Link>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    className="gap-2 text-white hover:text-black"
                  >
                    <Avatar className="h-8 w-8">
                      <AvatarImage
                        src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${user.email}`}
                        alt={user.email || ""}
                      />
                      <AvatarFallback>
                        {user.email?.[0].toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <span className="hidden md:inline-block">{user.email}</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  align="end"
                  className="bg-gray-900 border-gray-800"
                >
                  <DropdownMenuLabel className="text-white">
                    My Account
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator className="bg-gray-800" />
                  <DropdownMenuItem className="text-gray-300 hover:text-white focus:text-white">
                    <User className="mr-2 h-4 w-4" />
                    Profile
                  </DropdownMenuItem>
                  <DropdownMenuItem className="text-gray-300 hover:text-white focus:text-white">
                    <Settings className="mr-2 h-4 w-4" />
                    Settings
                  </DropdownMenuItem>
                  <DropdownMenuSeparator className="bg-gray-800" />
                  <DropdownMenuItem
                    onSelect={() => signOut()}
                    className="text-gray-300 hover:text-white focus:text-white"
                  >
                    Log out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          ) : (
            <>
              <Link to="/login">
                <Button variant="ghost" className="text-white hover:text-black">
                  Sign In
                </Button>
              </Link>
              <Link to="/signup">
                <Button className="bg-blue-600 text-white hover:bg-blue-700">
                  Get Started
                </Button>
              </Link>
            </>
          )}
        </nav>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-gray-900 py-4 px-6 border-t border-gray-800">
          {user ? (
            <div className="flex flex-col space-y-4">
              <div className="flex items-center gap-2 py-2">
                <Avatar className="h-8 w-8">
                  <AvatarImage
                    src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${user.email}`}
                    alt={user.email || ""}
                  />
                  <AvatarFallback>
                    {user.email?.[0].toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <span className="text-white">{user.email}</span>
              </div>
              <Link to="/dashboard" onClick={toggleMobileMenu}>
                <Button
                  variant="ghost"
                  className="w-full justify-start text-white hover:text-black"
                >
                  Dashboard
                </Button>
              </Link>
              <Link to="/profile" onClick={toggleMobileMenu}>
                <Button
                  variant="ghost"
                  className="w-full justify-start text-white hover:text-black"
                >
                  <User className="mr-2 h-4 w-4" />
                  Profile
                </Button>
              </Link>
              <Link to="/settings" onClick={toggleMobileMenu}>
                <Button
                  variant="ghost"
                  className="w-full justify-start text-white hover:text-black"
                >
                  <Settings className="mr-2 h-4 w-4" />
                  Settings
                </Button>
              </Link>
              <Button
                variant="ghost"
                onClick={() => {
                  signOut();
                  toggleMobileMenu();
                }}
                className="w-full justify-start text-white hover:text-black"
              >
                Log out
              </Button>
            </div>
          ) : (
            <div className="flex flex-col space-y-4">
              <Link to="/login" onClick={toggleMobileMenu}>
                <Button
                  variant="ghost"
                  className="w-full justify-center text-white hover:text-black"
                >
                  Sign In
                </Button>
              </Link>
              <Link to="/signup" onClick={toggleMobileMenu}>
                <Button className="w-full bg-blue-600 text-white hover:bg-blue-700">
                  Get Started
                </Button>
              </Link>
            </div>
          )}
        </div>
      )}
    </header>
  );
};

export default Header;
