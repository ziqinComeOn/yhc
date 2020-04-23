// pages/project/jxxm.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    sendList: [],
    hasMoreData: true,
    isRefreshing: false,
    isLoadingMoreData: false
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
      duration: 10000
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
    wx.showToast({
      title: '刷新中...',
      icon: 'loading',
      duration: 10000
    })
    if (this.data.isRefreshing || this.data.isLoadingMoreData) {
      return
    }
    this.setData({
      isRefreshing: true,
      hasMoreData: true
    })
    var flag = 1
    this.getData(flag)//数据请求
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    wx.showToast({
      title: '加载中...',
      icon: 'loading',
      duration: 10000
    })
    if (this.data.isRefreshing || this.data.isLoadingMoreData || !this.data.hasMoreData) {
      return
    }

    this.setData({
      isLoadingMoreData: true
    })
    this.getData()//数据请求

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  getData: function (flag) {
    var _this = this;
    if (this.select.isEnd) {
      return
    }

    wx.showToast({
      title: '加载中',
      icon: 'loading',
      duration: 10000
    })
    //大宗交易
    app.reqPostfunc.reqPost('wxyaosu/pickitem_index', { page: this.select.page, size: this.select.size }, function (res) {
      if (res.status == 'OK') {
        var content = res.data;
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
        if (flag == 1) {
          wx.showToast({
            title: '已刷新',
            icon: 'none',
            mask: true,
            duration: 2000
          })
        } else {
          //没有更多数据了
          wx.showToast({
            title: '没有更多了',
            icon: 'none',
            mask: true,
            duration: 2000
          })
          _this.setData({ hasMoreData: false })
        }

        _this.setData({ isLoadingMoreData: false, isRefreshing: false, })
      }

    })

  },
})