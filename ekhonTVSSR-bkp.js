'use strict';

var express = require('express');
var fs = require('fs');
var path = require("path");

var app = express();
var bodyParser = require('body-parser');

var mysql = require('mysql');

const cors = require('cors');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));
// Parse URL-encoded bodies (as sent by HTML forms)
app.use(express.urlencoded({
    extended: false
}));

// Parse JSON bodies (as sent by API clients)
app.use(express.json());


app.use(cors());

app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Credentials', true);
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
    next();
});


var http = require('http');
// var https = require('https');

// var privateKey = fs.readFileSync('/mnt/volume_sgp1_05/ba4ng5lato5w2er/ssl.key', 'utf8');
// var certificate = fs.readFileSync('/mnt/volume_sgp1_05/ba4ng5lato5w2er/ssl.cert', 'utf8');

// var credentials = { key: privateKey, cert: certificate };

var httpServer = http.createServer(app);
// var httpsServer = https.createServer(credentials, app);

var dbConn = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    // user: 'root',
    // password: '',
    user: 'ekhondbusr',
    password: 'rU^N&4$2?p_Me',
    database: 'ekhontv_content_db',
    // insecureAuth: true,
    multipleStatements: true
});

var dbConnMedia = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    // user: 'root',
    // password: '',
    user: 'ekhondbusr',
    password: 'rU^N&4$2?p_Me',
    database: 'ekhontv_media_db',
    // insecureAuth: true,
    multipleStatements: true
});

// =========datebase connection=======
dbConn.connect();
dbConnMedia.connect();

// var FEndUrl = "https://www.ekhon.tv/";
var BEndUrl = "https://api.karikori.com/";

// app.enable('trust proxy')

// app.use(function (request, response, next) {
//     if (request.secure && request.headers.host.slice(0, 4) !== "www.") {
//         var newHost = "www." + request.headers.host;
//         return response.redirect(301, request.protocol + "://" + newHost + request.originalUrl);
//     }
//     else if (!request.secure && request.headers.host.slice(0, 4) !== "www.") {
//         var newHost = "www." + request.headers.host;
//         return response.redirect(301, "https://" + newHost + request.url);
//     }
//     else if (!request.secure && request.headers.host.slice(0, 4) === "www.") {
//         return response.redirect(301, "https://" + request.headers.host + request.url);
//     }
//     next();
// }) // auto redirect to www.


app.get('/', function (request, response) {
    console.log('Home page visited!');
    const filePath = path.resolve(__dirname, './build', 'index.html');
    fs.readFile(filePath, 'utf8', function (err, data) {
        if (err) {
            return console.log(err);
        }
        data = data.replace(/\$OG_ROBOTS/g, `index, follow`);
        data = data.replace(/\$OG_TITLE/g, 'Ekhon TV :: এখন টিভি');
        data = data.replace(/\$OG_DESCRIPTION/g, "Ekhon TV is an online news portal of Bangladesh. It was established in 2017 with the commitment to publish objective and information-based news.");
        data = data.replace(/\$OG_KEYWORDS/g, "এখন টিভি,অনলাইন পত্রিকা, পত্রিকা, বাংলাদেশ পত্রিকা, আজকের পত্রিকা, দেশে এখন, বাজার, কাচা বাজার, মুদ্রা বাজার, শেয়ার বাজার, আন্তর্জাতিক বাজার, ক্রিপ্টো, বিদেশে এখন, ক্রিকেট, ফুটবল, এখন মাঠে, এখন আনন্দ, সিনেমা, নাটক, তথ্য প্রযুক্তি, নাগরিক সাংবাদিকতা, পাঠকের কথা, চলতি হাওয়া, পরিবেশ, আবহাওয়া, উদ্যোক্তা");
        data = data.replace(/\$OG_IMAGE/g, `${BEndUrl}media/common/logo-fb.png`);
        var fullUrl = request.protocol + '://' + request.hostname + request.originalUrl;
        // var fullUrl = request.get('x-forwarded-proto') + '://' + request.get('X-Forwarded-Host') + (request.originalUrl).replace(/\/+$/, '');
        data = data.replace(/\$OG_URL/g, `${fullUrl}`);
        response.send(data);
    });
});

app.get('/photo-feature', function (request, response) {
    console.log('live page visited!');
    const filePath = path.resolve(__dirname, './build', 'index.html');
    fs.readFile(filePath, 'utf8', function (err, data) {
        if (err) {
            return console.log(err);
        }
        data = data.replace(/\$OG_ROBOTS/g, `index, follow`);
        data = data.replace(/\$OG_TITLE/g, 'ছবিঘর | ছবিঘর সর্বশেষ খবর :: এখন টিভি');
        data = data.replace(/\$OG_DESCRIPTION/g, "Ekhon TV is an online news portal of Bangladesh. It was established in 2017 with the commitment to publish objective and information-based news.");
        data = data.replace(/\$OG_KEYWORDS/g, "এখন টিভি,অনলাইন পত্রিকা, পত্রিকা, বাংলাদেশ পত্রিকা, আজকের পত্রিকা, দেশে এখন, বাজার, কাচা বাজার, মুদ্রা বাজার, শেয়ার বাজার, আন্তর্জাতিক বাজার, ক্রিপ্টো, বিদেশে এখন, ক্রিকেট, ফুটবল, এখন মাঠে, এখন আনন্দ, সিনেমা, নাটক, তথ্য প্রযুক্তি, নাগরিক সাংবাদিকতা, পাঠকের কথা, চলতি হাওয়া, পরিবেশ, আবহাওয়া, উদ্যোক্তা");
        data = data.replace(/\$OG_IMAGE/g, `${BEndUrl}media/common/logo-fb.png`);
        var fullUrl = request.protocol + '://' + request.hostname + (request.originalUrl).replace(/\/+$/, '');
        // var fullUrl = request.get('x-forwarded-proto') + '://' + request.get('X-Forwarded-Host') + (request.originalUrl).replace(/\/+$/, '');
        data = data.replace(/\$OG_URL/g, `${fullUrl}`);
        response.send(data);
    });
});

app.get('/live', function (request, response) {
    console.log('live page visited!');
    const filePath = path.resolve(__dirname, './build', 'index.html');
    fs.readFile(filePath, 'utf8', function (err, data) {
        if (err) {
            return console.log(err);
        }
        data = data.replace(/\$OG_ROBOTS/g, `index, follow`);
        data = data.replace(/\$OG_TITLE/g, 'এখন টিভি :: লাইভ');
        data = data.replace(/\$OG_DESCRIPTION/g, "Ekhon TV is an online news portal of Bangladesh. It was established in 2017 with the commitment to publish objective and information-based news.");
        data = data.replace(/\$OG_KEYWORDS/g, "এখন টিভি,অনলাইন পত্রিকা, পত্রিকা, বাংলাদেশ পত্রিকা, আজকের পত্রিকা, দেশে এখন, বাজার, কাচা বাজার, মুদ্রা বাজার, শেয়ার বাজার, আন্তর্জাতিক বাজার, ক্রিপ্টো, বিদেশে এখন, ক্রিকেট, ফুটবল, এখন মাঠে, এখন আনন্দ, সিনেমা, নাটক, তথ্য প্রযুক্তি, নাগরিক সাংবাদিকতা, পাঠকের কথা, চলতি হাওয়া, পরিবেশ, আবহাওয়া, উদ্যোক্তা");
        data = data.replace(/\$OG_IMAGE/g, `${BEndUrl}media/common/logo-fb.png`);
        var fullUrl = request.protocol + '://' + request.hostname + (request.originalUrl).replace(/\/+$/, '');
        // var fullUrl = request.get('x-forwarded-proto') + '://' + request.get('X-Forwarded-Host') + (request.originalUrl).replace(/\/+$/, '');
        data = data.replace(/\$OG_URL/g, `${fullUrl}`);
        response.send(data);
    });
});

app.get('/pollresult', function (request, response) {
    console.log('poll result page visited!');
    const filePath = path.resolve(__dirname, './build', 'index.html');
    fs.readFile(filePath, 'utf8', function (err, data) {
        if (err) {
            return console.log(err);
        }
        data = data.replace(/\$OG_ROBOTS/g, `index, follow`);
        data = data.replace(/\$OG_TITLE/g, 'এখন টিভি :: অনলাইন জরিপ');
        data = data.replace(/\$OG_DESCRIPTION/g, "Ekhon TV is an online news portal of Bangladesh. It was established in 2017 with the commitment to publish objective and information-based news.");
        data = data.replace(/\$OG_KEYWORDS/g, "এখন টিভি,অনলাইন পত্রিকা, পত্রিকা, বাংলাদেশ পত্রিকা, আজকের পত্রিকা, দেশে এখন, বাজার, কাচা বাজার, মুদ্রা বাজার, শেয়ার বাজার, আন্তর্জাতিক বাজার, ক্রিপ্টো, বিদেশে এখন, ক্রিকেট, ফুটবল, এখন মাঠে, এখন আনন্দ, সিনেমা, নাটক, তথ্য প্রযুক্তি, নাগরিক সাংবাদিকতা, পাঠকের কথা, চলতি হাওয়া, পরিবেশ, আবহাওয়া, উদ্যোক্তা");
        data = data.replace(/\$OG_IMAGE/g, `${BEndUrl}media/common/logo-fb.png`);
        var fullUrl = request.protocol + '://' + request.hostname + (request.originalUrl).replace(/\/+$/, '');
        // var fullUrl = request.get('x-forwarded-proto') + '://' + request.get('X-Forwarded-Host') + (request.originalUrl).replace(/\/+$/, '');
        data = data.replace(/\$OG_URL/g, `${fullUrl}`);
        response.send(data);
    });
});

