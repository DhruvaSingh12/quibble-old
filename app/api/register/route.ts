import bcrypt from "bcrypt";

import prisma from "../../libs/prismadb";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { name, email, password } = body;

        if(!email || !name || !password){
            return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
        }

        const existingUser = await prisma.user.findUnique({
            where: {
                email: email
            }
        });

        if (existingUser) {
            return NextResponse.json({ error: "User already exists" }, { status: 400 });
        }

        const hashedPassword = await bcrypt.hash(password, 12);

        const user = await prisma.user.create({
            data: {
                name,
                email,
                hashedPassword
            }
        });

        return NextResponse.json({ id: user.id, name: user.name, email: user.email });
    } 
    catch (error: any) {
        console.error('REGISTRATION_ERROR:', error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}