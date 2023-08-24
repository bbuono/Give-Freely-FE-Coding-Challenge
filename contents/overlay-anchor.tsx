
import { sendToBackground } from "@plasmohq/messaging"
import type {
  PlasmoCSConfig,
  PlasmoCSUIProps,
  PlasmoGetOverlayAnchorList,
  PlasmoWatchOverlayAnchor
  } from "plasmo"
import React, { type FC } from "react"
import iconBase64 from "data-base64:~assets/bell.png"
import styleText from "data-text:./style.module.css"
import * as style from "./style.module.css"
import Modal from "~components/Modal";
import ReactDOM from "react-dom";

export const config: PlasmoCSConfig = {
  matches: ["https://www.google.com/*"],
  all_frames:false,
}

let websites = [];

export const getStyle = () => {
  const style = document.createElement("style")
  style.textContent = styleText
  return style
}

export const watchOverlayAnchor: PlasmoWatchOverlayAnchor = (
  updatePosition
) => {
  const interval = setInterval(() => {
    updatePosition()
  }, 100)

  return () => clearInterval(interval)
}

const messageFromBackground = async () => {
  const resp = await sendToBackground({
      name: "apiCalls",
  });
  return resp.data;
}

export const getOverlayAnchorList: PlasmoGetOverlayAnchorList = async () => {
  let selectors:any = [];
  const message = await messageFromBackground();
  websites = message.record.websites;

  websites.map((website:{name:string, url:string, messages:string[]}) => {
    selectors.push(document.querySelectorAll(`a[href*='${website.url}']`));
  })

  const allSelectors:any = Array.from(selectors).reduce((accumulator:any, current:any) => {
    return accumulator.concat(Array.from(current));
  }, []);

  const parents = allSelectors.map((element:any) =>  {
    if(element.querySelector(':scope > h3') || element.querySelector('[role=heading]')) {

      const currentWebsite = websites.find(obj => element.href.includes(obj.url));
      element.parentNode.setAttribute("data-selector", JSON.stringify(currentWebsite))
      return element.parentNode
    }
  });

  return parents;
}

const HighLight:FC<PlasmoCSUIProps> = ({ anchor }) => {
  const containerId = "modalContainer";
  const target = document.body;
  const anchorData = JSON.parse(anchor.element.attributes.getNamedItem("data-selector").value);

  const showModal = () => {
    const modalContainer = document.createElement( 'div' );
    modalContainer.setAttribute("id", containerId);
    modalContainer.setAttribute("style", `
      position:fixed;
      width:100%;
      height:100vh;
      z-index: 10000000000;
    `)

    if(!document.getElementById(containerId)) {
      ReactDOM.render(
        <Modal
          title={anchorData.name}
          message={ anchorData.messages[Math.floor(Math.random() * anchorData.messages.length)]}
          onClose={()=> {
            target.removeChild(modalContainer);
        }}/>,
        target.appendChild(modalContainer),
      )
    }
  }

  return <span className={style.highlight} style={{
    width:anchor.element.clientWidth,
    height:anchor.element.clientHeight,
  }}>
    <img onClick={showModal} className={style.bell} src={iconBase64} alt="Extension Icon" width={128} height={128} />
  </span>
}

export default HighLight;