// pages/project/dz_detail.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    floorstatus: false, // 返回顶部

    dialog1: false,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var id = options.id
    var that = this
    app.reqGetfunc.reqGet('wxyaosu/dzjy',{'id':id},function(res){
       that.setData({msg:res.msg})
    })

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
  onShareAppMessage: function (res) {
    var users = wx.getStorageSync('user');
    if (res.from === 'button') { }
    return {
      title: '萤火虫大宗减持',
      path: '/pages/index/index?from_uid=' + users.id,
      imageUrl: '../../images/1.png',//自定义图片路径，可以是本地文件路径、代码包文件路径或者网络图片路径。支持PNG及JPG。显示图片长宽比是 5:4。
      success: function (res) { }
    }
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
    var that = this
    let phone_number = e.target.dataset.phone
    //从全局缓存中获取此人所有积分数量，如果不足6积分，提醒对方分享邀请好友注册奖励5积分
    let myIntegral = wx.getStorageSync("myIntegral")

    //获取拨打此电话所需的积分数量
    let integral = e.target.dataset.integral
    //提示框提醒要消耗积分
    wx.showModal({
      content: '非会员一键拨号将扣除20积分 \n 是否确认？',
      confirmColor: '#436ec1',
      cancelColor: '#436ec1',
      success: function (res) {
        if (res.confirm) {
          console.log('用户点击确定')
          //判断个人积分是否满足此次消耗 转成数字类型
          if (Number(myIntegral) < Number(integral)) {
            console.log("积分不足调起Dialog")
            //提示积分不足
            wx.showModal({
              title: '温馨提示',
              content: '积分不足，查看失败 \n 点击确定查看如何获取积分',
              confirmColor: '#436ec1',
              cancelColor: '#436ec1',
              success: function (res) {
                //积分不足 提示获取积分的几种方式
                if (res.confirm) {
                  that.setData({
                    dialog1: true
                  });
                } else {
                  console.log("用户点击取消")
                }
              }
            })

          } else {
            wx.showModal({
              title: '温馨提示',
              content: '联系我时请说是在萤火虫大宗减持网上看到的😄',
              confirmColor: '#436ec1',
              cancelColor: '#436ec1',
              success: function (res) {
                //可以正常拨号
                wx.makePhoneCall({
                  phoneNumber: phone_number
                })
              }
            })

          }

        } else {
          console.log('用户点击取消')
        }

      }
    })

  },
  close: function () {
    this.setData({
      dialog1: false,
      dialog2: false
    });
  },
})