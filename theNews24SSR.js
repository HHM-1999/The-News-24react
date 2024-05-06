'use strict';

var express = require('express');
var fs = require('fs');
var path = require("path");

var app = express();
var bodyParser = require('body-parser');

// var mysql = require('mysql');

require('dotenv').config();

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

const dbConfig = require("./ssr/dbCon/dbConfig");
const bnConfig = dbConfig.bnConfig();
const mediaConfig = dbConfig.mediaConfig();

var FEndPort = process.env.REACT_APP_FRONT_DOMAIN_PORT;
// var FEndUrl = process.env.REACT_APP_FONT_DOMAIN_URL;
var BEndUrl = process.env.REACT_APP_DOMAIN_URL;

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
    fs.readFile(filePath, 'utf8', async function (err, data) {
        if (err) {
            return console.log(err);
        }
        data = data.replace(/\$OG_ROBOTS/g, `index, follow`);
        data = data.replace(/\$OG_TITLE/g, 'TheNews24 || দ্য নিউজ ২৪');
        data = data.replace(/\$OG_DESCRIPTION/g, "TheNews24 || দ্য নিউজ ২৪");
        data = data.replace(/\$OG_KEYWORDS/g, "TheNews24, দ্য নিউজ ২৪, পত্রিকা, বাংলাদেশ, আজকের পত্রিকা, জাতীয়, সারাদেশ, বরিশাল, চট্টগ্রাম, ঢাকা,খুলনা, রাজশাহী, সিলেট, রংপুর, ময়মনসিংহ, রাজধানী, আন্তর্জাতিক, রাজনীতি, বিনোদন , দেশি, বিদেশি, খেলা, ক্রিকেট, বিশ্বকাপ ক্রিকেট, বিশেষ কলাম, অর্থনীতি, ধর্ম, লাইফস্টাইল, ফ্যাশন, রেসিপি, সাত রঙ, সাতরঙ,  দূরবীন, প্রথম প্রহর, বইমেলা, তথ্যপ্রযুক্তি, শিক্ষাঙ্গন, আইন-আদালত, আইন আদালত, শিল্প ও সাহিত্, শিল্প সাহিত্, স্বাস্থ্য ও চিকিৎসা, স্বাস্থ্য চিকিৎসা, ফিচার, বিজ্ঞান, ভ্রমণ, মুক্তকথা, মুখোমুখি, প্রবাস জীবন, জব কর্নার, জব, মজার খবর, কার্টুন, সোশ্যাল মিডিয়া, সাইবার স্পেস, আর্কাইভ, সাহিত্য, কম্পিউটার, মোবাইল ফোন, গেমস, সরকার, অপরাধ, আইন ও বিচার, পরিবেশ, দুর্ঘটনা, সংসদ, রাজধানী, শেয়ার বাজার, বাণিজ্য, পোশাক শিল্প, ফুটবল, সকাল, বিকাল");
        data = data.replace(/\$OG_IMAGE/g, `${BEndUrl}media/common/logo-fb.png`);
        var fullUrl = request.protocol + '://' + request.hostname + request.originalUrl;
        // var fullUrl = request.get('x-forwarded-proto') + '://' + request.get('X-Forwarded-Host') + (request.originalUrl).replace(/\/+$/, '');
        data = data.replace(/\$OG_URL/g, `${fullUrl}`);
        response.send(data);
    });
});

app.get('/aboutUs', function (request, response) {
    console.log('aboutUs page visited!');
    const filePath = path.resolve(__dirname, './build', 'index.html');
    fs.readFile(filePath, 'utf8', async function (err, data) {
        if (err) {
            return console.log(err);
        }
        data = data.replace(/\$OG_ROBOTS/g, `index, follow`);
        data = data.replace(/\$OG_TITLE/g, 'দ্য নিউজ ২৪ :: আমাদের সম্পর্কে');
        data = data.replace(/\$OG_DESCRIPTION/g, "দ্য নিউজ ২৪ :: আমাদের সম্পর্কে");
        data = data.replace(/\$OG_KEYWORDS/g, "দ্য নিউজ ২৪, পত্রিকা, বাংলাদেশ, আজকের পত্রিকা, জাতীয়, সারাদেশ, বরিশাল, চট্টগ্রাম, ঢাকা,খুলনা, রাজশাহী, সিলেট, রংপুর, ময়মনসিংহ, রাজধানী, আন্তর্জাতিক, রাজনীতি, বিনোদন , দেশি, বিদেশি, খেলা, ক্রিকেট, বিশ্বকাপ ক্রিকেট, বিশেষ কলাম, অর্থনীতি, ধর্ম, লাইফস্টাইল, ফ্যাশন, রেসিপি, সাত রঙ, সাতরঙ,  দূরবীন, প্রথম প্রহর, বইমেলা, তথ্যপ্রযুক্তি, শিক্ষাঙ্গন, আইন-আদালত, আইন আদালত, শিল্প ও সাহিত্, শিল্প সাহিত্, স্বাস্থ্য ও চিকিৎসা, স্বাস্থ্য চিকিৎসা, ফিচার, বিজ্ঞান, ভ্রমণ, মুক্তকথা, মুখোমুখি, প্রবাস জীবন, জব কর্নার, জব, মজার খবর, কার্টুন, সোশ্যাল মিডিয়া, সাইবার স্পেস, আর্কাইভ, সাহিত্য, কম্পিউটার, মোবাইল ফোন, গেমস, সরকার, অপরাধ, আইন ও বিচার, পরিবেশ, দুর্ঘটনা, সংসদ, রাজধানী, শেয়ার বাজার, বাণিজ্য, পোশাক শিল্প, ফুটবল, সকাল, বিকাল");
        data = data.replace(/\$OG_IMAGE/g, `${BEndUrl}media/common/logo-fb.png`);
        var fullUrl = request.protocol + '://' + request.hostname + (request.originalUrl).replace(/\/+$/, '');
        // var fullUrl = request.get('x-forwarded-proto') + '://' + request.get('X-Forwarded-Host') + (request.originalUrl).replace(/\/+$/, '');
        data = data.replace(/\$OG_URL/g, `${fullUrl}`);
        response.send(data);
    });
});

