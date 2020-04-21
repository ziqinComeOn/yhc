// pages/setup/setup.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },
  bindSetting:function(){
    wx.showToast({
      title: '加载中...',
      icon: 'loading',
      duration: 5000
    });
    //调起客户端小程序设置界面，返回用户设置的操作结果 设置界面只会出现小程序已经向用户请求过的权限。
    wx.openSetting({
      success(res) {
        wx.hideToast()
        console.log(res.authSetting)
        // res.authSetting = {
        //   "scope.userInfo": true,
        //   "scope.userLocation": true
        // }
      }
    })
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
    try {
      const res = wx.getStorageInfoSync()
      console.log(res.keys)
      console.log(res.currentSize)
      console.log(res.limitSize)
    } catch (e) {
      // Do something when catch error
    }
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

  }
})