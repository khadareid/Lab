"use client";

import * as React from "react";
import { Link } from "react-router-dom";
import { Phone } from "lucide-react";
import Allpages from "./AllPages";

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

function SiteHeader() {
  const [scrolling, setScrolling] = React.useState(false);

  // Handle scrolling to add a background to the header
  React.useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolling(true);
      } else {
        setScrolling(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      <header
        className={cn(
          "fixed top-0 w-full z-50 transition-all duration-300",
          scrolling ? "bg-[#2B9B6C] shadow-md" : "bg-transparent"
        )}
      >
        <div className="container mx-auto">
          <div className="flex h-20 items-center justify-between">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2">
              <svg
                width="32"
                height="32"
                viewBox="0 0 32 32"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="text-white"
              >
                <path
                  d="M16 4L4 10L16 16L28 10L16 4Z"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M4 22L16 28L28 22"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M4 16L16 22L28 16"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <span className="text-2xl font-bold text-white">Talento</span>
            </Link>

            {/* Navigation */}
            <NavigationMenu className="hidden md:flex">
              <NavigationMenuList className="gap-2">
                <NavigationMenuItem>
                  <NavigationMenuTrigger className="text-white bg-transparent font-semibold text-lg hover:bg-white/10">
                    Home
                  </NavigationMenuTrigger>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <NavigationMenuTrigger className=" text-white bg-transparent font-semibold text-lg hover:bg-white/10">
                    About
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                      <ListItem title="Our Story" href="/about">
                        Learn about our journey and mission
                      </ListItem>
                      <ListItem title="Team" href="/team">
                        Meet our talented professionals
                      </ListItem>
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <NavigationMenuTrigger className=" text-white bg-transparent font-semibold text-lg hover:bg-white/10">
                    Services
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                      <ListItem title="Consulting" href="/services">
                        Professional business consulting
                      </ListItem>
                      <ListItem title="Development" href="/development">
                        Custom software solutions
                      </ListItem>
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <NavigationMenuTrigger className=" text-white bg-transparent font-semibold text-lg hover:bg-white/10">
                    Contact
                  </NavigationMenuTrigger>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>

            {/* Phone Button */}
            <Button
              className="bg-[#F4A261] hover:bg-[#F4A261]/90 text-white rounded-full px-6"
              size="lg"
            >
              <Phone className="mr-2 h-4 w-4" />
              1.123.456.789
            </Button>
          </div>
        </div>
      </header>
      <Allpages />
    </>
  );
}

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem";

export default SiteHeader;
