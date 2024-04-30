import React from 'react'
import { Link } from 'react-router-dom'
import { scrollTop } from '../AllFunctions'

export default function DWriters({ writer, writersName }) {
    return (
        <>
            {writer.length !== 0 ?
                <div className="WritterName mt-2">
                    <p>
                        <Link to={"/writers/" + writer.Slug} onClick={scrollTop}>
                            <i className="fa-solid fa-pen"></i>
                            {/* <img src={process.env.REACT_APP_IMG_Writer + nc.ImagePath} alt={nc.WriterName} title={nc.WriterName} className="Writer-img" /> */}
                            {writer.WriterName}
                        </Link>
                        <span className='DInitial'>,দ্য নিউজ ২৪</span>
                    </p>
                </div>
                :
                <div className="WritterName mt-2"><p><i className="fa-solid fa-pen"></i> {writersName}<span className='DInitial'>, দ্য নিউজ ২৪</span></p></div>
            }
        </>
    )
}
