// pages/ranking/ranking.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    active: 'day',
    list: [],
    hidden: true,
    scrollTop: 0,
    scrollHeight: 0,
    page: 1,
    pageSize: 10,
    total: 13,
    category:'',
    isLast:false
  },
  // 切换排名
  switch(e) {    
    let index = e.currentTarget.dataset.switchType || 'day'        
    this.setData({
      active: index,
      page: 1,
      scrollTop: 0,
      list: []
    })
    // 刷新数据
    this.getData()
  },
  getData() {
    // console.log(this.data.active)
    let _this = this
    _this.setData({
      hidden: true
    })
   /* let data = []
    let index = this.data.pageSize
    let page = this.data.page
    for (var i = 0; i < index; i++) {
      data.push({
        name: 'abb' + (page - 1) + '' + i,
        donation: 200,
        times: 3,
        imgUrl: '/images/ranking/example.png'
      })
    }*/
    wx.request({
      url: getApp().globalData.api + '/a/wxinterface/qinglian/receiptRank', //
      data: {
        eventId: getApp().globalData.eventId,
        type: _this.data.active,
        pageNo:_this.data.page
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        //console.log(res.data)
        let data = res.data                
        if (data.list.length == 0) {
            _this.setData({
              hidden: false,
              isLast:true
            })
        } else {
            _this.setData({
            list: _this.data.list.concat(data.list)
          })
        }        
      }
    })    
  },
  // 上拉加载
  lower(e) {
    let currentPage = this.data.page    
    if (!this.data.isLast) {
      currentPage++
      this.setData({
        page: currentPage
      });
      this.getData(true)
    } else {
      this.setData({
        hidden: false
      })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    // 获取屏幕高度 设置滚动高度
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          scrollHeight: res.windowHeight
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