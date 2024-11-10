"use client";

import { use, useCallback, useMemo } from "react";
import { useRouter } from "next/navigation";
import { Conversation, Message, User } from "@prisma/client";
import {format} from "date-fns";
import { useSession } from "next-auth/react";
import clsx from "clsx";
import { FullConversationType } from "@/app/types";
import useOtherUser from "@/app/hooks/useOtherUser";
import Avatar from "@/app/components/Avatar";

interface ConversationBoxProps {
    data: FullConversationType,
    selected?: boolean
}

const ConversationBox: React.FC<ConversationBoxProps> = ({
    data, selected
}) => {
    const otherUser = useOtherUser(data);
    const session = useSession();
    const router = useRouter();

    const handleClick = useCallback(() => {
        router.push(`/conversations/${data.id}`)
    }, [data.id, router]);

    const lastMessage= useMemo(() => {
        const messages = data.messages || [];

        return messages[messages.length - 1];
    }, [data.messages]);

    const userEmail= useMemo(() =>
    {
        return session.data?.user?.email;
    },[session.data?.user?.email]);

    const hasSeen = useMemo(() => {
        if (!lastMessage) {
            return false;
        }

        const seenArray = lastMessage.seen || [];
        if(!userEmail)
        {
            return false;
        }

        return seenArray.filter((user) => user.email === userEmail).length !==0;
    }, [lastMessage, userEmail]);

    const lastMessageText = useMemo(() => {
        if(lastMessage?.image){
            return "Sent an attachment"
        }

        if(lastMessage?.body){
            return lastMessage.body;
        }

        if (!lastMessage) {
            return "Started a quibble!";
        }

    }, [lastMessage]);

  return (
    <div 
        onClick={handleClick}
        className={clsx("w-full relative flex items-center space-x-3 hover:bg-violet-300/50 rounded-lg transition cursor-pointer pb-1 pl-2 pt-2", selected?'bg-violet-400':'bg-violet-200/50')}>
            <Avatar user={otherUser}/>
            <div className="min-w-0 flex-1">
                <div className="focus:outline-none">
                    <div className="flex flex-col justify-between items-left mb-1">
                        <p className="text-md font-medium text-black">
                            {data.name || otherUser.name}
                        </p>
                        {lastMessage?.createdAt && ( 
                        <p className="text-xs text-neutral-600 font-light">
                            {format(new Date(lastMessage.createdAt), "p")}
                        </p>)}
                        <div>
                            <p className={clsx("text-sm truncate", hasSeen ? "text-black":"font-medium text-gray-600")}>{lastMessageText}</p>
                        </div>
                    </div>
                </div>
            </div>
    </div>
  );
};

export default ConversationBox;