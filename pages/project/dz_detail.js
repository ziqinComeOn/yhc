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
  makeCall:function(e){
    let phone_number = e.target.dataset.phone
    //从全局缓存中获取此人所有积分数量，如果不足6积分，提醒对方分享邀请好友注册奖励5积分
    let myIntegral = wx.getStorageSync("myIntegral")
    
    //获取拨打此电话所需的积分数量
    let integral = e.target.dataset.integral
    //提示框提醒要消耗积分
    wx.showModal({
      title: '提示',
      content: '模态弹窗',
      confirmColor: '#436ec1',
      cancelColor:'#436ec1',
      success: function (res) {
        if (res.confirm) {
          console.log('用户点击确定')
          //判断个人积分是否满足此次消耗 转成数字类型
          if (Number(myIntegral) < Number(integral)) {
            //积分不足 提示获取积分的几种方式

          }else{
            //可以正常拨号
            wx.makePhoneCall({
              phoneNumber: phone_number 
            })
          }

        } else {
          console.log('用户点击取消')
        }

      }
    })
    
  }
})