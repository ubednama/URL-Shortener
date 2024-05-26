import { nanoid } from 'nanoid'
import URL from '../models/url.js';

async function handleGenerateNewShortURL(req, res) {
    const body = req.body;

    if(!body.url) return res.status(400).json({error: 'Provide URL to be shorten'})
    
    let length;
    (body.length) ? length = body.length : length = 8
    const shortID = nanoid(length);

    await URL.create({
        shortId: shortID,
        redirectURL: body.url,
        visitHistory: []
    })

    return res.json({id: shortID})
}

async function getShortenURL(req, res) {
    const shortId = req.params.shortId

    const entry = await URL.findOneAndUpdate({
        shortId
    }, {$push: {
        visitHistory: {
            timestamp: Date.now()
        }
    }})

    res.redirect(entry.redirectURL)
}

async function getAnalyticsOfURL(req, res) {
    const shortId = req.params.shortId

    const result = await URL.findOne({shortId});

    return res.json({
        totalClicks: result.visitHistory.length,
        analytics: result.visitHistory
    })
}

export {
    handleGenerateNewShortURL,
    getShortenURL,
    getAnalyticsOfURL
}