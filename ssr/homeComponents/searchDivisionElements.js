const dbConfig = require("../dbCon/dbConfig");
const bnConfig = dbConfig.bnConfig();
require('dotenv').config();

async function searchDivisionSectionElement() {
    try {
        const divisionList = await bnConfig.query( 'SELECT * FROM bas_divisions ORDER BY DivisionPosition ASC' );

        let html = ''
        let divisionhtml = ''

        for (let i = 0; i < divisionList.length; i++) {
            divisionhtml += `<option id="${divisionList[i].DivisionID}" value="${divisionList[i].DivisionSlug}">${divisionList[i].DivisionNameBn}</option>`
        }

        html += `<div class="AreaSearch">
            <div class="DescTitle"><span class="ColorBox"></span>
                <h2>আপনার জেলার খবর</h2>
            </div>
            <form action="/countries">
                <div class="row form-group">
                    <div class="col-md-12 mt-1"><label for="division"
                        class="sr-only">বিভাগ</label>
                        <select class="form-control" value="0" name="division" id="division">
                            <option value="0" disabled="">--বিভাগ--</option>
                            ${divisionhtml}
                        </select>
                    </div>
                    <div class="col-md-12 mt-2"><label for="district"
                        class="sr-only">জেলা</label>
                        <select class="form-control" name="district" id="district" value="0">
                            <option value="0" disabled="">--জেলা--</option>
                        </select>
                    </div>
                    <div class="col-md-12 mt-2">
                        <button type="submit" id="button" class="btn btn-block" disabled="true">অনুসন্ধান করুন</button></div>
                </div>
            </form>
        </div>`
        return html;
    } catch (err) {
        // Handle Error Here
        console.error(err);
        return '';
    }
}

module.exports = { searchDivisionSectionElement };