import { NextResponse } from "next/server";
import connectDB from "@/app/utils/database";
import { ItemModel } from "@/app/utils/schemaModels";

export async function DELETE(request, context) {
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
    
    const item = await ItemModel.findById(id);
    console.log("아이템 정보:", item);
    if (item.email === reqBody.email) {
      const deletedItem = await ItemModel.deleteOne({ _id: id });
      if (deletedItem) {
        return NextResponse.json({ message: "아이템 삭제 성공!" });
      } else {
        return NextResponse.json({ message: "아이템 삭제에 실패했습니다." }, { status: 500 });
      }
    } else {
      return NextResponse.json(
        { message: "아이템의 이메일이 일치하지 않습니다." },
        { status: 403 }
      );
    }
  } catch (error) {
    // 에러 발생 시 서버 콘솔에 상세 에러를 기록합니다.
    console.error("아이템 삭제 중 오류 발생:", error);
    
    // 사용자에게는 일반적인 서버 에러 메시지를 반환합니다.
    return NextResponse.json(
      { message: "아이템 삭제에 실패했습니다.", error: error.message },
      { status: 500 }
    );
  }
}