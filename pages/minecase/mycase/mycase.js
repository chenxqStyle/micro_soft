var app = getApp()
Page({
  /**
   * 页面的初始数据
   */
  data: {
    imgs: [{
      imgsrc: '../../../image/name.png',
      imgmode: 'widthFix'
    }, {
      imgsrc: '../../../image/idcard.png',
      imgmode: 'widthFix'
    }],
    userInfo: {
      name: 'iii',
      id: '320322199809076754'
    },
    imageUrl: app.globalData.httpUrl,
    noClick: 0
  },

  toCloudMain_fun: function (e) {
    let _this = this;
    _this.setData({
      noClick: 1
    })
    //校验身份证是否合法
    let reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
    if (reg.test(e.detail.value.sfz) === false) {
      console.log('00')
      wx.showToast({
        title: '身份证号码错误',
        icon: 'loading',
        duration: 1000,
        success:function(){
          _this.setData({
            noClick: 0
          })
        }
      })
      return false;
    };
    wx.request({
      url: app.globalData.httpUrl + 'sfz_verify.php',
      data: {
        sfz: e.detail.value.sfz,
        name: e.detail.value.name
      },
      success: function (res) {
        let data = res.data;
        console.log(res,'res')
        if (data.state == 1) {
          wx.showToast({
            title: '成功',
            icon: 'success',
            duration: 2000
          })
          console.log(e.detail.value.sfz,'fff')
          wx.navigateTo({
            url: '../faceInfo/faceInfo',
            success: function () {
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
        _this.setData({
          noClick: 0
        })

      }
    })
  },






})