app.get('/all_tags', function (request, response) {
    console.log('all_tags page visited!');
    const filePath = path.resolve(__dirname, './build', 'index.html');
    fs.readFile(filePath, 'utf8', function (err, data) {
        if (err) {
            return console.log(err);
        }
        data = data.replace(/\$OG_ROBOTS/g, `index, follow`);
        data = data.replace(/\$OG_TITLE/g, 'এখন টিভি :: ট্যাগ সমূহ');
        data = data.replace(/\$OG_DESCRIPTION/g, "Ekhon TV is an online news portal of Bangladesh. It was established in 2017 with the commitment to publish objective and information-based news.");
        data = data.replace(/\$OG_KEYWORDS/g, "এখন টিভি,অনলাইন পত্রিকা, পত্রিকা, বাংলাদেশ পত্রিকা, আজকের পত্রিকা, দেশে এখন, বাজার, কাচা বাজার, মুদ্রা বাজার, শেয়ার বাজার, আন্তর্জাতিক বাজার, ক্রিপ্টো, বিদেশে এখন, ক্রিকেট, ফুটবল, এখন মাঠে, এখন আনন্দ, সিনেমা, নাটক, তথ্য প্রযুক্তি, নাগরিক সাংবাদিকতা, পাঠকের কথা, চলতি হাওয়া, পরিবেশ, আবহাওয়া, উদ্যোক্তা");
        data = data.replace(/\$OG_IMAGE/g, `${BEndUrl}media/common/logo-fb.png`);
        var fullUrl = request.protocol + '://' + request.hostname + (request.originalUrl).replace(/\/+$/, '');
        // var fullUrl = request.get('x-forwarded-proto') + '://' + request.get('X-Forwarded-Host') + (request.originalUrl).replace(/\/+$/, '');
        data = data.replace(/\$OG_URL/g, `${fullUrl}`);
        response.send(data);
    });
});

app.get('/all_writers', function (request, response) {
    console.log('all_writers page visited!');
    const filePath = path.resolve(__dirname, './build', 'index.html');
    fs.readFile(filePath, 'utf8', function (err, data) {
        if (err) {
            return console.log(err);
        }
        data = data.replace(/\$OG_ROBOTS/g, `index, follow`);
        data = data.replace(/\$OG_TITLE/g, 'এখন টিভি :: লেখক সমূহ');
        data = data.replace(/\$OG_DESCRIPTION/g, "Ekhon TV is an online news portal of Bangladesh. It was established in 2017 with the commitment to publish objective and information-based news.");
        data = data.replace(/\$OG_KEYWORDS/g, "এখন টিভি,অনলাইন পত্রিকা, পত্রিকা, বাংলাদেশ পত্রিকা, আজকের পত্রিকা, দেশে এখন, বাজার, কাচা বাজার, মুদ্রা বাজার, শেয়ার বাজার, আন্তর্জাতিক বাজার, ক্রিপ্টো, বিদেশে এখন, ক্রিকেট, ফুটবল, এখন মাঠে, এখন আনন্দ, সিনেমা, নাটক, তথ্য প্রযুক্তি, নাগরিক সাংবাদিকতা, পাঠকের কথা, চলতি হাওয়া, পরিবেশ, আবহাওয়া, উদ্যোক্তা");
        data = data.replace(/\$OG_IMAGE/g, `${BEndUrl}media/common/logo-fb.png`);
        var fullUrl = request.protocol + '://' + request.hostname + (request.originalUrl).replace(/\/+$/, '');
        // var fullUrl = request.get('x-forwarded-proto') + '://' + request.get('X-Forwarded-Host') + (request.originalUrl).replace(/\/+$/, '');
        data = data.replace(/\$OG_URL/g, `${fullUrl}`);
        response.send(data);
    });
});

app.get('/archives', function (request, response) {
    console.log('archive page visited!');
    const filePath = path.resolve(__dirname, './build', 'index.html');
    fs.readFile(filePath, 'utf8', function (err, data) {
        if (err) {
            return console.log(err);
        }
        data = data.replace(/\$OG_ROBOTS/g, `index, follow`);
        data = data.replace(/\$OG_TITLE/g, 'এখন টিভি :: আর্কাইভস');
        data = data.replace(/\$OG_DESCRIPTION/g, "Ekhon TV is an online news portal of Bangladesh. It was established in 2017 with the commitment to publish objective and information-based news.");
        data = data.replace(/\$OG_KEYWORDS/g, "এখন টিভি,অনলাইন পত্রিকা, পত্রিকা, বাংলাদেশ পত্রিকা, আজকের পত্রিকা, দেশে এখন, বাজার, কাচা বাজার, মুদ্রা বাজার, শেয়ার বাজার, আন্তর্জাতিক বাজার, ক্রিপ্টো, বিদেশে এখন, ক্রিকেট, ফুটবল, এখন মাঠে, এখন আনন্দ, সিনেমা, নাটক, তথ্য প্রযুক্তি, নাগরিক সাংবাদিকতা, পাঠকের কথা, চলতি হাওয়া, পরিবেশ, আবহাওয়া, উদ্যোক্তা");
        data = data.replace(/\$OG_IMAGE/g, `${BEndUrl}media/common/logo-fb.png`);
        var fullUrl = request.protocol + '://' + request.hostname + (request.originalUrl).replace(/\/+$/, '');
        // var fullUrl = request.get('x-forwarded-proto') + '://' + request.get('X-Forwarded-Host') + (request.originalUrl).replace(/\/+$/, '');
        data = data.replace(/\$OG_URL/g, `${fullUrl}`);
        response.send(data);
    });
});

app.get('/video', function (request, response) {
    console.log('video-gallery page visited!');
    const filePath = path.resolve(__dirname, './build', 'index.html');
    fs.readFile(filePath, 'utf8', function (err, data) {
        if (err) {
            return console.log(err);
        }
        data = data.replace(/\$OG_ROBOTS/g, `index, follow`);
        data = data.replace(/\$OG_TITLE/g, 'এখন টিভি :: ভিডিও গ্যালারী');
        data = data.replace(/\$OG_DESCRIPTION/g, "Ekhon TV is an online news portal of Bangladesh. It was established in 2017 with the commitment to publish objective and information-based news.");
        data = data.replace(/\$OG_KEYWORDS/g, "এখন টিভি,অনলাইন পত্রিকা, পত্রিকা, বাংলাদেশ পত্রিকা, আজকের পত্রিকা, দেশে এখন, বাজার, কাচা বাজার, মুদ্রা বাজার, শেয়ার বাজার, আন্তর্জাতিক বাজার, ক্রিপ্টো, বিদেশে এখন, ক্রিকেট, ফুটবল, এখন মাঠে, এখন আনন্দ, সিনেমা, নাটক, তথ্য প্রযুক্তি, নাগরিক সাংবাদিকতা, পাঠকের কথা, চলতি হাওয়া, পরিবেশ, আবহাওয়া, উদ্যোক্তা");
        data = data.replace(/\$OG_IMAGE/g, `${BEndUrl}media/common/logo-fb.png`);
        var fullUrl = request.protocol + '://' + request.hostname + (request.originalUrl).replace(/\/+$/, '');
        // var fullUrl = request.get('x-forwarded-proto') + '://' + request.get('X-Forwarded-Host') + (request.originalUrl).replace(/\/+$/, '');
        data = data.replace(/\$OG_URL/g, `${fullUrl}`);
        response.send(data);
    });
});

app.get('/sitemap/static-sitemap.xml', function (request, response) {
    response.setHeader('Content-Type', 'application/xml');
    console.log('static-sitemap.xml visited!');
    const filePath = path.resolve(__dirname, './sitemap', 'sitemap.xml');

    fs.readFile(filePath, 'utf8', function (err, data) {
        if (err) {
            return console.log(err);
        }
        response.send(data);
    });
});

app.get('/sitemap/category-sitemap.xml', function (request, response) {
    response.setHeader('Content-Type', 'application/xml');
    console.log('sitemap/category-sitemap.xml visited!');
    let sql = `SELECT CategoryID, ParentID, CategoryName, Slug, created_at, updated_at FROM bn_bas_categories WHERE ShowData=1 AND Deletable=1 ORDER BY CategoryID ASC;`;
    // console.log(sql);
    dbConn.query(sql, function (error, result) {
        let xml = `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`
        let cats = []
        if (result && result.length > 0) {
            for (let i = 0; i < result.length; i++) {
                cats[result[i].CategoryID] = result[i].Slug
                let lastmoddate = '';
                if (result[i].updated_at) {
                    lastmoddate = result[i].updated_at;
                } else {
                    lastmoddate = result[i].created_at;
                }
                let moddate = new Date(lastmoddate)

                xml += `<url>
                    <loc>https://www.ekhon.tv/${result[i].ParentID==0 ? result[i].Slug : cats[result[i].ParentID]+'/sub/'+result[i].Slug}</loc>
                    <lastmod>${moddate.toISOString()}</lastmod>
                    <changefreq>hourly</changefreq> 
                    <priority>0.80</priority>
                </url>`

                if (i == result.length - 1) {
                    xml += `</urlset>`;
                    response.send(xml);
                }
            }
        }else{
            response.send('');
        }
    });
});

