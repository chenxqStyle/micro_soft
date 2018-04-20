//index.js
//获取应用实例
var app = getApp()
Page({
  data: {
    motto: 'Hello World',
    noClick:0,
    userInfo: {
      name: '',
      id: ''
    },
    imageUrl: app.globalData.httpUrl
  },
  //调转到
  toCloudMain_fun: function (e) {
    var that = this
    // 禁止按钮点击
    that.setData({
      noClick:1
    })

    wx.request({
      url: app.globalData.httpUrl + 'sfz_verify.php',
      data: {
        sfz: e.detail.value.sfz,
        name: e.detail.value.name
      },
      success: function (res) {
        console.log('获取实名认证：', res)
        let data = res.data
        if (data.state == 1) {
          wx.navigateTo({
            url: '../lalx/lalx',
            success: function () {
              wx.setStorageSync('user_token', data.user_token)
              wx.setStorageSync('zxla', 0)
              wx.setStorageSync('sfz', e.detail.value.sfz)
            }
          });
        } else {
          wx.showToast({
            title: '验证失败',
            icon: 'loading',
            duration: 500
          })
        }
      },
      fail: function (err) {
        console.log(err)
      },
      complete: function () {
        that.setData({
          noClick: 0
        })
      }
    })
  },
  //事件处理函数
  bindViewTap: function () {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
})