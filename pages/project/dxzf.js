// pages/project/dxzf.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    sendList:true,
    hasMoreData: true,
    isRefreshing: false,
    isLoadingMoreData: false
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
    if (this.data.isRefreshing || this.data.isLoadingMoreData) {
      return
    }
    this.setData({
      isRefreshing: true,
      hasMoreData: true
    })
    this.requestData()//数据请求
  },

  /**
   * 页面上拉触底事件的处理函数 上拉加载
   */
  onReachBottom: function () {
    if (this.data.isRefreshing || this.data.isLoadingMoreData || !this.data.hasMoreData) {
      return
    }

    this.setData({
      isLoadingMoreData: true
    })
    this.requestData()//数据请求

  },

  //点击事件
  bindToDetail:function(e){
    var id = e.currentTarget.dataset.id
    //console.log(id)
    //跳转页面
    wx.navigateTo({
      url: '/pages/project/zf_detail?id='+id,
    })

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },

})