import React from "react"
import { Link, useLocation, useParams } from "react-router-dom"

function Company() {

    let { id } = useParams();
    let { state } = useLocation();
    const { messages, url } = state;

    return(
    <div className="company">
        <div>{id} - {url}</div>
        <div className="message"> {[...messages].map((item:string, i:number) => <span key={item + i}>{item}</span>)} </div>

        <Link className="back" to="/">Back</Link>
    </div>
    )
}

export default Company
