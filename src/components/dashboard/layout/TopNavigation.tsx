import React from "react";
import { CreditCard, Home, Settings, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useAuth } from "../../../context/AuthContext";
import { Link } from "react-router-dom";
import { VeltCommentsSidebarButton, VeltPresence } from "@veltdev/react";

const TopNavigation = () => {
  const { user, signOut } = useAuth();

  if (!user) return null;

  return (
    <div className="w-full h-16 border-b bg-background flex items-center justify-between px-4 fixed top-0 z-50">
      <div className="flex items-center gap-4 flex-1">
        <Link to="/" className="flex items-center">
          <Home className="h-5 w-5 text-foreground" />
        </Link>
        <div className="relative w-64">
          <Link
            to="/"
            className="font-bold text-xl flex items-center text-white"
          >
            <Zap className="h-6 w-6 mr-2 text-blue-400" />
          </Link>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <VeltCommentsSidebarButton />
        <VeltPresence />

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="gap-2 bg-white text-foreground">
              <Avatar className="h-8 w-8">
                <AvatarImage
                  src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${user.email}`}
                  alt={user.email || ""}
                />
                <AvatarFallback>{user.email?.[0].toUpperCase()}</AvatarFallback>
              </Avatar>
              <span className="hidden md:inline-block text-sm">
                {user.email}
              </span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild className="py-2">
              <Link to="/plans">
                <CreditCard className="mr-2 h-4 w-4" />
                Plans
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem className="py-2">
              <Settings className="mr-2 h-4 w-4" />
              Settings
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onSelect={() => signOut()} className="py-2">
              Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
};

export default TopNavigation;
