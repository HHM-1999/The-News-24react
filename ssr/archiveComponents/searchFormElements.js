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

        html += `<form class="form-inline">
            <div class="form-group clearfix">
                <div class="row">
                    <div class="col-sm-4 my-2">
                        <label htmlFor="start_date">  তারিখ হতে :</label>
                        <input type="date" class="form-control hasDatepicker" id="datepicker" name="start_date" />
                    </div>
                    <div class="col-sm-4 my-2">
                        <label htmlFor="end_date">  তারিখ পর্যন্ত :</label>
                        <input type="date" id="datepickerto" name="end_date" class="form-control hasDatepicker" />
                    </div>
                    <div class="col-sm-4 my-2">
                        <label htmlFor="category_name">  সব ক্যাটাগরি :</label>
                        <select value="0" name="category_name" class="form-control cboCatName">
                            <option value="0" disabled>সকল খবর</option>
                            ${cat1News}
                        </select>
                    </div>
                </div>
            </div>
            <div id="btnDiv" class="text-center my-4">
                <button type="submit" name="btnSubmit" class="btn btn-lg btn-block ButtonBG">
                    খুঁজুন
                </button>
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