//index.js
//获取应用实例
var app = getApp()
Page({
  data: {
    motto: 'Hello World',
    userInfo: {
      name:'',
      id:''
    },
    imageUrl: app.globalData.httpUrl,
    noClick:0
  },
  //调转到
  toCloudMain_fun:function(e){
    let that = this
    that.setData({
      noClick:1
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
          that.setData({
            noClick: 0
          })
        }
      })
      return false;
    };
    wx.request({
      url: app.globalData.httpUrl + 'sfz_verify.php',
      data:{
        sfz:e.detail.value.sfz,
        name:e.detail.value.name
      },
      success:function(res){
        console.log('获取实名认证：',res)
        let data = res.data
        if(data.state == 1){
          wx.showToast({
            title: '成功',
            icon: 'success',
            duration: 2000
          })
          wx.navigateTo({
            url: '../yyyg/yyyg',
            success:function(){
              wx.setStorageSync('sfz', e.detail.value.sfz)
            }
          });
        }else{
          wx.showToast({
            title: '验证失败',
            icon: 'loading',
            duration: 500
          })
        }
      },
      fail:function(err){
        console.log(err)
      },
      complete:function(){
        that.setData({
          noClick:0
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