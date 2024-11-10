import getCurrentUser from "@/app/actions/getCurrentUser";
import { NextResponse } from "next/server";
import prisma from "@/app/libs/prismadb";

export async function POST(request: Request) {
    try {
        const currentUser = await getCurrentUser();
        const body = await request.json();
        const {userId, isGroup, members, name} = body;

        if (!currentUser?.id || !currentUser?.email) {
            return NextResponse.json("Unauthorized", { status: 401 });
        }

        if(isGroup && (!members || members.length<2 || !name)) {
            return NextResponse.json("Invalid group data", { status: 400 });
        }

        if(isGroup) {
            const newConversation = await prisma.conversation.create({
                data: {
                    name: name,
                    isGroup: isGroup,
                    users: {
                        connect: [
                            {id: currentUser.id},
                            ...members.map((member: {value: string}) => ({id: member.value}))
                        ]
                    }
                },
                include: {
                    users: true
                }
            });
            return NextResponse.json(newConversation, { status: 200 });
        }
            const existingConversations = await prisma.conversation.findMany({
                where: {
                    OR: [
                        {userIds: {equals:[currentUser.id, userId]}},
                        {userIds: {equals:[userId, currentUser.id]}}
                    ]
                }
            });
            const singleConversation = existingConversations[0];

            if(singleConversation) {
                return NextResponse.json(singleConversation, { status: 200 });
            }

            const newConversation = await prisma.conversation.create({
                data: {
                    users: {
                        connect: [
                            {id: currentUser.id},
                            {id: userId}
                        ]
                    }
                },
                include: {
                    users: true
                }
            });

            return NextResponse.json(newConversation, { status: 200 });
    } 
    catch (error: any) {
        console.error(error);
        return NextResponse.json("Error fetching conversation", { status: 500 });
    }
}