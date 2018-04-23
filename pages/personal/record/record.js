// pages/personal/record/record.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    scrollTop: 0,
    scrollHeight: 0,
    list: [],
    hidden: true,
    page: 1,
    pageSize: 10,
    total: 23
  },
  // 获取记录
  getData(updata) {
    let data = []
    let index = this.data.pageSize
    let page = this.data.page
    let _this = this
    
    wx.request({
      url: getApp().globalData.api + '/a/wxinterface/personDonate', //
      data: {
        userId: 100
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        //console.log(res.data)        
        let _data = res.data
        for (var i = 0; i < _data.obj.length; i++) {
          data.push({
            time: _data.obj[i].payTime,
            title: _data.obj[i].eventName + (page - 1) + '' + i,
            donation: _data.obj[i].amount,
            imgUrl: _data.obj[i].eventPicUrl
          })
        }

        _this.setData({
          list: _this.data.list.concat(data)
        })
        if (_this.data.list.length >= _this.data.total) {
          _this.setData({
            hidden: false
          })
        }
      }
    })
  },
  // 上拉加载
  lower() {
    let currentPage = this.data.page
    if (currentPage * this.data.pageSize >= this.data.total) {
      return
    }
    currentPage ++
    this.setData({
      page: currentPage
    });
    this.getData(true)
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    wx.getSystemInfo({
      success:function(res) {
        that.setData({
          scrollHeight:res.windowHeight
        });
      }
    });
    this.getData()
  },
  onPullDownRefresh: function () {
    this.setData({
      page: 1,
      scrollTop: 0,
      list: []
    });
    this.getData()
    wx.stopPullDownRefresh();
  }
})