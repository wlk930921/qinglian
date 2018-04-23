// pages/donation/donation.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    money:[1,10,50,100,1000],
    message:'',
    active: '',
    messageLength: 0,
    messageMaxLength: 200
  },
  // 金额切换
  switch(e) {
    let index = e.currentTarget.dataset.switchType || ''
    this.setData({
      active: index
    })
  },
  // 留言板
  bindTextAreaBlur(e) {
    if (e.detail && e.detail.value.length > 0){
      this.setData({
        message: e.detail.value
      })
    }
  },
  bindTextAreaInput(e) {
    if (e.detail && e.detail.cursor >= 0) {
      this.setData({
        messageLength: e.detail.cursor
      })
    }
  },
  // 提交
  submit() {
    console.log(this.data.message)
    console.log(this.data.active)
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
  }
})