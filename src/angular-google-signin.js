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

    this.setClientId = function (clientId) {
      options.client_id = clientId;
      return this;
    };

    this.getClientId = function () {
      return options.client_id;
    };

    this.setCookiePolicy = function (cookiePolicy) {
      options.cookie_policiy = cookiePolicy;
      return this;
    };

    this.getCookiePolicy = function () {
      return options.cookie_policiy;
    };

    this.setFetchBasicProfile = function (fetchBasicProfile) {
      options.fetch_basic_profile = fetchBasicProfile;
      return this;
    };

    this.getFetchBasicProfile = function () {
      return options.fetch_basic_profile;
    };

    this.setHostedDomain = function (hostedDomain) {
      options.hosted_domain = hostedDomain;
      return this;
    };

    this.getHostedDomain = function () {
      return options.hosted_domain;
    };

    this.setOpenIDRealm = function (openIDRealm) {
      options.openid_realm = openIDRealm;
      return this;
    };

    this.getOpenIDRealm = function () {
      return options.openid_realm;
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

    /**
     * This defines the Google SignIn Service on run.
     */
    this.$get = ['$rootScope', function ($rootScope) {
      var auth2;

      /**
       * NgGoogle Class
       * Wraps most of the functionality of the Google Sign-In JavaScript
       * SDK found at
       * https://developers.google.com/identity/sign-in/web/reference
       * @type {Class}
       */
      var NgGoogle = function () {
      };

      NgGoogle.prototype.signIn = function (loginOptions) {
        return auth2.signIn(loginOptions);
      };

      NgGoogle.prototype.signOut = function () {
        auth2.signOut();
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

      NgGoogle.prototype.disconnect = function () {
        auth2.disconnect();
      };

      /**
       * This callback handles the onload callback for the GAPI lib
       * @private
       */
      NgGoogle.prototype._loadCallback = function () {
        gapi.load('auth2', _initializeOnLoad);
      };

      return new NgGoogle();

      function _initializeOnLoad() {
        auth2 = gapi.auth2.init(options);

        auth2.currentUser.listen(function (user) {
          $rootScope.$broadcast('angular-google-signin:currentUser', user);
        });

        auth2.isSignedIn.listen(function (isSignedIn) {
          $rootScope.$broadcast('angular-google-signin:isSignedIn', isSignedIn);
        });
      }
    }];
  }])

  // Initialization of module
  .run(['$window', 'GoogleSignin', function ($window, GoogleSignin) {
    // This needs to be on the window for the callback
    $window._startGoogleSignin = GoogleSignin._loadCallback;

    var po = document.createElement('script');
    po.type = 'text/javascript';
    po.async = true;
    po.src =
      'https://apis.google.com/js/client:platform.js?onload=_startGoogleSignin';
    var s = document.getElementsByTagName('script')[0];
    s.parentNode.insertBefore(po, s);
  }]);
