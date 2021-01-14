const rp = require('request-promise');
const $ = require('cheerio');

class RankScrapper{
    constructor(domain){
        this.baseUrl = 'https://alexa.com/siteinfo/';
        this.domain = domain;
        this.url = this.baseUrl+this.domain;
    }
    get_rank(){
        return new Promise((resolve, reject) => {
            try{
                rp(this.url).then(function(html) {
                    const extractedData = $('.rankmini-rank', html).text().trim().slice(1,)   
                    const alexaRank = parseInt(extractedData.split(" ")[0].trim().replace(",", ""));
                    const engagementData = extractedData.split(" ")[extractedData.split(" ").length - 1];
                    const engagement = parseInt(engagementData.split(":")[0])*60+parseInt(engagementData.split(":")[1]);
                    if (!alexaRank) {
                        resolve({message:'Invalid Domain Name'})
                    }else{
                        const data = {alexa_rank:alexaRank, engagement:engagement};
                        resolve(data);
                    }
                })
            }catch(err){reject(err);}
        })
    }
}

export default async function(req, res){
    const domain = req.query.domain;
    const rs = new RankScrapper(domain);
    const _startTime = Date.now();
    const data = await rs.get_rank();
    const alexaRank = await data.alexa_rank;
    const engagement = await data.engagement;
    const _endTime = Date.now();
    const timeTaken = parseFloat(((_endTime-_startTime)/1000).toFixed(2));
    return res.json({alexa_rank:alexaRank, engagement:engagement, time_taken:timeTaken});
  }
  