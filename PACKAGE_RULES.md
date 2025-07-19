# 📦 Package Management Rules

## 🎯 Overview

이 프로젝트는 **bun**을 패키지 매니저로 사용합니다. 일관성과 성능을 위해 모든 패키지 관리는 bun을 통해서만 진행합니다.

## 🔧 Package Manager: bun

### ✅ 올바른 패키지 설치 방법

```bash
# 일반 의존성 설치
bun add package-name

# 개발 의존성 설치
bun add -d package-name

# Expo 패키지 설치 (호환성 보장)
bunx expo install package-name

# 전역 패키지 설치
bun add -g package-name
```

### ❌ 금지된 패키지 설치 방법

```bash
# npm 사용 금지
npm install package-name
npx some-command

# yarn 사용 금지
yarn add package-name

# pnpm 사용 금지
pnpm add package-name
```

## 📁 Lock Files

### ✅ 유지해야 할 파일

- `bun.lock` - bun의 공식 lock 파일
- `package.json` - 패키지 목록 및 설정

### ❌ 제거/무시해야 할 파일

- `package-lock.json` - npm lock 파일 (`.gitignore`에 추가됨)
- `yarn.lock` - yarn lock 파일 (`.gitignore`에 추가됨)
- `pnpm-lock.yaml` - pnpm lock 파일

## 🚀 Expo 패키지 특별 규칙

### Expo 공식 패키지 설치

```bash
# ✅ 권장 방법
bunx expo install expo-package-name

# ✅ 대안 (버전 호환성 확인 필요)
bun add expo-package-name
```

### 네이티브 모듈 설치 후 작업

```bash
# 네이티브 모듈 설치 후 prebuild 실행
bunx expo prebuild --clean

# iOS 빌드
bunx expo run:ios

# Android 빌드
bunx expo run:android
```

## 🔍 패키지 관리 체크리스트

### 새 패키지 설치 시

- [ ] `bun add` 명령어 사용
- [ ] `package.json`에 올바르게 추가되었는지 확인
- [ ] `bun.lock` 파일이 업데이트되었는지 확인
- [ ] 네이티브 모듈의 경우 `expo prebuild` 실행

### 패키지 제거 시

```bash
# 패키지 제거
bun remove package-name

# 네이티브 모듈 제거 후 clean build
bunx expo prebuild --clean
```

### 의존성 업데이트

```bash
# 모든 패키지 업데이트
bun update

# 특정 패키지 업데이트
bun update package-name
```

## 🚨 문제 해결

### Lock 파일 충돌 시

1. npm/yarn lock 파일 제거

   ```bash
   rm package-lock.json yarn.lock
   ```

2. node_modules 재설치

   ```bash
   rm -rf node_modules
   bun install
   ```

3. Expo prebuild (네이티브 모듈 있는 경우)
   ```bash
   bunx expo prebuild --clean
   ```

### 패키지 설치 오류 시

1. 캐시 클리어

   ```bash
   bun pm cache rm
   ```

2. 재설치
   ```bash
   rm -rf node_modules bun.lock
   bun install
   ```

## 📋 Git 관리

### 커밋에 포함할 파일

- `package.json`
- `bun.lock`

### 커밋에서 제외할 파일 (`.gitignore`)

- `package-lock.json`
- `yarn.lock`
- `pnpm-lock.yaml`
- `node_modules/`

## ⚡ 성능 최적화

### bun 설정 최적화

```bash
# bun.toml 파일 생성 (옵션)
echo '[install]
peer = true
production = false' > bun.toml
```

### 빠른 설치를 위한 팁

- `bun install --frozen-lockfile` (CI 환경)
- `bun install --no-save` (임시 설치)

## 🤝 팀 협업 규칙

### 새 팀원 온보딩

1. bun 설치 확인

   ```bash
   curl -fsSL https://bun.sh/install | bash
   ```

2. 의존성 설치

   ```bash
   bun install
   ```

3. 개발 서버 실행
   ```bash
   bun start
   ```

### 코드 리뷰 시 체크사항

- [ ] `package.json` 변경사항 확인
- [ ] `bun.lock` 파일 변경사항 확인
- [ ] npm/yarn lock 파일이 추가되지 않았는지 확인
- [ ] 불필요한 패키지가 추가되지 않았는지 확인

---

## 📚 관련 문서

- [bun 공식 문서](https://bun.sh/docs)
- [Expo 설치 가이드](https://docs.expo.dev/guides/setup/)
- [React Native 패키지 관리](https://reactnative.dev/docs/libraries)

---

_이 규칙은 프로젝트의 일관성과 성능을 보장하기 위해 모든 팀원이 준수해야 합니다._
