import { NextResponse } from "next/server";
import connectDB from "@/app/utils/database";
import { ItemModel } from "@/app/utils/schemaModels";

export async function PUT(request, context) {
  const reqBody = await request.json();
  console.log({"reqBody": reqBody});

  try {
    await connectDB();
    const { id } = await context.params;
    if (!id) {
      return NextResponse.json(
        { message: "아이템 ID가 제공되지 않았습니다." },
        { status: 400 }
      );
    }

    const singleItem = await ItemModel.findById(id)
    console.log("아이템 정보:", singleItem);
    if (singleItem.email === reqBody.email) {
      const updatedItem = await ItemModel.updateOne({_id: id}, reqBody)
      return NextResponse.json({ message: "아이템이 성공적으로 업데이트되었습니다.", item: updatedItem }, { status: 200 });
    } else{
      return NextResponse.json({ message: "아이템의 이메일이 일치하지 않습니다." }, { status: 403 });
    }
  } catch (error) {
    // 에러 발생 시 서버 콘솔에 상세 에러를 기록합니다.
    console.error("아이템 업데이트 중 오류 발생:", error);
    
    // 사용자에게는 일반적인 서버 에러 메시지를 반환합니다.
    return NextResponse.json(
      { message: "아이템 업데이트에 실패했습니다.", error: error.message },
      { status: 500 }
    );
  }
}