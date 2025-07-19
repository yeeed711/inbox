# Frontend Development Rules for Cursor IDE

## 📱 React Native / Expo 프로젝트 룰

### 🎯 코드 스타일

- TypeScript 사용 필수
- 함수형 컴포넌트 우선 (React Hooks 사용)
- StyleSheet API 사용 (inline style 지양)
- 한국어 주석 및 응답 제공

### 📦 패키지 관리

- **필수**: bun 사용 (`bun add`, `bunx expo install`)
- **금지**: npm, yarn 명령어 사용
- 자세한 규칙은 PACKAGE_RULES.md 참조

### 🏗️ 파일 구조

```
app/               # 화면 컴포넌트 (expo-router)
components/        # 재사용 가능한 UI 컴포넌트
constants/         # 상수 정의
contexts/          # React Context
hooks/             # 커스텀 훅
```

### 🎨 UI 컴포넌트

- `@expo/ui` 컴포넌트 우선 사용
- React Native 기본 컴포넌트는 보조적으로 사용
- 다크 테마 기본 적용

### 📝 네이밍 컨벤션

- 컴포넌트: PascalCase (예: `UserProfile`)
- 함수/변수: camelCase (예: `handleSubmit`)
- 상수: UPPER_SNAKE_CASE (예: `API_BASE_URL`)
- 스타일: camelCase (예: `containerStyle`)

### 🔧 코드 품질

- 매직 넘버 대신 상수 사용
- 복잡한 조건문은 의미있는 변수명으로 분리
- 단일 책임 원칙 준수
- 불필요한 복잡성 피하기

### 📱 플랫폼 고려사항

- iOS/Android 차이점 고려
- SafeAreaView 적절한 사용
- 키보드 처리 (KeyboardAvoidingView)
- 네이티브 모듈 설치 후 prebuild 실행
