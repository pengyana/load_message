const charset = require('superagent-charset')
const superagent= require('superagent')
const request = charset(superagent)
const cheerio = require('cheerio')
const _ = require('loadsh')
const q = require('q')
const axios = require('axios')
const fs = require('fs')
const path = require('path')
// const json = require('./dogs.json')

var MonthList = ''
var MonthListYesOrNo = ''

async function getData() {
  const baseUrl = `https://www.xzw.com`
  const res = await request(`https://www.xzw.com/fortune/`).charset('utf-8')
  const $ = cheerio.load(res.text)
  // console.log(res);
  const list = _.map($('.alb .al'), (item, i) => {
    return {
      mainImg: baseUrl + $(item).find('dt img').attr('src'),
      detailUrl: baseUrl + $(item).find('dt a').attr('href'),
      name: $(item).find('dd strong').text(),
      date: $(item).find('dd small').text(),
    }
  })
  fs.writeFileSync(path.resolve('./xingzuo.json'), JSON.stringify(list))
  console.log(list);

  //月
  const requestList = _.map(list, item => {
    return request(item.detailUrl+'/3.html').charset('utf-8')
  })
  const resList = await q.all(requestList)
  var detailsA = ''

  const details = _.map(resList, (res, index) => {
    const $ = cheerio.load(res.text)
    return {
      _id: 'fortunemonth'+Number(index+1),
      bestmatch: '',
      constellationWhiteSheepYear: [
        {
          fortune: $('.c_box').find('.c_cont p:nth-child(1) span').contents().filter(function(index, content) {
            return content.nodeType === 3;
          }).text(),
          introduceName: '',
          title: '综合运势',
          detail: '',
          label: '',
          textVal: '',
        },
        {
          fortune: $('.c_box').find('.c_cont p:nth-child(2) span').text(),
          introduceName: '',
          title: '爱情运势',
          detail: '',
          label: '',
          textVal: '',
        },
        {
          fortune: $('.c_box').find('.c_cont p:nth-child(4) span').text(),
          introduceName: '',
          title: '财富运势',
          detail: '',
          label: '',
          textVal: '',
        },
        {
          fortune: $('.c_box').find('.c_cont p:nth-child(3) span').text(),
          introduceName: '',
          title: '事业学业',
          detail: '',
          label: '',
          textVal: '',
        },
        {
          fortune: $('.c_box').find('.c_cont p:nth-child(5) span').text(),
          introduceName: '',
          title: '健康运势',
          detail: '',
          label: '',
          textVal: '',
        },
        {
          fortune: $('.c_box').find('.c_cont p:nth-child(6) span').text(),
          introduceName: '',
          title: '解压方式',
          detail: '',
          label: '',
          textVal: '',
        }
      ],
      date: $('#view').find('dl dd h4 small').text(),
      introduce: $('#view').find('#view dl dd li.desc').text(),
      label: $('#view').find('#view dl dd h4').text(),
      luckyColor: '',
      luckyNum: '',
      url: '',
      watchout: '',
      xing: '',
    }
  })
  // for (let i = 0; i<details.length; i++) {
  //   detailsA += JSON.stringify(details[i])+ '\n'
  // }
  // console.log(details)
  fs.writeFileSync(path.resolve('./tomorrow.json'), JSON.stringify(details))


  //年
  const requestListYear = _.map(list, item => {
    return request(item.detailUrl+'/4.html').charset('utf-8')
  })
  const resListYear = await q.all(requestListYear)
  var detailsAYear = ''

  const detailsYear = _.map(resListYear, (res, index) => {
    const $ = cheerio.load(res.text)
    return {
      _id: 'fortuneYear'+Number(index+1),
      bestmatch: '',
      constellationWhiteSheepYear: [
        {
          fortune: $('.c_box').find('.c_cont p:nth-child(1) span').contents().filter(function(index, content) {
            return content.nodeType === 3;
          }).text(),
          introduceName: '',
          title: '综合运势',
          detail: '',
          label: '',
          textVal: '',
        },
        {
          fortune: $('.c_box').find('.c_cont p:nth-child(2) span').text(),
          introduceName: '',
          title: '爱情运势',
          detail: '',
          label: '',
          textVal: '',
        },
        {
          fortune: $('.c_box').find('.c_cont p:nth-child(4) span').text(),
          introduceName: '',
          title: '财富运势',
          detail: '',
          label: '',
          textVal: '',
        },
        {
          fortune: $('.c_box').find('.c_cont p:nth-child(3) span').text(),
          introduceName: '',
          title: '事业学业',
          detail: '',
          label: '',
          textVal: '',
        },
        {
          fortune: $('.c_box').find('.c_cont p:nth-child(5) span').text(),
          introduceName: '',
          title: '健康运势',
          detail: '',
          label: '',
          textVal: '',
        }
      ],
      date: $('#view').find('dl dd h4 small').text(),
      introduce: $('#view').find('#view dl dd li.desc').text(),
      labelTitle: $('#view').find('#view dl dd h4').text(),
      luckyColor: '',
      luckyNum: '',
      url: '',
      watchout: '',
      xing: '',
      title: ''
    }
  })
  // for (let i = 0; i<detailsYear.length; i++) {
  //   detailsAYear += JSON.stringify(details[i])+ '\n'
  // }
  // console.log(details)
  fs.writeFileSync(path.resolve('./Year.json'), JSON.stringify(detailsYear))



}

