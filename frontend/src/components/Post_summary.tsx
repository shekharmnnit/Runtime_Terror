import React, { useState,useEffect } from 'react';
import '../assets/css/post_summary.css'
import linkImage from '../assets/file.png';
import axios from "axios";
import DocViewer, { DocViewerRenderers } from "@cyntler/react-doc-viewer";
function ShowPostSummary({ feedPost}) {

    let postToDisplay=feedPost   

    return (

        <div className="post-summary-container"> 
            {postToDisplay && postToDisplay.map((item, index) => (
                <a href={`/post/${item.post_id}`}>
                    <div className="post-summary" key={index}>
                        <div className="post-details">
                            <a href={`/profile/${item.user_id}`}>
                                <h4>{item.first_name} {item.last_name}</h4></a>
                            <p className="caption">{item.caption}</p>
                            <hr />
                            <div className="tags">
                                {item.tags.map((tag, index) => (
                                    <span key={index} className="tag-pill">{tag}</span>
                                ))}
                                <div className="date">{item.date}</div>
                            </div>
                        </div>
                        <div className="link-container" style={{height:'29vh', width: '29vh'}}>
                          {/* <DocViewer documents={item.docsToView} pluginRenderers={DocViewerRenderers}
                        style={{height:'auto'}} /> */}
                        <img src={item.docsToView[0].uri} alt="Girl in a jacket" width="500" height="600"></img>
                        </div>
                    </div>
                </a>
            ))}
        </div>
    )
}

export default ShowPostSummary;