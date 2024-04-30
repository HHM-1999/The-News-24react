const dbConfig = require("../dbCon/dbConfig");
const genConfig = dbConfig.genConfig();
require('dotenv').config();

const staticElements = require("../staticElements");

async function pollElement() {
    try {
        const activePollRes = await genConfig.query( 'SELECT * FROM polls WHERE Deletable=1 ORDER BY PollID DESC LIMIT 1' );
        // console.log(activePollRes);

        let html = ''
        if (activePollRes.length > 0) {
            html += `<div class="DOnlineVote">
                <div class="SPSecTitle3"><h2><i class="fas fa-question-circle" aria-hidden="true"></i> অনলাইন জরিপ </h2></div>
                <div id="opinion-submit-msg" class="opinion-submit-msg" style="display: none;"><h4>আপনার মতামত জমা দেওয়া হয়েছে</h4></div>
                <div class="Question">
                    <h3>${activePollRes[0].QuestionBn}</h3>
                    <form>
                        <div class="VoteAnswer">
                            <div class="d-flex justify-content-between;">
                                <label class="form-check-label" for="radio1"><input type="radio" id="radio1" class="form-check-input" name="rdoPoll" value="1" /> হ্যাঁ</label>
                                <p>${staticElements.toBengaliNumber(activePollRes[0].Yes)}%</p>
                            </div>
                            <div class="d-flex justify-content-between;">
                                <label class="form-check-label" for="radio2"><input type="radio" id="radio2" class="form-check-input" name="rdoPoll" value="2" /> না</label>
                                <p>${staticElements.toBengaliNumber(activePollRes[0].No)}%</p>
                            </div>
                            <div class="d-flex justify-content-between;">
                                <label class="form-check-label" for="radio3"><input type="radio" id="radio3" class="form-check-input" name="rdoPoll" value="3" /> মন্তব্য নেই</label>
                                <p>${staticElements.toBengaliNumber(activePollRes[0].NoComments)}%</p>
                            </div>
                        </div>
                        <div class="VoteSubmit">
                            <button type="submit" name="submit" class="btn btn-success">ভোট দিন</button>
                        </div>
                        <div class="VoteSubmit">
                            <a href="/pollresult" class="btn btn-success">পুরোনো ফলাফল</a>
                        </div>
                    </form>
                </div>
            </div>`
        }

        return html;
    } catch (err) {
        // Handle Error Here
        console.error(err);
        return '';
    }
}

module.exports = { pollElement };