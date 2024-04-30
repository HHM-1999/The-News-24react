const axios = require('axios').default;
require('dotenv').config();

const staticElements = require("../staticElements");

async function namazSectionElement() {
    const d = new Date();
    let daynum = d.getDay();
    let dayname = ''
    if(daynum==0){dayname='রোববার'}else if(daynum==1){dayname='সোমবার'}else if(daynum==2){dayname='মঙ্গলবার'}else if(daynum==3){dayname='বুধবার'}else if(daynum==4){dayname='বৃহস্পতিবার'}else if(daynum==5){dayname='শুক্রবার'}else if(daynum==6){dayname='শনিবার'}
    let day = d.getDate();
    if(day <= 9){ day = '0'+day}
    let month = d.getMonth()+1;
    let monthname = ''
    if(month == 1){ monthname = 'জানুয়ারি'}else if(month == 2){ monthname = 'ফেব্রুয়ারি'}else if(month == 3){ monthname = 'মার্চ'}else if(month == 4){ monthname = 'এপ্রিল'}else if(month == 5){ monthname = 'মে'}else if(month == 6){ monthname = 'জুন'}else if(month == 7){ monthname = 'জুলাই'}else if(month == 8){ monthname = 'আগস্ট'}else if(month == 9){ monthname = 'সেপ্টেম্বর'}else if(month == 10){ monthname = 'অক্টোবর'}else if(month == 11){ monthname = 'নভেম্বর'}else if(month == 12){ monthname = 'ডিসেম্বর'}
    if(month <= 9){ month = '0'+month}
    let year = d.getFullYear();
    let currentNamaz = year+'-'+month+'-'+day

    try {
        const namaz = await axios.get(`https://www.emythmakers.com/namazapi/date/${currentNamaz}`,
        { headers: { Accesstoken: `6360c5d62956b` } });
        // console.log(namaz.data);

        let html = ''

        let FajrArr=namaz.data.prayertimes.Fajr.split(':')
        let Fajr=(FajrArr[0] % 12 ? ("0" + (FajrArr[0] % 12)).slice(-2) : 12)+':'+FajrArr[1]
        let DhuhrArr=namaz.data.prayertimes.Dhuhr.split(':')
        let Dhuhr=(DhuhrArr[0] % 12 ? ("0" + (DhuhrArr[0] % 12)).slice(-2) : 12)+':'+DhuhrArr[1]
        let AsrArr=namaz.data.prayertimes.Asr.split(':')
        let Asr=(AsrArr[0] % 12 ? ("0" + (AsrArr[0] % 12)).slice(-2) : 12)+':'+AsrArr[1]
        let MaghribArr=namaz.data.prayertimes.Maghrib.split(':')
        let Maghrib=(MaghribArr[0] % 12 ? ("0" + (MaghribArr[0] % 12)).slice(-2) : 12)+':'+MaghribArr[1]
        let IshaArr=namaz.data.prayertimes.Isha.split(':')
        let Isha=(IshaArr[0] % 12 ? ("0" + (IshaArr[0] % 12)).slice(-2) : 12)+':'+IshaArr[1]

        if(namaz.data.prayertimes){
            html += `<div class="DPrayer table-responsive mt-3">
                <div class="DHeadTop">
                    <p>নামাজের সময়সূচি</p>
                </div>
                <table class="table table-striped table-bordered text-center mb-0">
                    <thead>
                        <tr>
                            <th scope="col">ওয়াক্ত</th>
                            <th scope="col">সময়সূচি</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>ফজর</td>
                            <td>${staticElements.toBengaliNumber(Fajr)} ভোর </td>
                        </tr>
                        <tr>
                            <td>যোহর</td>
                            <td>${staticElements.toBengaliNumber(Dhuhr)} দুপুর </td>
                        </tr>
                        <tr>
                            <td>আছর</td>
                            <td>${staticElements.toBengaliNumber(Asr)} বিকেল</td>
                        </tr>
                        <tr>
                            <td>মাগরিব</td>
                            <td>${staticElements.toBengaliNumber(Maghrib)} সন্ধ্যা</td>
                        </tr>
                        <tr>
                            <td>ইশা</td>
                            <td>${staticElements.toBengaliNumber(Isha)} রাত</td>
                        </tr>
                    </tbody>
                </table>
                <div class="DFooterBottom">
                    <p><b>ঢাকা, </b>${dayname}, ${staticElements.toBengaliNumber(day)} ${monthname} ${staticElements.toBengaliNumber(year)}</p>
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

module.exports = { namazSectionElement };