// pages/personal/personal.js

//获取应用实例
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {},
    personalInfo: {
      donation: 0
    },
    yaa: true,
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    encryptedData:null,
    iv:null
  },
  //事件处理函数
  turnToAbout: function (value) {
    wx.navigateTo({
      url: './about/about'
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // console.log(app.globalData)
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } /*else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      console.log(app.userInfoReadyCallback)
      app.userInfoReadyCallback = res => {
        console.log(res)
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    }*/ else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true,
            encryptedData: res.encryptedData,
            iv: res.iv
          })
          setUser(this)
        }
      })
      
    }
    //console.log(this.data.userInfo)
  },

  getUserInfo: function (e) {
   /* console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })*/
    wx.getUserInfo({
      success: res => {
        app.globalData.userInfo = res.userInfo
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true,
          encryptedData: res.encryptedData,
          iv: res.iv
        })
        setUser(this)
      }
    })
  }
})

function setUser(_this){
  wx.login({
    success: function (res) {
      if (res.code) {
        wx.request({
          url: getApp().globalData.api + '/a/wxinterface/setUserInfo', //
          data: {
            js_code: res.code,
            encryptedData: _this.data.encryptedData,
            iv: _this.data.iv
          },
          header: {
            'content-type': 'application/json' // 默认值
          }
        })
      }
    }
  })
}