// getData()
//获取本周数据
async function getWeek(){
  const baseUrl = `https://www.xzw.com`
  const res = await request(`https://www.xzw.com/fortune/`).charset('utf-8')
  const $ = cheerio.load(res.text)
  // console.log(res);
  const list = _.map($('.alb .al'), (item, i) => {
    return {
      mainImg: baseUrl + $(item).find('dt img').attr('src'),
      detailUrl: baseUrl + $(item).find('dt a').attr('href'),
      name: $(item).find('dd strong').text(),
      date: $(item).find('dd small').text(),
    }
  })
  fs.writeFileSync(path.resolve('./xingzuo.json'), JSON.stringify(list))
  //  本周
  const requestListWeek = _.map(list, item => {
    return request(item.detailUrl+'/2.html').charset('utf-8')
  })
  const resListWeek = await q.all(requestListWeek)
  var detailsAWeek = ''
  const detailsWeek = _.map(resListWeek, (res, index) => {
    const $ = cheerio.load(res.text)
    return {
      _id: 'fortuneweek'+Number(index+1),
      constellationWhiteSheepYear: [
        {
          fortune: $('.c_box').find('.c_cont p:nth-child(1) span').contents().filter(function(index, content) {
            return content.nodeType === 3;
          }).text(),
          introduceName: '',
          title: '综合运势',
          detail: '',
          label: '',
          textVal: '',
        },
        {
          fortune: $('.c_box').find('.c_cont p:nth-child(2) span').text(),
          introduceName: '',
          title: '爱情运势',
          detail: '',
          label: '',
          textVal: '',
        },
        {
          fortune: $('.c_box').find('.c_cont p:nth-child(4) span').text(),
          introduceName: '',
          title: '财富运势',
          detail: '',
          label: '',
          textVal: '',
        },
        {
          fortune: $('.c_box').find('.c_cont p:nth-child(3) span').text(),
          introduceName: '',
          title: '事业学业',
          detail: '',
          label: '',
          textVal: '',
        },
        {
          fortune: $('.c_box').find('.c_cont p:nth-child(5) span').text(),
          introduceName: '',
          title: '健康运势',
          detail: '',
          label: '',
          textVal: '',
        },
        // {
        //   fortune: $('.c_box').find('.c_cont p:nth-child(6) span').text(),
        //   introduceName: '',
        //   title: '解压方式',
        //   detail: '',
        //   label: '',
        //   textVal: '',
        // }
      ],
      date: $('#view').find('dl dd h4 small').text(),
      introduce: $('#view').find('#view dl dd li.desc').text(),
      label: $('#view').find('#view dl dd h4').text(),
      luckyColor: $('#view').find('#view dl dd li:nth-child(6)').text(),
      luckyNum: '',
      url: '',
      bestmatch:  $('#view').find('#view dl dd li:nth-child(7)').text(),
      watchout: $('#view').find('#view dl dd li:nth-child(8)').text(),
      xing: '',
    }
  })
  fs.writeFileSync(path.resolve('./Week.json'), JSON.stringify(detailsWeek))
}
// getWeek()
async function getWeekYesOrNo() {
  const baseUrl = `https://www.d1xz.net`
  const res = await request(`https://www.d1xz.net/yunshi/`).charset('utf-8')
  const $ = cheerio.load(res.text)
  // console.log(res);
  const list = _.map($('.xzys_left .box'), (item, i) => {
    return {
      mainImg: baseUrl + $(item).find('.pic img').attr('src'),
      detailUrl: baseUrl + $(item).find('.bottom_ui li:nth-child(3) a').attr('href'),
      name: $(item).find('.infor a').text(),
      date: $(item).find('.pic p').text(),
    }
  })
  // fs.writeFileSync(path.resolve('./YesOrNoMonth.json'), JSON.stringify(list))
  // console.log(list);
  const requestList = _.map(list, item => {
    return request(item.detailUrl).charset('utf-8')
  })
  const resList = await q.all(requestList)
  var detailsA = ''
  //月
  const details = _.map(resList, (res, index) => {
    const $ = cheerio.load(res.text)
    return {
      // _id: 'fortune'+Number(index+1),
      bestmatch: '最配星座：'+ $('.box_luck_w').find('.week_astro_tip .left span').text(),
      watchout: '提防星座：'+ $('.box_luck_w').find('.week_astro_tip .right span').text(),
      constellationWhiteSheepYear: [
        {
          fortune: $('.box_luck_w').find('.week_coll_ul li.makeup p').text(),
          introduceName: '',
          title: '妆容',
          detail: '',
          label: '',
          textVal: '',
        },
        {
          fortune: $('.box_luck_w').find('.week_coll_ul li.dress p').text(),
          introduceName: '',
          title: '穿衣风格',
          detail: '',
          label: '',
          textVal: '',
        },
        {
          fortune: $('.box_luck_w').find('.week_coll_ul li.activity p').text(),
          introduceName: '',
          title: '活动',
          detail: '',
          label: '',
          textVal: '',
        }

      ]
    }
  })
  fs.writeFileSync(path.resolve('./YesOrNoWeek.json'), JSON.stringify(details))

}
// getWeekYesOrNo()
async function getMonthData() {
  const baseUrl = `https://www.d1xz.net`
  const res = await request(`https://www.d1xz.net/yunshi/`).charset('utf-8')
  const $ = cheerio.load(res.text)
  // console.log(res);
  const list = _.map($('.xzys_left .box'), (item, i) => {
    return {
      mainImg: baseUrl + $(item).find('.pic img').attr('src'),
      detailUrl: baseUrl + $(item).find('.bottom_ui li:nth-child(5) a').attr('href'),
      name: $(item).find('.infor a').text(),
      date: $(item).find('.pic p').text(),
    }
  })
  // fs.writeFileSync(path.resolve('./YesOrNoMonth.json'), JSON.stringify(list))
  // console.log(list);
  const requestList = _.map(list, item => {
    return request(item.detailUrl).charset('utf-8')
  })
  const resList = await q.all(requestList)
  var detailsA = ''
  //月
  const details = _.map(resList, (res, index) => {
    const $ = cheerio.load(res.text)
    return {
      // _id: 'fortune'+Number(index+1),
      bestmatch: '最配星座：'  + $('.box_luck_w').find('.week_astro_tip .left span').text(),
      watchout:  '提防星座：'  + $('.box_luck_w').find('.week_astro_tip .right span').text(),
      constellationWhiteSheepYear: [
        {
          fortune: $('.box_luck_w').find('.week_coll_ul li.makeup p').text(),
          introduceName: '',
          title: '妆容',
          detail: '',
          label: '',
          textVal: '',
        },
        {
          fortune: $('.box_luck_w').find('.week_coll_ul li.dress p').text(),
          introduceName: '',
          title: '穿衣风格',
          detail: '',
          label: '',
          textVal: '',
        },
        {
          fortune: $('.box_luck_w').find('.week_coll_ul li.activity p').text(),
          introduceName: '',
          title: '活动',
          detail: '',
          label: '',
          textVal: '',
        }

      ]
    }
  })
  fs.writeFileSync(path.resolve('./YesOrNoMonth.json'), JSON.stringify(details))
//  年
//   const requestListYear = _.map(list, item => {
//     return request(item.detailUrl).charset('utf-8')
//   })
//   const resListYear = await q.all(requestListYear)
//   const detailsYear = _.map(resListYear, (res, index) => {
//     const $ = cheerio.load(res.text)
//     return {
//
//     }
//   })
}
// getMonthData()


