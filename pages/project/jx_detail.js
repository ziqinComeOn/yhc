// pages/project/dz_detail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    floorstatus: false, // 返回顶部
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  /**
   * 返回顶部
   */
  goTop: function (t) {
    this.setData({
      scrollTop: 0
    });
  },

  /**
   * 显示/隐藏 返回顶部按钮
   */
  scroll: function (e) {
    this.setData({
      floorstatus: e.detail.scrollTop > 200
    })
  },
  /**
   * 打电话
   */
  makeCall: function (e) {
    let phone_number = e.target.dataset.phone
    wx.makePhoneCall({
      phoneNumber: phone_number //仅为示例，并非真实的电话号码
    })
  }
})