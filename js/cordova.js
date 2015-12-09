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
    return true;
}
function isOffline() {
    return ! isOnline();
}