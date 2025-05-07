"use client"
import React, { useState } from 'react';
import { GiHamburgerMenu } from "react-icons/gi";
import Image from 'next/image';
import fullLogo from '../../public/full-logo.svg';
import { IoLogOutOutline } from "react-icons/io5";
import { RiLogoutBoxRLine } from "react-icons/ri";
import { IoClose } from "react-icons/io5";
import { motion, AnimatePresence } from 'motion/react';
import Link from 'next/link';
import Search from './Search';

const NAVITEMS = [
  {
    id: 1,
    img: IoLogOutOutline,
    text: "Logout"
  },
  {
    id: 2,
    img: RiLogoutBoxRLine,
    text: "Logout"
  },
];

function Nav() {
  const [showNav, setShowNav] = useState(false);
  return (
    <>
      <header
        className="bg-[#002335] flex gap-x-4 items-center p-4 relative justify-between
      lg:px-40
      "
      >
        <div className="flex gap-x-4">
          <GiHamburgerMenu
            className="text-white text-4xl inline-block lg:hidden"
            onClick={() => setShowNav(!showNav)}
          />
          <Link href="/">
            <Image src={fullLogo} alt="logo" width={120} height={40} />
          </Link>
        </div>
        <AnimatePresence>
          {showNav && (
            <motion.nav
              initial={{ width: 0 }}
              animate={{ width: "66%" }}
              transition={{ duration: 0.5 }}
              exit={{ width: 0 }}
              className="absolute w-2/3 top-0 left-0 z-10 bg-[#001C29] pt-10 px-10
            flex flex-col gap-y-5 h-screen
          "
            >
              <div
                className="flex gap-x-5"
                onClick={() => setShowNav(!showNav)}
              >
                <IoClose className="text-white text-3xl" />
                <small className="text-lg text-white font-semibold">
                  Close
                </small>
              </div>
              {NAVITEMS.map((navitem) => {
                return (
                  <div
                    key={navitem.id}
                    className={`flex gap-x-5 ${
                      navitem.id === 6 ? "mt-8" : "mt-0"
                    }`}
                  >
                    <navitem.img className="text-white text-3xl" />
                    <small className="text-lg text-white font-semibold">
                      {navitem.text}
                    </small>
                  </div>
                );
              })}
            </motion.nav>
          )}
        </AnimatePresence>
        <nav className="hidden lg:flex w-3/4 justify-between items-center *:text-white *:font-semibold">
          <div className="w-4/5">
            <Search />
          </div>
          <Link href="/login">Login</Link>
          <Link href="/logout">Logout</Link>
        </nav>
      </header>
      <div className="lg:hidden w-full bg-[#002335] px-4 pb-4">
        <Search />
      </div>
    </>
  );
}

export default Nav