import { NextResponse } from "next/server";
import { SignJWT } from "jose";
import connectDB from '@/app/utils/database';
import { UserModel } from "@/app/utils/schemaModels";

export async function POST(request) {
    const reqBody = await request.json();
    try {
        await connectDB();
        const user = await UserModel.findOne({ email: reqBody.email });
        if (user) {
            if (reqBody.password === user.password){
                const secretKey=new TextEncoder().encode("next-market-app-book");
                const payload = {
                    email: reqBody.email
                }
                const token = await new SignJWT(payload)
                                        .setProtectedHeader({ alg: "HS256" })
                                        .setExpirationTime("1d")
                                        .sign(secretKey)
                return NextResponse.json({ message: "User logged in successfully", token: token });
            } else {
                return NextResponse.json({ message: "Invalid password" }, { status: 401 });
            }
        } else {
            return NextResponse.json({ message: "User not found" }, { status: 404 });
        }
    } catch (error) {
        console.error("User login error:", error);
        return NextResponse.json({ message: "User login failed", error: error.message });
    }
}
