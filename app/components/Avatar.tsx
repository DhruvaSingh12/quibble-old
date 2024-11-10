"use client";

import { User } from "@prisma/client";
import Image from "next/image";
import React from "react";

interface AvatarProps {
    user?: User;
}

const Avatar: React.FC<AvatarProps> = ({
    user
}) => {
    return (
        <div className="relative">
            <div className="relative  inline-block rounded-full overflow-hidden h-12 w-12 md:w-13 md:h-13">
                <Image
                    alt="Avatar"
                    src={user?.image || "/images/placeholder.jpg"}
                    fill
                    priority={false}
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
            </div>
            <span className="absolute block rounded-full bg-purple-500 ring-2 ring-blue-200 top-0 right-0 h-2 w-2 md:h-3 md:w-3"/>
        </div>
    )
};

export default Avatar;