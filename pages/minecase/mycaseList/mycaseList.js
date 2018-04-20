var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    myCaseList:[]
  },
  //显示具体的商品信息
  showCaseDetail_fun(event){
    let case_id = event.currentTarget.dataset.id;
    wx.navigateTo({
      url: '../mycaseListDetails/mycaseListDetails?case_id='+case_id,
    });
  },
  getMyCaseList(){
    var that = this;
    wx.request({
      url: app.globalData.httpUrl + 'case/case_list.php',
      data: {
        sfz: wx.getStorageSync('sfz'),
      },
      success: function (res) {
        let data = res.data
        if (data.state == 1) {
          that.setData({ myCaseList: data.case_list })
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

      }
    })
  },
  onLoad:function(){
    this.getMyCaseList();
  }

})