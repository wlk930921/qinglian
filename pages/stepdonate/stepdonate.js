// pages/stepdonate/stepdonate.js
const util = require('../../utils/util.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    company: {},
    date: '',
    timeStamp: '',
    step: ''
  },
  // 捐赠
  donation() {
    console.log('捐赠')
  },
  // 时间选择
  datepre() {
    let timeStamp = this.data.timeStamp
    timeStamp -= 60 * 60 * 24 * 1000
    let date = util.formatTimeZH(new Date(timeStamp))
    this.setData({
      timeStamp: timeStamp,
      date: date
    })
    this.getStep(timeStamp)
  },
  datenext() {
    let timeStamp = this.data.timeStamp
    timeStamp += 60 * 60 * 24 * 1000
    let date = util.formatTimeZH(new Date(timeStamp))
    this.setData({
      timeStamp: timeStamp,
      date: date
    })
    this.getStep(timeStamp)
  },
  // 获取步数信息
  getStep(timeStamp) {
    let step = parseInt(Math.random() * 10000) + 10000
    this.setData({
      step: step.toLocaleString()
    })
  },
  // 获取企业信息
  getCompany() {
    let company = {
      name: '杭州银行',
      logo: '/images/step/hzbank.png',
      left: '0.04万'
    }
    this.setData({
      company: company
    })
  },
  // 获取当前时间信息
  getDate() {
    let timeStamp = +new Date()
    let date = util.formatTimeZH(new Date(timeStamp))
    this.setData({
      timeStamp: timeStamp,
      date: date
    })
    this.getStep(timeStamp)
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getDate()
    this.getCompany()
  }
  
})