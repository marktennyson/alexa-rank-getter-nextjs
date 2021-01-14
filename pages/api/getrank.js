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
                    const alexaRank = parseInt($('.rankmini-rank', html).text().trim()
                                        .split(" ")[0].trim().slice(1,).replace(",", ""));
                    if (!alexaRank) {
                        resolve({message:'Invalid Domain Name'})
                    }else{
                        const data = {alexa_rank:alexaRank};
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
    const _endTime = Date.now();
    const timeTaken = parseFloat(((_endTime-_startTime)/1000).toFixed(2));
    return res.json({alexa_rank: alexaRank, time_taken: timeTaken});
  }
  