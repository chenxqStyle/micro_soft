var app = getApp()
Page({
  /**
   * 页面的初始数据
   */
  data: {
    caseDetail:''
  },

  //获取详情页页面数据
  getCaseDetail(case_id){
    var that = this;
    wx.request({
      url: app.globalData.httpUrl + 'case/case_info.php',
      data: {
        case_id: case_id
      },
      success: function (res) {
        let data = res.data
        if (data.state == 1) {
          that.setData({ caseDetail: data })
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
  onLoad: function (options) {
    var case_id = options.case_id;
    this.getCaseDetail(case_id)
  },
})