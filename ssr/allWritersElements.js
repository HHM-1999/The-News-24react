const dbConfig = require("./dbCon/dbConfig");
const bnConfig = dbConfig.bnConfig();
require('dotenv').config();

async function allWritersElement() {
    try { const writerRes = await bnConfig.query( 'SELECT * FROM bn_writers WHERE Deletable=1 ORDER BY WriterID DESC' );

        let html = ''
        let cathtml1 = ''

        for (let i = 0; i < writerRes.length; i++) {
            cathtml1 += `<li class="col-lg-4 col-sm-6 col-12">
                <div class="DTagListItem">
                    <a href="${'/writers/' + writerRes[i].Slug}">
                        <div class="Desc">
                            <h2 class="Title">${writerRes[i].WriterName} || <span>${writerRes[i].WriterNameEn}</span></h2>
                        </div>
                    </a>
                </div>
            </li>`
        }

        html += `<main>
            <div class="container">
                <div class="TopHomeSection"></div>
                <h2 class="DTitle">
                    <a href="#">
                        <span class="DTitleInner"><span class="DTitleInnerBar"><span>লেখক সমূহ</span></span></span>
                    </a>
                </h2>
                <div class="DTagListArea mb-5">
                    <ul class="row">${cathtml1}</ul>
                </div>
            </div>
        </main>`

        return html
    }
    catch (err) { console.log('writerRes error'); return ''; }
}

module.exports = { allWritersElement };