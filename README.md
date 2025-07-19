# Smart Inbox App 📧

This is an [Expo](https://expo.dev) project created with [`create-expo-app`](https://www.npmjs.com/package/create-expo-app).

## 📦 Package Manager

**This project uses [bun](https://bun.sh) as the package manager.**

For detailed package management rules, see [PACKAGE_RULES.md](./PACKAGE_RULES.md)

## 🚀 Get started

1. **Install bun** (if not already installed)

   ```bash
   curl -fsSL https://bun.sh/install | bash
   ```

2. **Install dependencies**

   ```bash
   bun install
   ```

3. **Start the app**

   ```bash
   bun start
   ```

## 📱 Development

### Running on different platforms

```bash
# iOS Simulator
bunx expo run:ios

# Android Emulator
bunx expo run:android

# Web browser
bun run web
```

### Installing new packages

```bash
# Regular dependencies
bun add package-name

# Development dependencies
bun add -d package-name

# Expo packages (recommended)
bunx expo install expo-package-name
```

## 🏗️ Project Structure

```
inbox/
├── app/                 # App screens (file-based routing)
├── components/          # Reusable UI components
├── constants/           # App constants
├── contexts/           # React contexts
├── hooks/              # Custom React hooks
├── assets/             # Images, fonts, etc.
└── PACKAGE_RULES.md    # Package management guidelines
```

## 🎨 Features

- **Smart Inbox Interface**: Modern email-like UI with dark theme
- **Native Components**: Using `@expo/ui` for iOS and Android optimization
- **Memo Creation**: Modal-based note taking functionality
- **Search & Filter**: Real-time inbox item filtering
- **Gradient Floating Button**: Custom styled action button

## 🔧 Tech Stack

- **Framework**: Expo (React Native)
- **Language**: TypeScript
- **Package Manager**: bun
- **UI Components**: @expo/ui, expo-linear-gradient
- **Navigation**: expo-router (file-based)
- **Styling**: React Native StyleSheet

## 📋 Development Rules

- ✅ Use `bun` for all package management
- ✅ Follow the guidelines in [PACKAGE_RULES.md](./PACKAGE_RULES.md)
- ❌ Do not use `npm` or `yarn` commands
- ❌ Do not commit `package-lock.json` or `yarn.lock`

## 🚨 Troubleshooting

### Package issues

1. Clear cache: `bun pm cache rm`
2. Reinstall: `rm -rf node_modules bun.lock && bun install`
3. Rebuild native: `bunx expo prebuild --clean`

### Build issues

```bash
# Clean build
bunx expo prebuild --clean
bunx expo run:ios
```

## 📚 Learn more

- [Expo documentation](https://docs.expo.dev/): Learn fundamentals, or go into advanced topics
- [Learn Expo tutorial](https://docs.expo.dev/tutorial/introduction/): Follow a step-by-step tutorial
- [bun documentation](https://bun.sh/docs): Fast package manager and runtime

---

_Built with ❤️ using Expo and bun_
