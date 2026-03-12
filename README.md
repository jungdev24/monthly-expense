# 가계부 (Monthly Expense Tracker)

토스 스타일의 깔끔한 가계부 웹앱입니다.

## 주요 기능

- **수입/지출 관리** — 카테고리별 내역 기록
- **카드 할부** — 2~36개월 할부 자동 분할
- **고정 수입/지출** — 매월 반복되는 항목 관리 (급여, 구독 등)
- **대시보드** — 월간 요약, 지출 분석 파이차트, 월별 추이 바 차트
- **다크모드** — 시스템 / 라이트 / 다크 선택 가능
- **데이터 관리** — JSON 내보내기/가져오기, 전체 삭제
- **모바일 반응형** — 모바일 퍼스트 UI

## 기술 스택

- React 19 + TypeScript
- Vite
- Tailwind CSS v4
- Recharts (차트)
- localStorage (데이터 저장)

## 시작하기

```bash
npm install
npm run dev
```

## 배포

```bash
npm run build
npx wrangler pages deploy dist --project-name monthly-expense
```

## 라이브 데모

https://monthly-expense.pages.dev