//获取今日
async function gettoDayData() {
  const baseUrl = `https://www.xzw.com`
  const res = await request(`https://www.xzw.com/fortune/`).charset('utf-8')
  const $ = cheerio.load(res.text)
  // console.log(res);
  const list = _.map($('.alb .al'), (item, i) => {
    return {
      mainImg: baseUrl + $(item).find('dt img').attr('src'),
      detailUrl: baseUrl + $(item).find('dt a').attr('href'),
      name: $(item).find('dd strong').text(),
      date: $(item).find('dd small').text(),
    }
  })
  // fs.writeFileSync(path.resolve('./xingzuo.json'), JSON.stringify(list))
  console.log(list);
  const requestList = _.map(list, item => {
    return request(item.detailUrl).charset('utf-8')
  })
  const resList = await q.all(requestList)
  var detailsA = ''

  const details = _.map(resList, (res, index) => {
    const $ = cheerio.load(res.text)
    return {
      _id: 'fortuneToday'+Number(index+1),
      bestmatch: $('#view').find('#view dl dd li:nth-child(9)').text(),
      constellationWhiteSheepYear: [
        {
          fortune: $('.c_box').find('.c_cont p:nth-child(1) span').contents().filter(function(index, content) {
            return content.nodeType === 3;
          }).text(),
          introduceName: '',
          title: '综合运势',
          detail: '',
          label: '',
          textVal: '',
        },
        {
          fortune: $('.c_box').find('.c_cont p:nth-child(2) span').text(),
          introduceName: '',
          title: '爱情运势',
          detail: '',
          label: '',
          textVal: '',
        },
        {
          fortune: $('.c_box').find('.c_cont p:nth-child(4) span').text(),
          introduceName: '',
          title: '财富运势',
          detail: '',
          label: '',
          textVal: '',
        },
        {
          fortune: $('.c_box').find('.c_cont p:nth-child(3) span').text(),
          introduceName: '',
          title: '事业学业',
          detail: '',
          label: '',
          textVal: '',
        },
        {
          fortune: $('.c_box').find('.c_cont p:nth-child(5) span').text(),
          introduceName: '',
          title: '健康运势',
          detail: '',
          label: '',
          textVal: '',
        },
        // {
        //   fortune: $('.c_box').find('.c_cont p:nth-child(6) span').text(),
        //   introduceName: '',
        //   title: '解压方式',
        //   detail: '',
        //   label: '',
        //   textVal: '',
        // }
      ],
      date: $('#view').find('dl dd h4 small').text(),
      introduce: $('#view').find('#view dl dd li.desc').text(),
      label: $('#view').find('#view dl dd h4').text(),
      luckyColor: $('#view').find('#view dl dd li:nth-child(7)').text(),
      luckyNum: $('#view').find('#view dl dd li:nth-child(8)').text(),
      url: '',
      watchout: '',
      xing: '',
    }
  })
  // for (let i = 0; i<details.length; i++) {
  //   detailsA += JSON.stringify(details[i])+ '\n'
  // }
  // console.log(details)
  fs.writeFileSync(path.resolve('./tomorrow.json'), JSON.stringify(details))

}
// gettoDayData()
async function gettoDayDataElse() {
  const baseUrl = `https://www.d1xz.net`
  const res = await request(`https://www.d1xz.net/yunshi/`).charset('utf-8')
  const $ = cheerio.load(res.text)
  const list = _.map($('.xzys_left .box'), (item, i) => {
    return {
      mainImg: baseUrl + $(item).find('.pic img').attr('src'),
      detailUrl: baseUrl + $(item).find('.bottom_ui li:nth-child(1) a').attr('href'),
      name: $(item).find('.infor a').text(),
      date: $(item).find('.pic p').text(),
    }
  })
  const requestList = _.map(list, item => {
    return request(item.detailUrl).charset('utf-8')
  })
  const resList = await q.all(requestList)
  var detailsA = ''
  const details = _.map(resList, (res, index) => {
    const $ = cheerio.load(res.text)
    return {
      listfortuneall:[
        {
          title: $('.luck_main').find('.fraction div:nth-child(1) b').text()+'：',
          value: $('.luck_main').find('.fraction div:nth-child(1) strong').text()
        },
        {
          title: $('.luck_main').find('.fraction div:nth-child(2) b').text()+'：',
          value: $('.luck_main').find('.fraction div:nth-child(2) strong').text()
        },
        {
          title: $('.luck_main').find('.fraction div:nth-child(3) b').text()+'：',
          value: $('.luck_main').find('.fraction div:nth-child(3) strong').text()
        },
        {
          title: $('.luck_main').find('.fraction div:nth-child(4) b').text()+'：',
          value: $('.luck_main').find('.fraction div:nth-child(4) strong').text()
        },
        {
          title: $('.luck_main').find('.fraction div:nth-child(5) b').text()+'：',
          value: $('.luck_main').find('.fraction div:nth-child(5) strong').text()
        }
      ],
      // feeling: $('.luck_main').find('.fraction div:nth-child(1) b').text()+'：'+$('.luck_main').find('.fraction div:nth-child(1) strong'),
      // healthy: $('.luck_main').find('.fraction div:nth-child(2) b')+'：'+$('.luck_main').find('.fraction div:nth-child(2) strong'),
      // feeling: $('.luck_main').find('.fraction div:nth-child(3) b')+'：'+$('.luck_main').find('.fraction div:nth-child(3) strong'),
      // feeling: $('.luck_main').find('.fraction div:nth-child(3) b')+'：'+$('.luck_main').find('.fraction div:nth-child(3) strong'),
      // feeling: $('.luck_main').find('.fraction div:nth-child(3) b')+'：'+$('.luck_main').find('.fraction div:nth-child(3) strong'),
      // _id: 'fortune'+Number(index+1),
      // bestmatch: '最配星座：'  + $('.box_luck_w').find('.week_astro_tip .left span').text(),
      // watchout:  '提防星座：'  + $('.box_luck_w').find('.week_astro_tip .right span').text(),
      // constellationWhiteSheepYear: [
      //   {
      //     fortune: $('.box_luck_w').find('.week_coll_ul li.makeup p').text(),
      //     introduceName: '',
      //     title: '妆容',
      //     detail: '',
      //     label: '',
      //     textVal: '',
      //   },
      //   {
      //     fortune: $('.box_luck_w').find('.week_coll_ul li.dress p').text(),
      //     introduceName: '',
      //     title: '穿衣风格',
      //     detail: '',
      //     label: '',
      //     textVal: '',
      //   },
      //   {
      //     fortune: $('.box_luck_w').find('.week_coll_ul li.activity p').text(),
      //     introduceName: '',
      //     title: '活动',
      //     detail: '',
      //     label: '',
      //     textVal: '',
      //   }
      //
      // ]
    }
  })
  fs.writeFileSync(path.resolve('./YesOrNotoDay.json'), JSON.stringify(details))
}
// gettoDayDataElse()


