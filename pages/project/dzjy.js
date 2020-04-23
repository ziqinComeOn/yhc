// pages/project/dzjy.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    sendList: [],
  },
  select: {
    page: 1,
    size: 6,
    isEnd: false
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showToast({
      title: '加载中',
      icon: 'loading',
      duration:10000
    })
    this.getData()
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    this.getData()
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  getData: function () {
    var _this = this;
    if (this.select.isEnd) {
      return
    }
   
    wx.showToast({
      title: '加载中',
      icon: 'loading',
      duration:10000
    })
    //大宗交易
    app.reqPostfunc.reqPost('wxyaosu/jc_index', { page: this.select.page, size: this.select.size }, function (res) {
        if (res) {

          var content = res;
          _this.setData({
            sendList: (_this.data.sendList).concat(content)
          })
          if (content.length > 0) {
            _this.select.page++
          } else {
            _this.select.isEnd = true
          }
          wx.hideToast()
        } else {
          //没有更多数据了
          wx.showToast({
            title: '没有更多了',
            icon: 'none',
            mask: true,
            duration: 2000
          })
        }

      })   

  },
})