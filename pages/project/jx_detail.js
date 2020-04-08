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
    wx.showModal({
      title: '温馨提示',
      content: '联系我时请说是在萤火虫大宗减持网上看到的😄',
      confirmColor: '#436ec1',
      cancelColor: '#436ec1',
      success: function (res) {
        if(res.confirm){
          //可以正常拨号
          wx.makePhoneCall({
            phoneNumber: phone_number
          })
        }else{
          //取消拨号
          console.log("取消拨号")
        }
      }
    })
  }


  
})