// pages/personal/certificate/certificate.js
const app = getApp()
const util = require('../../../utils/util.js')
Page({
  /**
   * 页面的初始数据
   */
  data: {
    year:'',
    month: '',
    day: '',
    times: '',
    money: '',
    info: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let date = new Date()
    let year = date.getFullYear()
    let month = util.formatNumber(date.getMonth() + 1)
    let day = util.formatNumber(date.getDate())
    let times = '3'
    let money = '1234.5'
    let info = app.globalData.userInfo
    let _this = this

    wx.request({
      url: getApp().globalData.api + '/a/wxinterface/donateCertificate', //
      data: {
        userId: 100
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        //console.log(res.data)        
        let _data = res.data
        _this.setData({
          year: _data.obj[0].year,
          month: _data.obj[0].month,
          day: _data.obj[0].day,
          times: _data.obj[0].number,
          money: _data.obj[0].totalMoney,
          info: info
        })
        //console.log(_this.data)
      }
    })
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})