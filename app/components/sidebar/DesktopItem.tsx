"use client";

import clsx from "clsx";
import Link from "next/link";
import React from "react";

interface DesktopItemProps {
  href: string;
  label: string;
  icon: any;
  active?: boolean;
  onClick?: () => void;
}

const DesktopItem: React.FC<DesktopItemProps> = ({
     label, href, icon: Icon, active, onClick
}) => {
    const handleClick = () => {
        if (onClick) {
            return onClick();
        }
    };
  return (
    <li onClick={handleClick}>
        <Link className={clsx(
            "flex group items-center gap-x-2 text-sm leading-6 font-semibold text-gray-700 hover:text-black rounded-md p-2 hover:bg-gray-100",
            active && "bg-purple-300 text-black"
        )} href={href}>
        <Icon className={clsx(
            "w-7 h-7 text-gray-800",
            active && "text-primary"
        )} />
        <span className="sr-only">{label}</span>
        </Link>
    </li>
  );
};

export default DesktopItem;