app.get('/sitemap/topic-sitemap.xml', function (request, response) {
    response.setHeader('Content-Type', 'application/xml');
    console.log('sitemap/topic-sitemap.xml visited!');
    let sql = `SELECT TagID, TagName, Slug, created_at, updated_at FROM bn_tags WHERE TagActive=1 AND Deletable=1;`;
    // console.log(sql);
    dbConn.query(sql, function (error, result) {
        let xml = `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`
        if (result && result.length > 0) {
            for (let i = 0; i < result.length; i++) {
                let lastmoddate = '';
                if (result[i].updated_at) {
                    lastmoddate = result[i].updated_at;
                } else {
                    lastmoddate = result[i].created_at;
                }
                let moddate = new Date(lastmoddate)

                xml += `<url>
                    <loc>https://www.ekhon.tv/tags/${encodeURI(result[i].TagName)}</loc>
                    <lastmod>${moddate.toISOString()}</lastmod>
                    <changefreq>hourly</changefreq> 
                    <priority>0.80</priority>
                </url>`

                if (i == result.length - 1) {
                    xml += `</urlset>`;
                    response.send(xml);
                }
            }
        }else{
            response.send('');
        }
    });
});

app.get('/robots.txt', function (request, response) {
    response.setHeader('Content-Type', 'text/plain');
    console.log('robots.txt visited!');

    let xml = `User-agent: *\nAllow: /\n\nSitemap: https://www.ekhon.tv/sitemap/static-sitemap.xml\nSitemap: https://www.ekhon.tv/sitemap/category-sitemap.xml\nSitemap: https://www.ekhon.tv/sitemap/topic-sitemap.xml\nSitemap: https://www.ekhon.tv/sitemap-index.xml\nSitemap: https://www.ekhon.tv/sitemap-all.xml\n`
    var todate = new Date()
    xml += `Sitemap: https://www.ekhon.tv/sitemap/sitemap-daily-${todate.getFullYear()}-${todate.getMonth() < 9 ? '0' + (todate.getMonth() + 1) : todate.getMonth() + 1}-${todate.getDate() < 10 ? '0' + todate.getDate() : todate.getDate()}.xml\n`
    todate.setHours(23, 59, 59, 999)
    for (let i = 0; i < 30; i++) {
        todate.setDate(todate.getDate() - 1)
        xml += `Sitemap: https://www.ekhon.tv/sitemap/sitemap-daily-${todate.getFullYear()}-${todate.getMonth() < 9 ? '0' + (todate.getMonth() + 1) : todate.getMonth() + 1}-${todate.getDate() < 10 ? '0' + todate.getDate() : todate.getDate()}.xml\n`
    }
    // for (let i = 0; i < 27; i++) {
        xml += `Sitemap: https://www.ekhon.tv/sitemap-bn/sitemap-bn-1.xml\n`
    // }
    xml += `Sitemap: https://www.ekhon.tv/news-sitemap.xml\nSitemap: https://www.ekhon.tv/sitemap-photo/sitemap-photo-1.xml\nSitemap: https://www.ekhon.tv/sitemap-video/sitemap-video-1.xml\n`
    response.send(xml);
});

app.get('/sitemap-index.xml', function (request, response) {
    response.setHeader('Content-Type', 'application/xml');
    console.log('sitemap-index.xml visited!');

    let xml = `<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
        <sitemap>
            <loc>https://www.ekhon.tv/sitemap/static-sitemap.xml</loc>
        </sitemap>
        <sitemap>
            <loc>https://www.ekhon.tv/sitemap/category-sitemap.xml</loc>
        </sitemap>
        <sitemap>
            <loc>https://www.ekhon.tv/sitemap/topic-sitemap.xml</loc>
        </sitemap>`
    var todate = new Date()
    xml += `<sitemap>
        <loc>https://www.ekhon.tv/sitemap/sitemap-daily-${todate.getFullYear()}-${todate.getMonth() < 9 ? '0' + (todate.getMonth() + 1) : todate.getMonth() + 1}-${todate.getDate() < 10 ? '0' + todate.getDate() : todate.getDate()}.xml</loc>
        <lastmod>${todate.toISOString()}</lastmod>
    </sitemap>`
    todate.setHours(23, 59, 59, 999)
    for (let i = 0; i < 30; i++) {
        todate.setDate(todate.getDate() - 1)
        xml += `<sitemap>
            <loc>https://www.ekhon.tv/sitemap/sitemap-daily-${todate.getFullYear()}-${todate.getMonth() < 9 ? '0' + (todate.getMonth() + 1) : todate.getMonth() + 1}-${todate.getDate() < 10 ? '0' + todate.getDate() : todate.getDate()}.xml</loc>
            <lastmod>${todate.toISOString()}</lastmod>
        </sitemap>`
    }
    xml += `</sitemapindex>`;
    response.send(xml);
});

app.get('/sitemap-all.xml', function (request, response) {
    response.setHeader('Content-Type', 'application/xml');
    console.log('sitemap-archives.xml visited!');

    let xml = `<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`
    var todate = new Date()
    // for (let i = 0; i < 1; i++) {
        xml += `<sitemap>
            <loc>https://www.ekhon.tv/sitemap-bn/sitemap-bn-1.xml</loc>
            <lastmod>${todate.toISOString()}</lastmod>
        </sitemap>`
    // }
    xml += `<sitemap>
        <loc>https://www.ekhon.tv/sitemap-photo/sitemap-photo-1.xml</loc>
        <lastmod>${todate.toISOString()}</lastmod>
    </sitemap>`
    xml += `<sitemap>
        <loc>https://www.ekhon.tv/sitemap-video/sitemap-video-1.xml</loc>
        <lastmod>${todate.toISOString()}</lastmod>
    </sitemap>
    </sitemapindex>`;
    response.send(xml);
});

app.get('/sitemap-bn/:sitemap', function (request, response) {
    let sitemap = request.params.sitemap
    console.log(`sitemap-bn/${sitemap} visited!`);
    if (!sitemap || !sitemap.includes("sitemap-bn-")) {
        return response.send({ error: true, message: 'Invalid Sitemap Request' });
    }
    let c = sitemap.replace('sitemap-bn-', '').replace('.xml', '')
    let offset = '';

    if (c > 0) {
        offset = ` OFFSET ${((c - 1) / 2) * 10}000 `;
    } else {
        return response.send({ error: true, message: 'Invalid Sitemap Request' });
    }

    response.setHeader('Content-Type', 'application/xml');

    let sql = `SELECT bn_contents.ContentID, bn_contents.ContentHeading, bn_contents.ImageSmPath, bn_contents.ImageBgPath, bn_contents.ImageBgPathCaption, bn_contents.created_at, bn_contents.updated_at, DATE_FORMAT(bn_contents.created_at, "%Y-%m-%d") as fcreated_at, DATE_FORMAT(bn_contents.updated_at, "%Y-%m-%d") as fupdated_at, bn_bas_categories.Slug FROM bn_contents INNER JOIN bn_bas_categories ON bn_contents.CategoryIDs=bn_bas_categories.CategoryID WHERE bn_contents.Deletable=1 AND bn_contents.ShowContent=1 ORDER BY bn_contents.ContentID ASC LIMIT 5000 ${offset}`;
    // response.send(sql);
    dbConn.query(sql, function (error, result) {
        if (result && result.length > 0) {
            let xml = `<urlset xmlns:image="http://www.google.com/schemas/sitemap-image/1.1" xmlns:video="http://www.google.com/schemas/sitemap-video/1.1" xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`;
            for (let i = 0; i < result.length; i++) {
                let lastmoddate = '';
                if (result[i].updated_at && result[i].updated_at != '0000-00-00 00:00:00') {
                    lastmoddate = result[i].updated_at;
                } else {
                    lastmoddate = result[i].created_at;
                }
                let moddate = new Date(lastmoddate)
                xml += `<url>
                <loc>https://www.ekhon.tv/${result[i].Slug}/news/${result[i].ContentID}</loc>
                    <image:image>
                        <image:loc>${result[i].ImageBgPath ? BEndUrl+'media/imgAll/' + (result[i].ImageBgPath).replace(/&/g, "%26") : (result[i].ImageSmPath ? BEndUrl+'media/imgAll/' + (result[i].ImageSmPath).replace(/&/g, "%26") : BEndUrl+'media/common/logo-fb.png')}</image:loc>
                        <image:caption>
                                <![CDATA[ ${result[i].ImageBgPathCaption ? (result[i].ImageBgPathCaption).replace(/&/g, "&amp;") : (result[i].ContentHeading).replace(/&lsquo;/g, "").replace(/&rsquo;/g, "").replace(/&/g, "&amp;")} ]]>
                            </image:caption>
                    </image:image>
                    <lastmod>${moddate.toISOString()}</lastmod>
                </url>`

                if (i == result.length - 1) {
                    xml += `</urlset>`;
                    response.send(xml);
                }
            }
        }
        else {
            response.send('');
        }
    })
});

