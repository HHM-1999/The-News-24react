import React, { useEffect } from 'react'
import axios from 'axios'
import moment from 'moment';
import { banglaDateConvetar } from '../AllFunctions'

const moment_hijri = require('moment-hijri');

var currentDay = moment().format('dddd')
var today = moment().format('YYYY-MM-DD')

//to get date of tomorrow date
let tomorrow = new Date();
tomorrow = tomorrow.setDate(tomorrow.getDate() + 1);

//to get date of previous date
var previous = new Date();
previous.setDate(previous.getDate() - 1);
var arabicDate = moment_hijri(previous).format('iD iMMMM');

var rojaTodayDate = ''
var rojaTodaySehri = ''
var rojaTodayIftar = ''
var rojatomorrowDate = ''
var rojatomorrowSehri = ''
var rojatomorrowIftar = ''

var todayDate = ''
var todaySehri = '';
var todayIftar = ''
var tomorrowDate = '';
var tomorrowSehri = '';
var tomorrowIftar = '';

var countDownDate;
var period;
var countDate; // eslint-disable-line no-unused-vars
export default function Ramadan() {

    useEffect(() => {
        axios
            .get(`https://www.emythmakers.com/namazapi/roja/${today}`,
                { headers: { Accesstoken: `6360c5d62956b` } }
            )
            .then(({ data }) => {
                if (data.data.length > 0) {
                    rojaTodayDate = data.data[0].date
                    rojaTodaySehri = data.data[0].sehri
                    rojaTodayIftar = data.data[0].iftar
                    rojatomorrowDate = data.data[1].date
                    rojatomorrowSehri = data.data[1].sehri
                    rojatomorrowIftar = data.data[1].iftar
                    sehriiftarfn(rojaTodayDate, rojaTodaySehri, rojaTodayIftar, rojatomorrowDate, rojatomorrowSehri, rojatomorrowIftar)
                }
            });
    }, []) // eslint-disable-line react-hooks/exhaustive-deps

    function sehriiftarfn(rojaTodayDate, rojaTodaySehri, rojaTodayIftar, rojatomorrowDate, rojatomorrowSehri, rojatomorrowIftar) {
        // console.log('here-sehriiftarfn');
        // console.log(rojaTodayDate);
        todayDate = rojaTodayDate.replace(/-/g, "/");
        todaySehri = rojaTodaySehri;
        todayIftar = rojaTodayIftar
        tomorrowDate = rojatomorrowDate.replace(/-/g, "/");
        tomorrowSehri = rojatomorrowSehri;
        tomorrowIftar = rojatomorrowIftar;

        setValue();
    }

    function setValue() {
        var currentTime = new Date().getTime();
        // console.log("todayDate - " + new Date(todayDate + ' ' + todayIftar).getTime());
        // console.log(todayDate);
        if (new Date(todayDate + ' ' + todaySehri).getTime() > currentTime) {
            countDownDate = new Date(todayDate + ' ' + todaySehri).getTime();
            period = 'সেহরি';
            countDate = new Date(todayDate + ' ' + todaySehri);
            // console.log('here1')
        } else if (new Date(todayDate + ' ' + todayIftar).getTime() > currentTime) {
            countDownDate = new Date(todayDate + ' ' + todayIftar).getTime();
            period = 'ইফতার';
            countDate = new Date(todayDate + ' ' + todayIftar);
            // console.log('here2')
        } else if (new Date(tomorrowDate + ' ' + tomorrowSehri).getTime() > currentTime) {
            countDownDate = new Date(tomorrowDate + ' ' + tomorrowSehri).getTime();
            period = 'সেহরি';
            countDate = new Date(tomorrowDate + ' ' + tomorrowSehri);
            arabicDate = moment_hijri().format('iD iMMMM');
            currentDay = moment(tomorrow).format('dddd')
            // console.log('here3')
        } else if (new Date(tomorrowDate + ' ' + tomorrowIftar).getTime() > currentTime) {
            countDownDate = new Date(tomorrowDate + ' ' + tomorrowIftar).getTime();
            period = 'ইফতার';
            countDate = new Date(tomorrowDate + ' ' + tomorrowIftar);
            // console.log('here4')
        } else {
            countDownDate = new Date().getTime();
            period = '';
            countDate = '';
            // console.log('here5')
        }

        // console.log('here')
        // console.log("countDownDate - " + countDownDate)
        // console.log("currentTime - " + currentTime)

        counter();
    }

    function counter() {
        // Update the count down every 1 second
        var x = setInterval(function () {
            //Get today's date and time
            var now = new Date().getTime();

            //Find the distance between now and the count down date
            var distance = countDownDate - now;

            //console.log(distance);

            //Time calculations for days, hours, minutes and seconds
            //var days=Math.floor(distance / (1000 * 60 * 60 * 24));
            var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            var seconds = Math.floor((distance % (1000 * 60)) / 1000);

            // var dayStr=days.toString();
            var hourStr = hours.toString();
            var minuteStr = minutes.toString();
            var secondStr = seconds.toString();

            // if (days <= 9) {
            //  	dayStr='০' + dayStr;
            // }
            if (hours <= 9) {
                hourStr = '০' + hourStr;
            }
            if (minutes <= 9) {
                minuteStr = '০' + minuteStr;
            }
            if (seconds <= 9) {
                secondStr = '০' + secondStr;
            }


            //Output the result in an element with id="demo"
            //document.getElementById("demo").innerHTML=days + "d " + hours + "h " + minutes + "m " + seconds + "s ";

            //*Commenting On below 4 lines when need to show 00-00-00-00 **
            // document.getElementById("days").innerHTML=dayStr;
            if (document.getElementById('DRamadanTable')) {
                document.getElementById("hours").innerHTML = banglaDateConvetar(hourStr) + '</br>';
                document.getElementById("minutes").innerHTML = banglaDateConvetar(minuteStr) + '</br>';
                document.getElementById("seconds").innerHTML = banglaDateConvetar(secondStr) + '</br>';
                document.getElementById("period").innerHTML = period;
            }

            if (distance < 0) {
                clearInterval(x);
                document.getElementById("hours").innerHTML = '00';
                document.getElementById("minutes").innerHTML = '00';
                document.getElementById("seconds").innerHTML = '00';
                document.getElementById("period").innerHTML = '';
            }
        }, 1000);
    }

    return (
        <>
            <div className="DPrayer">
                <div className="DHeadTop">
                    <p>{banglaDateConvetar(arabicDate) + ', ' + banglaDateConvetar(currentDay)}</p>
                </div>
                <div className="DRamadanTable table-responsive" id='DRamadanTable'>
                    <table className="table table-bordered">
                        <tbody>
                            <tr>
                                <td>সময়</td>
                                <td>ঘণ্টা</td>
                                <td>মিনিট</td>
                                <td>সেকেন্ড</td>
                            </tr>
                            <tr>
                                <td id="period"></td>
                                <td id="hours"></td>
                                <td id="minutes"></td>
                                <td id="seconds"></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    )
}
