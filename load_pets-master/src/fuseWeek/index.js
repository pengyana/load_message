const _ = require('loadsh')
const q = require('q')
const axios = require('axios')
const fs = require('fs')
const path = require('path')


const monthone= fs.readFileSync("../xingzuo/Week.json")
const monthtow= fs.readFileSync("../xingzuo/YesOrNoWeek.json")

const monthoneData = JSON.parse(monthone)
const monthtowData = JSON.parse(monthtow)
var listData = []
var detailsMonth = ''
var indexUrlMonth = '';
var indexXingMonth = '';
var luckyNum = '';
function getNum (n) {
  switch(n) {
    case 0:
      indexUrlMonth = 'aries.png'
      indexXingMonth = '4'
      indexXingYearTitle = '白羊座'
      luckyNum = '幸运数字：12'
      break;
    case 1:
      indexUrlMonth = 'taurus.png'
      indexXingMonth = '3'
      indexXingYearTitle = '金牛座'
      luckyNum = '幸运数字：18'
      break;
    case 2:
      indexUrlMonth = 'gemini.png'
      indexXingMonth = '3'
      indexXingYearTitle = '双子座'
      luckyNum = '幸运数字：8'
      break;
    case 3:
      indexUrlMonth = 'cancer.png'
      indexXingMonth = '3'
      indexXingYearTitle = '巨蟹座'
      luckyNum = '幸运数字：6'
      break;
    case 4:
      indexUrlMonth = 'leo.png'
      indexXingMonth = '4'
      indexXingYearTitle = '狮子座'
      luckyNum = '幸运数字：22'
      break;
    case 5:
      indexUrlMonth = 'virgo.png'
      indexXingMonth = '4'
      indexXingYearTitle = '处女座'
      luckyNum = '幸运数字：7'
      break;
    case 6:
      indexUrlMonth = 'libra.png'
      indexXingMonth = '3'
      indexXingYearTitle = '天秤座'
      luckyNum = '幸运数字：24'
      break;
    case 7:
      indexUrlMonth = 'scorpio.png'
      indexXingMonth = '3'
      indexXingYearTitle = '天蝎座'
      luckyNum = '幸运数字：19'
      break;
    case 8:
      indexUrlMonth = 'sagittarius.png'
      indexXingMonth = '3'
      indexXingYearTitle = '射手座'
      luckyNum = '幸运数字：2'
      break;
    case 9:
      indexUrlMonth = 'capricornus.png'
      indexXingMonth = '4'
      indexXingYearTitle = '摩羯座'
      luckyNum = '幸运数字：11'
      break;
    case 10:
      indexUrlMonth = 'aquarius.png'
      indexXingMonth = '4'
      indexXingYearTitle = '水瓶座'
      luckyNum = '幸运数字：3'
      break;
    case 11:
      indexUrlMonth = 'pisces.png'
      indexXingMonth = '3'
      indexXingYearTitle = '双鱼座'
      luckyNum = '幸运数字：8'
      break;
  }
}
function getAllData(monthoneData, monthtowData) {
  monthoneData.forEach((item,index)=>{
    // list = Object.assign(item, monthtowData[index])
    getNum(index)
    item.url= indexUrlMonth
    item.xing= indexXingMonth
    item.title = indexXingYearTitle
    monthtowData[index].constellationWhiteSheepYear = item.constellationWhiteSheepYear.concat(monthtowData[index].constellationWhiteSheepYear)
    listData.push(Object.assign(item, monthtowData[index]))
  })
  for (let i = 0; i<listData.length; i++) {
    detailsMonth += JSON.stringify(listData[i])+ '\n'
  }
}

getAllData(monthoneData,monthtowData)
fs.writeFileSync(path.resolve('./Week.json'), detailsMonth)