app.get('/sitemap/:dailysitemap', function (request, response) {
    console.log('sitemap/dailysitemap visited!');
    let dailysitemap = request.params.dailysitemap
    if (!dailysitemap || !dailysitemap.includes("sitemap-daily-")) {
        return response.send({ error: true, message: 'Invalid Sitemap Request' });
    }

    let date = dailysitemap.replace('sitemap-daily-', '').replace('.xml', '')
    let datearr = date.split("-")
    let date_ob = new Date(date);
    if (!isNaN(date_ob) && datearr.length === 3 && datearr[0].length === 4 && datearr[1].length === 2 && datearr[2].length === 2) { // d.getTime() or d.valueOf() will also work
        // date object is valid
        response.setHeader('Content-Type', 'application/xml');
        let sql = `SELECT bn_contents.ContentID, bn_contents.ContentHeading, bn_contents.ImageBgPath, bn_contents.ImageBgPathCaption, bn_contents.created_at, bn_contents.updated_at, bn_bas_categories.Slug FROM bn_contents INNER JOIN bn_bas_categories ON bn_contents.CategoryIDs=bn_bas_categories.CategoryID WHERE bn_contents.Deletable=1 AND bn_contents.ShowContent=1 AND DATE(bn_contents.created_at) = '${date}'`;
        // console.log(sql);
        dbConn.query(sql, function (error, result) {
            let xml = `<urlset xmlns:image="http://www.google.com/schemas/sitemap-image/1.1" xmlns:video="http://www.google.com/schemas/sitemap-video/1.1" xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`
            if (result && result.length > 0) {
                for (let i = 0; i < result.length; i++) {
                    let lastmoddate = '';
                    if (result[i].updated_at) {
                        lastmoddate = result[i].updated_at;
                    } else {
                        lastmoddate = result[i].created_at;
                    }
                    let moddate = new Date(lastmoddate)

                    xml += `<url>
                        <loc>https://www.ekhon.tv/${result[i].Slug}/news/${result[i].ContentID}</loc>
                        <image:image>
                            <image:loc>${BEndUrl}media/imgAll/${result[i].ImageBgPath}</image:loc>
                            <image:caption>
                                <![CDATA[ ${(result[i].ImageBgPathCaption).replace("&", "&amp;")} ]]>
                            </image:caption>
                        </image:image>
                        <changefreq>hourly</changefreq>
                        <lastmod>${moddate.toISOString()}</lastmod>
                    </url>`
                }
            }
            xml += `</urlset>`;
            response.send(xml);
        });
        // console.log('valid');
        // response.send(xml);
    } else {
        // date object is not valid
        return response.send({ error: true, message: 'Invalid Sitemap Request' });
    }

});

app.get('/news-sitemap.xml', function (request, response) {
    response.setHeader('Content-Type', 'application/xml');
    console.log('news-sitemap.xml visited!');

    let sql = `SELECT bn_contents.ContentID, bn_contents.ContentHeading, DATE_FORMAT(bn_contents.created_at, "%Y-%m-%d") as fcreated_at, DATE_FORMAT(bn_contents.updated_at, "%Y-%m-%d") as fupdated_at, bn_bas_categories.Slug FROM bn_contents INNER JOIN bn_bas_categories ON bn_contents.CategoryIDs=bn_bas_categories.CategoryID WHERE bn_contents.Deletable=1 AND bn_contents.ShowContent=1 ORDER BY bn_contents.ContentID DESC LIMIT 500`;
    dbConn.query(sql, function (error, result) {
        if (result && result.length > 0) {
            let xml = `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:news="http://www.google.com/schemas/sitemap-news/0.9">`;
            for (let i = 0; i < result.length; i++) {
                let date = '';
                if (result[i].fupdated_at) {
                    date = result[i].fupdated_at;
                } else {
                    date = result[i].fcreated_at;
                }
                xml += `<url>
                    <loc>https://www.ekhon.tv/${result[i].Slug}/news/${result[i].ContentID}</loc>
                    <news:news>
                        <news:publication>
                        <news:name>Ekhon TV</news:name>
                        <news:language>bn</news:language>
                        </news:publication>
                        <news:publication_date>${date}</news:publication_date>
                        <news:title>${(result[i].ContentHeading).replace("&", "&amp;")}</news:title>
                    </news:news>
                </url>`

                if (i == result.length - 1) {
                    xml += `</urlset>`;
                    response.send(xml);
                }
            }
        }
        else {
            response.send('');
        }
    })
});

app.get('/sitemap-photo/:sitemap', function (request, response) {
    let sitemap = request.params.sitemap
    console.log(`sitemap-photo/${sitemap} visited!`);
    if (!sitemap || !sitemap.includes("sitemap-photo-")) {
        return response.send({ error: true, message: 'Invalid Sitemap Request' });
    }
    let c = sitemap.replace('sitemap-photo-', '').replace('.xml', '')
    let offset = '';

    if (c > 0) {
        offset = ` OFFSET ${((c - 1) / 2) * 10}000 `;
    } else {
        return response.send({ error: true, message: 'Invalid Sitemap Request' });
    }

    response.setHeader('Content-Type', 'application/xml');

    let sql = `SELECT photo_features.PhotoFeatureID, photo_features.PhotoFeatureTitle, photo_features.ImageSmPath, photo_features.ImageBgPath, photo_features.Caption, photo_features.created_at, photo_features.updated_at, DATE_FORMAT(photo_features.created_at, "%Y-%m-%d") as fcreated_at, DATE_FORMAT(photo_features.updated_at, "%Y-%m-%d") as fupdated_at FROM photo_features WHERE photo_features.Deletable=1 ORDER BY photo_features.PhotoFeatureID ASC LIMIT 5000 ${offset}`;
    // response.send(sql);
    dbConnMedia.query(sql, function (error, result) {
        if (result && result.length > 0) {
            let xml = `<urlset xmlns:image="http://www.google.com/schemas/sitemap-image/1.1" xmlns:video="http://www.google.com/schemas/sitemap-video/1.1" xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`;
            for (let i = 0; i < result.length; i++) {
                let lastmoddate = '';
                if (result[i].updated_at && result[i].updated_at != '0000-00-00 00:00:00') {
                    lastmoddate = result[i].updated_at;
                } else {
                    lastmoddate = result[i].created_at;
                }
                let moddate = new Date(lastmoddate)
                xml += `<url>
                <loc>https://www.ekhon.tv/photo-feature/news/${result[i].PhotoFeatureID}</loc>
                    <image:image>
                        <image:loc>${result[i].ImageBgPath ? BEndUrl+'media/imgAll/' + (result[i].ImageBgPath).replace(/&/g, "%26") : (result[i].ImageSmPath ? BEndUrl+'media/imgAll/' + (result[i].ImageSmPath).replace(/&/g, "%26") : BEndUrl+'media/common/logo-fb.png')}</image:loc>
                        <image:caption>
                                <![CDATA[ ${result[i].Caption ? (result[i].Caption).replace(/&/g, "&amp;") : (result[i].PhotoFeatureTitle).replace(/&lsquo;/g, "").replace(/&rsquo;/g, "").replace(/&/g, "&amp;")} ]]>
                            </image:caption>
                    </image:image>
                    <lastmod>${moddate.toISOString()}</lastmod>
                </url>`

                if (i == result.length - 1) {
                    xml += `</urlset>`;
                    response.send(xml);
                }
            }
        }
        else {
            response.send('');
        }
    })
});

app.get('/sitemap-video/:sitemap', function (request, response) {
    let sitemap = request.params.sitemap
    console.log(`sitemap-video/${sitemap} visited!`);
    if (!sitemap || !sitemap.includes("sitemap-video-")) {
        return response.send({ error: true, message: 'Invalid Sitemap Request' });
    }
    let c = sitemap.replace('sitemap-video-', '').replace('.xml', '')
    let offset = ` OFFSET ${((c - 1) / 2) * 10000} `;

    response.setHeader('Content-Type', 'application/xml');

    let sql = `SELECT WebTVID, WebTVHeading, WebTVType, WebTVLinkCode, SourceType, Remarks, created_at, updated_at FROM tv_webtvs WHERE Deletable=1 ORDER BY WebTVID ASC LIMIT 5000 ${offset}`;
    // response.send(sql);
    dbConnMedia.query(sql, function (error, result) {
        if (result && result.length > 0) {
            let xml = `<?xml version="1.0" encoding="UTF-8"?>
            <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
                    xmlns:video="http://www.google.com/schemas/sitemap-video/1.1">`;
            for (let i = 0; i < result.length; i++) {
                let lastmoddate = '';
                if (result[i].updated_at && result[i].updated_at != '0000-00-00 00:00:00') {
                    lastmoddate = result[i].updated_at;
                } else {
                    lastmoddate = result[i].created_at;
                }
                let moddate = new Date(lastmoddate)
                xml += `<url>
                    <loc>https://www.ekhon.tv/video/show/${result[i].WebTVID}</loc>
                    <video:video>
                    <video:thumbnail_loc>https://img.youtube.com/vi/${result[i].WebTVLinkCode}/0.jpg</video:thumbnail_loc>
                    <video:title><![CDATA[ ${result[i].WebTVHeading} ]]></video:title>
                    <video:description><![CDATA[ ${result[i].Remarks ? result[i].Remarks : result[i].WebTVHeading} ]]></video:description>
                    <video:player_loc>
                        ${result[i].SourceType == 1 ? "https://www.youtube.com/embed/" + result[i].WebTVLinkCode + "?autoplay=1" : result[i].SourceType == 2 ? "https://www.facebook.com/plugins/video.php?href=https%3A%2F%2Fwww.facebook.com%2Ffacebookapp%2Fvideos%2F" + result[i].WebTVLinkCode + "%2F&show_text=0&width=560" : result[i].SourceType == 3 ? "https://player.vimeo.com/video/" + result[i].WebTVLinkCode : ''}
                    </video:player_loc>
                    <video:publication_date>${moddate.toISOString()}</video:publication_date>
                    <video:family_friendly>yes</video:family_friendly>
                    <video:live>${result[i].WebTVType == 2 ? 'yes' : 'no'}</video:live>
                    </video:video>
                </url>`

                if (i == result.length - 1) {
                    xml += `</urlset>`;
                    response.send(xml);
                }
            }
        }
        else {
            response.send('');
        }
    })
});


