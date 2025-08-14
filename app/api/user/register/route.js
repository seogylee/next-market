import { NextResponse } from "next/server";
import connectDB from "@/app/utils/database";
import {UserModel} from "@/app/utils/schemaModels";

export async function POST(request) {
    const reqBody = await request.json();
    try{
        await connectDB();
        await UserModel.create(reqBody);
        return NextResponse.json({ message: "User registered successfully" });
    } catch (error) {
        console.error("User registration error:", error);
        return NextResponse.json({ message: "User registration failed", error: error.message });
    }
    return NextResponse.json({ message: "User registration API" });
}
