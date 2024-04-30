const dbConfig = require("./dbCon/dbConfig");
const genConfig = dbConfig.genConfig();
require('dotenv').config();

const staticElements = require("./staticElements");
const latestPopularSectionElements = require("./categoryComponents/latestPopularElements");

async function onlinePollElement() {
    let latestPopularComponent;
    try { latestPopularComponent = await latestPopularSectionElements.latestPopularSectionElement(); }
    catch (err) { console.log('latestPopularComponent error'); return ''; }

    try { const pollRes = await genConfig.query( 'SELECT * FROM polls WHERE Deletable=1 ORDER BY PollID DESC' );

        let html = ''
        let cathtml1 = ''

        for (let i = 0; i < pollRes.length; i++) {
            cathtml1 += `<tbody>
                <tr>
                    <td>${pollRes[i].QuestionBn}</td>
                    <td>${staticElements.toBengaliNumber(pollRes[i].Yes)}</td>
                    <td>${staticElements.toBengaliNumber(pollRes[i].No)}</td>
                    <td>${staticElements.toBengaliNumber(pollRes[i].NoComments)}</td>
                </tr>
            </tbody>`
        }

        html += `<div className="container">
            <div className="TopHomeSection"></div>
            <h2 className="DTitle"><a href="/pollresult"><span className="DTitleInner"><span className="DTitleInnerBar"><span>অনলাইন জরিপ</span></span></span></a></h2>
            <div className="row mt-5">
                <div className="col-lg-9 col-sm-12 border-right-inner1">
                    <div className="row">
                        <div className="col-sm-12">
                            <table className="table table-hover">
                                <thead>
                                    <tr>
                                        <th style="width: 70%;">প্রশ্ন</th>
                                        <th>হ্যাঁ</th>
                                        <th>না</th>
                                        <th>মন্তব্য নেই</th>
                                    </tr>
                                </thead>
                                ${cathtml1}
                            </table>
                        </div>
                    </div>
                </div>
                <div className="col-lg-3 col-sm-12 mb-5">${latestPopularComponent}</div>
                </div>
            </div>
        </main >`

        return html
    }
    catch (err) { console.log('pollRes error'); return ''; }
}

module.exports = { onlinePollElement };