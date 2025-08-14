import { NextResponse } from "next/server";
import connectDB from "@/app/utils/database";
import { ItemModel } from "@/app/utils/schemaModels";

export async function GET(request) {
    try {
        await connectDB();
        const items = await ItemModel.find({});
        return NextResponse.json({ message: "아이템 읽기 성공", allItems: items });
    } catch (error) {
        console.error("Error fetching items:", error);
        return NextResponse.json({ message: "Item fetching failed", error: error.message });
    }
}

export const revalidate = 0; 