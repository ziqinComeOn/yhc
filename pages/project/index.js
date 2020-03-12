
var app = getApp();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    navTab: ['大宗交易', '定向增发', '精选项目'],
    currentTab: 0,
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
    this.getData()
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

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
  currentTab: function (e) {
    if (this.data.currentTab == e.currentTarget.dataset.idx) {
      return;
    }
    this.setData({
      currentTab: e.currentTarget.dataset.idx
    })
    this.select = {
      page: 1,
      size: 6,
      isEnd: false
    }
    this.data.sendList = [];
    this.getData()
  },
  getData: function () {
    var _this = this;
    if (this.select.isEnd) {
      return
    }
    // var type = this.data.currentTab == 0 ? 'shouru' : this.data.currentTab == 1 ? 'tixian' : 'zhichu';
    // app.reqGetfunc.reqGet('abc.html/'+ type + '/' + this.select.page + '/' + this.select.size, {},function (res) {
    //   var content = res.data.data;
    //   _this.setData({
    //     sendList: (_this.data.sendList).concat(content)
    //   })
    //   if (content.length > 0) {
    //     _this.select.page++
    //   } else {
    //     _this.select.isEnd = true
    //   }
    // })

    if (this.data.currentTab == 0) {
      //收入
      app.reqPostfunc.reqPost('wechat/myfile/get_money_in.php', { my_id: wx.getStorageSync('my_id'), my_session: wx.getStorageSync('my_session') }, function (res) {
        var content = res;
        _this.setData({
          sendList: (_this.data.sendList).concat(content)
        })
        if (content.length > 0) {
          _this.select.page++
        } else {
          _this.select.isEnd = true
        }
      })
    }

    if (this.data.currentTab == 1) {
      //提现
      app.reqPostfunc.reqPost('wechat/myfile/get_money_out.php', { my_id: wx.getStorageSync('my_id'), my_session: wx.getStorageSync('my_session') }, function (res) {
        var content = res;
        _this.setData({
          sendList: (_this.data.sendList).concat(content)
        })
        if (content.length > 0) {
          _this.select.page++
        } else {
          _this.select.isEnd = true
        }
      })
    }

    if (this.data.currentTab == 2) {
      //提现
      app.reqPostfunc.reqPost('wechat/myfile/get_money_wxout.php', { my_id: wx.getStorageSync('my_id'), my_session: wx.getStorageSync('my_session') }, function (res) {
        var content = res;
        _this.setData({
          sendList: (_this.data.sendList).concat(content)
        })
        if (content.length > 0) {
          _this.select.page++
        } else {
          _this.select.isEnd = true
        }
      })
    }

  },

  bindBillDetail: function (e) {
    var item = e.currentTarget.dataset.item
    var currentTab = e.currentTarget.dataset.currentTab
    //console.log(currentTab)
    var str = JSON.stringify(item)
    var _str = JSON.stringify(currentTab)
    wx.navigateTo({
      url: "/pages/wallet/billDetails?jsonStr=" + str + '&strr=' + _str
    })
  }

})