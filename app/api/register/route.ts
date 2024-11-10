import bcrypt from "bcrypt";

import prisma from "@/app/libs/prismadb";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { name, email, password } = body;

        if(!email || !name || !password){
            return NextResponse.json("Missing Fields", { status: 400 });
        }

        const hashedPassword = await bcrypt.hash(password, 12);

        const user = await prisma.user.create({
            data: {
                name,
                email,
                hashedPassword
            }
        });

        return NextResponse.json(user);
    } 
    catch (error: any) {
        console.error(error, 'REGISTRATION_ERROR');
        return new NextResponse("Something went wrong", { status: 500 });
    }
}