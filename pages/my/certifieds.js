// pages/my/certifieds.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    onePart: 1,
    twoPart: 0,
    hasPhoneNum: false,
    hasButton: true,
    files: [],
    tempFilePaths: [],
    chooseImage1: '../../images/Click_shooting_front.png',
    chooseImage2: '../../images/Click_shooting_reverse.png',
    chooseImage3: '../../images/Click_shooting_xueli.png',
    file1: '',
    file2: '',
    file3: '',
    nickname: '',
  },


  chooseImage: function (e) {
    var ids = e.currentTarget.dataset.ids
    console.log(ids)
    var that = this;
    wx.chooseImage({
      count: 1,
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
        //console.log(that.data.files)
        //正面
        if (ids == 1) {
          that.setData({ file1: res.tempFilePaths[0] });
          var file1 = that.data.file1
          //上传文件
          wx.uploadFile({
            url: 'https://www.developsea.cn/wechat/uploadAutphoto.php',
            filePath: file1,
            //name: 'uploadfile_ant',
            formData: {
              my_id: wx.getStorageSync('my_id'),
              my_session: wx.getStorageSync('my_session'),
              ids: 1
            },
            name: 'file',
            method: 'post',
            header: {
              "Content-Type": "multipart/form-data"
            },
            success: function (res) {
              wx.hideToast();
              var jsonObj = JSON.parse(res.data)
              //根据返回结果做交互
              if (jsonObj.errCode == 0) {
                wx.showToast({
                  title: '上传成功',
                  icon: 'none'
                })
                setTimeout(function () {
                  wx.hideToast();
                }, 200000)
                return false;
              } else {
                wx.showToast({
                  title: '上传失败',
                  icon: 'none'
                })
                setTimeout(function () {
                  wx.hideToast();
                }, 2000)
                return false;
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
        //反面
        if (ids == 2) {
          that.setData({ file2: res.tempFilePaths[0] });
          var file2 = that.data.file2
          //上传文件
          wx.uploadFile({
            url: 'https://www.developsea.cn/wechat/uploadAutphoto.php',
            filePath: file2,
            //name: 'uploadfile_ant',
            formData: {
              my_id: wx.getStorageSync('my_id'),
              my_session: wx.getStorageSync('my_session'),
              ids: 2
            },
            name: 'file',
            method: 'post',
            header: {
              "Content-Type": "multipart/form-data"
            },
            success: function (res) {
              wx.hideToast();
              console.log('我是上传成功', res)
              var jsonObj = JSON.parse(res.data)
              //根据返回结果做交互
              if (jsonObj.errCode == 0) {
                console.log('我是上传成功2', res)
                wx.showToast({
                  title: '上传成功',
                  icon: 'none'
                })
                setTimeout(function () {
                  wx.hideToast();
                }, 4000)
                return false;
              } else {
                console.log('我是上传返回结果失败', res)
                wx.showToast({
                  title: '上传失败',
                  icon: 'none'
                })
                setTimeout(function () {
                  wx.hideToast();
                }, 2000)
                return false;
              }


            },
            fail: function (res) {
              console.log('我是上传失败', res)
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
        //学历
        if (ids == 3) {
          that.setData({ file3: res.tempFilePaths[0] });
          var file3 = that.data.file3
          //上传文件
          wx.uploadFile({
            url: 'https://www.developsea.cn/wechat/uploadAutphoto.php',
            filePath: file3,
            //name: 'uploadfile_ant',
            formData: {
              my_id: wx.getStorageSync('my_id'),
              my_session: wx.getStorageSync('my_session'),
              ids: 3
            },
            name: 'file',
            method: 'post',
            header: {
              "Content-Type": "multipart/form-data"
            },
            success: function (res) {
              wx.hideToast();
              var jsonObj = JSON.parse(res.data)
              //根据返回结果做交互
              if (jsonObj.errCode == 0) {
                wx.showToast({
                  title: '上传成功',
                  icon: 'none'
                })
                setTimeout(function () {
                  wx.hideToast();
                }, 2000)
              } else {
                wx.showToast({
                  title: '上传失败',
                  icon: 'none'
                })
                setTimeout(function () {
                  wx.hideToast();
                }, 2000)
                return false;
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

        var files = that.data.files
        /**
         * 上传完成后把文件上传到服务器
         */
        /* var count = 0;
         for (var i = 0, h = files.length; i < h; i++) {
           上传文件
           wx.uploadFile({
             url: 'https://www.developsea.cn/wechat/uploadAutphoto.php',
             filePath: files[i],
             name: 'uploadfile_ant',
             header: {
               "Content-Type": "multipart/form-data"
             },
             success: function (res) {
               count++;
               如果是最后一张,则隐藏等待中  
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
         }*/

      }
    })
  },

  bindnickname: function (event) {
    this.setData({ nickname: event.detail.value })
  },

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

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    // console.log(wx.getStorageSync('my_id'), wx.getStorageSync('my_session'))
    wx.request({
      url: 'https://www.developsea.cn/wechat/getmymoney.php',
      data: {
        my_id: wx.getStorageSync('my_id'),
        my_session: wx.getStorageSync('my_session'),
      },
      method: 'POST',
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        //console.log(res)
        if (res.data.phone_num != null) {
          that.setData({
            phoneNum: res.data.phone_num,
            hasPhoneNum: true,
            hasButton: false
          })
        }
        wx.setStorageSync('autQuery', res.data.autQuery);
      },

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
  onShareAppMessage: function () {

  },
  /**
   * 下一步
   */
  bindnext: function (e) {

    var nickname = this.data.nickname
    if (nickname == '') {
      wx.showToast({
        title: '真实姓名不能为空',
        icon: 'none'
      })
      setTimeout(function () {
        wx.hideToast()
      }, 2000)
      return false;
    }
    this.setData({
      onePart: 0,
      twoPart: 1
    })
  },

  bindCertified: function (e) {
    var autQuery = wx.getStorageSync('isaut')
    var tmp_my_id = wx.getStorageSync('my_id')
    var tmp_my_session = wx.getStorageSync('my_session')
    var nickname = this.data.nickname
    if (nickname == '') {
      wx.showToast({
        title: '真实姓名不能为空',
        icon: 'none'
      })
      setTimeout(function () {
        wx.hideToast()
      }, 2000)
      return false;
    }
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
                setBody: '认证',
                setAttach: '测试2',
                goodsTag: '测试3',
              },
              success: function (res) {
                var data = res.data;
                var my_trade_no = res.data.trade_no;
                // console.log(data);
                wx.requestPayment({
                  timeStamp: data['timeStamp'],
                  nonceStr: data['nonceStr'],
                  package: data['package'],
                  signType: data['signType'],
                  paySign: data['paySign'],
                  success: function (res) {
                    wx.request({
                      url: 'https://www.developsea.cn/wechat/myPay/mypay/wx_js_callback.php',
                      method: 'POST',
                      dataType: 'json',
                      header: {
                        'content-type': 'application/json' // 默认值   
                      },
                      data: {
                        my_id: tmp_my_id,
                        he_id: 'he_id',
                        my_fee: 500,
                        outtradeno: my_trade_no,
                        tradetype: '认证'
                      },
                      success: function (res) {
                        // 支付成功，做业务处理 第一个地方
                        var data = res.data;
                        console.log(res);
                        wx.showToast({
                          title: '支付成功',
                          icon: 'none',
                        })
                        setTimeout(function () {
                          wx.hideToast()
                        }, 2000)

                      }
                    })

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

})