app.get('/rss/rss.xml', function (request, response) {
    response.setHeader('Content-Type', 'application/xml');
    console.log('rss.xml visited!');

    let date_ob = new Date();
    let weekdayname = ''
    let weekday = date_ob.getDay()
    if (weekday === 0) {
        weekdayname = 'Sun'
    } else if (weekday === 1) {
        weekdayname = 'Mon'
    } else if (weekday === 2) {
        weekdayname = 'Tue'
    } else if (weekday === 3) {
        weekdayname = 'Wed'
    } else if (weekday === 4) {
        weekdayname = 'Thu'
    } else if (weekday === 5) {
        weekdayname = 'Fri'
    } else if (weekday === 6) {
        weekdayname = 'Sat'
    }
    let day = date_ob.getDate()
    let monthname = ''
    let month = date_ob.getMonth()
    if (month === 0) {
        monthname = 'Jan'
    } else if (month === 1) {
        monthname = 'Feb'
    } else if (month === 2) {
        monthname = 'Mar'
    } else if (month === 3) {
        monthname = 'Apr'
    } else if (month === 4) {
        monthname = 'May'
    } else if (month === 5) {
        monthname = 'Jun'
    } else if (month === 6) {
        monthname = 'Jul'
    } else if (month === 7) {
        monthname = 'Aug'
    } else if (month === 8) {
        monthname = 'Sep'
    } else if (month === 9) {
        monthname = 'Oct'
    } else if (month === 10) {
        monthname = 'Nov'
    } else if (month === 11) {
        monthname = 'Dec'
    }
    let year = date_ob.getFullYear()
    let curdate = `${weekdayname}, ${day} ${monthname} ${year}`

    let sql = `SELECT bn_contents.ContentID, bn_contents.ContentHeading, bn_contents.ContentBrief, bn_contents.ImageBgPath, DATE_FORMAT(bn_contents.created_at, "%Y-%m-%d") as fcreated_at, DATE_FORMAT(bn_contents.updated_at, "%Y-%m-%d") as fupdated_at, DATE_FORMAT(bn_contents.created_at, '%W, %e %M %Y, %H:%i') as create_date, DATE_FORMAT(bn_contents.updated_at, '%W, %e %M %Y, %H:%i') as updated_date, bn_bas_categories.Slug FROM bn_contents INNER JOIN bn_bas_categories ON bn_contents.CategoryIDs=bn_bas_categories.CategoryID WHERE bn_contents.Deletable=1 AND bn_contents.ShowContent=1 ORDER BY bn_contents.ContentID DESC LIMIT 120`;
    dbConn.query(sql, function (error, result) {
        if (result && result.length > 0) {
            let xml = `<rss xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:content="http://purl.org/rss/1.0/modules/content/" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:media="http://search.yahoo.com/mrss/" xml:base="https://www.ekhon.tv/" version="2.0">
            <channel>
                <title>
                    <![CDATA[ Ekhon TV :: এখন টিভি ]]>
                </title>
                <description>
                    <![CDATA[ Ekhon TV is an online news portal of Bangladesh. It was established in 2017 with the commitment to publish objective and information-based news. ]]>
                </description>
                <link>https://www.ekhon.tv/</link>
                <image>
                    <url>${BEndUrl}media/common/logo-fb.png</url>
                    <title>Ekhon TV - RSS</title>
                    <link>https://www.ekhon.tv/</link>
                </image>
                <generator>RSS by Ekhon TV</generator>
                <lastBuildDate>${curdate}</lastBuildDate>
                <copyright>
                    <![CDATA[ Copyright: (C) Ekhon TV. ]]>
                </copyright>
                <language>
                    <![CDATA[ bn ]]>
                </language>
                <ttl>15</ttl>
                <atom:link href="https://www.ekhon.tv/rss/rss.xml" rel="self" type="application/rss+xml"/>`;
            for (let i = 0; i < result.length; i++) {
                let date = '';
                if (result[i].fupdated_at && result[i].fupdated_at != '0000-00-00') {
                    date = result[i].updated_date;
                } else {
                    date = result[i].create_date;
                }

                xml += `<item>
                    <title>
                        <![CDATA[ ${result[i].ContentHeading} ]]>
                    </title>
                    <description>
                        <![CDATA[ ${result[i].ContentBrief} ]]>
                    </description>
                    <link>https://www.ekhon.tv/${result[i].Slug}/news/${result[i].ContentID}</link>
                    <guid isPermaLink="true">https://www.ekhon.tv/${result[i].Slug}/news/${result[i].ContentID}</guid>
                    <pubDate>${date}:00 +0600</pubDate>
                    <media:content medium="image" width="800" height="450" url="${BEndUrl}media/imgAll/${result[i].ImageBgPath}"/>
                </item>`

                if (i === result.length - 1) {
                    xml += `</channel>
                    </rss>`;
                    response.send(xml);
                }
            }
        }
        else {
            response.send('');
        }
    });
});

app.get('/rss/rssvideo.xml', function (request, response) {
    response.setHeader('Content-Type', 'application/xml');
    console.log('rssvideo.xml visited!');

    let date_ob = new Date();
    let weekdayname = ''
    let weekday = date_ob.getDay()
    if (weekday === 0) {
        weekdayname = 'Sun'
    } else if (weekday === 1) {
        weekdayname = 'Mon'
    } else if (weekday === 2) {
        weekdayname = 'Tue'
    } else if (weekday === 3) {
        weekdayname = 'Wed'
    } else if (weekday === 4) {
        weekdayname = 'Thu'
    } else if (weekday === 5) {
        weekdayname = 'Fri'
    } else if (weekday === 6) {
        weekdayname = 'Sat'
    }
    let day = date_ob.getDate()
    let monthname = ''
    let month = date_ob.getMonth()
    if (month === 0) {
        monthname = 'Jan'
    } else if (month === 1) {
        monthname = 'Feb'
    } else if (month === 2) {
        monthname = 'Mar'
    } else if (month === 3) {
        monthname = 'Apr'
    } else if (month === 4) {
        monthname = 'May'
    } else if (month === 5) {
        monthname = 'Jun'
    } else if (month === 6) {
        monthname = 'Jul'
    } else if (month === 7) {
        monthname = 'Aug'
    } else if (month === 8) {
        monthname = 'Sep'
    } else if (month === 9) {
        monthname = 'Oct'
    } else if (month === 10) {
        monthname = 'Nov'
    } else if (month === 11) {
        monthname = 'Dec'
    }
    let year = date_ob.getFullYear()
    let curdate = `${weekdayname}, ${day} ${monthname} ${year}`

    let sql = `SELECT WebTVID, WebTVHeading, WebTVLinkCode, SourceType, Remarks, created_at, updated_at FROM tv_webtvs WHERE Deletable=1 ORDER BY WebTVID DESC LIMIT 120`;
    dbConnMedia.query(sql, function (error, result) {
        if (result && result.length > 0) {
            let xml = `<?xml version="1.0" encoding="UTF-8"?>
            <rss version="2.0" xmlns:media="http://search.yahoo.com/mrss/" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:dcterms="http://purl.org/dc/terms/">
            <channel>
            <title><![CDATA[ Ekhon TV ]]></title>
            <link>https://www.ekhon.tv/</link>
            <description>Ekhon TV is an online news portal of Bangladesh. It was established in 2017 with the commitment to publish objective and information-based news.</description>
            <image>
                <url>${BEndUrl}media/common/logo-fb.png</url>
                <title>Ekhon TV - Video Gallery - RSS</title>
                <link>https://www.ekhon.tv/</link>
            </image>
            <generator>RSS by Ekhon TV</generator>
            <lastBuildDate>${curdate}</lastBuildDate>
            <copyright>
                <![CDATA[ Copyright: (C) Ekhon TV. ]]>
            </copyright>
            <language>
                <![CDATA[ bn ]]>
            </language>
            <ttl>15</ttl>
            <atom:link href="https://www.ekhon.tv/rss/rssvideo.xml" rel="self" type="application/rss+xml"/>`;
            for (let i = 0; i < result.length; i++) {
                let date = '';
                if (result[i].updated_at && result[i].updated_at != '0000-00-00 00:00:00') {
                    date = result[i].updated_date;
                } else {
                    date = result[i].create_date;
                }

                xml += `<item xmlns:media="http://search.yahoo.com/mrss/" xmlns:dcterms="http://purl.org/dc/terms/">
                    <link>https://www.ekhon.tv/video/show/${result[i].WebTVID}</link>
                    <media:content medium="video" isDefault="true">
                        <media:player url="${result[i].SourceType == 1 ? "https://www.youtube.com/embed/" + result[i].WebTVLinkCode + "?autoplay=1" : result[i].SourceType == 2 ? "https://www.facebook.com/plugins/video.php?href=https%3A%2F%2Fwww.facebook.com%2Ffacebookapp%2Fvideos%2F" + result[i].WebTVLinkCode + "%2F&show_text=0&width=560" : result[i].SourceType == 3 ? "https://player.vimeo.com/video/" + result[i].WebTVLinkCode : ''}" />
                        <media:title>${result[i].WebTVHeading}</media:title>
                        <media:description><![CDATA[ ${result[i].Remarks ? result[i].Remarks : result[i].WebTVHeading} ]]></media:description>
                        <media:thumbnail url="https://img.youtube.com/vi/${result[i].WebTVLinkCode}/0.jpg" height="360" width="480"/>
                    </media:content>
                    <dcterms:valid xmlns:dcterms="http://purl.org/dc/terms/">start=${date}; scheme=W3C-DTF</dcterms:valid>
                </item>`

                if (i === result.length - 1) {
                    xml += `</channel>
                    </rss>`;
                    response.send(xml);
                }
            }
        }
        else {
            response.send('');
        }
    });
});

