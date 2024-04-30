const util = require( 'util' );
const mysql = require( 'mysql' );

// var dbConn = mysql.createConnection({
//     host: 'localhost',
//     port: 3306,
//     user: 'root',
//     password: '',
//     // user: 'ekhondbusr',
//     // password: 'rU^N&4$2?p_Me',
//     database: 'ekhontv_content_db',
//     // insecureAuth: true,
//     multipleStatements: true
// });

// var dbConnMedia = mysql.createConnection({
//     host: 'localhost',
//     port: 3306,
//     user: 'root',
//     password: '',
//     // user: 'ekhondbusr',
//     // password: 'rU^N&4$2?p_Me',
//     database: 'ekhontv_media_db',
//     // insecureAuth: true,
//     multipleStatements: true
// });

// // =========datebase connection=======
// dbConn.connect();
// dbConnMedia.connect();


function bnConfig() {
    const dbConn = mysql.createConnection( {
        host: 'localhost',
        port: 3306,
        user: 'root',
        password: '',
        // user: 'ekhondbusr',
        // password: 'rU^N&4$2?p_Me',
        database: 'ekhontv_content_db',
        // insecureAuth: true,
        multipleStatements: true
    } );
    return {
        query( sql, args ) {
        return util.promisify( dbConn.query )
            .call( dbConn, sql, args );
        },
        close() {
        return util.promisify( dbConn.end ).call( dbConn );
        }
    };
}

function mediaConfig() {
    const dbConnMedia = mysql.createConnection( {
        host: 'localhost',
        port: 3306,
        user: 'root',
        password: '',
        // user: 'ekhondbusr',
        // password: 'rU^N&4$2?p_Me',
        database: 'ekhontv_media_db',
        // insecureAuth: true,
        multipleStatements: true
    } );
    return {
        query( sql, args ) {
        return util.promisify( dbConnMedia.query )
            .call( dbConnMedia, sql, args );
        },
        close() {
        return util.promisify( dbConnMedia.end ).call( dbConnMedia );
        }
    };
}

function genConfig() {
    const dbConnGeneral = mysql.createConnection( {
        host: 'localhost',
        port: 3306,
        user: 'root',
        password: '',
        // user: 'ekhondbusr',
        // password: 'rU^N&4$2?p_Me',
        database: 'ekhontv_general_db',
        // insecureAuth: true,
        multipleStatements: true
    } );
    return {
        query( sql, args ) {
        return util.promisify( dbConnGeneral.query )
            .call( dbConnGeneral, sql, args );
        },
        close() {
        return util.promisify( dbConnGeneral.end ).call( dbConnGeneral );
        }
    };
}

module.exports = { bnConfig, mediaConfig, genConfig };