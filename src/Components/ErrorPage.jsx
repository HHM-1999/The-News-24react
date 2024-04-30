import React, { useEffect } from 'react'
import DocumentTitle from 'react-document-title'

export default function ErrorPage() {
    useEffect(() => {
        document.querySelectorAll('link[rel="canonical"]')[0].setAttribute('href', window.location.href)
    }, [])
    return (
        <main>
            <div className="container">
                <div className='ErrorPage margin-ErrorPage'>
                    {/* <ModalADS /> */}
                    <div className="row">
                        <div className="col-10 offset-1">
                            <div className='Errors'>
                                <i className="fa-solid fa-4"></i> <i className="fa-solid fa-0"></i> <i className="fa-solid fa-4"></i>
                            </div>
                            <DocumentTitle title='404 - Nothing Found' />
                            <h1 className='ErrorHeader'>কিছু পাওয়া যায়নি</h1>
                            <p className='ErrorText'>আপনি যা খুঁজছেন, তা পাওয়া যায়নি। বিষয়টি সম্ভবত <b>দ্য নিউজ ২৪</b> এর নয় কিংবা আপনি ভুলভাবে খুঁজছেন। দয়া করে, বিষয়টি সম্পর্কে নিশ্চিত হয়ে নিন।</p>
                            <button className='mt-4'>
                                <a href="/">প্রচ্ছদে ফিরে যান</a>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    )
}