//获取明天
async function gettotomorrowData() {
  const baseUrl = `https://www.xzw.com`
  const res = await request(`https://www.xzw.com/fortune/`).charset('utf-8')
  const $ = cheerio.load(res.text)
  // console.log(res);
  const list = _.map($('.alb .al'), (item, i) => {
    return {
      mainImg: baseUrl + $(item).find('dt img').attr('src'),
      detailUrl: baseUrl + $(item).find('dt a').attr('href'),
      name: $(item).find('dd strong').text(),
      date: $(item).find('dd small').text(),
    }
  })
  // fs.writeFileSync(path.resolve('./xingzuo.json'), JSON.stringify(list))
  console.log(list);
  const requestList = _.map(list, item => {
    return request(item.detailUrl+'/1.html').charset('utf-8')
  })
  const resList = await q.all(requestList)
  var detailsA = ''

  const details = _.map(resList, (res, index) => {
    const $ = cheerio.load(res.text)
    // const deleteSmall = $('.c_box').find('.c_cont p:nth-child(1) span small').remove()
    return {
      _id: 'fortuneTomorrow'+Number(index+1),
      bestmatch: $('#view').find('#view dl dd li:nth-child(9)').text(),
      constellationWhiteSheepYear: [
        {
          fortune: $('.c_box').find('.c_cont p:nth-child(1) span').contents().filter(function(index, content) {
            return content.nodeType === 3;
          }).text(),
          introduceName: '',
          title: '综合运势',
          detail: '',
          label: '',
          textVal: '',
        },
        {
          fortune: $('.c_box').find('.c_cont p:nth-child(2) span').text(),
          introduceName: '',
          title: '爱情运势',
          detail: '',
          label: '',
          textVal: '',
        },
        {
          fortune: $('.c_box').find('.c_cont p:nth-child(4) span').text(),
          introduceName: '',
          title: '财富运势',
          detail: '',
          label: '',
          textVal: '',
        },
        {
          fortune: $('.c_box').find('.c_cont p:nth-child(3) span').text(),
          introduceName: '',
          title: '事业学业',
          detail: '',
          label: '',
          textVal: '',
        },
        {
          fortune: $('.c_box').find('.c_cont p:nth-child(5) span').text(),
          introduceName: '',
          title: '健康运势',
          detail: '',
          label: '',
          textVal: '',
        },
        // {
        //   fortune: $('.c_box').find('.c_cont p:nth-child(6) span').text(),
        //   introduceName: '',
        //   title: '解压方式',
        //   detail: '',
        //   label: '',
        //   textVal: '',
        // }
      ],
      date: $('#view').find('dl dd h4 small').text(),
      introduce: $('#view').find('#view dl dd li.desc').text(),
      label: $('#view').find('#view dl dd h4').text(),
      luckyColor: $('#view').find('#view dl dd li:nth-child(7)').text(),
      luckyNum: $('#view').find('#view dl dd li:nth-child(8)').text(),
      url: '',
      watchout: '',
      xing: '',
    }
  })
  // for (let i = 0; i<details.length; i++) {
  //   detailsA += JSON.stringify(details[i])+ '\n'
  // }
  // console.log(details)
  fs.writeFileSync(path.resolve('./Tomorrow.json'), JSON.stringify(details))

}
gettotomorrowData()
//明日
async function gettotomorrowDataElse() {
  const baseUrl = `https://www.d1xz.net`
  const res = await request(`https://www.d1xz.net/yunshi/`).charset('utf-8')
  const $ = cheerio.load(res.text)
  const list = _.map($('.xzys_left .box'), (item, i) => {
    return {
      mainImg: baseUrl + $(item).find('.pic img').attr('src'),
      detailUrl: baseUrl + $(item).find('.bottom_ui li:nth-child(2) a').attr('href'),
      name: $(item).find('.infor a').text(),
      date: $(item).find('.pic p').text(),
    }
  })
  const requestList = _.map(list, item => {
    return request(item.detailUrl).charset('utf-8')
  })
  const resList = await q.all(requestList)
  var detailsA = ''
  const details = _.map(resList, (res, index) => {
    const $ = cheerio.load(res.text)
    return {
      listfortuneall:[
        {
          title: $('.luck_main').find('.fraction div:nth-child(1) b').text()+'：',
          value: $('.luck_main').find('.fraction div:nth-child(1) strong').text()
        },
        {
          title: $('.luck_main').find('.fraction div:nth-child(2) b').text()+'：',
          value: $('.luck_main').find('.fraction div:nth-child(2) strong').text()
        },
        {
          title: $('.luck_main').find('.fraction div:nth-child(3) b').text()+'：',
          value: $('.luck_main').find('.fraction div:nth-child(3) strong').text()
        },
        {
          title: $('.luck_main').find('.fraction div:nth-child(4) b').text()+'：',
          value: $('.luck_main').find('.fraction div:nth-child(4) strong').text()
        },
        {
          title: $('.luck_main').find('.fraction div:nth-child(5) b').text()+'：',
          value: $('.luck_main').find('.fraction div:nth-child(5) strong').text()
        }
      ],
      // feeling: $('.luck_main').find('.fraction div:nth-child(1) b').text()+'：'+$('.luck_main').find('.fraction div:nth-child(1) strong'),
      // healthy: $('.luck_main').find('.fraction div:nth-child(2) b')+'：'+$('.luck_main').find('.fraction div:nth-child(2) strong'),
      // feeling: $('.luck_main').find('.fraction div:nth-child(3) b')+'：'+$('.luck_main').find('.fraction div:nth-child(3) strong'),
      // feeling: $('.luck_main').find('.fraction div:nth-child(3) b')+'：'+$('.luck_main').find('.fraction div:nth-child(3) strong'),
      // feeling: $('.luck_main').find('.fraction div:nth-child(3) b')+'：'+$('.luck_main').find('.fraction div:nth-child(3) strong'),
      // _id: 'fortune'+Number(index+1),
      // bestmatch: '最配星座：'  + $('.box_luck_w').find('.week_astro_tip .left span').text(),
      // watchout:  '提防星座：'  + $('.box_luck_w').find('.week_astro_tip .right span').text(),
      // constellationWhiteSheepYear: [
      //   {
      //     fortune: $('.box_luck_w').find('.week_coll_ul li.makeup p').text(),
      //     introduceName: '',
      //     title: '妆容',
      //     detail: '',
      //     label: '',
      //     textVal: '',
      //   },
      //   {
      //     fortune: $('.box_luck_w').find('.week_coll_ul li.dress p').text(),
      //     introduceName: '',
      //     title: '穿衣风格',
      //     detail: '',
      //     label: '',
      //     textVal: '',
      //   },
      //   {
      //     fortune: $('.box_luck_w').find('.week_coll_ul li.activity p').text(),
      //     introduceName: '',
      //     title: '活动',
      //     detail: '',
      //     label: '',
      //     textVal: '',
      //   }
      //
      // ]
    }
  })
  fs.writeFileSync(path.resolve('./YesOrNoTomorrow.json'), JSON.stringify(details))
}
gettotomorrowDataElse()
