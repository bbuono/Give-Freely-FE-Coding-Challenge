import React, { Suspense, useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./home"
import Company from './company';
import "../css/main.css";
import { sendToBackground } from "@plasmohq/messaging";

export const Routing = () => {
    const [data, setData] = useState([]);

    const messageFromBackground = async () => {
        const resp = await sendToBackground({
            name: "apiCalls",
        });
        return resp.data;
    }

    useEffect(() => {
        async function getMessage() {
            const apiCall = await messageFromBackground();
            setData(...[apiCall.record.websites])
        }
        getMessage();
    }, []);

    return (
        <div className="main">
            <Routes>
                <Route path="/" element={<Home data={data} />} />
                <Route path="/company/:id" element={<Company />} />
            </Routes>
        </div>
    );
}