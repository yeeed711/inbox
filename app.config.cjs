// app.config.cjs
module.exports = ({ config }) => {
  // EAS 빌드에서 전달된 환경 변수 가져오기
  const appEnv = process.env.APP_ENV || "development";

  // 환경별 앱 이름 설정
  const appName = appEnv === "production" ? "Inbox" : `Inbox (${appEnv})`;

  // 환경별 아이콘 경로
  const iconBasePath = "./assets/images";
  const iconPath = `${iconBasePath}/icon-${appEnv}.png`;
  const adaptiveIconPath = `${iconBasePath}/adaptive-icon-${appEnv}.png`;
  const splashIconPath = `${iconBasePath}/splash-icon-${appEnv}.png`;

  // 환경별 번들 ID (선택 사항)
  const baseBundleId = "com.anonymous.inbox";
  const bundleId =
    appEnv === "production" ? baseBundleId : `${baseBundleId}.${appEnv}`;

  return {
    expo: {
      extra: {
        eas: {
          projectId: "3c8cdebe-7d49-4a4b-a314-7c3e2f2a3564",
        },
      },
      name: appName,
      slug: "inbox",
      version: "1.0.0",
      orientation: "portrait",
      icon: "./assets/images/icon.png",
      scheme: "inbox",
      userInterfaceStyle: "automatic",
      newArchEnabled: true,
      ios: {
        supportsTablet: true,
        bundleIdentifier: bundleId,
        icon: {
          dark: "./assets/images/icon-dark.png",
        },
      },
      android: {
        adaptiveIcon: {
          foregroundImage:
            appEnv === "production"
              ? "./assets/images/adaptive-icon.png"
              : adaptiveIconPath,
          backgroundColor: "#ffffff",
        },
        edgeToEdgeEnabled: true,
        permissions: [
          "android.permission.CAMERA",
          "android.permission.RECORD_AUDIO",
        ],
      },
      web: {
        bundler: "metro",
        output: "server",
        favicon: "./assets/images/favicon.png",
      },
      plugins: [
        "expo-router",
        [
          "expo-splash-screen",
          {
            image:
              appEnv === "production"
                ? "./assets/images/splash-icon.png"
                : splashIconPath,
            imageWidth: 200,
            resizeMode: "contain",
            backgroundColor: "#ffffff",
          },
        ],
        [
          "expo-camera",
          {
            cameraPermission: "Allow Inbox to access your camera",
            microphonePermission: "Allow Inbox to access your microphone",
            recordAudioAndroid: true,
          },
        ],
      ],
      experiments: {
        typedRoutes: true,
      },
    },
  };
};
