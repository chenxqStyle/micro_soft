// pages/zxla/laxq/laxq.js
var app = getApp()
Page({
  /**
   * 页面的初始数据
   */
  data: {
    dsr: [],
    detail:{}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log('详情 options：',options)
    let caseId = options.caseId;
    this.getAjDetail(caseId)
  },
  getAjDetail(caseId){
    var that = this;
    wx.request({
      url: app.globalData.httpUrl + 'zxla/case_info.php',
      data: {
        case_id:caseId
      },
      success: function (res) {
        console.log('案件详情', res)

        let data = res.data

        if (data.state == 1) {
          that.setData({ 
            detail: data.case,
            dsr:data.dsr_list
          })
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
  }

})