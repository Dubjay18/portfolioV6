"use client";
import Link from "next/link";
import { useState } from "react";
import { RxHamburgerMenu } from "react-icons/rx";
import {
  HiBeaker,
  HiBookmarkAlt,
  HiOutlineX,
  HiUser,
  HiPhotograph,
} from "react-icons/hi";
import Logo from "../shared/Logo";

export default function MobileMenu() {
  const [navShow, setNavShow] = useState(false);
  const data = [
    {
      title: "About",
      href: "/about",
      icon: HiUser,
    },
    {
      title: "Projects",
      href: "/projects",
      icon: HiBeaker,
    },
    {
      title: "Other Work",
      href: "/other-work",
      icon: HiPhotograph,
    },
    {
      title: "Blog",
      href: "/blog",
      icon: HiBookmarkAlt,
    },
  ];

  const onToggleNav = () => {
    setNavShow((status) => {
      if (status) {
        document.body.style.overflow = "auto";
      } else {
        document.body.style.overflow = "hidden";
      }
      return !status;
    });
  };

  return (
    <>
      <button
        aria-label="Toggle Menu"
        onClick={onToggleNav}
        className="md:hidden bg-card-bg border border-border rounded-md p-2 text-ink"
      >
        <RxHamburgerMenu className="text-xl" />
      </button>
      <div
        className={`md:hidden fixed left-0 top-0 z-[60] h-full w-full transform duration-[600ms] ease-[cubic-bezier(0.7,0,0,1)] bg-bg ${
          navShow ? "translate-x-0 rounded-none" : "translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between mt-6 px-8">
          <Link href="/" onClick={onToggleNav} aria-label="jay.dev home">
            <Logo variant="mark" size="sm" />
          </Link>

          <button
            aria-label="Toggle Menu"
            onClick={onToggleNav}
            className={`md:hidden bg-card-bg border border-border rounded-full p-2 duration-500 text-ink ${
              !navShow ? "-rotate-[360deg]" : null
            }`}
          >
            <HiOutlineX className="text-xl" />
          </button>
        </div>
        <nav className="flex flex-col mt-6">
          {data.map((link) => (
            <Link
              key={link.title}
              href={link.href}
              className="flex items-center gap-x-2 font-mono font-semibold text-lg border-b border-border p-6 group text-ink"
              onClick={onToggleNav}
            >
              <link.icon
                className="text-ink-faint group-hover:text-accent duration-300"
                aria-hidden="true"
              />
              {link.title}
            </Link>
          ))}
        </nav>
      </div>
    </>
  );
}
