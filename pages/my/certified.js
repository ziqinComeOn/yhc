var app = getApp()
Page({
  data: {
    files: [],
    tempFilePaths: [],
    hasPhoneNum: false,
    hasButton: true
  },
  chooseImage: function (e) {
    var that = this;
    wx.chooseImage({
      count: 9,
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        console.log(res)
        wx.showToast({
          title: '正在上传...',
          icon: 'loading',
          mask: true,
          duration: 1000
        })
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        that.setData({
          files: that.data.files.concat(res.tempFilePaths)
        });

        var files = that.data.files
        /**
         * 上传完成后把文件上传到服务器
         */
        var count = 0;
        for (var i = 0, h = files.length; i < h; i++) {
          //上传文件
          wx.uploadFile({
            url: 'https://www.developsea.cn/wxcode/app/index.php',
            filePath: files[i],
            name: 'uploadfile_ant',
            header: {
              "Content-Type": "multipart/form-data"
            },
            success: function (res) {
              count++;
              //如果是最后一张,则隐藏等待中  
              if (count == files.length) {
                wx.hideToast();
              }
            },
            fail: function (res) {
              wx.hideToast();
              wx.showModal({
                title: '错误提示',
                content: '上传图片失败',
                showCancel: false,
                success: function (res) { }
              })
            }
          });
        }

      }
    })
  },
  previewImage: function (e) {
    wx.previewImage({
      current: e.currentTarget.id, // 当前显示图片的http链接
      urls: this.data.files // 需要预览的图片http链接列表
    })
  },

  bindTextAreaBlur: function (e) {
    console.log(e.detail.value)
  },

  /* getPhoneNumber(e) {
     console.log(e.detail.errMsg)
     console.log(e.detail.iv)
     console.log(e.detail.encryptedData)
     
   },*/
  /**
   * 获取手机号
   */
  getPhoneNumber: function (e) {
    var that = this;
    console.log(e.detail.errMsg)
    if (e.detail.errMsg == 'getPhoneNumber:fail user deny') {
      wx.showModal({
        title: '提示',
        showCancel: false,
        content: '未授权',
        success: function (res) { }
      })
    } else {
      wx.login({
        success: function (res) {
          var code = res.code;
          if (res.code) {
            //发起网络请求  
            console.log(res.code)
          } else {
            console.log('获取用户登录态失败！' + res.errMsg)
          }
          wx.showModal({
            title: '提示',
            showCancel: false,
            content: '同意授权',
            success: function (res) {
              //console.log(that)
              console.log(123)
              var tmp_my_id = wx.getStorageSync('my_id')
              console.log('my_id: ' + tmp_my_id)
              wx.request({
                url: 'https://www.developsea.cn/wechat/get_phone_num.php',
                data: {
                  code: code,
                  iv: e.detail.iv,
                  encryptedData: e.detail.encryptedData,
                  my_id: tmp_my_id
                },
                method: 'POST',
                header: {
                  'content-type': 'application/json'
                },
                success: function (res) {
                  wx.setStorageSync('user', res.data);
                  console.log(res)
                  if (res.data.errCode == "0") {
                    console.log(res.data)
                    wx.showToast({
                      title: '一键绑定成功',
                      icon: 'success',
                      duration: 2000,
                      success: function () {
                        // wx.switchTab({ url: '../user-center/index' });
                      }
                    })
                    that.setData({
                      phoneNum: res.data.phoneNum,
                      hasPhoneNum: true,
                      hasButton: false
                    })

                  } else {
                    wx.showModal({
                      title: '提示',
                      content: '一键绑定失败，请重新尝试',
                      success: function (res) {
                        if (res.confirm) {
                          console.log('用户点击确定')
                        } else if (res.cancel) {
                          console.log('用户点击取消')
                        }
                      }
                    })
                  }
                },
              });
            }
          })
        }
      });
    }
  },

  onLoad: function (options) {
    var that = this
    // console.log(wx.getStorageSync('my_id'), wx.getStorageSync('my_session'))
    wx.request({
      url: 'https://www.developsea.cn/wechat/aut_query.php',
      data: {
        my_id: wx.getStorageSync('my_id'),
        my_session: wx.getStorageSync('my_session'),
      },
      method: 'POST',
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        // console.log(res)
        if (res.data.phoneNum != null) {
          that.setData({
            phoneNum: res.data.phoneNum,
            hasPhoneNum: true,
            hasButton: false
          })
        }
        wx.setStorageSync('autQuery', res.data.autQuery);
      },

    })
  },

  onShow: function () {
    var that = this
    console.log(wx.getStorageSync('my_id'), wx.getStorageSync('my_session'))
    wx.request({
      url: 'https://www.developsea.cn/wechat/aut_query.php',
      data: {
        my_id: wx.getStorageSync('my_id'),
        my_session: wx.getStorageSync('my_session'),
      },
      method: 'POST',
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        console.log(res)
        if (res.data.phoneNum != null) {
          that.setData({
            phoneNum: res.data.phoneNum,
            hasPhoneNum: true,
            hasButton: false
          })
        }
        wx.setStorageSync('autQuery', res.data.autQuery);
      },

    })
  },

  bindCertified: function (e) {
    var autQuery = wx.getStorageSync('autQuery')
    var tmp_my_id = wx.getStorageSync('my_id')
    var tmp_my_session = wx.getStorageSync('my_session')
    var autQuery = 0;
    if (autQuery == 0) {
      //进行支付认证
      wx.showModal({
        title: '提示',
        content: '即将进行认证，需要支付5元',
        confirmText: "确认支付",
        cancelText: "稍后支付",
        confirmColor: "#90CBC7",
        cancelColor: "#8B8B7A",
        success: function (res) {
          if (res.confirm) {
            //发起支付
            wx.request({
              url: 'https://www.developsea.cn/wechat/myPay/mypay/please_pay.php',
              method: 'POST',
              dataType: 'json',
              header: {
                'content-type': 'application/json' // 默认值   
              },
              data: {
                my_id: tmp_my_id,
                my_session: tmp_my_session,
                my_fee: 10,
                setBody: '测试1',
                setAttach: '测试2',
                goodsTag: '测试3',
              },
              success: function (res) {
                var data = res.data;
                console.log(data);
                console.log(data["timeStamp"]);
                wx.requestPayment({
                  timeStamp: data['timeStamp'],
                  nonceStr: data['nonceStr'],
                  package: data['package'],
                  signType: data['signType'],
                  paySign: data['paySign'],
                  success: function (res) {
                    wx.showToast({
                      title: '支付成功',
                      icon: 'none',
                    })
                    setTimeout(function () {
                      wx.hideToast()
                    }, 2000)
                  },
                  fail: function (res) {
                    console.log(res);
                  }
                })
              }
            })
          } else {
          }
        }
      });
    }
    if (autQuery == 1) {
      //认证审核中
      wx.showModal({
        title: '提示',
        showCancel: false,
        confirmColor: "#90CBC7",
        content: '已申请认证，请保持电话畅通，会有工作人员给您核实信息',
        success: function (res) {
          if (res.confirm) {
            console.log('用户点击确定')
          } else if (res.cancel) {
            console.log('用户点击取消')
          }
        }
      })

    }
    if (autQuery == 2) {
      //已完成认证
      wx.showModal({
        title: '提示',
        showCancel: false,
        confirmColor: "#90CBC7",
        content: '已完成认证，无须再次认证',
        success: function (res) {
          if (res.confirm) {
            console.log('用户点击确定')
          } else if (res.cancel) {
            console.log('用户点击取消')
          }
        }
      })
    }

  }

});