"use client";
import Link from "next/link";
import { useState } from "react";
import Search from "./Search";

export default function NavBar() {
  const [hoveredIndex, setHoveredIndex] = useState(-1); // State to track which button is hovered

  const buttonClass = "text-sm font-semibold transition-colors"; // Base class
  const hoverClass = "hover:font-bold hover:text-red-600"; // Hover class

  const categories = [
    { name: "침구", link: "/category/bedding" },
    { name: "마스크", link: "/category/mask" },
    { name: "내의", link: "/underwear" },
    { name: "장갑", link: "/gloves" },
    { name: "양말", link: "/socks" },
    { name: "모자", link: "/hats" },
    { name: "보호대", link: "/protectors" },
    { name: "기술력", link: "/technology" },
    { name: "기능성", link: "/functionality" },
    { name: "미디어", link: "/media" },
    { name: "FAQ", link: "/faq" },
  ];

  return (
    <>
      <div className="w-full sticky top-0 z-10 justify-center">
        <nav className="flex items-center bg-white justify-between py-5 ">
          <div className="flex pl-28">
            <Link href="/">
              <h1 className="text-4xl font-bold">L:DIA</h1>
            </Link>
          </div>
          <div className="flex gap-9 pr-80 mt-2">
            {categories.map((category, index) => (
              <Link
                key={index}
                href={category.link}
                className={`${buttonClass} ${
                  hoveredIndex === index ? hoverClass : ""
                }`}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(-1)}
              >
                {category.name}
              </Link>
            ))}
          </div>
          <Search />
        </nav>
      </div>
    </>
  );
}
