import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { scrollTop, ForLazyLoaderImg } from '../AllFunctions'

import BdMap from './BdMap'
 
var lazyloaded = false
export default function DDivisionSearch() {
    const [divisionName, setDivisionName] = useState([])
    const [districtName, setDistrictName] = useState([])

    useEffect(() => {
        axios
            .get(`${process.env.REACT_APP_API_URL}division`)
            .then(({ data }) => {
                setDivisionName(data.divisions);
            });
    }, [])

    const getDist = (e) => {
        e.preventDefault();

        //disabled ture & false
        if (document.getElementById("division") !== null) {
            document.getElementById("button").disabled = false;
        } else {
            document.getElementById("button").disabled = true;
        }//disabled ture & false

        var division = e.target.value
        // console.log(division);
        if (division !== 0) {
            axios
                .get(`${process.env.REACT_APP_API_URL}districtInDivision/${division}`)
                .then(({ data }) => {
                    setDistrictName(data.districtInDivision);
                });
        } else {
            setDistrictName([]);
        }
    }

    const getURL = (e) => {
        e.preventDefault()
        var url = ""
        var division = e.target.division.value
        var district = e.target.district.value
        if (division > '0') { url = '/divisions/' + division }
        if (district > '0') { url = '/divisions/' + division + '/' + district }
        // console.log(url);
        window.location.href = url;
    }

    

    return (
        <>
            <div className="SectionTitle"><h3><Link to="#"  onClick={scrollTop}><span className="ColorBox"></span>এক ক্লিকে বিভাগের খবর</Link></h3></div>
            <section>
                <div className="bangladesh-map">
                    <BdMap />
                </div>
            </section>
            <form onSubmit={getURL} >
                <div className="form-group clearfix">
                    <div className="row">
                        <div className="col-sm-6 MarginTop10">
                            <select defaultValue={'0'} className="form-control cboDivName" name="division" id="division" onChange={getDist}>
                                <option value="0" disabled>সব বিভাগ</option>
                                {divisionName.map((nc) => {
                                    return (
                                        <option data-id={nc.DivisionID} key={nc.DivisionID} value={nc.DivisionSlug}>{nc.DivisionNameBn}</option>
                                    )
                                })}
                                {/* <option value="5">খুলনা</option>
                                <option value="3">চট্টগ্রাম</option>
                                <option value="4">ঢাকা</option>
                                <option value="2">বরিশাল</option>
                                <option value="9">ময়মনসিংহ</option>
                                <option value="8">রংপুর</option>
                                <option value="6">রাজশাহী</option>
                                <option value="7">সিলেট</option> */}
                            </select>
                        </div>
                        <div className="col-sm-6 MarginTop10">
                            <select defaultValue={'0'} className="form-control cboDisName" name="district" id="district">
                                <option value="0" disabled>সব জেলা</option>
                                {districtName.map((nc, i) => {
                                    return (
                                        <option data-id={nc.DistrictID} value={nc.DistrictSlug}>{nc.DistrictNameBn}</option>
                                    )
                                })}
                                {/* <!--<option value="0">সব জেলা</option>
                                <option value="11" >কক্সবাজার</option>
                                <option value="30" >কিশোরগঞ্জ</option>
                                <option value="55" >কুড়িগ্রাম</option>
                                <option value="16" >কুমিল্লা</option>
                                <option value="41" >কুষ্টিয়া</option>
                                <option value="10" >খাগড়াছড়ি</option>
                                <option value="40" >খুলনা</option>
                                <option value="54" >গাইবান্ধা</option>
                                <option value="21" >গাজীপুর</option>
                                <option value="28" >গোপালগঞ্জ</option>
                                <option value="12" >চট্টগ্রাম</option>
                                <option value="18" >চাঁদপুর</option>
                                <option value="65" >চাঁপাইনবাবগঞ্জ</option>
                                <option value="37" >চুয়াডাঙ্গা</option>
                                <option value="47" >জয়পুরহাট</option>
                                <option value="26" >জামালপুর</option>
                                <option value="5" >ঝালকাঠী</option>
                                <option value="39" >ঝিনাইদহ</option>
                                <option value="24" >টাঙ্গাইল</option>
                                <option value="60" >ঠাকুরগাঁও</option>
                                <option value="19" >ঢাকা</option>
                                <option value="53" >দিনাজপুর</option>
                                <option value="48" >নওগাঁ</option>
                                <option value="44" >নড়াইল</option>
                                <option value="31" >নরসিংদী</option>
                                <option value="49" >নাটোর</option>
                                <option value="23" >নারায়ণগঞ্জ</option>
                                <option value="57" >নীলফামারী</option>
                                <option value="33" >নেত্রকোনা</option>
                                <option value="14" >নোয়াখালী</option>
                                <option value="58" >পঞ্চগড়</option>
                                <option value="7" >পটুয়াখালি</option>
                                <option value="50" >পাবনা</option>
                                <option value="6" >পিরোজপুর</option>
                                <option value="35" >ফরিদপুর</option>
                                <option value="13" >ফেনী</option>
                                <option value="46" >বগুড়া</option>
                                <option value="2" >বরগুনা</option>
                                <option value="3" >বরিশাল</option>
                                <option value="36" >বাগেরহাট</option>
                                <option value="8" >বান্দরবান</option>
                                <option value="17" >ব্রাহ্মণবাড়িয়া</option>
                                <option value="4" >ভোলা</option>
                                <option value="22" >ময়মনসিংহ</option>
                                <option value="42" >মাগুরা</option>
                                <option value="25" >মাদারীপুর</option>
                                <option value="20" >মানিকগঞ্জ</option>
                                <option value="27" >মুন্সিগঞ্জ</option>
                                <option value="43" >মেহেরপুর</option>
                                <option value="62" >মৌলভীবাজার</option>
                                <option value="38" >যশোর</option>
                                <option value="59" >রংপুর</option>
                                <option value="9" >রাঙামাটি</option>
                                <option value="34" >রাজবাড়ী</option>
                                <option value="51" >রাজশাহী</option>
                                <option value="15" >লক্ষ্মীপুর</option>
                                <option value="56" >লালমনিরহাট</option>
                                <option value="32" >শরীয়তপুর</option>
                                <option value="29" >শেরপুর</option>
                                <option value="45" >সাতক্ষীরা</option>
                                <option value="52" >সিরাজগঞ্জ</option>
                                <option value="64" >সিলেট</option>
                                <option value="63" >সুনামগঞ্জ</option>
                                <option value="61" >হবিগঞ্জ</option>--> */}
                            </select>
                        </div>

                    </div>
                    <div className="row">
                        <div className="col-lg-4 col-sm-12 offset-lg-4">
                            <div className="mt-2 mb-4">
                                <button type="submit" id="button" onClick={scrollTop} name="btnSubmit" className="btn btn-primary" disabled={true} >খুঁজুন</button>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
      





        </>


    )
}