app.get('/:catSlug', function (request, response) {
    let catSlug = request.params.catSlug;
    console.log('Category page visited!' + catSlug);
    const filePath = path.resolve(__dirname, './build', 'index.html');

    let sql = `SELECT CategoryName FROM bn_bas_categories WHERE Slug='${catSlug}'`;
    // console.log(sql);
    dbConn.query(sql, function (error, result) {
        // console.log('hi');
        if (result && result.length > 0) {
            console.log('result=' + result);
            let title = result[0].CategoryName;
            let keyword = title.split(" ");
            keyword = keyword.toString();
            fs.readFile(filePath, 'utf8', function (err, data) {
                if (err) {
                    return console.log(err);
                }
                data = data.replace(/\$OG_ROBOTS/g, `index, follow`);
                data = data.replace(/\$OG_TITLE/g, `${title} | ${title} সর্বশেষ খবর :: এখন টিভি`);
                data = data.replace(/\$OG_DESCRIPTION/g, `${title}`);
                data = data.replace(/\$OG_KEYWORDS/g, `${keyword}`);
                data = data.replace(/\$OG_IMAGE/g, `${BEndUrl}media/common/logo-fb.png`);
                var fullUrl = request.protocol + '://' + request.hostname + (request.originalUrl).replace(/\/+$/, '');
                data = data.replace(/\$OG_URL/g, `${fullUrl}`);
                response.send(data);
            });
        } else {
            fs.readFile(filePath, 'utf8', function (err, data) {
                if (err) {
                    return console.log(err);
                }
                data = data.replace(/\$OG_ROBOTS/g, `noindex, nofollow`);
                data = data.replace(/\$OG_TITLE/g, `404 - Nothing Found`);
                data = data.replace(/\$OG_DESCRIPTION/g, `404 - Nothing Found`);
                data = data.replace(/\$OG_KEYWORDS/g, `404, Nothing Found`);
                data = data.replace(/\$OG_IMAGE/g, `${BEndUrl}media/common/logo-fb.png`);
                var fullUrl = request.protocol + '://' + request.hostname + (request.originalUrl).replace(/\/+$/, '');
                data = data.replace(/\$OG_URL/g, `${fullUrl}`);
                response.send(data);
            });
        }
    })
});

app.get('/search/:searchSlug', function (request, response) {
    console.log('Search page visited!');
    const filePath = path.resolve(__dirname, './build', 'index.html');
    fs.readFile(filePath, 'utf8', function (err, data) {
        if (err) {
            return console.log(err);
        }
        data = data.replace(/\$OG_ROBOTS/g, `index, follow`);
        data = data.replace(/\$OG_TITLE/g, 'খুঁজুন | খুঁজুন সর্বশেষ খবর :: এখন টিভি');
        data = data.replace(/\$OG_DESCRIPTION/g, "Ekhon TV is an online news portal of Bangladesh. It was established in 2017 with the commitment to publish objective and information-based news.");
        data = data.replace(/\$OG_KEYWORDS/g, "এখন টিভি,অনলাইন পত্রিকা, পত্রিকা, বাংলাদেশ পত্রিকা, আজকের পত্রিকা, দেশে এখন, বাজার, কাচা বাজার, মুদ্রা বাজার, শেয়ার বাজার, আন্তর্জাতিক বাজার, ক্রিপ্টো, বিদেশে এখন, ক্রিকেট, ফুটবল, এখন মাঠে, এখন আনন্দ, সিনেমা, নাটক, তথ্য প্রযুক্তি, নাগরিক সাংবাদিকতা, পাঠকের কথা, চলতি হাওয়া, পরিবেশ, আবহাওয়া, উদ্যোক্তা");
        data = data.replace(/\$OG_IMAGE/g, `${BEndUrl}media/common/logo-fb.png`);
        var fullUrl = request.protocol + '://' + request.hostname + (request.originalUrl).replace(/\/+$/, '');
        // var fullUrl = request.get('x-forwarded-proto') + '://' + request.get('X-Forwarded-Host') + (request.originalUrl).replace(/\/+$/, '');
        data = data.replace(/\$OG_URL/g, `${fullUrl}`);
        response.send(data);
    });
});

app.get('/:catSlug/sub/:subCatSlug', function (request, response) {
    let catSlug = request.params.catSlug;
    let subCatSlug = request.params.subCatSlug;
    console.log('sub Category page visited! ' + catSlug + '/' + subCatSlug);
    const filePath = path.resolve(__dirname, './build', 'index.html');

    let sql = `SELECT CategoryName FROM bn_bas_categories WHERE Slug='${subCatSlug}' AND ParentID!=0`;
    // console.log(sql);
    dbConn.query(sql, function (error, result) {
        if (result && result.length > 0) {
            // console.log('result');
            let title = result[0].CategoryName;
            let keyword = title.split(" ");
            keyword = keyword.toString();
            fs.readFile(filePath, 'utf8', function (err, data) {
                if (err) {
                    return console.log(err);
                }
                data = data.replace(/\$OG_ROBOTS/g, `index, follow`);
                data = data.replace(/\$OG_TITLE/g, `${title} | ${title} সর্বশেষ খবর :: এখন টিভি`);
                data = data.replace(/\$OG_DESCRIPTION/g, `${title}`);
                data = data.replace(/\$OG_KEYWORDS/g, `${keyword}`);
                data = data.replace(/\$OG_IMAGE/g, `${BEndUrl}media/common/logo-fb.png`);
                var fullUrl = request.protocol + '://' + request.get('host') + (request.originalUrl).replace(/\/+$/, '');
                data = data.replace(/\$OG_URL/g, `${fullUrl}`);
                response.send(data);
            });
        } else {
            fs.readFile(filePath, 'utf8', function (err, data) {
                if (err) {
                    return console.log(err);
                }
                data = data.replace(/\$OG_ROBOTS/g, `noindex, nofollow`);
                data = data.replace(/\$OG_TITLE/g, `404 - Nothing Found`);
                data = data.replace(/\$OG_DESCRIPTION/g, `404 - Nothing Found`);
                data = data.replace(/\$OG_KEYWORDS/g, `404, Nothing Found`);
                data = data.replace(/\$OG_IMAGE/g, `${BEndUrl}media/common/logo-fb.png`);
                var fullUrl = request.protocol + '://' + request.get('host') + (request.originalUrl).replace(/\/+$/, '');
                data = data.replace(/\$OG_URL/g, `${fullUrl}`);
                response.send(data);
            });
        }
    })
});

app.get('/divisions/:divisionSlug', function (request, response) {
    let divisionSlug = request.params.divisionSlug;
    console.log('Division page visited!' + divisionSlug);
    const filePath = path.resolve(__dirname, './build', 'index.html');

    let sql = `SELECT DivisionName FROM bas_divisions WHERE DivisionSlug='${divisionSlug}'`;
    dbConn.query(sql, function (error, result) {
        if (result && result.length > 0) {
            let title = result[0].DivisionName;
            let keyword = title.split(" ");
            keyword = keyword.toString();
            fs.readFile(filePath, 'utf8', function (err, data) {
                if (err) {
                    return console.log(err);
                }
                data = data.replace(/\$OG_ROBOTS/g, `index, follow`);
                data = data.replace(/\$OG_TITLE/g, `${title} | ${title} সর্বশেষ খবর :: এখন টিভি`);
                data = data.replace(/\$OG_DESCRIPTION/g, `${title}`);
                data = data.replace(/\$OG_KEYWORDS/g, `${keyword}`);
                data = data.replace(/\$OG_IMAGE/g, `${BEndUrl}media/common/logo-fb.png`);
                var fullUrl = request.protocol + '://' + request.hostname + (request.originalUrl).replace(/\/+$/, '');
                data = data.replace(/\$OG_URL/g, `${fullUrl}`);
                response.send(data);
            });
        } else {
            fs.readFile(filePath, 'utf8', function (err, data) {
                if (err) {
                    return console.log(err);
                }
                data = data.replace(/\$OG_ROBOTS/g, `noindex, nofollow`);
                data = data.replace(/\$OG_TITLE/g, `404 - Nothing Found`);
                data = data.replace(/\$OG_DESCRIPTION/g, `404 - Nothing Found`);
                data = data.replace(/\$OG_KEYWORDS/g, `404, Nothing Found`);
                data = data.replace(/\$OG_IMAGE/g, `${BEndUrl}media/common/logo-fb.png`);
                var fullUrl = request.protocol + '://' + request.hostname + (request.originalUrl).replace(/\/+$/, '');
                data = data.replace(/\$OG_URL/g, `${fullUrl}`);
                response.send(data);
            });
        }
    })
});

