import React, { useEffect, useState } from 'react'
import axios from 'axios'
import moment from 'moment';
import { banglaDateConvetar } from '../AllFunctions';
const { toBengaliNumber } = require('bengali-number');

const currentDay = moment().format('dddd')
const currentDate = moment().format('DD MMMM YYYY')
const currentNamaz = moment().format('YYYY-MM-DD')

let FajrHours = "";
let FajrMin = "";
let DhuhrHours = "";
let DhuhrMin = "";
let AsrHours = "";
let AsrMin = "";
let MaghribHours = "";
let MaghribMin = "";
let IshaHours = "";
let IshaMin = "";

export default function NamazSomoy() {
    const [namaz, setNamaz] = useState({})
    useEffect(() => {
        axios
            .get(`https://www.emythmakers.com/namazapi/date/${currentNamaz}`,
                { headers: { Accesstoken: `6360c5d62956b` } }
            )
            .then(({ data }) => {
                setNamaz(data.prayertimes)
                FajrHours = (data.prayertimes.Fajr.split(':')[0] % 12) || 12
                FajrMin = (data.prayertimes.Fajr.split(':')[1])
                DhuhrHours = (data.prayertimes.Dhuhr.split(':')[0] % 12) || 12
                DhuhrMin = (data.prayertimes.Dhuhr.split(':')[1])
                AsrHours = (data.prayertimes.Asr.split(':')[0] % 12) || 12
                AsrMin = (data.prayertimes.Asr.split(':')[1])
                MaghribHours = (data.prayertimes.Maghrib.split(':')[0] % 12) || 12
                MaghribMin = (data.prayertimes.Maghrib.split(':')[1])
                IshaHours = (data.prayertimes.Isha.split(':')[0] % 12) || 12
                IshaMin = (data.prayertimes.Isha.split(':')[1])
            });
    }, [])
    return (
        <>{namaz ?
            <div className="DPrayer table-responsive mt-3">
                <div className="DHeadTop">
                    <p>নামাজের সময়সূচি</p>
                </div>
                <table className="table table-striped table-bordered text-center mb-0">
                    <thead>
                        <tr>
                            <th scope="col">ওয়াক্ত</th>
                            <th scope="col">সময়সূচি</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>ফজর</td>
                            <td>{toBengaliNumber(FajrHours) + ":" + toBengaliNumber(FajrMin)} ভোর </td>
                        </tr>
                        <tr>
                            <td>যোহর</td>
                            <td>{toBengaliNumber(DhuhrHours) + ":" + toBengaliNumber(DhuhrMin)} দুপুর </td>
                        </tr>
                        <tr>
                            <td>আছর</td>
                            <td>{toBengaliNumber(AsrHours) + ":" + toBengaliNumber(AsrMin)} বিকেল</td>
                        </tr>
                        <tr>
                            <td>মাগরিব</td>
                            <td>{toBengaliNumber(MaghribHours) + ":" + toBengaliNumber(MaghribMin)} সন্ধ্যা</td>
                        </tr>
                        <tr>
                            <td>ইশা</td>
                            <td>{toBengaliNumber(IshaHours) + ":" + toBengaliNumber(IshaMin)} রাত</td>
                        </tr>
                    </tbody>
                </table>
                <div className="DFooterBottom">
                    <p><b>ঢাকা, </b>{banglaDateConvetar(currentDay)}, {banglaDateConvetar(currentDate)}</p>
                </div>
            </div>
            : false}
        </>
    )
}
