# WatchList
React Native app allowing user to search for movies (via Open Movie Database) and create a list of movies/shows to watch in the future.

## Requirements

[React Native](https://facebook.github.io/react-native/docs/getting-started) (React Native CLI Quickstart) installed.

## Installation

Using the console clone repository and run npm install

```
git clone https://github.com/m-zaremba/WatchList.git
cd WatchList
npm install
```

## Starting the app

After installation generate the debug keystore by running the following command in the android/app/ directory: 
```
keytool -genkey -v -keystore debug.keystore -storepass android -alias androiddebugkey -keypass android -keyalg RSA -keysize 2048 -validity 10000
```

Start the app with:

```
npm start
```
and

```
react-native run-android
```
in second terminal window.

## Preview


![App preview](markdown_gif/WatchApp.gif?raw=true "WatchApp.gif")


## Made with:

* React Native (Hooks + Context)
* React Navigation
* React Native Vector Icons
* Axios