app.get('/writers/:WriterSlug', function (request, response) {
    let WriterSlug = request.params.WriterSlug;
    console.log('Writers page visited!' + WriterSlug);
    const filePath = path.resolve(__dirname, './build', 'index.html');

    let sql = `SELECT WriterName FROM bn_writers WHERE Slug='${WriterSlug}'`;
    // console.log(sql);
    dbConn.query(sql, function (error, result) {
        if (result && result.length > 0) {
            // console.log('result');
            let title = result[0].WriterName;
            let keyword = title.split(" ");
            keyword = keyword.toString();
            fs.readFile(filePath, 'utf8', function (err, data) {
                if (err) {
                    return console.log(err);
                }
                data = data.replace(/\$OG_ROBOTS/g, `index, follow`);
                data = data.replace(/\$OG_TITLE/g, `${title}`);
                data = data.replace(/\$OG_DESCRIPTION/g, `${title}`);
                data = data.replace(/\$OG_KEYWORDS/g, `${keyword}`);
                data = data.replace(/\$OG_IMAGE/g, `${BEndUrl}media/common/logo-fb.png`);
                var fullUrl = request.protocol + '://' + request.hostname + (request.originalUrl).replace(/\/+$/, '');
                data = data.replace(/\$OG_URL/g, `${fullUrl}`);
                response.send(data);
            });
        } else {
            fs.readFile(filePath, 'utf8', function (err, data) {
                if (err) {
                    return console.log(err);
                }
                data = data.replace(/\$OG_ROBOTS/g, `noindex, nofollow`);
                data = data.replace(/\$OG_TITLE/g, `404 - Nothing Found`);
                data = data.replace(/\$OG_DESCRIPTION/g, `404 - Nothing Found`);
                data = data.replace(/\$OG_KEYWORDS/g, `404, Nothing Found`);
                data = data.replace(/\$OG_IMAGE/g, `${BEndUrl}media/common/logo-fb.png`);
                var fullUrl = request.protocol + '://' + request.hostname + (request.originalUrl).replace(/\/+$/, '');
                data = data.replace(/\$OG_URL/g, `${fullUrl}`);
                response.send(data);
            });
        }
    })
});

app.get('/tags/:TagTitle', function (request, response) {
    let TagTitle = request.params.TagTitle;
    console.log('Tags page visited!' + TagTitle);
    const filePath = path.resolve(__dirname, './build', 'index.html');

    let sql = `SELECT TagTitle FROM bn_tags WHERE TagTitle='${TagTitle}'`;
    // console.log(sql);
    dbConn.query(sql, function (error, result) {
        if (result && result.length > 0) {
            // console.log('result');
            let title = result[0].TagTitle;
            let keyword = title.split(" ");
            keyword = keyword.toString();
            fs.readFile(filePath, 'utf8', function (err, data) {
                if (err) {
                    return console.log(err);
                }
                data = data.replace(/\$OG_ROBOTS/g, `index, follow`);
                data = data.replace(/\$OG_TITLE/g, `${title}`);
                data = data.replace(/\$OG_DESCRIPTION/g, `${title}`);
                data = data.replace(/\$OG_KEYWORDS/g, `${keyword}`);
                data = data.replace(/\$OG_IMAGE/g, `${BEndUrl}media/common/logo-fb.png`);
                var fullUrl = request.protocol + '://' + request.hostname + (request.originalUrl).replace(/\/+$/, '');
                data = data.replace(/\$OG_URL/g, `${fullUrl}`);
                response.send(data);
            });
        } else {
            fs.readFile(filePath, 'utf8', function (err, data) {
                if (err) {
                    return console.log(err);
                }
                data = data.replace(/\$OG_ROBOTS/g, `noindex, nofollow`);
                data = data.replace(/\$OG_TITLE/g, `404 - Nothing Found`);
                data = data.replace(/\$OG_DESCRIPTION/g, `404 - Nothing Found`);
                data = data.replace(/\$OG_KEYWORDS/g, `404, Nothing Found`);
                data = data.replace(/\$OG_IMAGE/g, `${BEndUrl}media/common/logo-fb.png`);
                var fullUrl = request.protocol + '://' + request.hostname + (request.originalUrl).replace(/\/+$/, '');
                data = data.replace(/\$OG_URL/g, `${fullUrl}`);
                response.send(data);
            });
        }
    })
});

app.get('/photo-feature/news/:photoID', function (request, response) {
    let photoID = request.params.photoID;
    console.log('Photo Feature Detail page visited!' + photoID);
    const filePath = path.resolve(__dirname, './build', 'index.html');

    let sql = `SELECT photo_features.PhotoFeatureTitle,photo_features.ShortBrief,photo_features.ImageBgPath FROM photo_features WHERE photo_features.Deletable=1 AND photo_features.PhotoFeatureID='${photoID}' LIMIT 1;`;
    dbConnMedia.query(sql, function (error, result) {
        // console.log(error);
        // console.log(result)
        if (result && result.length > 0) {
            let title = result[0].PhotoFeatureTitle;
            let description = result[0].ShortBrief;
            if (!description) {
                description = title
            } else {
                description = (result[0].ShortBrief).replace(/(<([^>]+)>)/ig, '')
            }
            let image = '';
            image = result[0].ImageBgPath
            let keyword = '';
            keyword = title.split(" ");
            keyword = keyword.toString();
            fs.readFile(filePath, 'utf8', function (err, data) {
                if (err) {
                    return console.log(err);
                }
                data = data.replace(/\$OG_ROBOTS/g, `index, follow`);
                data = data.replace(/\$OG_TITLE/g, `${title}`);
                data = data.replace(/\$OG_DESCRIPTION/g, `${description}`);
                data = data.replace(/\$OG_KEYWORDS/g, `${keyword}`);
                data = data.replace(/\$OG_IMAGE/g, `${BEndUrl}media/imgAll/${image}`);
                var fullUrl = request.protocol + '://' + request.hostname + (request.originalUrl).replace(/\/+$/, '');
                data = data.replace(/\$OG_URL/g, `${fullUrl}`);
                response.send(data);
            });
        } else {
            fs.readFile(filePath, 'utf8', function (err, data) {
                if (err) {
                    return console.log(err);
                }
                data = data.replace(/\$OG_ROBOTS/g, `noindex, nofollow`);
                data = data.replace(/\$OG_TITLE/g, `404 - Nothing Found`);
                data = data.replace(/\$OG_DESCRIPTION/g, `404 - Nothing Found`);
                data = data.replace(/\$OG_KEYWORDS/g, `404, Nothing Found`);
                data = data.replace(/\$OG_IMAGE/g, `${BEndUrl}media/common/logo-fb.png`);
                var fullUrl = request.protocol + '://' + request.hostname + (request.originalUrl).replace(/\/+$/, '');
                data = data.replace(/\$OG_URL/g, `${fullUrl}`);
                response.send(data);
            });
        }
    })
});

app.get('/:catSlug/news/:id', function (request, response) {
    let catSlug = request.params.catSlug;
    let id = request.params.id;
    console.log('Detail page visited!' + catSlug + ' ' + id);
    const filePath = path.resolve(__dirname, './build', 'index.html');

    // let sql = `SELECT bc.ContentHeading,bc.ContentBrief,bc.ImageBgPath,bc.PlateType,bc.ImagePlatePath,bc.Keywords FROM bn_contents bc WHERE bc.Deletable=1 AND bc.ShowContent=1 AND bc.ContentID='${id}' LIMIT 1`;
    let sql = `SELECT bc.ContentHeading,bc.ContentBrief,bc.ImageBgPath,bc.PlateType,bc.ImagePlatePath,bc.Keywords FROM bn_contents bc WHERE bc.Deletable=1 AND bc.ShowContent=1 AND bc.ContentID='${id}' AND FIND_IN_SET((SELECT bn_bas_categories.CategoryID FROM bn_bas_categories WHERE bn_bas_categories.Slug='${catSlug}'), bc.CategoryIDs) > 0 LIMIT 1`;
    dbConn.query(sql, function (error, result) {
        // console.log(sql);
        // console.log(result)
        if (result && result.length > 0) {
            let title = result[0].ContentHeading;
            let description = result[0].ContentBrief;
            if (!description) {
                description = title
            } else {
                description = (result[0].ContentBrief).replace(/(<([^>]+)>)/ig, '')
            }
            let image = '';
            if (result[0].PlateType > 0) {
                image = result[0].ImagePlatePath;
            } else {
                image = result[0].ImageBgPath
            }
            let keyword = '';
            if (result[0].Keywords) {
                keyword = result[0].Keywords
            } else {
                keyword = title.split(" ");
                keyword = keyword.toString();
            }
            fs.readFile(filePath, 'utf8', function (err, data) {
                if (err) {
                    return console.log(err);
                }
                data = data.replace(/\$OG_ROBOTS/g, `index, follow`);
                data = data.replace(/\$OG_TITLE/g, `${title}`);
                data = data.replace(/\$OG_DESCRIPTION/g, `${description}`);
                data = data.replace(/\$OG_KEYWORDS/g, `${keyword}`);
                data = data.replace(/\$OG_IMAGE/g, `${BEndUrl}media/imgAll/${image}`);
                var fullUrl = request.protocol + '://' + request.hostname + (request.originalUrl).replace(/\/+$/, '');
                data = data.replace(/\$OG_URL/g, `${fullUrl}`);
                response.send(data);
            });
        } else {
            fs.readFile(filePath, 'utf8', function (err, data) {
                if (err) {
                    return console.log(err);
                }
                data = data.replace(/\$OG_ROBOTS/g, `noindex, nofollow`);
                data = data.replace(/\$OG_TITLE/g, `404 - Nothing Found`);
                data = data.replace(/\$OG_DESCRIPTION/g, `404 - Nothing Found`);
                data = data.replace(/\$OG_KEYWORDS/g, `404, Nothing Found`);
                data = data.replace(/\$OG_IMAGE/g, `${BEndUrl}media/common/logo-fb.png`);
                var fullUrl = request.protocol + '://' + request.hostname + (request.originalUrl).replace(/\/+$/, '');
                data = data.replace(/\$OG_URL/g, `${fullUrl}`);
                response.send(data);
            });
        }
    })
});

