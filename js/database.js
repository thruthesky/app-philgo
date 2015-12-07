/**
 * ============================= DATABASE FUNCTIONS =========================
 */
/**
 *
 * @type {db}
 *
 *
 * @code
 *
 db.set('title', 'This is test');
 console.log( db.get('title') );
 console.log( db.getRecord('title') );
 db.set('title', 'Test 2');
 console.log( db.getRecord('title') );
 console.log( db.get('No Key') == null );
 console.log( db.getRecord('No Key') );
 * @endcode
 *
 */
var  db = new function() {
    this.type = 'WebStorage';
    this.author = 'JaeHo Song';
    this.email = 'thruthesky@gmail.com';

    /**
     *
     *
     * @returns {string}
     *
     *
     * @code
     * alert ( this.info() );
     * @endcode
     */
    this.info = function() {
        return this.type + ' ' + this.author + ' ' + this.email;
    };

    this.set = function ( key, value ) {
        localStorage.setItem(key, value);
    };

    this.get = function ( key ) {
        return localStorage.getItem(key);
    };

    this.getRecord = function ( key ) {
        return {
            'key' : key,
            'value' : localStorage.getItem(key),
            'stamp' : localStorage.getItem(key + '.stamp')
        }
    };

    this.save = function( key, value ) {
        db.set(key, value);
        db.set(key + '.length', value.length);
        db.set(key + '.stamp', new Date().getTime());
    };

    /**
     * @short Check if the web storage is availble.
     */

    if ( typeof(Storage) === "undefined") {
        alert("Fatal Error : Web Storage is not supported in this web/app/platform");
    }

};

