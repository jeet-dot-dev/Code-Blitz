"use client";
import React from "react";
import { FloatingNav } from "../components/ui/floating-navbar";
import { Home, MessageCircleHeart, User2 } from "lucide-react";

export function FloatingNavDemo() {
  const navItems = [
    {
      name: "Home",
      link: "/",
      icon: <Home className="h-4 w-4 text-neutral-500 dark:text-white" />,
    },
    {
      name: "Profile",
      link: "/profile",
      icon: <User2 className="h-4 w-4 text-neutral-500 dark:text-white" />,
    },
  ];
  return (
    <div className="relative">
      <FloatingNav className="font-press" navItems={navItems} />
    </div>
  );
}

export default FloatingNavDemo;

