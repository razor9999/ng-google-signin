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
    this.setClientId = function(b) {
        a.client_id = b;
        return this;
    };
    this.getClientId = function() {
        return a.client_id;
    };
    this.setCookiePolicy = function(b) {
        a.cookie_policiy = b;
        return this;
    };
    this.getCookiePolicy = function() {
        return a.cookie_policiy;
    };
    this.setFetchBasicProfile = function(b) {
        a.fetch_basic_profile = b;
        return this;
    };
    this.getFetchBasicProfile = function() {
        return a.fetch_basic_profile;
    };
    this.setHostedDomain = function(b) {
        a.hosted_domain = b;
        return this;
    };
    this.getHostedDomain = function() {
        return a.hosted_domain;
    };
    this.setOpenIDRealm = function(b) {
        a.openid_realm = b;
        return this;
    };
    this.getOpenIDRealm = function() {
        return a.openid_realm;
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
    /**
     * This defines the Google SignIn Service on run.
     */
    this.$get = [ "$rootScope", function(b) {
        var c;
        /**
       * NgGoogle Class
       * Wraps most of the functionality of the Google Sign-In JavaScript
       * SDK found at
       * https://developers.google.com/identity/sign-in/web/reference
       * @type {Class}
       */
        var d = function() {};
        d.prototype.signIn = function(a) {
            return c.signIn(a);
        };
        d.prototype.signOut = function() {
            return c.signOut();
        };
        d.prototype.grantOfflineAccess = function(a) {
            return c.grantOfflineAccess(a);
        };
        d.prototype.isSignedIn = function() {
            return c.isSignIn.get();
        };
        d.prototype.getUser = function() {
            return c.currentUser.get();
        };
        d.prototype.getBasicProfile = function() {
            var a = this.getUser().getBasicProfile();
            var b = null;
            if (a) {
                b = {
                    id: a.getId(),
                    name: a.getName(),
                    image: a.getImageUrl(),
                    email: a.getEmail()
                };
            }
            return b;
        };
        d.prototype.disconnect = function() {
            c.disconnect();
        };
        /**
       * This callback handles the onload callback for the GAPI lib
       * @private
       */
        d.prototype._loadCallback = function() {
            gapi.load("auth2", e);
        };
        return new d();
        function e() {
            c = gapi.auth2.init(a);
            c.currentUser.listen(function(a) {
                b.$broadcast("angular-google-signin:currentUser", a);
                b.$apply();
            });
            c.isSignedIn.listen(function(a) {
                b.$broadcast("angular-google-signin:isSignedIn", a);
                b.$apply();
            });
        }
    } ];
} ]).run([ "$window", "GoogleSignin", function(a, b) {
    // This needs to be on the window for the callback
    a._startGoogleSignin = b._loadCallback;
    var c = document.createElement("script");
    c.type = "text/javascript";
    c.async = true;
    c.src = "https://apis.google.com/js/client:platform.js?onload=_startGoogleSignin";
    var d = document.getElementsByTagName("script")[0];
    d.parentNode.insertBefore(c, d);
} ]);