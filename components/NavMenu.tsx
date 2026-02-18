"use client";

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import * as React from "react";

const aboutSubpages: { title: string; href: string }[] = [
  { title: "Story", href: "/about/story" },
  { title: "People", href: "/about/people" },
  { title: "Contact", href: "/about/contact" },
];

export default function NavMenu() {
  const [mobileOpen, setMobileOpen] = React.useState(false);

  return (
    <>
      {/* Desktop menu */}
      <div className="hidden sm:block">
        <NavigationMenu viewport={false}>
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
                <Link href="/events">Events</Link>
              </NavigationMenuLink>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
                <Link href="/resources">Resources</Link>
              </NavigationMenuLink>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <NavigationMenuTrigger>About</NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid w-full gap-2 bg-white">
                  {aboutSubpages.map((subpage) => (
                    <ListItem
                      key={subpage.title}
                      title={subpage.title}
                      href={subpage.href}
                    />
                  ))}
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
                <Link href="/donate">Donate</Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </div>

      {/* Mobile menu */}
      <div className="relative sm:hidden">
        <button
          onClick={() => setMobileOpen((prev) => !prev)}
          className="rounded-md p-2 hover:bg-accent"
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
        >
          {mobileOpen ? <X className="size-6" /> : <Menu className="size-6" />}
        </button>

        {mobileOpen && (
          <div className="absolute right-0 top-full z-50 mt-1 w-48 overflow-hidden rounded-md border bg-white shadow-lg">
            <Link
              href="/events"
              className="block px-4 py-2 text-sm font-medium hover:bg-accent"
              onClick={() => setMobileOpen(false)}
            >
              Events
            </Link>
            <Link
              href="/resources"
              className="block px-4 py-2 text-sm font-medium hover:bg-accent"
              onClick={() => setMobileOpen(false)}
            >
              Resources
            </Link>
            <div className="px-4 pt-3 pb-1 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              About
            </div>
            {aboutSubpages.map((subpage) => (
              <Link
                key={subpage.title}
                href={subpage.href}
                className="block px-6 py-2 text-sm hover:bg-accent"
                onClick={() => setMobileOpen(false)}
              >
                {subpage.title}
              </Link>
            ))}
            <Link
              href="/donate"
              className="block px-4 py-2 text-sm font-medium hover:bg-accent"
              onClick={() => setMobileOpen(false)}
            >
              Donate
            </Link>
          </div>
        )}
      </div>
    </>
  );
}

function ListItem({
  title,
  children,
  href,
  ...props
}: React.ComponentPropsWithoutRef<"li"> & { href: string }) {
  return (
    <li {...props}>
      <NavigationMenuLink asChild>
        <Link href={href}>
          <div className="flex flex-col gap-1 text-sm">
            <div className="leading-none font-medium">{title}</div>
            <div className="text-muted-foreground line-clamp-2">{children}</div>
          </div>
        </Link>
      </NavigationMenuLink>
    </li>
  );
}
