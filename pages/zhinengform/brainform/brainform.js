let app = getApp();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    imgs:[{
      imgsrc:'../../../image/name.png',
      imgmode:'widthFix'
    },{
      imgsrc:'../../../image/idcard.png',
      imgmode: 'widthFix'
    }],
    imageUrl: app.globalData.httpUrl,
    noClick: 0,
    name:'',
    id:''
  },
  //智能表单的登录
  formLogin_fun:function(e){
    let _this = this;
    _this.setData({
      noClick: 1
    })
    //校验身份证是否合法
    let reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
    if (reg.test(e.detail.value.formidcard) === false) {
      console.log('00')
      wx.showToast({
        title: '身份证号码错误',
        icon: 'loading',
        duration: 1000,
        success: function () {
          _this.setData({
            noClick: 0
          })
        }
      })
      return false;
    }
  
    wx.setStorageSync('sfz', e.detail.value.formidcard)
    wx.request({
      url: app.globalData.httpUrl + 'sfz_verify.php', 
      data: {
        name: e.detail.value.formname,
        sfz: e.detail.value.formidcard
      },
      header: {
        'content-type': 'application/json' 
      },
      success: function (res) {
        console.log(res,'res')
        //表单验证成功
        if (res.data.state === 1){
          wx.showToast({
            title: '成功',
            icon: 'success',
            duration: 2000
          })
          wx.navigateTo({
            url: '../brainform_main/brainform_main',
            success: function (res) {

            }
          })
        }else{
          //表单验证失败
          wx.showToast({
            title: '验证失败',
            icon: 'loading',
            duration: 500
          })
        }
      },
      complete: function () {
        _this.setData({
          noClick: 0
        })
      }
    })

  },



})