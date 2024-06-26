import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { ForLazyLoaderImg } from './AllFunctions'



var lazyloaded = false
var catID = 0
var showMore = true
var limit = 8
var LeadNewsLimit = 12
var offset = 5
var InnerSpecialContents
var formData = []
export default function Category() {
    let { catSlug } = useParams();
    const [catName, setcatName] = useState([])
    const [catNewsMore, setcatLeadMore] = useState([])

    const [catLeadNews1, setcatLeadNews1] = useState([])
    const [catLeadNews2, setcatLeadNews2] = useState([])
    const [catLeadNews3, setcatLeadNews3] = useState([])

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
            .get(`${process.env.REACT_APP_API_URL}category/${catSlug}`)
            .then(({ data }) => {

                setcatName(data.category);
                if (data.category) {
                    // setisLoading(false)
                    // setisLoading(false)
                    catID = data.category.CategoryID;
                }
                setTimeout(function () {
                    lazyloaded = false
                    ForLazyLoaderImg(lazyloaded)
                }, 1000);
                axios
                    .get(`${process.env.REACT_APP_API_URL}inner-category-content/${catID}/${LeadNewsLimit}`)
                    .then(({ data }) => {
                        // if (data.inner_category_content.length > 0) {
                        console.log('lenght = ' + data.inner_category_content.length)
                        if (data.inner_category_content) {
                            // console.log(`${process.env.REACT_APP_API_URL}inner-category-content/${catID}/${LeadNewsLimit}`);
                            setcatLeadNews1(data.inner_category_content.slice(0, 12));
                            setcatLeadNews2(data.inner_category_content[1]);
                            setcatLeadNews3(data.inner_category_content.slice(2, 5));
                            // leadNews position array ------ start
                            InnerSpecialContents = ``
                            for (let i = 0; i < data.inner_category_content.length; i++) {
                                if (data.inner_category_content[i].ContentID) {
                                    InnerSpecialContents = InnerSpecialContents + `${data.inner_category_content[i].ContentID}`
                                    if (data.inner_category_content.length !== i + 1) {
                                        InnerSpecialContents = InnerSpecialContents + `, `
                                    }
                                }
                            }
                            InnerSpecialContents = InnerSpecialContents + ``
                        }
                        // leadNews position array ------ end
                        formData = { 'CategoryID': catID, 'limit': limit, 'offset': 0, 'InnerSpecialContents': InnerSpecialContents }
                        axios
                            .post(`${process.env.REACT_APP_API_URL}inner-category-content-more`, formData)
                            .then(({ data }) => {
                                if (data.inner_category_more_content) {
                                    setcatLeadMore(data.inner_category_more_content);
                                    showMore = true
                                    if (data.inner_category_more_content.length < limit) {
                                        showMore = false
                                    }
                                    setTimeout(function () {
                                        lazyloaded = false
                                        ForLazyLoaderImg(lazyloaded)
                                    }, 1000);
                                }
                            });

                    });
                axios
                    .get(`${process.env.REACT_APP_API_URL}json/file/generateCategoryPopular${catID}.json`)
                    .then(({ data }) => {
                        if (data.data) {
                            setcatLatest(data.data.slice(0, 12));
                        }
                    });
            });

    }, [catSlug])
    return (
        <>
            {/* <div className='container'>
                <div className="row">
                    <div className="column-main  m-auto">
                        <div className=" ampstart-related-section m-5 ">
                            {catName ?
                                <h1>{catName.CategoryName}</h1> : ""}

                            <div className="border-bottom"></div>
                            <div className="row">
                                {
                                    catLeadNews1.map((nc) => {
                                        return <div className="col-md-4 mt-5 ">
                                            <a href={"/amp/" + nc.Slug + "/news/" + nc.ContentID} >
                                                <div className="row">
                                                    <div className="col-md-4 col-4 ">
                                                        <amp-img src={process.env.REACT_APP_IMG_Path + nc.ImageSmPath} alt={nc.ImageSmPath} layout="responsive" width="100" height="80"
                                                        ></amp-img>


                                                    </div>
                                                    <div className="col-md-8 col-8">

                                                        <div className="desc">
                                                            <p>
                                                                {nc.ContentHeading}
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>

                                            </a>


                                        </div>
                                    })

                                }

                            </div>


                        </div>
                    </div>
                </div>



            </div> */}
            <div className="row">
                <div className='col-lg-8 m-auto'>
                <article class="recipe-article">
                <section class="ampstart-related-section mb4 ">
                    {catName ?
                        <h1 style={{display:"flex", fontSize:"23px",borderBottom:'3px solid #eee',lineHeight:"32px",justifyContent:"center"}} >{catName.CategoryName}</h1> : ""}

                    <ul class="ampstart-related-section-items list-reset flex flex-wrap m0">
                        {
                            catLeadNews1.map((nc) => {
                                return <li class="col-12 sm-col-4 md-col-8 lg-col-8 pr2" >

                                    <a href={"/amp/" + nc.Slug + "/news/" + nc.ContentID} class="text-decoration-none">
                                        <figure class="ampstart-image-with-caption  relative ">
                                            <amp-img src={process.env.REACT_APP_IMG_Path + nc.ImageSmPath} alt={nc.ImageSmPath} layout="responsive" width="233" height="202"
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
