import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

export default function SearchDistrictNews() {
    let navigate = useNavigate();
    const [divisionName, setDivisionName] = useState([])
    const [districtName, setDistrictName] = useState([])

    useEffect(() => {
        axios
            .get(`${process.env.REACT_APP_API_URL}division`)
            .then(({ data }) => {
                if (data.divisions) {
                    setDivisionName(data.divisions);
                }
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
        navigate(url)
    }
    return (
        <div className="AreaSearch">
            <div className="DescTitle"><span className="ColorBox"></span>
                <h2>আপনার জেলার খবর</h2>
            </div>
            <form onSubmit={getURL}>
                <div className="row form-group">
                    <div className="col-md-12 mt-1"><label htmlFor="division"
                        className="sr-only">বিভাগ</label>
                        <select className="form-control" defaultValue={'0'} name="division" id="division" onChange={getDist}>
                            <option value={'0'} disabled="">--বিভাগ--</option>
                            {divisionName.map((nc) => {
                                return (
                                    <option data-id={nc.DivisionID} key={nc.DivisionID} value={nc.DivisionSlug}>{nc.DivisionNameBn}</option>
                                )
                            })}
                        </select>
                    </div>
                    <div className="col-md-12 mt-2"><label htmlFor="district"
                        className="sr-only">জেলা</label>
                        <select className="form-control" name="district" id="district" defaultValue={'0'}>
                            <option value={"0"} disabled="">--জেলা--</option>
                            {districtName.map((nc, i) => {
                                return (
                                    <option data-id={nc.DistrictID} value={nc.DistrictSlug}>{nc.DistrictNameBn}</option>
                                )
                            })}
                        </select>
                    </div>
                    <div className="col-md-12 mt-2">
                        <button type="submit" id="button" className="btn btn-block" disabled={true}>অনুসন্ধান করুন</button></div>
                </div>
            </form>
        </div>
    )
}
