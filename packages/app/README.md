![Logo of the project](./images/logo.sample.png)

# Name of the project &middot; [![Build Status](https://img.shields.io/travis/npm/npm/latest.svg?style=flat-square)](https://travis-ci.org/npm/npm) [![npm](https://img.shields.io/npm/v/npm.svg?style=flat-square)](https://www.npmjs.com/package/npm) [![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square)](http://makeapullrequest.com) [![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg?style=flat-square)](https://github.com/your/your-project/blob/master/LICENSE)

> Additional information or tag line

A brief description of your project, what it is used for.

## Installing / Getting started

A quick introduction of the minimal setup you need to get a RNApp up &
running.

```shell
npm install

# ios
cd ios
pod install
```

### IOS Running

```shell
npm run ios
```

### Android Running

```shell
npm run android
```

## Developing

### Built With

React, React Native Mobx-State-Tree ...

### Prerequisites

Xcode 최신버젼, node 10이상

### Prerequisites

What is needed to set up the dev environment. For instance, global dependencies or any other tools. include download links.

### Setting up Dev

Here's a brief intro about what a developer must do in order to start developing
the project further:

```shell
git clone https://github.com/your/your-project.git
cd your-project/
packagemanager install
```

And state what happens step-by-step. If there is any virtual environment, local server or database feeder needed, explain here.

### Building

If your project needs some additional steps for the developer to build the
project after some code changes, state them here. for example:

```shell
./configure
make
make install
```

Here again you should state what actually happens when the code above gets
executed.

### Tips
- 안드로이드 adb install
  - adb devices
  - adb -s "<deviceIDfromlist>" install "<path-to-apk>"
   - ex) adb -s 9842c0f3 install ./android/app/build/outputs/apk/release/app-release.apk

- ios devices
  - xcrun simctl list

## FIX

Catalina OS 이슈
- https://github.com/facebook/react-native/issues/23282#issuecomment-533856658

## Document
- https://github.com/microsoft/react-native-code-push/issues/1672
- Font: https://medium.com/react-native-training/react-native-custom-fonts-ccc9aacf9e5e

## Shared Folder
- https://github.com/facebook/react-native/issues/24416
- https://stackoverflow.com/questions/57798793/how-do-i-configure-absolute-paths-for-imports-in-typescript-based-react-native-a


### Deploying / Publishing

give instructions on how to build and release a new version
In case there's some step you have to take that publishes this project to a
server, this is the right time to state it.

```shell
packagemanager deploy your-project -s server.com -u username -p password
```

## Fastlane
Please make sure you update `fastlane/Fastfile` with the correct config and syntax according to [Fastlane docs](https://docs.fastlane.tools/)

+ for iOS, please note if `XCODE_AUTO_CODE_SIGN` should be true or false (manually manage code-signing)

Fastlane will load config from `/config.*` file into `.env`
Secrets are to be provided in command line

+ `MYAPP_CONFIG=prod yarn fastlane:ios-ci`
+ `MYAPP_RELEASE_STORE_PASSWORD=xxxxx  yarn fastlane:android-ci`

#### Android

##### aab 테스트 진행

0. npm run android:aab
1. bundletool build-apks --bundle=./android/app/build/outputs/bundle/release/app-release.aab --output=./android/app/build/outputs/bundle/release/app-release.apks --ks=./android/app/rnapp-production-key.keystore --ks-pass=pass:android --ks-key-alias=rnapp-production-alias --key-pass=pass:android
2. bundletool install-apks --apks=./android/app/build/outputs/bundle/release/app-release.apks --device-id=LMX625ON6PLF5HJZPJ

#### Code Push

- 코드푸쉬 키 가져오는 커멘드

```
appcenter codepush deployment list -a appcenter/RNApp
appcenter codepush deployment list -a appcenter/RNApp
```

- 코드푸쉬 apply 예시

```
code-push release-react cosmochain/rnapp-android android -d Staging -m true --privateKeyPath ~/private.pem --description "헬로우 월드44"

code-push release-react cosmochain/rnapp-ios ios -d Staging -m true --privateKeyPath ~/private.pem --description "헬로우 월드44" --plistFile "ios/RNApp/Info.plist"
```

- Code Push cli 설치 https://github.com/Microsoft/code-push/tree/master/cli#installation
- 코드 푸쉬 간단한 설명서
  - https://github.com/kjk7034/ReactNativeStudy/blob/master/docs/CodePush.md
- 코드 푸쉬가 감지하는 버젼 변경점
  React Native (Android) The android.defaultConfig.versionName property in your build.gradle file
  React Native (iOS) The CFBundleShortVersionString key in the Info.plist file

- multi-deployment
  - https://github.com/Microsoft/react-native-code-push/blob/master/docs/multi-deployment-testing-android.md
  - https://github.com/Microsoft/react-native-code-push/blob/master/docs/multi-deployment-testing-ios.md


## Versioning

We can maybe use [SemVer](http://semver.org/) for versioning. For the versions available, see the [link to tags on this repository](/tags).

## Configuration

Here you should write what are all of the configurations a user can enter when
using the project.

## Tests

Describe and show how to run the tests with code examples.
Explain what these tests test and why.

```shell
Give an example
```

## Style guide

Explain your code style and show how to check it.

## Api Reference

If the api is external, link to api documentation. If not describe your api including authentication methods as well as explaining all the endpoints with their required parameters.

## Database

Explaining what database (and version) has been used. Provide download links.
Documents your database design and schemas, relations etc...

## Licensing

State what the license is and how to find the text version of the license.