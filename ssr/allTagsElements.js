const dbConfig = require("./dbCon/dbConfig");
const bnConfig = dbConfig.bnConfig();
require('dotenv').config();

async function allTagsElement() {
    try { const tagRes = await bnConfig.query( 'SELECT * FROM bn_tags WHERE Deletable=1 ORDER BY TagID DESC' );

        let html = ''
        let cathtml1 = ''

        for (let i = 0; i < tagRes.length; i++) {
            cathtml1 += `<li class="col-lg-4 col-sm-6 col-12">
                <div class="DTagListItem">
                    <a href="${'/tags/' + tagRes[i].TagName}">
                        <div class="Desc">
                            <h2 class="Title">${tagRes[i].TagName}</h2>
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
                        <span class="DTitleInner"><span class="DTitleInnerBar"><span>ট্যাগ সমূহ</span></span></span>
                    </a>
                </h2>
                <div class="DTagListArea mb-5">
                    <ul class="row">${cathtml1}</ul>
                </div>
            </div>
        </main>`

        return html
    }
    catch (err) { console.log('tagRes error'); return ''; }
}

module.exports = { allTagsElement };