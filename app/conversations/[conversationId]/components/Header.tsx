"use client";

import Avatar from "@/app/components/Avatar";
import useOtherUser from "@/app/hooks/useOtherUser";
import { Conversation, User } from "@prisma/client";
import Link from "next/link";
import { useMemo } from "react";
import { HiChevronLeft } from "react-icons/hi";
import { HiEllipsisHorizontal } from "react-icons/hi2";

interface HeaderProps {
    conversation : Conversation & {
        users: User[]
    }   
};

const Header: React.FC<HeaderProps> = ({
    conversation
}) => {
    const otherUser = useOtherUser(conversation);
    const statustext = useMemo(() => {
        if(conversation.isGroup) {
            return `${conversation.users.length} members`;
        }

        return `Online`;
    }, [conversation.isGroup, conversation, conversation.users.length])

    return (
        <div className="bg-violet-300 w-full flex border:b-[1px] sm:px-4 py-3 px-4 lg:px-6 justify-between items-center shadow-sm">
            <div className="flex gap-3 items-center">
                <Link href={`/conversations/${conversation.id}`}
                      className="lg:hidden block text-violet-800 hover:text-sky-600 transition corsor-pointer "
                >
                    <HiChevronLeft size={30}/>
                </Link>
                <Avatar user={otherUser}/>
                <div className="flex flex-col">
                    <h3 className="font-bold text-gray-800">{conversation.name || otherUser.name}</h3>
                    <span className="text-sm text-neutral-500">{statustext}</span>
                </div>
            </div>
            <HiEllipsisHorizontal
                size={32}
                onClick={() => {}}
                className="text-violet-800 cursor-pointer hover:text-sky-700 transition"
            />
        </div>
    )
};

export default Header;