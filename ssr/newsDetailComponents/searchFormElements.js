const dbConfig = require("../dbCon/dbConfig");
const bnConfig = dbConfig.bnConfig();
require('dotenv').config();

async function searchFormSectionElement() {
    try {
        const allCategoryList = await bnConfig.query( 'SELECT * FROM bn_bas_categories WHERE Deletable=1 AND ParentID=0' );

        let html = ''
        let cat1News = ''

        for (let i = 0; i < allCategoryList.length; i++) {
            cat1News += `<option value="${allCategoryList[i].CategoryID}">${allCategoryList[i].CategoryName}</option>`
        }

        html += `<form class="DetailsTop-Form">
            <div class="row">
                <div class="col-lg-4 col-12 my-2">
                    <select value="0" name="category_name" class="form-control searchNews MLeftMargin">
                        <option value="0" disabled>সব খবর এখানে খুজুন</option>${cat1News}
                    </select>
                </div>
                <div class="col-lg-3 col-12 my-2 Tcenter">
                    <label for="start_date"> তারিখ </label>
                    <input type="date" class="form-control hasDatepicker" id="datepicker" name="start_date" />
                </div>
                <div class="col-lg-3 col-12 my-2 Tcenter2">
                    <label for="end_date"> থেকে </label>
                    <input type="date" id="datepickerto" name="end_date" class="form-control hasDatepicker" />
                </div>
                <div class="col-lg-2 col-12 my-2">
                    <div id="btnDiv" class="text-center">
                        <button type="submit" name="btnSubmit" class="btn btn-danger ButtonBG">খুঁজুন</button>
                    </div>
                </div>
            </div>
        </form>`
        return html;
    } catch (err) {
        // Handle Error Here
        console.error(err);
        return '';
    }
}

module.exports = { searchFormSectionElement };