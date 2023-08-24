import type { PlasmoMessaging } from "@plasmohq/messaging";

const handler: PlasmoMessaging.MessageHandler = async (req, res) => {
    const headers = new Headers();
    headers.set('Content-Type', 'application/json');
    headers.set('X-Access-Key', process.env.PLASMO_PUBLIC_API_KEY);
    headers.set('Access-Control-Allow-Origin', '*');

    const response = await fetch(process.env.PLASMO_PUBLIC_URL, {
        method: 'GET',
        headers: headers
    })
    const data = await response.json();

    res.send({
        data
    })
}

export default handler