app.get('/video/cat/:vdoSlug', function (request, response) {
    let vdoSlug = request.params.vdoSlug;
    console.log('video cat page visited!' + vdoSlug);
    const filePath = path.resolve(__dirname, './build', 'index.html');

    let sql = `SELECT WebTVHeading, WebTVLinkCode FROM tv_webtvs WHERE Slug='${vdoSlug}' LIMIT 1`;
    dbConnMedia.query(sql, function (error, result) {
        // console.log(result)
        if (result && result.length > 0) {
            let title = result[0].WebTVHeading;
            let keyword = title.split(" ");
            keyword = keyword.toString();
            let description = result[0].WebTVHeading;
            let image = result[0].WebTVLinkCode;
            fs.readFile(filePath, 'utf8', function (err, data) {
                if (err) {
                    return console.log(err);
                }
                data = data.replace(/\$OG_ROBOTS/g, `index, follow`);
                data = data.replace(/\$OG_TITLE/g, `${title}`);
                data = data.replace(/\$OG_DESCRIPTION/g, `${description}`);
                data = data.replace(/\$OG_KEYWORDS/g, `${keyword}`);
                data = data.replace(/\$OG_IMAGE/g, `https://img.youtube.com/vi/${image}/0.jpg`);
                var fullUrl = request.protocol + '://' + request.hostname + (request.originalUrl).replace(/\/+$/, '');
                data = data.replace(/\$OG_URL/g, `${fullUrl}`);
                response.send(data);
            });
        } else {
            fs.readFile(filePath, 'utf8', function (err, data) {
                if (err) {
                    return console.log(err);
                }
                data = data.replace(/\$OG_ROBOTS/g, `noindex, nofollow`);
                data = data.replace(/\$OG_TITLE/g, `404 - Nothing Found`);
                data = data.replace(/\$OG_DESCRIPTION/g, `404 - Nothing Found`);
                data = data.replace(/\$OG_KEYWORDS/g, `404, Nothing Found`);
                data = data.replace(/\$OG_IMAGE/g, `${BEndUrl}media/common/logo-fb.png`);
                var fullUrl = request.protocol + '://' + request.hostname + (request.originalUrl).replace(/\/+$/, '');
                data = data.replace(/\$OG_URL/g, `${fullUrl}`);
                response.send(data);
            });
        }
    })
});

app.get('/video/show/:vdoID', function (request, response) {
    let vdoID = request.params.vdoID;
    console.log('video details page visited!' + vdoID);
    const filePath = path.resolve(__dirname, './build', 'index.html');

    let sql = `SELECT WebTVHeading, WebTVLinkCode FROM tv_webtvs WHERE WebTVID='${vdoID}' LIMIT 1`;
    dbConnMedia.query(sql, function (error, result) {
        // console.log(result)
        if (result && result.length > 0) {
            let title = result[0].WebTVHeading;
            let keyword = title.split(" ");
            keyword = keyword.toString();
            let description = result[0].WebTVHeading;
            let image = result[0].WebTVLinkCode;
            fs.readFile(filePath, 'utf8', function (err, data) {
                if (err) {
                    return console.log(err);
                }
                data = data.replace(/\$OG_ROBOTS/g, `index, follow`);
                data = data.replace(/\$OG_TITLE/g, `${title}`);
                data = data.replace(/\$OG_DESCRIPTION/g, `${description}`);
                data = data.replace(/\$OG_KEYWORDS/g, `${keyword}`);
                data = data.replace(/\$OG_IMAGE/g, `https://img.youtube.com/vi/${image}/0.jpg`);
                var fullUrl = request.protocol + '://' + request.hostname + (request.originalUrl).replace(/\/+$/, '');
                data = data.replace(/\$OG_URL/g, `${fullUrl}`);
                response.send(data);
            });
        } else {
            fs.readFile(filePath, 'utf8', function (err, data) {
                if (err) {
                    return console.log(err);
                }
                data = data.replace(/\$OG_ROBOTS/g, `noindex, nofollow`);
                data = data.replace(/\$OG_TITLE/g, `404 - Nothing Found`);
                data = data.replace(/\$OG_DESCRIPTION/g, `404 - Nothing Found`);
                data = data.replace(/\$OG_KEYWORDS/g, `404, Nothing Found`);
                data = data.replace(/\$OG_IMAGE/g, `${BEndUrl}media/common/logo-fb.png`);
                var fullUrl = request.protocol + '://' + request.hostname + (request.originalUrl).replace(/\/+$/, '');
                data = data.replace(/\$OG_URL/g, `${fullUrl}`);
                response.send(data);
            });
        }
    })
});

app.get('/divisions/:divisionSlug/:districtSlug', function (request, response) {
    let divisionSlug = request.params.divisionSlug;
    let districtSlug = request.params.districtSlug;
    console.log('District page visited!' + divisionSlug + ' ' + districtSlug);
    const filePath = path.resolve(__dirname, './build', 'index.html');

    let sql = `SELECT bas_districts.DistrictNameBN FROM bas_districts WHERE bas_districts.DistrictSlug='${districtSlug}'`;
    dbConn.query(sql, function (error, result) {
        if (result && result.length > 0) {
            let title = result[0].DistrictNameBN;
            let keyword = title.split(" ");
            keyword = keyword.toString();
            // console.log(result[0])
            fs.readFile(filePath, 'utf8', function (err, data) {
                if (err) {
                    return console.log(err);
                }
                data = data.replace(/\$OG_ROBOTS/g, `index, follow`);
                data = data.replace(/\$OG_TITLE/g, `${title} | ${title} সর্বশেষ খবর :: এখন টিভি`);
                data = data.replace(/\$OG_DESCRIPTION/g, `${title}`);
                data = data.replace(/\$OG_KEYWORDS/g, `${keyword}`);
                data = data.replace(/\$OG_IMAGE/g, `${BEndUrl}media/common/logo-fb.png`);
                var fullUrl = request.protocol + '://' + request.hostname + (request.originalUrl).replace(/\/+$/, '');
                data = data.replace(/\$OG_URL/g, `${fullUrl}`);
                response.send(data);
            });
        } else {
            fs.readFile(filePath, 'utf8', function (err, data) {
                if (err) {
                    return console.log(err);
                }
                data = data.replace(/\$OG_ROBOTS/g, `noindex, nofollow`);
                data = data.replace(/\$OG_TITLE/g, `404 - Nothing Found`);
                data = data.replace(/\$OG_DESCRIPTION/g, `404 - Nothing Found`);
                data = data.replace(/\$OG_KEYWORDS/g, `404, Nothing Found`);
                data = data.replace(/\$OG_IMAGE/g, `${BEndUrl}media/common/logo-fb.png`);
                var fullUrl = request.protocol + '://' + request.hostname + (request.originalUrl).replace(/\/+$/, '');
                data = data.replace(/\$OG_URL/g, `${fullUrl}`);
                response.send(data);
            });
        }
    })
});

app.use(express.static(path.resolve(__dirname, './build')));


app.get('*', function (request, response) {
    const filePath = path.resolve(__dirname, './build', 'index.html');
    // response.sendFile(filePath);

    fs.readFile(filePath, 'utf8', function (err, data) {
        if (err) {
            return console.log(err);
        }
        data = data.replace(/\$OG_ROBOTS/g, `noindex, nofollow`);
        data = data.replace(/\$OG_TITLE/g, `404 - Nothing Found`);
        data = data.replace(/\$OG_DESCRIPTION/g, `404 - Nothing Found`);
        data = data.replace(/\$OG_KEYWORDS/g, `404, Nothing Found`);
        data = data.replace(/\$OG_IMAGE/g, `${BEndUrl}media/common/logo-fb.png`);
        var fullUrl = request.protocol + '://' + request.hostname + (request.originalUrl).replace(/\/+$/, '');
        data = data.replace(/\$OG_URL/g, `${fullUrl}`);
        response.send(data);
    });
});

// // =========datebase connection close=======
// dbConn.end();
// dbConnMedia.end();

httpServer.listen(3300, function () {
    console.log('Node app is running on port 3300');
});
// httpsServer.listen(3400, function () {
//     console.log('Node app is running on port 3400');
// });

module.exports = app;