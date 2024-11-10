"use client";

import clsx from "clsx";
import Link from "next/link";
import React from "react";

interface MobileItemProps {
    href: string;
    icon: any;
    active?: boolean;
    onClick?: () => void;
  }

const MobileItem: React.FC<MobileItemProps> = ({
    href,
    icon: Icon,
    active,
    onClick,
  }) => {

    const handleClick = () => {
        if (onClick) {
            return onClick();
        }
    };

  return (
    <Link 
        href={href}
        onClick={onClick}
        className={clsx(
            "group flex gap-x-3 rounded-md p-4 justify-center text-2xl leading-6 font-semibold text-gray-800 hover:text-black hover:bg-gray-300",
            active && "bg-purple-300 text-black"
        )}    
    >
        <Icon className="h-6 w-6"/>
    </Link>
  )
};

export default MobileItem;  