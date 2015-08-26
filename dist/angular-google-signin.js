/*! angular-google-signin - v0.0.1 2015-08-26 */
/**
 * google-signin module
 */
angular.module("google-signin", []).provider("GoogleSignin", [ function() {
    /**
     * Options object available for module
     * options/services definition.
     * @type {Object}
     */
    var a = {};
    var b;
    /**
     * clientId
     * @type {String}
     */
    a.clientId = null;
    this.setClientId = function(b) {
        a.clientId = b;
        return this;
    };
    this.getClientId = function() {
        return a.clientId;
    };
    /**
     * apiKey
     * @type {String}
     */
    a.apiKey = null;
    this.setApiKey = function(b) {
        a.apiKey = b;
        return this;
    };
    this.getApiKey = function() {
        return a.apiKey;
    };
    /**
     * Scopes
     * @default ['profile', 'email']
     * @type {Boolean}
     */
    a.scopes = [ "profile", "email" ];
    this.setScopes = function(b) {
        a.scopes = b;
        return this;
    };
    this.getScopes = function() {
        return a.scopes;
    };
    /**
     * Init Google Plus API
     */
    this.init = function(b) {
        angular.extend(a, b);
    };
    this.loadCallback = function() {
        gapi.load("auth2", function() {
            b = gapi.auth2.init(a);
        });
    };
    /**
     * This defines the Google SignIn Service on run.
     */
    this.$get = [ "$q", "$rootScope", "$timeout", function(a, c, d) {
        /**
         * Define a deferred instance that will implement asynchronous calls
         * @type {Object}
         */
        var e;
        /**
         * NgGoogle Class
         * @type {Class}
         */
        var f = function() {};
        f.prototype.signIn = function(a) {
            return b.signIn(a);
        };
        f.prototype.grantOfflineAccess = function(a) {
            return b.grantOfflineAccess(a);
        };
        f.prototype.isSignedIn = function() {
            return b.isSignIn.get();
        };
        f.prototype.getUser = function() {
            return b.currentUser.get();
        };
        f.prototype.signOut = function() {
            b.signOut();
        };
        f.prototype.disconnect = function() {
            b.disconnect();
        };
        return new f();
    } ];
} ]).run([ "$window", "GoogleSignin", function(a, b) {
    // This needs to be on the window for the callback
    a.startGoogleSignin = b.loadCallback;
    var c = document.createElement("script");
    c.type = "text/javascript";
    c.async = true;
    c.src = "https://apis.google.com/js/client:platform.js?onload=startGoogleSignin";
    var d = document.getElementsByTagName("script")[0];
    d.parentNode.insertBefore(c, d);
} ]);