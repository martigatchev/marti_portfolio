"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { usePathname } from "next/navigation";
import { Github, Linkedin, Menu, X } from "lucide-react";
import { NavLink } from "@/components/navigation/nav-link";

type LinkItem = { href: string; label: string };

type MobileHeaderProps = {
  borders?: boolean;
  links: LinkItem[];
};

export function MobileHeader({ borders = false, links }: MobileHeaderProps) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    const { style } = document.body;
    if (!open) {
      style.overflow = "";
      return;
    }

    const previous = style.overflow;
    style.overflow = "hidden";

    return () => {
      style.overflow = previous;
    };
  }, [open]);

  const utilityIcons = [
    { href: "https://github.com/martigatchev", label: "GitHub", icon: Github },
    {
      href: "https://www.linkedin.com/in/mgatchev/",
      label: "LinkedIn",
      icon: Linkedin,
    },
  ] as const;

  // Animation variants for entire menu page
  const modalVariants = {
    hidden: { y: "-100vh" },
    visible: {
      y: 0,
      transition: {
        type: "tween",
        ease: "easeOut",
        duration: 0.5,
        when: "beforeChildren", // parent enters first, then children
      },
    },
    exit: {
      y: "-100vh",
      transition: {
        type: "tween",
        ease: "easeIn",
        duration: 0.3,
        when: "afterChildren", // wait for children to finish exiting
      },
    },
  } as const;

  // Animation variants for list of nav-menu items
  // delayChildren staggers the children after the parent animation completes
  // staggerChildren staggers each child animation

  const navVariants = {
    hidden: {},
    visible: {
      transition: {
        delayChildren: 0.0,
        staggerChildren: 0.1,
      },
    },
    exit: {
      transition: {
        staggerChildren: 0.1,
        staggerDirection: -1,
      },
    },
  } as const;

  // Each item: come FROM top on enter, go UP on exit
  const navItemVariants = {
    hidden: { opacity: 0, y: -50 }, // start above
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" },
    },
    exit: {
      opacity: 0,
      y: -40, // move up as it leaves
      transition: { duration: 0.25, ease: "easeIn" },
    },
  } as const;

  const mobileWrapBorders = borders
    ? "border-x-[var(--nav-bw)] border-[var(--c-black)]"
    : "";
  const mobileTopBarBorder = borders
    ? "border-b-[var(--nav-bw)] border-[var(--c-black)]"
    : "";

  const buttonClasses = [
    "grid place-items-center rounded-full border-2 transition-colors duration-300",
    "h-10 w-10",
    "border-[var(--c-black)] text-[var(--c-black)] hover:bg-[var(--c-black)] hover:text-[var(--c-white)]",
  ].join(" ");

  return (
    <>
      <div className={`sm:hidden bg-background ${mobileWrapBorders}`}>
        <div
          className={`h-16 flex items-center justify-between px-4 transition-colors duration-300 bg-background text-[var(--c-black)] ${mobileTopBarBorder} relative z-[70]`}
        >
          <Link
            href="/"
            onClick={() => setOpen(false)}
            className="text-lg transition-opacity hover:opacity-80 uppercase tracking-[0.35em] text-black/60"
          >
            marti.dev
          </Link>

          <ul className="flex items-center gap-4">
            {utilityIcons.map(({ href, label, icon: Icon }) => (
              <li key={href}>
                <Link href={href} aria-label={label} className={buttonClasses}>
                  <Icon className="size-4" />
                </Link>
              </li>
            ))}
            <li>
              <button
                type="button"
                aria-label={open ? "Close navigation" : "Open navigation"}
                aria-expanded={open}
                aria-controls="mobile-nav-overlay"
                onClick={() => setOpen((prev) => !prev)}
                className={`${buttonClasses} relative overflow-hidden`}
              >
                <span
                  className={`absolute inset-0 grid place-items-center transition-opacity duration-200 ${
                    open ? "opacity-0" : "opacity-100"
                  }`}
                >
                  <Menu className="h-[1.25rem] w-[1.25rem]" />
                </span>
                <span
                  className={`absolute inset-0 grid place-items-center transition-opacity duration-200 ${
                    open ? "opacity-100" : "opacity-0"
                  }`}
                >
                  <X className="h-[1.25rem] w-[1.25rem]" />
                </span>
              </button>
            </li>
          </ul>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="fixed inset-0 z-[60] flex min-h-[100vh] flex-col bg-white/100 text-[var(--c-black)]"
          >
            <motion.nav
              variants={navVariants}
              className="flex-1 overflow-y-auto px-8 pt-[calc(env(safe-area-inset-top)+7rem)] pb-[calc(env(safe-area-inset-bottom)+3rem)]"
            >
              <motion.ul className="flex flex-col gap-8 justify-start min-h-full">
                {links.map((link) => (
                  <motion.li key={link.href} variants={navItemVariants}>
                    <NavLink
                      href={link.href}
                      className="text-4xl font-display uppercase tracking-tight"
                      activeClassName="text-[var(--c-lilac)]"
                      onClick={() => setOpen(false)}
                    >
                      {link.label}
                    </NavLink>
                  </motion.li>
                ))}
              </motion.ul>
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
