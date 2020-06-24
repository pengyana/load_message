const _ = require('loadsh')
const q = require('q')
const axios = require('axios')
const fs = require('fs')
const path = require('path')


const Yearone= fs.readFileSync("../xingzuo/Year.json")
// const monthtow= fs.readFileSync("../xingzuo/YesOrNoMonth.json")

const YearoneData = JSON.parse(Yearone)
// const monthtowData = JSON.parse(monthtow)
var listData = []
var detailsMonth = ''
var indexUrlMonth = '';
var indexXingMonth = '';
function getNum (n) {
  switch(n) {
    case 0:
      indexUrlMonth = 'aries.png'
      indexXingMonth = '4'
      indexXingYearTitle = '白羊座'
      break;
    case 1:
      indexUrlMonth = 'taurus.png'
      indexXingMonth = '4'
      indexXingYearTitle = '金牛座'
      break;
    case 2:
      indexUrlMonth = 'gemini.png'
      indexXingMonth = '2'
      indexXingYearTitle = '双子座'
      break;
    case 3:
      indexUrlMonth = 'cancer.png'
      indexXingMonth = '4'
      indexXingYearTitle = '巨蟹座'
      break;
    case 4:
      indexUrlMonth = 'leo.png'
      indexXingMonth = '3'
      indexXingYearTitle = '狮子座'
      break;
    case 5:
      indexUrlMonth = 'virgo.png'
      indexXingMonth = '4'
      indexXingYearTitle = '处女座'
      break;
    case 6:
      indexUrlMonth = 'libra.png'
      indexXingMonth = '4'
      indexXingYearTitle = '天秤座'
      break;
    case 7:
      indexUrlMonth = 'scorpio.png'
      indexXingMonth = '3'
      indexXingYearTitle = '天蝎座'
      break;
    case 8:
      indexUrlMonth = 'sagittarius.png'
      indexXingMonth = '3'
      indexXingYearTitle = '射手座'
      break;
    case 9:
      indexUrlMonth = 'capricornus.png'
      indexXingMonth = '4'
      indexXingYearTitle = '摩羯座'
      break;
    case 10:
      indexUrlMonth = 'aquarius.png'
      indexXingMonth = '3'
      indexXingYearTitle = '水瓶座'
      break;
    case 11:
      indexUrlMonth = 'pisces.png'
      indexXingMonth = '4'
      indexXingYearTitle = '双鱼座'
      break;
  }
}

function getAllData(YearoneData) {
  YearoneData.forEach((item,index)=>{
    getNum(index)
    item.xing = indexXingMonth
    item.url = indexUrlMonth
    item.title = indexXingYearTitle
    listData.push(item)
  })

  for (let i = 0; i<listData.length; i++) {
    detailsMonth += JSON.stringify(listData[i])+ '\n'
  }
}

getAllData(YearoneData)
// console.log(listData)
fs.writeFileSync(path.resolve('./Year.json'), detailsMonth)
