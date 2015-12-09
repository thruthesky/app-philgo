/**
 * @file cordova.js
 *
 * @short Cordova related functions
 */

/**
 *
 * @returns {boolean}
 */
function isOnline() {
    return false;
}
function isOffline() {
    return ! isOnline();
}