app.get('/photo-feature', function (request, response) {
    console.log('live page visited!');
    const filePath = path.resolve(__dirname, './build', 'index.html');
    fs.readFile(filePath, 'utf8', async function (err, data) {
        if (err) {
            return console.log(err);
        }
        data = data.replace(/\$OG_ROBOTS/g, `index, follow`);
        data = data.replace(/\$OG_TITLE/g, 'ছবিঘর | ছবিঘর সর্বশেষ খবর :: দ্য নিউজ ২৪');
        data = data.replace(/\$OG_DESCRIPTION/g, "ছবিঘর | ছবিঘর সর্বশেষ খবর :: দ্য নিউজ ২৪");
        data = data.replace(/\$OG_KEYWORDS/g, "দ্য নিউজ ২৪, পত্রিকা, বাংলাদেশ, আজকের পত্রিকা, জাতীয়, সারাদেশ, বরিশাল, চট্টগ্রাম, ঢাকা,খুলনা, রাজশাহী, সিলেট, রংপুর, ময়মনসিংহ, রাজধানী, আন্তর্জাতিক, রাজনীতি, বিনোদন , দেশি, বিদেশি, খেলা, ক্রিকেট, বিশ্বকাপ ক্রিকেট, বিশেষ কলাম, অর্থনীতি, ধর্ম, লাইফস্টাইল, ফ্যাশন, রেসিপি, সাত রঙ, সাতরঙ,  দূরবীন, প্রথম প্রহর, বইমেলা, তথ্যপ্রযুক্তি, শিক্ষাঙ্গন, আইন-আদালত, আইন আদালত, শিল্প ও সাহিত্, শিল্প সাহিত্, স্বাস্থ্য ও চিকিৎসা, স্বাস্থ্য চিকিৎসা, ফিচার, বিজ্ঞান, ভ্রমণ, মুক্তকথা, মুখোমুখি, প্রবাস জীবন, জব কর্নার, জব, মজার খবর, কার্টুন, সোশ্যাল মিডিয়া, সাইবার স্পেস, আর্কাইভ, সাহিত্য, কম্পিউটার, মোবাইল ফোন, গেমস, সরকার, অপরাধ, আইন ও বিচার, পরিবেশ, দুর্ঘটনা, সংসদ, রাজধানী, শেয়ার বাজার, বাণিজ্য, পোশাক শিল্প, ফুটবল, সকাল, বিকাল");
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
    fs.readFile(filePath, 'utf8', async function (err, data) {
        if (err) {
            return console.log(err);
        }
        data = data.replace(/\$OG_ROBOTS/g, `index, follow`);
        data = data.replace(/\$OG_TITLE/g, 'দ্য নিউজ ২৪ :: লাইভ');
        data = data.replace(/\$OG_DESCRIPTION/g, "দ্য নিউজ ২৪ :: লাইভ");
        data = data.replace(/\$OG_KEYWORDS/g, "দ্য নিউজ ২৪, পত্রিকা, বাংলাদেশ, আজকের পত্রিকা, জাতীয়, সারাদেশ, বরিশাল, চট্টগ্রাম, ঢাকা,খুলনা, রাজশাহী, সিলেট, রংপুর, ময়মনসিংহ, রাজধানী, আন্তর্জাতিক, রাজনীতি, বিনোদন , দেশি, বিদেশি, খেলা, ক্রিকেট, বিশ্বকাপ ক্রিকেট, বিশেষ কলাম, অর্থনীতি, ধর্ম, লাইফস্টাইল, ফ্যাশন, রেসিপি, সাত রঙ, সাতরঙ,  দূরবীন, প্রথম প্রহর, বইমেলা, তথ্যপ্রযুক্তি, শিক্ষাঙ্গন, আইন-আদালত, আইন আদালত, শিল্প ও সাহিত্, শিল্প সাহিত্, স্বাস্থ্য ও চিকিৎসা, স্বাস্থ্য চিকিৎসা, ফিচার, বিজ্ঞান, ভ্রমণ, মুক্তকথা, মুখোমুখি, প্রবাস জীবন, জব কর্নার, জব, মজার খবর, কার্টুন, সোশ্যাল মিডিয়া, সাইবার স্পেস, আর্কাইভ, সাহিত্য, কম্পিউটার, মোবাইল ফোন, গেমস, সরকার, অপরাধ, আইন ও বিচার, পরিবেশ, দুর্ঘটনা, সংসদ, রাজধানী, শেয়ার বাজার, বাণিজ্য, পোশাক শিল্প, ফুটবল, সকাল, বিকাল");
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
    fs.readFile(filePath, 'utf8', async function (err, data) {
        if (err) {
            return console.log(err);
        }
        data = data.replace(/\$OG_ROBOTS/g, `index, follow`);
        data = data.replace(/\$OG_TITLE/g, 'দ্য নিউজ ২৪ :: অনলাইন জরিপ');
        data = data.replace(/\$OG_DESCRIPTION/g, "দ্য নিউজ ২৪ :: অনলাইন জরিপ");
        data = data.replace(/\$OG_KEYWORDS/g, "দ্য নিউজ ২৪, পত্রিকা, বাংলাদেশ, আজকের পত্রিকা, জাতীয়, সারাদেশ, বরিশাল, চট্টগ্রাম, ঢাকা,খুলনা, রাজশাহী, সিলেট, রংপুর, ময়মনসিংহ, রাজধানী, আন্তর্জাতিক, রাজনীতি, বিনোদন , দেশি, বিদেশি, খেলা, ক্রিকেট, বিশ্বকাপ ক্রিকেট, বিশেষ কলাম, অর্থনীতি, ধর্ম, লাইফস্টাইল, ফ্যাশন, রেসিপি, সাত রঙ, সাতরঙ,  দূরবীন, প্রথম প্রহর, বইমেলা, তথ্যপ্রযুক্তি, শিক্ষাঙ্গন, আইন-আদালত, আইন আদালত, শিল্প ও সাহিত্, শিল্প সাহিত্, স্বাস্থ্য ও চিকিৎসা, স্বাস্থ্য চিকিৎসা, ফিচার, বিজ্ঞান, ভ্রমণ, মুক্তকথা, মুখোমুখি, প্রবাস জীবন, জব কর্নার, জব, মজার খবর, কার্টুন, সোশ্যাল মিডিয়া, সাইবার স্পেস, আর্কাইভ, সাহিত্য, কম্পিউটার, মোবাইল ফোন, গেমস, সরকার, অপরাধ, আইন ও বিচার, পরিবেশ, দুর্ঘটনা, সংসদ, রাজধানী, শেয়ার বাজার, বাণিজ্য, পোশাক শিল্প, ফুটবল, সকাল, বিকাল");
        data = data.replace(/\$OG_IMAGE/g, `${BEndUrl}media/common/logo-fb.png`);
        var fullUrl = request.protocol + '://' + request.hostname + (request.originalUrl).replace(/\/+$/, '');
        // var fullUrl = request.get('x-forwarded-proto') + '://' + request.get('X-Forwarded-Host') + (request.originalUrl).replace(/\/+$/, '');
        data = data.replace(/\$OG_URL/g, `${fullUrl}`);
        response.send(data);
    });
});

app.get('/privacy-policy', function (request, response) {
    console.log('privacy-policy page visited!');
    const filePath = path.resolve(__dirname, './build', 'index.html')
    fs.readFile(filePath, 'utf8', function (err, data) {
        if (err) {
            return console.log(err);
        }
        data = data.replace(/\$OG_ROBOTS/g, `index, follow`);
        data = data.replace(/\$OG_TITLE/g, 'দ্য নিউজ ২৪ :: Privacy Policy');
        data = data.replace(/\$OG_DESCRIPTION/g, "দ্য নিউজ ২৪ :: Privacy Policy");
        data = data.replace(/\$OG_KEYWORDS/g, "দ্য নিউজ ২৪, পত্রিকা, বাংলাদেশ, আজকের পত্রিকা, জাতীয়, সারাদেশ, বরিশাল, চট্টগ্রাম, ঢাকা,খুলনা, রাজশাহী, সিলেট, রংপুর, ময়মনসিংহ, রাজধানী, আন্তর্জাতিক, রাজনীতি, বিনোদন , দেশি, বিদেশি, খেলা, ক্রিকেট, বিশ্বকাপ ক্রিকেট, বিশেষ কলাম, অর্থনীতি, ধর্ম, লাইফস্টাইল, ফ্যাশন, রেসিপি, সাত রঙ, সাতরঙ,  দূরবীন, প্রথম প্রহর, বইমেলা, তথ্যপ্রযুক্তি, শিক্ষাঙ্গন, আইন-আদালত, আইন আদালত, শিল্প ও সাহিত্, শিল্প সাহিত্, স্বাস্থ্য ও চিকিৎসা, স্বাস্থ্য চিকিৎসা, ফিচার, বিজ্ঞান, ভ্রমণ, মুক্তকথা, মুখোমুখি, প্রবাস জীবন, জব কর্নার, জব, মজার খবর, কার্টুন, সোশ্যাল মিডিয়া, সাইবার স্পেস, আর্কাইভ, সাহিত্য, কম্পিউটার, মোবাইল ফোন, গেমস, সরকার, অপরাধ, আইন ও বিচার, পরিবেশ, দুর্ঘটনা, সংসদ, রাজধানী, শেয়ার বাজার, বাণিজ্য, পোশাক শিল্প, ফুটবল, সকাল, বিকাল");
        data = data.replace(/\$OG_IMAGE/g, `${BEndUrl}media/common/logo-fb.png`);
        var fullUrl = request.protocol + '://' + request.hostname + (request.originalUrl).replace(/\/+$/, '');
        // var fullUrl = request.get('x-forwarded-proto') + '://' + request.get('X-Forwarded-Host') + (request.originalUrl).replace(/\/+$/, '');
        data = data.replace(/\$OG_URL/g, `${fullUrl}`);
        response.send(data);
    });
});

app.get('/terms-service', function (request, response) {
    console.log('terms-conditions page visited!');
    const filePath = path.resolve(__dirname, './build', 'index.html')
    fs.readFile(filePath, 'utf8', function (err, data) {
        if (err) {
            return console.log(err);
        }
        data = data.replace(/\$OG_ROBOTS/g, `index, follow`);
        data = data.replace(/\$OG_TITLE/g, 'দ্য নিউজ ২৪ :: Terms & Conditions');
        data = data.replace(/\$OG_DESCRIPTION/g, "দ্য নিউজ ২৪ :: Terms & Conditions");
        data = data.replace(/\$OG_KEYWORDS/g, "দ্য নিউজ ২৪, পত্রিকা, বাংলাদেশ, আজকের পত্রিকা, জাতীয়, সারাদেশ, বরিশাল, চট্টগ্রাম, ঢাকা,খুলনা, রাজশাহী, সিলেট, রংপুর, ময়মনসিংহ, রাজধানী, আন্তর্জাতিক, রাজনীতি, বিনোদন , দেশি, বিদেশি, খেলা, ক্রিকেট, বিশ্বকাপ ক্রিকেট, বিশেষ কলাম, অর্থনীতি, ধর্ম, লাইফস্টাইল, ফ্যাশন, রেসিপি, সাত রঙ, সাতরঙ,  দূরবীন, প্রথম প্রহর, বইমেলা, তথ্যপ্রযুক্তি, শিক্ষাঙ্গন, আইন-আদালত, আইন আদালত, শিল্প ও সাহিত্, শিল্প সাহিত্, স্বাস্থ্য ও চিকিৎসা, স্বাস্থ্য চিকিৎসা, ফিচার, বিজ্ঞান, ভ্রমণ, মুক্তকথা, মুখোমুখি, প্রবাস জীবন, জব কর্নার, জব, মজার খবর, কার্টুন, সোশ্যাল মিডিয়া, সাইবার স্পেস, আর্কাইভ, সাহিত্য, কম্পিউটার, মোবাইল ফোন, গেমস, সরকার, অপরাধ, আইন ও বিচার, পরিবেশ, দুর্ঘটনা, সংসদ, রাজধানী, শেয়ার বাজার, বাণিজ্য, পোশাক শিল্প, ফুটবল, সকাল, বিকাল");
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
    fs.readFile(filePath, 'utf8', async function (err, data) {
        if (err) {
            return console.log(err);
        }
        data = data.replace(/\$OG_ROBOTS/g, `index, follow`);
        data = data.replace(/\$OG_TITLE/g, 'দ্য নিউজ ২৪ :: ট্যাগ সমূহ');
        data = data.replace(/\$OG_DESCRIPTION/g, "দ্য নিউজ ২৪ :: ট্যাগ সমূহ");
        data = data.replace(/\$OG_KEYWORDS/g, "দ্য নিউজ ২৪, পত্রিকা, বাংলাদেশ, আজকের পত্রিকা, জাতীয়, সারাদেশ, বরিশাল, চট্টগ্রাম, ঢাকা,খুলনা, রাজশাহী, সিলেট, রংপুর, ময়মনসিংহ, রাজধানী, আন্তর্জাতিক, রাজনীতি, বিনোদন , দেশি, বিদেশি, খেলা, ক্রিকেট, বিশ্বকাপ ক্রিকেট, বিশেষ কলাম, অর্থনীতি, ধর্ম, লাইফস্টাইল, ফ্যাশন, রেসিপি, সাত রঙ, সাতরঙ,  দূরবীন, প্রথম প্রহর, বইমেলা, তথ্যপ্রযুক্তি, শিক্ষাঙ্গন, আইন-আদালত, আইন আদালত, শিল্প ও সাহিত্, শিল্প সাহিত্, স্বাস্থ্য ও চিকিৎসা, স্বাস্থ্য চিকিৎসা, ফিচার, বিজ্ঞান, ভ্রমণ, মুক্তকথা, মুখোমুখি, প্রবাস জীবন, জব কর্নার, জব, মজার খবর, কার্টুন, সোশ্যাল মিডিয়া, সাইবার স্পেস, আর্কাইভ, সাহিত্য, কম্পিউটার, মোবাইল ফোন, গেমস, সরকার, অপরাধ, আইন ও বিচার, পরিবেশ, দুর্ঘটনা, সংসদ, রাজধানী, শেয়ার বাজার, বাণিজ্য, পোশাক শিল্প, ফুটবল, সকাল, বিকাল");
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
    fs.readFile(filePath, 'utf8', async function (err, data) {
        if (err) {
            return console.log(err);
        }
        data = data.replace(/\$OG_ROBOTS/g, `index, follow`);
        data = data.replace(/\$OG_TITLE/g, 'দ্য নিউজ ২৪ :: লেখক সমূহ');
        data = data.replace(/\$OG_DESCRIPTION/g, "দ্য নিউজ ২৪ :: লেখক সমূহ");
        data = data.replace(/\$OG_KEYWORDS/g, "দ্য নিউজ ২৪, পত্রিকা, বাংলাদেশ, আজকের পত্রিকা, জাতীয়, সারাদেশ, বরিশাল, চট্টগ্রাম, ঢাকা,খুলনা, রাজশাহী, সিলেট, রংপুর, ময়মনসিংহ, রাজধানী, আন্তর্জাতিক, রাজনীতি, বিনোদন , দেশি, বিদেশি, খেলা, ক্রিকেট, বিশ্বকাপ ক্রিকেট, বিশেষ কলাম, অর্থনীতি, ধর্ম, লাইফস্টাইল, ফ্যাশন, রেসিপি, সাত রঙ, সাতরঙ,  দূরবীন, প্রথম প্রহর, বইমেলা, তথ্যপ্রযুক্তি, শিক্ষাঙ্গন, আইন-আদালত, আইন আদালত, শিল্প ও সাহিত্, শিল্প সাহিত্, স্বাস্থ্য ও চিকিৎসা, স্বাস্থ্য চিকিৎসা, ফিচার, বিজ্ঞান, ভ্রমণ, মুক্তকথা, মুখোমুখি, প্রবাস জীবন, জব কর্নার, জব, মজার খবর, কার্টুন, সোশ্যাল মিডিয়া, সাইবার স্পেস, আর্কাইভ, সাহিত্য, কম্পিউটার, মোবাইল ফোন, গেমস, সরকার, অপরাধ, আইন ও বিচার, পরিবেশ, দুর্ঘটনা, সংসদ, রাজধানী, শেয়ার বাজার, বাণিজ্য, পোশাক শিল্প, ফুটবল, সকাল, বিকাল");
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
    fs.readFile(filePath, 'utf8', async function (err, data) {
        if (err) {
            return console.log(err);
        }
        data = data.replace(/\$OG_ROBOTS/g, `index, follow`);
        data = data.replace(/\$OG_TITLE/g, 'দ্য নিউজ ২৪ :: আর্কাইভস');
        data = data.replace(/\$OG_DESCRIPTION/g, "দ্য নিউজ ২৪ :: আর্কাইভস");
        data = data.replace(/\$OG_KEYWORDS/g, "দ্য নিউজ ২৪, পত্রিকা, বাংলাদেশ, আজকের পত্রিকা, জাতীয়, সারাদেশ, বরিশাল, চট্টগ্রাম, ঢাকা,খুলনা, রাজশাহী, সিলেট, রংপুর, ময়মনসিংহ, রাজধানী, আন্তর্জাতিক, রাজনীতি, বিনোদন , দেশি, বিদেশি, খেলা, ক্রিকেট, বিশ্বকাপ ক্রিকেট, বিশেষ কলাম, অর্থনীতি, ধর্ম, লাইফস্টাইল, ফ্যাশন, রেসিপি, সাত রঙ, সাতরঙ,  দূরবীন, প্রথম প্রহর, বইমেলা, তথ্যপ্রযুক্তি, শিক্ষাঙ্গন, আইন-আদালত, আইন আদালত, শিল্প ও সাহিত্, শিল্প সাহিত্, স্বাস্থ্য ও চিকিৎসা, স্বাস্থ্য চিকিৎসা, ফিচার, বিজ্ঞান, ভ্রমণ, মুক্তকথা, মুখোমুখি, প্রবাস জীবন, জব কর্নার, জব, মজার খবর, কার্টুন, সোশ্যাল মিডিয়া, সাইবার স্পেস, আর্কাইভ, সাহিত্য, কম্পিউটার, মোবাইল ফোন, গেমস, সরকার, অপরাধ, আইন ও বিচার, পরিবেশ, দুর্ঘটনা, সংসদ, রাজধানী, শেয়ার বাজার, বাণিজ্য, পোশাক শিল্প, ফুটবল, সকাল, বিকাল");
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
    fs.readFile(filePath, 'utf8', async function (err, data) {
        if (err) {
            return console.log(err);
        }
        data = data.replace(/\$OG_ROBOTS/g, `index, follow`);
        data = data.replace(/\$OG_TITLE/g, 'দ্য নিউজ ২৪ :: ভিডিও গ্যালারী');
        data = data.replace(/\$OG_DESCRIPTION/g, "দ্য নিউজ ২৪ :: ভিডিও গ্যালারী");
        data = data.replace(/\$OG_KEYWORDS/g, "দ্য নিউজ ২৪, পত্রিকা, বাংলাদেশ, আজকের পত্রিকা, জাতীয়, সারাদেশ, বরিশাল, চট্টগ্রাম, ঢাকা,খুলনা, রাজশাহী, সিলেট, রংপুর, ময়মনসিংহ, রাজধানী, আন্তর্জাতিক, রাজনীতি, বিনোদন , দেশি, বিদেশি, খেলা, ক্রিকেট, বিশ্বকাপ ক্রিকেট, বিশেষ কলাম, অর্থনীতি, ধর্ম, লাইফস্টাইল, ফ্যাশন, রেসিপি, সাত রঙ, সাতরঙ,  দূরবীন, প্রথম প্রহর, বইমেলা, তথ্যপ্রযুক্তি, শিক্ষাঙ্গন, আইন-আদালত, আইন আদালত, শিল্প ও সাহিত্, শিল্প সাহিত্, স্বাস্থ্য ও চিকিৎসা, স্বাস্থ্য চিকিৎসা, ফিচার, বিজ্ঞান, ভ্রমণ, মুক্তকথা, মুখোমুখি, প্রবাস জীবন, জব কর্নার, জব, মজার খবর, কার্টুন, সোশ্যাল মিডিয়া, সাইবার স্পেস, আর্কাইভ, সাহিত্য, কম্পিউটার, মোবাইল ফোন, গেমস, সরকার, অপরাধ, আইন ও বিচার, পরিবেশ, দুর্ঘটনা, সংসদ, রাজধানী, শেয়ার বাজার, বাণিজ্য, পোশাক শিল্প, ফুটবল, সকাল, বিকাল");
        data = data.replace(/\$OG_IMAGE/g, `${BEndUrl}media/common/logo-fb.png`);
        var fullUrl = request.protocol + '://' + request.hostname + (request.originalUrl).replace(/\/+$/, '');
        // var fullUrl = request.get('x-forwarded-proto') + '://' + request.get('X-Forwarded-Host') + (request.originalUrl).replace(/\/+$/, '');
        data = data.replace(/\$OG_URL/g, `${fullUrl}`);
        response.send(data);
    });
});


// app.get('/sitemap/static-sitemap.xml', function (request, response) {
//     response.setHeader('Content-Type', 'application/xml');
//     console.log('static-sitemap.xml visited!');
//     const filePath = path.resolve(__dirname, './sitemap', 'sitemap.xml');

//     fs.readFile(filePath, 'utf8', function (err, data) {
//         if (err) {
//             return console.log(err);
//         }
//         response.send(data);
//     });
// });

// app.get('/sitemap/category-sitemap.xml', function (request, response) {
//     response.setHeader('Content-Type', 'application/xml');
//     console.log('sitemap/category-sitemap.xml visited!');
//     let sql = `SELECT CategoryID, ParentID, CategoryName, Slug, created_at, updated_at FROM bn_bas_categories WHERE ShowData=1 AND Deletable=1 ORDER BY CategoryID ASC;`;
//     // console.log(sql);
//     bnConfig.query(sql, function (error, result) {
//         let xml = `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`
//         let cats = []
//         if (result && result.length > 0) {
//             for (let i = 0; i < result.length; i++) {
//                 cats[result[i].CategoryID] = result[i].Slug
//                 let lastmoddate = '';
//                 if (result[i].updated_at) {
//                     lastmoddate = result[i].updated_at;
//                 } else {
//                     lastmoddate = result[i].created_at;
//                 }
//                 let moddate = new Date(lastmoddate)

//                 xml += `<url>
//                     <loc>https://www.ekhon.tv/${result[i].ParentID==0 ? result[i].Slug : cats[result[i].ParentID]+'/sub/'+result[i].Slug}</loc>
//                     <lastmod>${moddate.toISOString()}</lastmod>
//                     <changefreq>hourly</changefreq> 
//                     <priority>0.80</priority>
//                 </url>`

//                 if (i == result.length - 1) {
//                     xml += `</urlset>`;
//                     response.send(xml);
//                 }
//             }
//         }else{
//             response.send('');
//         }
//     });
// });

// app.get('/sitemap/:dailysitemap', async function (request, response) {
//     console.log('sitemap/dailysitemap visited!');
//     let dailysitemap = request.params.dailysitemap
//     if (!dailysitemap || !dailysitemap.includes("sitemap-daily-")) {
//         return response.send({ error: true, message: 'Invalid Sitemap Request' });
//     }

//     let date = dailysitemap.replace('sitemap-daily-', '').replace('.xml', '')
//     let datearr = date.split("-")
//     let date_ob = new Date(date);
//     if (!isNaN(date_ob) && datearr.length === 3 && datearr[0].length === 4 && datearr[1].length === 2 && datearr[2].length === 2) { // d.getTime() or d.valueOf() will also work
//         // date object is valid
//         response.setHeader('Content-Type', 'application/xml');

//         let PhotoFeatureData
//         try {
//             let photosql = `SELECT photo_features.PhotoFeatureID, photo_features.PhotoFeatureTitle, photo_features.ImageSmPath, photo_features.ImageBgPath, photo_features.Caption, photo_features.created_at, photo_features.updated_at, DATE_FORMAT(photo_features.created_at, "%Y-%m-%d") as fcreated_at, DATE_FORMAT(photo_features.updated_at, "%Y-%m-%d") as fupdated_at FROM photo_features WHERE photo_features.Deletable=1 AND DATE(photo_features.created_at) = '${date}' ORDER BY photo_features.PhotoFeatureID DESC`
//             PhotoFeatureData = await mediaConfig.query( photosql );
//         }
//         catch (err) { console.log('PhotoFeatureData error'); return '<urlset xmlns:image="http://www.google.com/schemas/sitemap-image/1.1" xmlns:video="http://www.google.com/schemas/sitemap-video/1.1" xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"></urlset>'; }

//         let sql = `SELECT bn_contents.ContentID, bn_contents.ContentHeading, bn_contents.ImageBgPath, bn_contents.ImageBgPathCaption, bn_contents.created_at, bn_contents.updated_at, bn_bas_categories.Slug FROM bn_contents INNER JOIN bn_bas_categories ON bn_contents.CategoryIDs=bn_bas_categories.CategoryID WHERE bn_contents.Deletable=1 AND bn_contents.ShowContent=1 AND DATE(bn_contents.created_at) = '${date}' ORDER BY bn_contents.ContentID DESC`;
//         // console.log(sql);
//         bnConfig.query(sql, function (error, result) {
//             let xml = `<urlset xmlns:image="http://www.google.com/schemas/sitemap-image/1.1" xmlns:video="http://www.google.com/schemas/sitemap-video/1.1" xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`
//             if (result && result.length > 0) {
//                 for (let i = 0; i < result.length; i++) {
//                     let lastmoddate = '';
//                     if (result[i].updated_at) {
//                         lastmoddate = result[i].updated_at;
//                     } else {
//                         lastmoddate = result[i].created_at;
//                     }
//                     let moddate = new Date(lastmoddate)

//                     xml += `<url>
//                         <loc>https://www.ekhon.tv/${result[i].Slug}/news/${result[i].ContentID}</loc>
//                         <image:image>
//                             <image:loc>${BEndUrl}media/imgAll/${result[i].ImageBgPath}</image:loc>
//                             <image:caption>
//                                 <![CDATA[ ${(result[i].ImageBgPathCaption).replace("&", "&amp;")} ]]>
//                             </image:caption>
//                         </image:image>
//                         <changefreq>hourly</changefreq>
//                         <lastmod>${moddate.toISOString()}</lastmod>
//                     </url>`
//                 }
//             }

//             if (PhotoFeatureData && PhotoFeatureData.length > 0) {
//                 for (let i = 0; i < PhotoFeatureData.length; i++) {
//                     let lastmoddate = '';
//                     if (PhotoFeatureData[i].updated_at && PhotoFeatureData[i].updated_at != '0000-00-00 00:00:00') {
//                         lastmoddate = PhotoFeatureData[i].updated_at;
//                     } else {
//                         lastmoddate = PhotoFeatureData[i].created_at;
//                     }
//                     let moddate = new Date(lastmoddate)
//                     xml += `<url>
//                     <loc>https://www.ekhon.tv/photo-feature/news/${PhotoFeatureData[i].PhotoFeatureID}</loc>
//                         <image:image>
//                             <image:loc>${PhotoFeatureData[i].ImageBgPath ? BEndUrl+'media/imgAll/' + (PhotoFeatureData[i].ImageBgPath).replace(/&/g, "%26") : (PhotoFeatureData[i].ImageSmPath ? BEndUrl+'media/imgAll/' + (PhotoFeatureData[i].ImageSmPath).replace(/&/g, "%26") : BEndUrl+'media/common/logo-fb.png')}</image:loc>
//                             <image:caption>
//                                     <![CDATA[ ${PhotoFeatureData[i].Caption ? (PhotoFeatureData[i].Caption).replace(/&/g, "&amp;") : (PhotoFeatureData[i].PhotoFeatureTitle).replace(/&lsquo;/g, "").replace(/&rsquo;/g, "").replace(/&/g, "&amp;")} ]]>
//                                 </image:caption>
//                         </image:image>
//                         <changefreq>hourly</changefreq>
//                         <lastmod>${moddate.toISOString()}</lastmod>
//                     </url>`
//                 }
//             }

//             xml += `</urlset>`;
//             response.send(xml);
//         });
//         // console.log('valid');
//         // response.send(xml);
//     } else {
//         // date object is not valid
//         return response.send({ error: true, message: 'Invalid Sitemap Request' });
//     }

// });

// app.get('/sitemap-index.xml', function (request, response) {
//     response.setHeader('Content-Type', 'application/xml');
//     console.log('sitemap-index.xml visited!');

//     let xml = `<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
//         <sitemap>
//             <loc>https://www.ekhon.tv/sitemap/static-sitemap.xml</loc>
//         </sitemap>
//         <sitemap>
//             <loc>https://www.ekhon.tv/sitemap/category-sitemap.xml</loc>
//         </sitemap>`
//     var todate = new Date()
//     xml += `<sitemap>
//         <loc>https://www.ekhon.tv/sitemap/sitemap-daily-${todate.getFullYear()}-${todate.getMonth() < 9 ? '0' + (todate.getMonth() + 1) : todate.getMonth() + 1}-${todate.getDate() < 10 ? '0' + todate.getDate() : todate.getDate()}.xml</loc>
//         <lastmod>${todate.toISOString()}</lastmod>
//     </sitemap>`
//     todate.setHours(23, 59, 59, 999)
//     for (let i = 0; i < 30; i++) {
//         todate.setDate(todate.getDate() - 1)
//         xml += `<sitemap>
//             <loc>https://www.ekhon.tv/sitemap/sitemap-daily-${todate.getFullYear()}-${todate.getMonth() < 9 ? '0' + (todate.getMonth() + 1) : todate.getMonth() + 1}-${todate.getDate() < 10 ? '0' + todate.getDate() : todate.getDate()}.xml</loc>
//             <lastmod>${todate.toISOString()}</lastmod>
//         </sitemap>`
//     }
//     xml += `</sitemapindex>`;
//     response.send(xml);
// });

// app.get('/robots.txt', function (request, response) {
//     response.setHeader('Content-Type', 'text/plain');
//     console.log('robots.txt visited!');

//     let xml = `User-agent: *\nAllow: /\n\nSitemap: https://www.ekhon.tv/sitemap/static-sitemap.xml\nSitemap: https://www.ekhon.tv/sitemap/category-sitemap.xml\nSitemap: https://www.ekhon.tv/sitemap-index.xml\n`
//     var todate = new Date()
//     xml += `Sitemap: https://www.ekhon.tv/sitemap/sitemap-daily-${todate.getFullYear()}-${todate.getMonth() < 9 ? '0' + (todate.getMonth() + 1) : todate.getMonth() + 1}-${todate.getDate() < 10 ? '0' + todate.getDate() : todate.getDate()}.xml\n`
//     todate.setHours(23, 59, 59, 999)
//     for (let i = 0; i < 30; i++) {
//         todate.setDate(todate.getDate() - 1)
//         xml += `Sitemap: https://www.ekhon.tv/sitemap/sitemap-daily-${todate.getFullYear()}-${todate.getMonth() < 9 ? '0' + (todate.getMonth() + 1) : todate.getMonth() + 1}-${todate.getDate() < 10 ? '0' + todate.getDate() : todate.getDate()}.xml\n`
//     }
//     response.send(xml);
// });


app.get('/:catSlug', async function (request, response) {
    let catSlug = request.params.catSlug;
    console.log('Category page visited!' + catSlug);
    const filePath = path.resolve(__dirname, './build', 'index.html');

    let sql = `SELECT CategoryID, CategoryName FROM bn_bas_categories WHERE Slug=?`;
    try {
        const queryData = await bnConfig.query( sql, [catSlug] );
        if (queryData && queryData.length > 0) {
            let title = queryData[0].CategoryName;
            let keyword = title.split(" ");
            keyword = keyword.toString();
            fs.readFile(filePath, 'utf8', async function (err, data) {
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
    }
    catch (err) {
        console.log('contentDetails error');
        console.log(err);
        fs.readFile(filePath, 'utf8', function (err, data) {
            if (err) {
                return console.log(err);
            }
            data = data.replace(/\$OG_ROBOTS/g, `noindex, nofollow`);
            data = data.replace(/\$OG_TITLE/g, `404 - Nothing Found - Something Went Wrong`);
            data = data.replace(/\$OG_DESCRIPTION/g, `404 - Nothing Found - Something Went Wrong`);
            data = data.replace(/\$OG_KEYWORDS/g, `404, Nothing Found - Something Went Wrong`);
            data = data.replace(/\$OG_IMAGE/g, `${BEndUrl}media/common/logo-fb.png`);
            var fullUrl = request.protocol + '://' + request.hostname + (request.originalUrl).replace(/\/+$/, '');
            data = data.replace(/\$OG_URL/g, `${fullUrl}`);
            response.send(data);
        });
    }
});

app.get('/search/:searchSlug', function (request, response) {
    console.log('Search page visited!');
    const filePath = path.resolve(__dirname, './build', 'index.html');
    fs.readFile(filePath, 'utf8', async function (err, data) {
        if (err) {
            return console.log(err);
        }
        data = data.replace(/\$OG_ROBOTS/g, `index, follow`);
        data = data.replace(/\$OG_TITLE/g, 'খুঁজুন | খুঁজুন সর্বশেষ খবর :: দ্য নিউজ ২৪');
        data = data.replace(/\$OG_DESCRIPTION/g, "খুঁজুন | খুঁজুন সর্বশেষ খবর :: দ্য নিউজ ২৪");
        data = data.replace(/\$OG_KEYWORDS/g, "দ্য নিউজ ২৪, পত্রিকা, বাংলাদেশ, আজকের পত্রিকা, জাতীয়, সারাদেশ, বরিশাল, চট্টগ্রাম, ঢাকা,খুলনা, রাজশাহী, সিলেট, রংপুর, ময়মনসিংহ, রাজধানী, আন্তর্জাতিক, রাজনীতি, বিনোদন , দেশি, বিদেশি, খেলা, ক্রিকেট, বিশ্বকাপ ক্রিকেট, বিশেষ কলাম, অর্থনীতি, ধর্ম, লাইফস্টাইল, ফ্যাশন, রেসিপি, সাত রঙ, সাতরঙ,  দূরবীন, প্রথম প্রহর, বইমেলা, তথ্যপ্রযুক্তি, শিক্ষাঙ্গন, আইন-আদালত, আইন আদালত, শিল্প ও সাহিত্, শিল্প সাহিত্, স্বাস্থ্য ও চিকিৎসা, স্বাস্থ্য চিকিৎসা, ফিচার, বিজ্ঞান, ভ্রমণ, মুক্তকথা, মুখোমুখি, প্রবাস জীবন, জব কর্নার, জব, মজার খবর, কার্টুন, সোশ্যাল মিডিয়া, সাইবার স্পেস, আর্কাইভ, সাহিত্য, কম্পিউটার, মোবাইল ফোন, গেমস, সরকার, অপরাধ, আইন ও বিচার, পরিবেশ, দুর্ঘটনা, সংসদ, রাজধানী, শেয়ার বাজার, বাণিজ্য, পোশাক শিল্প, ফুটবল, সকাল, বিকাল");
        data = data.replace(/\$OG_IMAGE/g, `${BEndUrl}media/common/logo-fb.png`);
        var fullUrl = request.protocol + '://' + request.hostname + (request.originalUrl).replace(/\/+$/, '');
        // var fullUrl = request.get('x-forwarded-proto') + '://' + request.get('X-Forwarded-Host') + (request.originalUrl).replace(/\/+$/, '');
        data = data.replace(/\$OG_URL/g, `${fullUrl}`);
        response.send(data);
    });
});

// app.get('/:catSlug/sub/:subCatSlug', function (request, response) {
//     let catSlug = request.params.catSlug;
//     let subCatSlug = request.params.subCatSlug;
//     console.log('sub Category page visited! ' + catSlug + '/' + subCatSlug);
//     const filePath = path.resolve(__dirname, './build', 'index.html');

//     // let sql = `SELECT CategoryName FROM bn_bas_categories WHERE Slug='${subCatSlug}' AND ParentID!=0`;
//     let sql = `SELECT bn_bas_categories.CategoryID subCatID, bn_bas_categories.CategoryName subCatTitle, cat.CategoryName catTitle FROM bn_bas_categories JOIN bn_bas_categories cat ON cat.CategoryID=bn_bas_categories.ParentID WHERE bn_bas_categories.Slug='${subCatSlug}' AND bn_bas_categories.ParentID!=0`;
//     // console.log(sql);
//     bnConfig.query(sql, function (error, result) {
//         if (result && result.length > 0) {
//             // console.log('result');
//             let title = result[0].subCatTitle;
//             let keyword = title.split(" ");
//             keyword = keyword.toString();
//             fs.readFile(filePath, 'utf8', async function (err, data) {
//                 if (err) {
//                     return console.log(err);
//                 }
//                 data = data.replace(/\$OG_ROBOTS/g, `index, follow`);
//                 data = data.replace(/\$OG_TITLE/g, `${title}`);
//                 data = data.replace(/\$OG_DESCRIPTION/g, `${title}`);
//                 data = data.replace(/\$OG_KEYWORDS/g, `${keyword}`);
//                 data = data.replace(/\$OG_IMAGE/g, `${BEndUrl}media/common/logo-fb.png`);
//                 var fullUrl = request.protocol + '://' + request.get('host') + (request.originalUrl).replace(/\/+$/, '');
//                 data = data.replace(/\$OG_URL/g, `${fullUrl}`);
//                 response.send(data);
//             });
//         } else {
//             fs.readFile(filePath, 'utf8', function (err, data) {
//                 if (err) {
//                     return console.log(err);
//                 }
//                 data = data.replace(/\$OG_ROBOTS/g, `noindex, nofollow`);
//                 data = data.replace(/\$OG_TITLE/g, `404 - Nothing Found`);
//                 data = data.replace(/\$OG_DESCRIPTION/g, `404 - Nothing Found`);
//                 data = data.replace(/\$OG_KEYWORDS/g, `404, Nothing Found`);
//                 data = data.replace(/\$OG_IMAGE/g, `${BEndUrl}media/common/logo-fb.png`);
//                 var fullUrl = request.protocol + '://' + request.get('host') + (request.originalUrl).replace(/\/+$/, '');
//                 data = data.replace(/\$OG_URL/g, `${fullUrl}`);
//                 response.send(data);
//             });
//         }
//     })
// });

app.get('/divisions/:divisionSlug', async function (request, response) {
    let divisionSlug = request.params.divisionSlug;
    console.log('Division page visited!' + divisionSlug);
    const filePath = path.resolve(__dirname, './build', 'index.html');

    let sql = `SELECT DivisionID, DivisionSlug, DivisionNameBn, DivisionName FROM bas_divisions WHERE DivisionSlug=?`;
    try {
        const queryData = await bnConfig.query( sql, [divisionSlug] );

        if (queryData && queryData.length > 0) {
            let title = queryData[0].DivisionName;
            let keyword = title.split(" ");
            keyword = keyword.toString();
            fs.readFile(filePath, 'utf8', async function (err, data) {
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
    }
    catch (err) {
        console.log('contentDetails error');
        console.log(err);
        fs.readFile(filePath, 'utf8', function (err, data) {
            if (err) {
                return console.log(err);
            }
            data = data.replace(/\$OG_ROBOTS/g, `noindex, nofollow`);
            data = data.replace(/\$OG_TITLE/g, `404 - Nothing Found - Something Went Wrong`);
            data = data.replace(/\$OG_DESCRIPTION/g, `404 - Nothing Found - Something Went Wrong`);
            data = data.replace(/\$OG_KEYWORDS/g, `404, Nothing Found - Something Went Wrong`);
            data = data.replace(/\$OG_IMAGE/g, `${BEndUrl}media/common/logo-fb.png`);
            var fullUrl = request.protocol + '://' + request.hostname + (request.originalUrl).replace(/\/+$/, '');
            data = data.replace(/\$OG_URL/g, `${fullUrl}`);
            response.send(data);
        });
    }
});

app.get('/writers/:WriterSlug', async function (request, response) {
    let WriterSlug = request.params.WriterSlug;
    console.log('Writers page visited!' + WriterSlug);
    const filePath = path.resolve(__dirname, './build', 'index.html');

    let sql = `SELECT * FROM bn_writers WHERE Slug=?`;
    try {
        const queryData = await bnConfig.query( sql, [WriterSlug] );

        if (queryData && queryData.length > 0) {
            let title = queryData[0].WriterName;
            let keyword = title.split(" ");
            keyword = keyword.toString();
            fs.readFile(filePath, 'utf8', async function (err, data) {
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
    }
    catch (err) {
        console.log('contentDetails error');
        console.log(err);
        fs.readFile(filePath, 'utf8', function (err, data) {
            if (err) {
                return console.log(err);
            }
            data = data.replace(/\$OG_ROBOTS/g, `noindex, nofollow`);
            data = data.replace(/\$OG_TITLE/g, `404 - Nothing Found - Something Went Wrong`);
            data = data.replace(/\$OG_DESCRIPTION/g, `404 - Nothing Found - Something Went Wrong`);
            data = data.replace(/\$OG_KEYWORDS/g, `404, Nothing Found - Something Went Wrong`);
            data = data.replace(/\$OG_IMAGE/g, `${BEndUrl}media/common/logo-fb.png`);
            var fullUrl = request.protocol + '://' + request.hostname + (request.originalUrl).replace(/\/+$/, '');
            data = data.replace(/\$OG_URL/g, `${fullUrl}`);
            response.send(data);
        });
    }
});

app.get('/tags/:TagTitle', async function (request, response) {
    let TagTitle = request.params.TagTitle;
    console.log('Tags page visited!' + TagTitle);
    const filePath = path.resolve(__dirname, './build', 'index.html');

    let sql = `SELECT * FROM bn_tags WHERE TagName=?`;
    try {
        const queryData = await bnConfig.query( sql, [TagTitle] );

        if (queryData && queryData.length > 0) {
            let title = queryData[0].TagName;
            let keyword = title.split(" ");
            keyword = keyword.toString();
            fs.readFile(filePath, 'utf8', async function (err, data) {
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
    }catch (err) {
        console.log('contentDetails error');
        console.log(err);
        fs.readFile(filePath, 'utf8', function (err, data) {
            if (err) {
                return console.log(err);
            }
            data = data.replace(/\$OG_ROBOTS/g, `noindex, nofollow`);
            data = data.replace(/\$OG_TITLE/g, `404 - Nothing Found - Something Went Wrong`);
            data = data.replace(/\$OG_DESCRIPTION/g, `404 - Nothing Found - Something Went Wrong`);
            data = data.replace(/\$OG_KEYWORDS/g, `404, Nothing Found - Something Went Wrong`);
            data = data.replace(/\$OG_IMAGE/g, `${BEndUrl}media/common/logo-fb.png`);
            var fullUrl = request.protocol + '://' + request.hostname + (request.originalUrl).replace(/\/+$/, '');
            data = data.replace(/\$OG_URL/g, `${fullUrl}`);
            response.send(data);
        });
    }
});

app.get('/photo-feature/news/:photoID', async function (request, response) {
    let photoID = request.params.photoID;
    console.log('Photo Feature Detail page visited!' + photoID);
    const filePath = path.resolve(__dirname, './build', 'index.html');

    let sql = `SELECT photo_features.PhotoFeatureID, photo_features.PhotoFeatureTitle, photo_features.Writer, photo_features.ShortBrief, ImageBgPath, ImageSmPath, Caption, ImageSource, photo_features.created_at as create_date, photo_features.updated_at as updated_date FROM photo_features WHERE photo_features.Deletable=1 AND photo_features.PhotoFeatureID=? LIMIT 1;`;
    try {
        const queryData = await mediaConfig.query( sql, [photoID] );

        if (queryData && queryData.length > 0) {
            let title = queryData[0].PhotoFeatureTitle;
            let description = queryData[0].ShortBrief;
            if (!description) {
                description = title
            } else {
                description = (queryData[0].ShortBrief).replace(/(<([^>]+)>)/ig, '')
            }
            let image = '';
            image = queryData[0].ImageBgPath
            let keyword = '';
            keyword = title.split(" ");
            keyword = keyword.toString();
            fs.readFile(filePath, 'utf8', async function (err, data) {
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
    }catch (err) {
        console.log('contentDetails error');
        console.log(err);
        fs.readFile(filePath, 'utf8', function (err, data) {
            if (err) {
                return console.log(err);
            }
            data = data.replace(/\$OG_ROBOTS/g, `noindex, nofollow`);
            data = data.replace(/\$OG_TITLE/g, `404 - Nothing Found - Something Went Wrong`);
            data = data.replace(/\$OG_DESCRIPTION/g, `404 - Nothing Found - Something Went Wrong`);
            data = data.replace(/\$OG_KEYWORDS/g, `404, Nothing Found - Something Went Wrong`);
            data = data.replace(/\$OG_IMAGE/g, `${BEndUrl}media/common/logo-fb.png`);
            var fullUrl = request.protocol + '://' + request.hostname + (request.originalUrl).replace(/\/+$/, '');
            data = data.replace(/\$OG_URL/g, `${fullUrl}`);
            response.send(data);
        });
    }
});

app.get('/:catSlug/news/:id', async function (request, response) {
    let catSlug = request.params.catSlug;
    let id = request.params.id;
    console.log('Detail page visited!' + catSlug + ' ' + id);
    const filePath = path.resolve(__dirname, './build', 'index.html');

    let sql = `SELECT bn_contents.ContentID, bn_contents.CategoryIDs, bn_contents.ContentHeading, bn_contents.CategoryIDs, bn_contents.ContentSubHeading, bn_contents.DetailsHeading, bn_contents.ContentShoulder, bn_contents.WriterID, bn_contents.ReporterID, bn_contents.DistCorsID, bn_contents.SubEditorID, bn_contents.WriterName, bn_contents.ContentBrief, bn_contents.ContentDetails, bn_contents.ImageSmPath, bn_contents.ImageSmPathCaption, bn_contents.ImageBgPath, bn_contents.ImageBgPathCaption, bn_contents.Tags, bn_contents.RelNews, bn_contents.RelNewsIDs, bn_contents.InvolvedNews, bn_contents.InvolvedIDs, bn_contents.VideoSource AS Source, bn_contents.VideoID, bn_contents.VideoPath, bn_contents.VideoType, bn_contents.ShowVideo, bn_contents.URLAlies, bn_contents.Keywords, bn_contents.PlateType, bn_contents.ImagePlatePath, bn_contents.Initial, bn_contents.VideoID, bn_contents.VideoPath, bn_contents.VideoType, bas_districts.DistrictNameBn, bas_districts.DistrictSlug, bn_contents.created_at as create_date, bn_contents.updated_at as updated_date FROM bn_contents LEFT JOIN bas_districts ON bn_contents.DistrictID=bas_districts.DistrictID WHERE bn_contents.ContentID=? AND bn_contents.ShowContent=1 AND bn_contents.Deletable=1`;

    try { const contentDetails = await bnConfig.query( sql, [id] );
        if (contentDetails && contentDetails.length > 0) {

            let categoryCheck;
            try { categoryCheck = await bnConfig.query( 'SELECT CategoryID, CategoryName, Slug FROM bn_bas_categories WHERE Slug=?', [catSlug] );
                // console.log(typeof categoryCheck);
            }
            catch (err) { console.log('categoryCheck error'); return ''; }
            // try { categoryCheck = await bnConfig.query( 'SELECT CategoryName, Slug FROM bn_bas_categories WHERE CategoryID IN (?)', [contentDetails[0].CategoryIDs] );
            //     // console.log(typeof categoryCheck);
            // }
            // catch (err) { console.log('categoryCheck error'); return ''; }

            if (categoryCheck && categoryCheck.length > 0) {
                let categoryMatched = false
                let categoryCheckValues=(contentDetails[0].CategoryIDs).split(",");
                if(categoryCheckValues.includes((categoryCheck[0].CategoryID).toString())){categoryMatched=true}
                // // let categoryCheckValues = [];
                // // let categoryCheckValues = Object.values(categoryCheck.Slug);
                // for (let i = 0; i < categoryCheckValues.length; i++) {
                //     if(categoryCheck[i].Slug==catSlug){ categoryMatched=true; break; }
                // }
                // // console.log(categoryCheckValues);

                if(categoryMatched){
                    let title = contentDetails[0].ContentHeading;
                    let description = contentDetails[0].ContentBrief;
                    if (!description) {
                        description = title
                    } else {
                        description = (contentDetails[0].ContentBrief).replace(/(<([^>]+)>)/ig, '')
                    }
                    let image = '';
                    if (contentDetails[0].PlateType > 0) {
                        image = contentDetails[0].ImagePlatePath;
                    } else {
                        image = contentDetails[0].ImageBgPath
                    }
                    let keyword = '';
                    if (contentDetails[0].Keywords) {
                        keyword = contentDetails[0].Keywords
                    } else {
                        keyword = title.split(" ");
                        keyword = keyword.toString();
                    }
                    fs.readFile(filePath, 'utf8', async function (err, data) {
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
                }else{
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
                        return response.send(data);
                    });
                }
            }else{
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
                    return response.send(data);
                });
            }
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
    }
    catch (err) {
        console.log('contentDetails error');
        console.log(err);
        fs.readFile(filePath, 'utf8', function (err, data) {
            if (err) {
                return console.log(err);
            }
            data = data.replace(/\$OG_ROBOTS/g, `noindex, nofollow`);
            data = data.replace(/\$OG_TITLE/g, `404 - Nothing Found - Something Went Wrong`);
            data = data.replace(/\$OG_DESCRIPTION/g, `404 - Nothing Found - Something Went Wrong`);
            data = data.replace(/\$OG_KEYWORDS/g, `404, Nothing Found - Something Went Wrong`);
            data = data.replace(/\$OG_IMAGE/g, `${BEndUrl}media/common/logo-fb.png`);
            var fullUrl = request.protocol + '://' + request.hostname + (request.originalUrl).replace(/\/+$/, '');
            data = data.replace(/\$OG_URL/g, `${fullUrl}`);
            response.send(data);
        });
    }
});

// app.get('/video/cat/:vdoSlug', async function (request, response) {
//     let vdoSlug = request.params.vdoSlug;
//     console.log('video cat page visited!' + vdoSlug);
//     const filePath = path.resolve(__dirname, './build', 'index.html');

//     let sql = `SELECT CategoryID, CategoryName FROM tv_webtv_categories WHERE Slug=? LIMIT 1`;
//     try {
//         const queryData = await mediaConfig.query( sql, [vdoSlug] );

//         if (queryData && queryData.length > 0) {
//             let title = queryData[0].CategoryName;
//             let keyword = title.split(" ");
//             keyword = keyword.toString();
//             let description = queryData[0].CategoryName;
//             fs.readFile(filePath, 'utf8', async function (err, data) {
//                 if (err) {
//                     return console.log(err);
//                 }
//                 data = data.replace(/\$OG_ROBOTS/g, `index, follow`);
//                 data = data.replace(/\$OG_TITLE/g, `${title}`);
//                 data = data.replace(/\$OG_DESCRIPTION/g, `${description}`);
//                 data = data.replace(/\$OG_KEYWORDS/g, `${keyword}`);
//                 data = data.replace(/\$OG_IMAGE/g, `${BEndUrl}media/common/logo-fb.png`);
//                 var fullUrl = request.protocol + '://' + request.hostname + (request.originalUrl).replace(/\/+$/, '');
//                 data = data.replace(/\$OG_URL/g, `${fullUrl}`);
//                 response.send(data);
//             });
//         } else {
//             fs.readFile(filePath, 'utf8', function (err, data) {
//                 if (err) {
//                     return console.log(err);
//                 }
//                 data = data.replace(/\$OG_ROBOTS/g, `noindex, nofollow`);
//                 data = data.replace(/\$OG_TITLE/g, `404 - Nothing Found`);
//                 data = data.replace(/\$OG_DESCRIPTION/g, `404 - Nothing Found`);
//                 data = data.replace(/\$OG_KEYWORDS/g, `404, Nothing Found`);
//                 data = data.replace(/\$OG_IMAGE/g, `${BEndUrl}media/common/logo-fb.png`);
//                 var fullUrl = request.protocol + '://' + request.hostname + (request.originalUrl).replace(/\/+$/, '');
//                 data = data.replace(/\$OG_URL/g, `${fullUrl}`);
//                 response.send(data);
//             });
//         }
//     }catch (err) {
//         console.log('contentDetails error');
//         console.log(err);
//         fs.readFile(filePath, 'utf8', function (err, data) {
//             if (err) {
//                 return console.log(err);
//             }
//             data = data.replace(/\$OG_ROBOTS/g, `noindex, nofollow`);
//             data = data.replace(/\$OG_TITLE/g, `404 - Nothing Found - Something Went Wrong`);
//             data = data.replace(/\$OG_DESCRIPTION/g, `404 - Nothing Found - Something Went Wrong`);
//             data = data.replace(/\$OG_KEYWORDS/g, `404, Nothing Found - Something Went Wrong`);
//             data = data.replace(/\$OG_IMAGE/g, `${BEndUrl}media/common/logo-fb.png`);
//             var fullUrl = request.protocol + '://' + request.hostname + (request.originalUrl).replace(/\/+$/, '');
//             data = data.replace(/\$OG_URL/g, `${fullUrl}`);
//             response.send(data);
//         });
//     }
// });

app.get('/video/show/:vdoID', async function (request, response) {
    let vdoID = request.params.vdoID;
    console.log('video details page visited!' + vdoID);
    const filePath = path.resolve(__dirname, './build', 'index.html');

    let sql = `SELECT tv_webtvs.*, tv_webtv_categories.Slug catSlug FROM tv_webtvs JOIN tv_webtv_categories ON tv_webtv_categories.CategoryID=tv_webtvs.CategoryID WHERE tv_webtvs.WebTVID=? LIMIT 1`;
    try {
        const queryData = await mediaConfig.query( sql, [vdoID] );
        
        if (queryData && queryData.length > 0) {
            let title = queryData[0].WebTVHeading;
            let keyword = title.split(" ");
            keyword = keyword.toString();
            let description = queryData[0].WebTVHeading;
            let image = queryData[0].WebTVLinkCode;
            fs.readFile(filePath, 'utf8', async function (err, data) {
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
    }catch (err) {
        console.log('contentDetails error');
        console.log(err);
        fs.readFile(filePath, 'utf8', function (err, data) {
            if (err) {
                return console.log(err);
            }
            data = data.replace(/\$OG_ROBOTS/g, `noindex, nofollow`);
            data = data.replace(/\$OG_TITLE/g, `404 - Nothing Found - Something Went Wrong`);
            data = data.replace(/\$OG_DESCRIPTION/g, `404 - Nothing Found - Something Went Wrong`);
            data = data.replace(/\$OG_KEYWORDS/g, `404, Nothing Found - Something Went Wrong`);
            data = data.replace(/\$OG_IMAGE/g, `${BEndUrl}media/common/logo-fb.png`);
            var fullUrl = request.protocol + '://' + request.hostname + (request.originalUrl).replace(/\/+$/, '');
            data = data.replace(/\$OG_URL/g, `${fullUrl}`);
            response.send(data);
        });
    }
});

app.get('/divisions/:divisionSlug/:districtSlug', async function (request, response) {
    let divisionSlug = request.params.divisionSlug;
    let districtSlug = request.params.districtSlug;
    console.log('District page visited!' + divisionSlug + ' ' + districtSlug);
    const filePath = path.resolve(__dirname, './build', 'index.html');

    let sql = `SELECT bas_districts.DistrictID, bas_districts.DistrictNameBN FROM bas_districts WHERE bas_districts.DistrictSlug=?`;
    try {
        const queryData = await bnConfig.query( sql, [districtSlug] );
        
        if (queryData && queryData.length > 0) {
            let title = queryData[0].DistrictNameBN;
            let keyword = title.split(" ");
            keyword = keyword.toString();
            fs.readFile(filePath, 'utf8', async function (err, data) {
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
    }catch (err) {
        console.log('contentDetails error');
        console.log(err);
        fs.readFile(filePath, 'utf8', function (err, data) {
            if (err) {
                return console.log(err);
            }
            data = data.replace(/\$OG_ROBOTS/g, `noindex, nofollow`);
            data = data.replace(/\$OG_TITLE/g, `404 - Nothing Found - Something Went Wrong`);
            data = data.replace(/\$OG_DESCRIPTION/g, `404 - Nothing Found - Something Went Wrong`);
            data = data.replace(/\$OG_KEYWORDS/g, `404, Nothing Found - Something Went Wrong`);
            data = data.replace(/\$OG_IMAGE/g, `${BEndUrl}media/common/logo-fb.png`);
            var fullUrl = request.protocol + '://' + request.hostname + (request.originalUrl).replace(/\/+$/, '');
            data = data.replace(/\$OG_URL/g, `${fullUrl}`);
            response.send(data);
        });
    }
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

httpServer.listen(FEndPort, function () {
    console.log('Node app is running on port '+FEndPort);
});
// httpsServer.listen(3400, function () {
//     console.log('Node app is running on port 3400');
// });

module.exports = app;