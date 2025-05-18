# DJDJ Frontend

DJDJ 프론트엔드 애플리케이션 - Spotify 로그인 기능이 구현된 Next.js 프로젝트입니다.

## 시작하기

### 필수 조건

- Node.js 14.0.0 이상
- npm 또는 yarn

### 환경 설정

1. [Spotify Developer Dashboard](https://developer.spotify.com/dashboard/applications)에서 새 앱을 생성합니다.
2. Redirect URI를 `http://127.0.0.1:3000/api/auth/callback/spotify`로 설정합니다.
3. `.env.local` 파일에 다음 정보를 입력합니다:
   ```
   SPOTIFY_CLIENT_ID=your_spotify_client_id
   SPOTIFY_CLIENT_SECRET=your_spotify_client_secret
   NEXTAUTH_URL=http://127.0.0.1:3000
   NEXTAUTH_SECRET=your_random_secret_here
   ```

### 설치 및 실행

```bash
# 패키지 설치
npm install
# 또는
yarn

# 개발 서버 실행
npm run dev
# 또는
yarn dev
```

브라우저에서 [http://127.0.0.1:3000](http://127.0.0.1:3000)으로 접속하여 앱을 확인할 수 있습니다.

## 주요 기능

- Spotify 계정으로 로그인
- 사용자 프로필 정보 표시
- 토큰 자동 갱신

## 프로젝트 구조

- `/pages` - 모든 페이지 컴포넌트
- `/components` - 재사용 가능한 UI 컴포넌트
- `/styles` - CSS 모듈 파일
- `/public` - 정적 파일(이미지 등)
- `/pages/api` - API 라우트(NextAuth.js 설정 포함)

## 참고 자료

- [Next.js 문서](https://nextjs.org/docs)
- [NextAuth.js 문서](https://next-auth.js.org/getting-started/introduction)
- [Spotify Web API 문서](https://developer.spotify.com/documentation/web-api/)