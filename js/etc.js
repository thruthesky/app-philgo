/**
 * -------------------------- ETC Function, Helper functions
 */


var etc = {
    /**
     * Unique 32 bytes.
     * @param id
     * @returns {string}
     */
    unique_id : function (id) {
        var uid='';
        if ( id ) uid = id;
        var date_string = (new Date()).getTime().toString().substring(6);
        uid = uid + date_string;
        if ( uid.length > 32 ) {
            uid = uid.substring(0, 31);
        }
        else {
            var more_length = 32 - uid.length - 1;
            var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
            var random = _.sample(possible, more_length).join('');
            uid = uid + random;
        }
        return uid;
    },

    /**
     * @todo need to test this code.
     * @param timestamp
     * @returns {*}
     */
    humanTime : function (timestamp) {
        function numberEnding (number) {
            return (number > 1) ? 's' : '';
        }
        var years = Math.floor(timestamp / 31536000);
        if (years) {
            return years + ' year' + numberEnding(years);
        }
        var days = Math.floor((timestamp %= 31536000) / 86400);
        if (days) {
            return days + ' day' + numberEnding(days);
        }
        var hours = Math.floor((timestamp %= 86400) / 3600);
        if (hours) {
            return hours + ' hour' + numberEnding(hours);
        }
        var minutes = Math.floor((timestamp %= 3600) / 60);
        if (minutes) {
            return minutes + ' minute' + numberEnding(minutes);
        }
        var seconds = timestamp % 60;
        if (seconds) {
            return seconds + ' second' + numberEnding(seconds);
        }
        return 'just now'; //'just now' //or other string you like;
    },
    date_full : function ( stamp ) {

        var date = new Date(stamp * 1000);
        var year    = date.getFullYear();
        var month   = date.getMonth();
        var day     = date.getDate();
        var hour    = date.getHours();
        var minute  = date.getMinutes();
        var seconds = date.getSeconds();

        return date + '-' + year + '-' + ( month + 1 ) + ' ' + hour + ':' + minute;
    },
    date_short : function ( stamp ) {
        var date = new Date(stamp * 1000);
        var year    = date.getFullYear();
        var month   = date.getMonth();
        var day     = date.getDate();
        var hour    = date.getHours();
        var minute  = date.getMinutes();
        var seconds = date.getSeconds();

        var today = new Date();
        if ( today.getFullYear() == year && today.getMonth() == month && today.getDate() == day ) {

            var h = hour % 12 || 12;
            var ap;
            if ( hour > 12 ) ap = 'pm';
            else ap = 'am';

            if ( h < 10 ) h = '0' + h;
            if ( minute < 10 ) minute = '0' + minute;
            return h + ':' + minute + ' ' + ap;
        }
        else {
            return year + '-' + ( month + 1) + '-' + day;
        }
    }
};
