import { NextResponse } from "next/server";
import { jwtVerify } from "jose";

export async function middleware(){
    //const token = await request.headers.get("Authorization")?.split(" ")[1];
    const token = "eyJhbGciOiJIUzI1NiJ9.eyJlbWFpbCI6ImR1bW15QGdtYWlsLmNvbSIsImV4cCI6MTc1NTE4MjcxMX0.sp7mK6zWHyWBxQVsBHD4vZkKnBYzUrfDfG_F2_L3apA"

    if (!token) {
        return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    try{
        const secretKey = new TextEncoder().encode("next-market-app-book");
        const decodedJwt = await jwtVerify(token, secretKey);
        return NextResponse.next();
    } catch (error) {
        console.error("Middleware error:", error);
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
    }
    
}

export const config = {
    matcher: ["/api/item/create", "/api/item/update/:path*", "/api/item/delete/:path*"]
};
