"use client";

import Avatar from "../../components/Avatar";
import {User} from "@prisma/client";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";

interface UserBoxProps  {
    data: User
}

const UserBox: React.FC<UserBoxProps>  = ({
    data
}) => {
    const router = useRouter();
    const[isLoading, setIsLoading] = useState(false);

    const handleClick = useCallback(() => {
        setIsLoading(true);
        axios.post(`/api/conversations`, {
            userId: data.id
        })
        .then((data) => {
            router.push(`/conversations/${data.data.id}`);
        })
        .finally(() => {
            setIsLoading(false);
        });
    }, [data, router]);

    return (
        <div
            onClick={handleClick}
            className="w-full relative flex items-center space-x-2 bg-neutral-200/50 p-2 mb-2 hover:bg-neutral-200/30 rounded-lg transition cursor-pointer"
        >
            <Avatar user={data}/>
            <div className="min-w-0 flex">
                <div className="focus:outline-none">
                    <div className="flex ml-2 mb-0 justify-center">
                        <p className="text-lg font-medium text-black">
                            {data.name}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default UserBox;