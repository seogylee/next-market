import { NextResponse } from 'next/server';
import connectDB from '@/app/utils/database';
import {ItemModel} from '@/app/utils/schemaModels';

export async function POST(request) {
    const reqBody = await request.json();
    console.log(reqBody);
    try{
        await connectDB();
        await ItemModel.create(reqBody);
        return NextResponse.json({ message: "Item created successfully" });
    }
    catch (error) {
        console.error("Error creating item:", error);
        return NextResponse.json({ message: "Item creation failed", error: error.message });
    }
}

