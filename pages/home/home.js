// pages/home/home.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    message:[
      {
        nickname: '用户A',
        content: '青联暖心，与爱同行!',
        donation: 200,
        headUrl: '/images/ranking/example.png'
      }
    ],
    heartActivity: {},
    raisePeople:'',
    raiseMoney:'',
    eventContent:''
  },
  // 获取 暖心行动 信息
  getHeartActivity() {  
    let _this = this  
    wx.request({
      url: getApp().globalData.api + '/a/wxinterface/qinglian/queryEvent', //
      data: {
        eventId: getApp().globalData.eventId        
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        //console.log(res.data)        
        let data = res.data             
        _this.setData({
          raisePeople: data.obj.raisePeople,
          raiseMoney: data.obj.raiseMoney,
          eventContent: data.obj.eventContent,
        })
      }
    }) 
  },
  // 获取留言 信息
  getMessage() {
    let _this = this  
    wx.request({
      url: getApp().globalData.api + '/a/wxinterface/qinglian/commentList', //
      data: {
        eventId: '2'
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        //console.log(res.data)
        _this.message = res.data.list           
        _this.setData({
          message: _this.message      
        })
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getMessage()
    this.getHeartActivity()
  }
})