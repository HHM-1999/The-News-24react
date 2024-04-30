const dbConfig = require("../dbCon/dbConfig");
const bnConfig = dbConfig.bnConfig();
require('dotenv').config();

async function writerInfoSectionElement(WriterID, WriterName) {
    try {
        const writerInfo = await bnConfig.query( 'SELECT * FROM bn_writers WHERE WriterID=? AND Deletable=1 LIMIT 1', [WriterID] );

        let html = ''

        if(writerInfo && writerInfo.length>0){
            html+=`<div class="WritterName mt-2">
                <p>
                    <a href="${"/writers/" + writerInfo[0].Slug}">
                        <i class="fa-solid fa-pen"></i>
                        ${writerInfo[0].WriterName}
                    </a>
                    <span class='DInitial'>, এখন টিভি</span>
                </p>
            </div>`
        }else{
            html+=`<div class="WritterName mt-2"><p><i class="fa-solid fa-pen"></i> ${WriterName}<span class='DInitial'>, এখন টিভি</span></p></div>`
        }
        return html;
    } catch (err) {
        // Handle Error Here
        console.error(err);
        return '';
    }
}

module.exports = { writerInfoSectionElement };