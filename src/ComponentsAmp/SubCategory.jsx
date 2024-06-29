import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { ForLazyLoaderImg } from './AllFunctions'


var lazyloaded = false
var showMore = true
var limit = 8
var LeadNewsLimit = 12
var offset = 0
var catID = 0
var InnerSpecialContents
var formData = []
export default function SubCategory() {
    let { catSlug, subCatSlug } = useParams();
    const [CatName, setCatName] = useState([])
    const [CatSlug, setCatSlug] = useState([])
    const [subCatName, setSubCatName] = useState([])

    const [subCatLead, setSubCatLead] = useState([]);
    const [subCatLead2, setSubCatLead2] = useState([]);
    const [subCatLead3, setSubCatLead3] = useState([]);

    const [subCatreadMore, setSubCatreadMore] = useState([]);
    const [catLatest, setcatLatest] = useState([])
    // const [isLoading, setisLoading] = useState(true)
    // const [isLoading, setisLoading] = useState(true)

    useEffect(() => {
        document.querySelectorAll('link[rel="canonical"]')[0].setAttribute('href', window.location.href)
        setTimeout(() => { window.location.reload(1); }, 300000);
        // setisLoading(true)
        // setTimeout(() => { setisLoading(false) }, 300);
        // setisLoading(true)
        // setTimeout(() => { setisLoading(false) }, 300);
        offset = 0
        axios
            .get(`${process.env.REACT_APP_API_URL}sub-category-by-slug/${subCatSlug}`)
            .then(({ data }) => {
                if (data.catInfo.Slug === catSlug) {
                    catID = data.SubCategory.CategoryID
                    setCatSlug(data.catInfo.Slug);
                    setCatName(data.catInfo.CategoryName);
                    setSubCatName(data.SubCategory);

                    setTimeout(function () {
                        lazyloaded = false
                        ForLazyLoaderImg(lazyloaded)
                    }, 1000);
                    axios
                        .get(`${process.env.REACT_APP_API_URL}json/file/generateCategoryPopular${catID}.json`)
                        .then(({ data }) => {
                            if (data.data) {
                                setcatLatest(data.data);
                            }
                        });
                    axios
                        .get(`${process.env.REACT_APP_API_URL}sub-category-content/${catID}/${LeadNewsLimit}`)
                        .then(({ data }) => {
                            // console.log(`${process.env.REACT_APP_API_URL}sub-category-content/${catID}/${LeadNewsLimit}`);
                            // if (data.sub_category_content.length > 0) {
                            if (data.sub_category_content) {
                                // setSubCatLead(data.sub_category_content[0]);
                                // setSubCatLead2(data.sub_category_content[1]);
                                setSubCatLead3(data.sub_category_content.slice(0, 12));
                                // leadNews position array ------ start
                                InnerSpecialContents = ``
                                for (let i = 0; i < data.sub_category_content.length; i++) {
                                    if (data.sub_category_content[i].ContentID) {
                                        InnerSpecialContents = InnerSpecialContents + `${data.sub_category_content[i].ContentID}`
                                        if (data.sub_category_content.length !== i + 1) {
                                            InnerSpecialContents = InnerSpecialContents + `, `
                                        }
                                    }
                                }
                                InnerSpecialContents = InnerSpecialContents + ``
                            }
                            // leadNews position array ------ end
                            formData = { 'CategoryID': catID, 'limit': limit, 'offset': 0, 'InnerSpecialContents': InnerSpecialContents }
                            // console.log(formData);
                            axios
                                .post(`${process.env.REACT_APP_API_URL}sub-category-content-more`, formData)
                                .then(({ data }) => {
                                    if (data.sub_category_more_content) {
                                        setSubCatreadMore(data.sub_category_more_content);
                                        showMore = true
                                        if (data.sub_category_more_content.length < limit) {
                                            showMore = false
                                        }
                                        setTimeout(function () {
                                            lazyloaded = false
                                            ForLazyLoaderImg(lazyloaded)
                                        }, 1000);
                                    }
                                });

                        });
                } else setCatName(null);
            });
        // document.querySelectorAll('link[rel="canonical"]')[0].setAttribute('href', window.location.href)
        // const timer = setTimeout(() => { window.location.reload(1); }, 300000);
        // return () => clearTimeout(timer);
    }, [catSlug, subCatSlug])

    const toggleButtonState = () => {
        offset += limit
        showMore = true
        formData = { 'CategoryID': catID, 'limit': limit, 'offset': offset, 'InnerSpecialContents': InnerSpecialContents }
        axios
            .post(`${process.env.REACT_APP_API_URL}sub-category-content-more`, formData)
            .then(({ data }) => {
                if (data.sub_category_more_content) {
                    if (data.sub_category_more_content.length < limit) {
                        showMore = false
                    }
                    for (let i = 0; i < data.sub_category_more_content.length; i++) {
                        setSubCatreadMore(oldArray => [...oldArray, data.sub_category_more_content[i]]);
                    }
                    setTimeout(function () {
                        lazyloaded = false
                        ForLazyLoaderImg(lazyloaded)
                    }, 1000);
                }
            });
    };
    return (
        <>
            <div className="row">
                <div className='col-lg-8 m-auto'>
                <article class="recipe-article">
                <section class="ampstart-related-section mb4 ">
                    {subCatName ?
                        <h1 style={{ display: "flex", fontSize: "23px", borderBottom: '3px solid #eee', lineHeight: "32px", justifyContent: "center" }} >{subCatName.CategoryName}</h1> : ""}

                    <ul class="ampstart-related-section-items list-reset flex flex-wrap m0">
                        {
                            subCatLead3.map((nc) => {
                                return <li class="col-12 sm-col-4 md-col-8 lg-col-8 pr2" >

                                    <a href={"/amp/" + catSlug + "/news/" + nc.ContentID} class="text-decoration-none">
                                        <figure class="ampstart-image-with-caption  relative ">
                                            <amp-img src={process.env.REACT_APP_IMG_Path + nc.ImageSmPath}  layout="responsive" width="233" height="202"
                                            ></amp-img>
                                            <figcaption >
                                                {nc.ContentHeading}</figcaption>
                                        </figure>
                                    </a>

                                </li>
                            })}
                    </ul>
                </section>
            </article >

                </div>
            </div>

        </>
    )
}
