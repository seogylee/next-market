// API 라우트 핸들러를 위해 NextResponse를 가져옵니다.
import { NextResponse } from "next/server";
// 데이터베이스 연결 유틸리티 함수를 가져옵니다.
import connectDB from "@/app/utils/database";
// Mongoose 스키마 모델을 가져옵니다.
import { ItemModel } from "@/app/utils/schemaModels";

/**
 * 특정 ID의 아이템을 조회하는 GET API 핸들러입니다.
 * @param {Request} request Next.js 요청 객체
 * @param {Object} context URL 파라미터를 포함하는 객체 (예: { params: { id: 'someId' } })
 * @returns {NextResponse} JSON 응답
 */
export async function GET(request, context) {
  try {
    // 데이터베이스에 연결합니다.
    await connectDB();

    // Next.js에서 권장하는 방식으로 params를 안전하게 추출합니다.
    const { id } = await context.params;

    // ID가 유효한지 확인합니다.
    // ID가 제공되지 않았거나 형식이 올바르지 않으면 400 Bad Request 응답을 반환합니다.
    if (!id) {
      return NextResponse.json(
        { message: "아이템 ID가 제공되지 않았습니다." },
        { status: 400 }
      );
    }

    // Mongoose를 사용하여 해당 ID의 아이템을 찾습니다.
    // .lean()을 사용하여 순수 JavaScript 객체를 반환하여 성능을 최적화합니다.
    const item = await ItemModel.findById(id).lean();

    // 아이템이 데이터베이스에 존재하지 않는 경우
    if (!item) {
      return NextResponse.json(
        { message: "요청된 아이템을 찾을 수 없습니다." },
        { status: 404 }
      );
    }

    // 성공적인 응답을 반환합니다.
    return NextResponse.json(
      { message: "아이템을 성공적으로 읽었습니다.", item },
      { status: 200 }
    );
  } catch (error) {
    // 에러 발생 시 서버 콘솔에 상세 에러를 기록합니다.
    console.error("아이템 조회 중 오류 발생:", error);

    // 사용자에게는 일반적인 서버 에러 메시지를 반환합니다.
    // 디버깅을 위해 에러 메시지를 포함할 수도 있습니다.
    return NextResponse.json(
      { message: "서버 오류가 발생했습니다.", error: error.message },
      { status: 500 }
    );
  }
}