import React from 'react'

export default function FBpagePlugin() {

    return (
        <>
            <div className="fb-page-banner my-4">
                <div className="fb-page fb_iframe_widget"
                    data-href="https://www.facebook.com/thenews24digital/"
                    data-tabs=""
                    data-width="280px"
                    data-height="180px"
                    data-small-header="false"
                    data-adapt-container-width="false"
                    data-hide-cover="false"
                    data-show-facepile="true"
                    fb-xfbml-state="rendered"
                    fb-iframe-plugin-query="adapt_container_width=true&app_id=&container_width=413&hide_cover=false&href=https%3A%2F%2Fwww.facebook.com%2Fthenews24digital%2F&locale=en_US&sdk=joey&show_facepile=true&small_header=false&tabs=&width=280"
                   >
                    <span style={{ verticalAlign: "bottom", width: 280, height: 180 }}>
                        <iframe name="fa82cece1d51549e3"
                            width="300px"
                            height="1000px"
                            data-testid="fb:page Facebook Social Plugin"
                            title="fb:page Facebook Social Plugin"
                            frameborder={0}
                            allowtransparency="true"
                            allowfullscreen={true}
                            scrolling="no"
                            allow="encrypted-media"
                            style={{
                                border: "none",
                                visibility: "visible",
                                width: 280,
                                height: 180,
                            }}
                            src="https://www.facebook.com/v17.0/plugins/page.php?adapt_container_width=true&app_id=&channel=https%3A%2F%2Fstaticxx.facebook.com%2Fx%2Fconnect%2Fxd_arbiter%2F%3Fversion%3D46%23cb%3Dfa6989edf30f0a046%26domain%3Dwww.thenews24.com%26is_canvas%3Dfalse%26origin%3Dhttps%253A%252F%252Fwww.thenews24.com%252Fff713d81d4cf68ae4%26relation%3Dparent.parent&container_width=413&hide_cover=false&href=https%3A%2F%2Fwww.facebook.com%2Fthenews24digital%2F&locale=en_US&sdk=joey&show_facepile=true&small_header=false&tabs=&width=280"
                            className="" />

                    </span>
                </div>
            </div>

        </>
    )
}