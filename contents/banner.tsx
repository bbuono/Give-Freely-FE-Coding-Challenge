
import { sendToBackground } from "@plasmohq/messaging"
import type { PlasmoCSConfig, PlasmoGetInlineAnchor } from "plasmo"
import React, { useEffect, useState } from "react"
import styleText from "data-text:./style.module.css"
import * as style from "./style.module.css"

const messageFromBackground = async () => {
  const resp = await sendToBackground({
      name: "apiCalls",
  });
  return resp.data;
}

export const plasmoConfig:PlasmoCSConfig = {
  matches:['*']
}

export const getStyle = () => {
  const style = document.createElement("style")
  style.textContent = styleText
  return style
}


type Website = {
  name:string;
  url: string;
  messages:string[];
}

export const getInlineAnchor: PlasmoGetInlineAnchor = async () => document.head

const Banner = () => {

  const [whiteList, setWhitelist] = useState([]);
  const [message, setMessage] = useState("");

  const setConfig = async () => {
    const message = await messageFromBackground();
    const current:Website = message.record.websites.find((el:Website) => window.location.hostname.includes(el.url));
    console.log(message.record.websites)

    setWhitelist(message.record.websites);
    setMessage(current.messages[Math.floor(Math.random() * current.messages.length)])
  }

  useEffect(()=>{
    setConfig();
  },[]);

  if(whiteList.find((el:Website) => window.location.hostname.includes(el.url))) {
    return <div className={style.banner}>
    { message }
    </div>
  }
}

export default Banner;