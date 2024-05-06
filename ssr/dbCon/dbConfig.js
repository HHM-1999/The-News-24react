const util = require( 'util' );
const mysql = require( 'mysql' );

require('dotenv').config();

const dbUser = process.env.REACT_APP_DB_USER
const dbPass = process.env.REACT_APP_DB_PASS

function bnConfig() {
    const dbConn = mysql.createConnection( {
        host: 'localhost',
        port: 3306,
        user: dbUser,
        password: dbPass,
        database: 'thenews24_content_db',
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
        user: dbUser,
        password: dbPass,
        database: 'thenews24_media_db',
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
        user: dbUser,
        password: dbPass,
        database: 'thenews24_general_db',
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