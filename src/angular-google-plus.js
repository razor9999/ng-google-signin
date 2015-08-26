/**
 * google-signin module
 */
angular.module('google-signin', []).

/**
 * GooglePlus provider
 */provider('GoogleSignin', [function () {

    /**
     * Options object available for module
     * options/services definition.
     * @type {Object}
     */
    var options = {};

    var auth2;

    /**
     * clientId
     * @type {String}
     */
    options.clientId = null;

    this.setClientId = function (clientId) {
      options.clientId = clientId;
      return this;
    };

    this.getClientId = function () {
      return options.clientId;
    };

    /**
     * apiKey
     * @type {String}
     */
    options.apiKey = null;

    this.setApiKey = function (apiKey) {
      options.apiKey = apiKey;
      return this;
    };

    this.getApiKey = function () {
      return options.apiKey;
    };

    /**
     * Scopes
     * @default ['profile', 'email']
     * @type {Boolean}
     */
    options.scopes = ['profile', 'email'];

    this.setScopes = function (scopes) {
      options.scopes = scopes;
      return this;
    };

    this.getScopes = function () {
      return options.scopes;
    };

    /**
     * Init Google Plus API
     */
    this.init = function (customOptions) {
      angular.extend(options, customOptions);
    };

    this.loadCallback = function () {
      gapi.load('auth2', function () {
        auth2 = gapi.auth2.init(options);
      })
    };

    /**
     * This defines the Google SignIn Service on run.
     */
    this.$get =
      ['$q', '$rootScope', '$timeout', function ($q, $rootScope, $timeout) {

        /**
         * Define a deferred instance that will implement asynchronous calls
         * @type {Object}
         */
        var deferred;

        /**
         * NgGoogle Class
         * @type {Class}
         */
        var NgGoogle = function () {
        };

        NgGoogle.prototype.signIn = function (loginOptions) {
          return auth2.signIn(loginOptions);
        };

        NgGoogle.prototype.grantOfflineAccess = function (options) {
          return auth2.grantOfflineAccess(options);
        };

        NgGoogle.prototype.isSignedIn = function () {
          return auth2.isSignIn.get();
        };

        NgGoogle.prototype.getUser = function () {
          return auth2.currentUser.get();
        };

        NgGoogle.prototype.signOut = function () {
          auth2.signOut();
        };

        NgGoogle.prototype.disconnect = function () {
          auth2.disconnect();
        };

        return new NgGoogle();
      }];
  }])

  // Initialization of module
  .run(['$window', 'GoogleSignin', function ($window, GoogleSignin) {
    // This needs to be on the window for the callback
    $window.startGoogleSignin = GoogleSignin.loadCallback;

    var po = document.createElement('script');
    po.type = 'text/javascript';
    po.async = true;
    po.src =
      'https://apis.google.com/js/client:platform.js?onload=startGoogleSignin';
    var s = document.getElementsByTagName('script')[0];
    s.parentNode.insertBefore(po, s);
  }]);
