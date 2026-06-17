# Android build (Capacitor)

The web app is wrapped with [Capacitor](https://capacitorjs.com/) to ship an Android
build. The native project lives in `android/` and **is versioned** (only generated
output such as `android/build/`, `.gradle/`, `local.properties` and keystores are
gitignored).

## Toolchain (one-time)

- **JDK 21** — `brew install openjdk@21`
- **Android SDK** (command-line tools) — `brew install --cask android-commandlinetools`
- SDK packages: `sdkmanager "platform-tools" "platforms;android-34" "build-tools;34.0.0"`

Environment variables (add to your shell profile):

```bash
export JAVA_HOME="/opt/homebrew/opt/openjdk@21"
export ANDROID_HOME="/opt/homebrew/share/android-commandlinetools"
export PATH="$JAVA_HOME/bin:$ANDROID_HOME/platform-tools:$PATH"
```

`android/local.properties` must point at the SDK: `sdk.dir=$ANDROID_HOME`.

## npm scripts

| Script | What it does |
|--------|--------------|
| `npm run android:sync` | `ng build` + copy web assets into the native project |
| `npm run android:apk` | sync + build the **debug** APK |
| `npm run android:icons` | regenerate icons/splash from `assets/icon.png` (1024×1024) |
| `npm run android:install` | `adb install -r` the debug APK on a connected device |

Debug APK output: `android/app/build/outputs/apk/debug/app-debug.apk`.

## Networking

API calls go through the native HTTP client (`CapacitorHttp` enabled in
`capacitor.config.ts`) so they bypass WebView CORS — the app runs from the
`https://localhost` origin inside the APK.

## Release signing (for Play Store)

1. Generate a keystore (keep it safe and backed up — losing it means you can't
   update the app on Play Store):

   ```bash
   keytool -genkey -v -keystore poochydex-release.keystore \
     -alias poochydex -keyalg RSA -keysize 2048 -validity 10000
   ```

2. Copy `keystore.properties.example` to `keystore.properties` (gitignored) and
   fill in the path/passwords/alias.

3. Build the signed artifacts:

   ```bash
   cd android
   ./gradlew assembleRelease   # signed APK
   ./gradlew bundleRelease     # signed AAB (the format Play Store requires)
   ```

   Outputs land in `android/app/build/outputs/`. Bump `versionCode` (and
   `versionName`) in `android/app/build.gradle` before each Play Store upload.
