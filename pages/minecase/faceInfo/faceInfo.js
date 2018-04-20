let app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isShowVideo:true,    //是否显示视频部分
    imageUrl: app.globalData.httpUrl,
  },
  //验证通过
  next_login:function(){
    let _this = this;
    _this.setData({
      isShowVideo:false
    });
  },
  //下载gif图片
  imgloadend_fun:function(){
    let _this = this;
    setTimeout(function(){
      wx.navigateTo({
        url: '../mycaseList/mycaseList',
        success: function (res) {
          // _this.setData({
          //   isShowVideo: true
          // });
        }
      });
    },7000)
  },
})