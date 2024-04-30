import React from 'react'

export default function FBpagePlugin() {
    // setTimeout(function () {
    //     window.FB.init({
    //         appId: '416387992241868',
    //         pages: "433659713676324",
    //         xfbml: true,
    //         version: 'v12.0'
    //     });
    //     window.FB.XFBML.parse();
    // }, 1500);
    return (
        <>
            {/* <div className="fb-page" data-href="https://www.facebook.com/tv.ekhon/" data-tabs="" data-width="280px" data-height="180px" data-small-header="false" data-adapt-container-width="false" data-hide-cover="false" data-show-facepile="false">
            <blockquote cite="https://www.facebook.com/tv.ekhon/" className="fb-xfbml-parse-ignore"><a href="https://www.facebook.com/tv.ekhon/">Daily Bangladesh</a></blockquote>
        </div> */}
            <div className="fb-page-banner my-4">
                <div
                    className="fb-page fb_iframe_widget"
                    data-href="https://www.facebook.com/thenews24digital/"
                    data-tabs=""
                    data-width="280px"
                    data-height="180px"
                    data-small-header="false"
                    data-adapt-container-width="false"
                    data-hide-cover="false"
                    data-show-facepile="false"
                    fb-xfbml-state="rendered"
                    fb-iframe-plugin-query="adapt_container_width=false&app_id=416387992241868&container_width=280&height=180&hide_cover=false&href=https%3A%2F%2Fwww.facebook.com%2Ftv.ekhon%2F&locale=en_GB&sdk=joey&show_facepile=false&small_header=false&tabs=&width=280px"
                >
                    <span style={{ verticalAlign: "bottom", width: 280, height: 130 }}>
                        <iframe
                            name="f386511606478b4"
                            height="180px"
                            data-testid="fb:page Facebook Social Plugin"
                            title="fb:page Facebook Social Plugin"
                            frameBorder={0}
                            allowtransparency="true"
                            allowFullScreen={true}
                            scrolling="no"
                            allow="encrypted-media"
                            src="https://www.facebook.com/v12.0/plugins/page.php?adapt_container_width=false&app_id=416387992241868&channel=https%3A%2F%2Fstaticxx.facebook.com%2Fx%2Fconnect%2Fxd_arbiter%2F%3Fversion%3D46%23cb%3Df12c72dc280c6a%26domain%3Ddaily-bangladesh.com%26is_canvas%3Dfalse%26origin%3Dhttps%253A%252F%252Fdaily-bangladesh.com%252Ff350b4a0da4fe38%26relation%3Dparent.parent&container_width=280&height=180&hide_cover=false&href=https%3A%2F%2Fwww.facebook.com%2Ftv.ekhon%2F&locale=en_GB&sdk=joey&show_facepile=false&small_header=false&tabs=&width=280px"
                            style={{
                                border: "none",
                                visibility: "visible",
                                width: 280,
                                height: 130
                            }}
                            className=""
                        />
                    </span>
                </div>
            </div>
        </>
    )
}