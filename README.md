_.o0 PravitelstvoBG 0o._
=========================

<a href="https://play.google.com/store/apps/details?id=net.vexelon.pravitelstvobg">
  <img alt="Get it on Google Play"
       src="https://developer.android.com/images/brand/bg_generic_rgb_wo_45.png" />
</a>

[PravitelstvoBG](https://play.google.com/store/apps/details?id=net.vexelon.pravitelstvobg) is a 
simple RSS reader mobile app that fetches news and info from [government.bg](http://government.bg)

**Note:** This application is localized only in Bulgarian language.

Please read [HISTORY](HISTORY) for a list of changes.

# Requirements

  * Requires Android 2.1 [API Level 7](http://developer.android.com/about/versions/android-2.1.html) or above
  * Requires Internet connection

# Development

To build and run the app use:

    $ ionic platform android
    $ cordova plugin add org.apache.cordova.dialogs
    $ cordova plugin add org.apache.cordova.vibration
    $ cordova plugin add https://github.com/driftyco/ionic-plugins-keyboard.git
    $ cordova plugin add https://github.com/whiteoctober/cordova-plugin-app-version.git
    $ ionic build android
    $ ionic emulate android

# Dependencies

  * Built using [Ionic](http://ionicframework.com/).
  * [Moment.js](http://momentjs.com/) - A javascript date library for parsing, validating, 
  manipulating, and formatting dates.
  * [xml2json](http://goessner.net/download/prj/jsonxml/) - xml2json javascript library.
  * [cordova-plugin-app-version.git](https://github.com/whiteoctober/cordova-plugin-app-version.git) 
  - Cordova Android version plugin.

# License

Under [MIT License](LICENSE).
