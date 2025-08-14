This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).


## git 초기 설정
git init                            현재 폴더를 Git 저장소로 만듭니다.
git add .                           현재 작업 중인 디렉터리 내의 모든 파일과 폴더를 스테이징 영역에 추가
git commit -m "초기 파일들 추가"      git add로 준비된 파일들을 커밋합니다. 
git remote add origin https://github.com/seogylee/next-market.git           원격 저장소 연결(한번만)
git branch -M main                  브랜치 이름 설정 (선택 사항)
git push origin main                커밋이 완료된 후, 변경 사항을 GitHub 원격 저장소로 업로드합니다.

## git 업데이트
git commit -m "변경 주요사항 설명"
git push origin main  


## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.js`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
