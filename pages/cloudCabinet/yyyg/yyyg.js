//index.js 
//获取应用实例 
var app = getApp()
Page({
  data: {
    // 页面配置  
    winWidth: 0,
    winHeight: 0,
    currentTab: 0, // tab切换 
    caseList:[],
    yyCaseList:[],
    yyDetail:{},
    showDetail:0,
    detailID:0,
    isShowDialog:false
  },
  onReady: function () {
    var that = this;
    // 获取系统信息 
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          winWidth: res.windowWidth,
          winHeight: res.windowHeight
        });
      }
    });
    that.getYyCaseList();
  },
  //显示弹出框
  showDialog:function(){
    let _this = this;
    _this.setData({
      isShowDialog: true
    })
  },
  //隐藏弹出层
  hideDialog : function(){
    let _this = this;
    _this.setData({
      isShowDialog: false
    })
  },
  // 滑动切换tab 
  bindChange: function (e) {
    var that = this;
    that.setData({ currentTab: e.detail.current });
    that.getYyRecode();
  },
  // 点击tab切换 
  swichNav: function (e) {
    var that = this;
    if (this.data.currentTab === e.target.dataset.current) {
      return false;
    } else {
      that.setData({
        currentTab: e.target.dataset.current
      })
    }
    if (this.data.showDetail == 1){
      that.backYyList()
    }
  },
  // 获取案件列表
  getYyCaseList(){
    var that = this;
    that.setData({
      caseList: []
    })
    console.log('sfz', wx.getStorageSync('sfz'))
    wx.request({
      url: app.globalData.httpUrl + 'yyyg/case_list.php',
      data: {
        sfz: wx.getStorageSync('sfz'),
      },
      success: function (res) {
        console.log(res,'案件列表信息');
        let data = res.data
        if (data.state == 1) {
          that.setData({caseList:data.case_list})
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
  // 我要预约
  goToYy(event){
    var case_id = event.currentTarget.dataset.id;
    var that = this;
    wx.request({
      url: app.globalData.httpUrl + 'yyyg/order_insert.php',
      data: {
        sfz: wx.getStorageSync('sfz'),
        case_id:case_id
      },
      success: function (res) {
        console.log('提交预约：', res)
        let data = res.data;

        if (data.state == 1) {
          wx.showToast({
            title: '预约成功',
            icon: 'success',
            duration: 2000
          })
          that.getYyCaseList()
        } else {
          wx.showToast({



            
            title: '预约失败',
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

  // 获取预约记录
  getYyRecode(){
    var that = this;
    that.setData({
      yyCaseList : []
    })
    wx.request({
      url: app.globalData.httpUrl + 'yyyg/order_list.php',
      data: {
        sfz: wx.getStorageSync('sfz'),
      },
      success: function (res) {
        console.log('获取名下预约案件列表：', res)
        let data = res.data;
        if (data.state == 1) {
          console.log(data.order_list,'00000000')
          that.setData({ 
            yyCaseList: data.order_list 
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
  },

  // 获取预约详情
  getDetail(event){
    var that = this;
    // that.setData({
    //   yyDetail : {}
    // });
    console.log(event)
    var order_id = event.currentTarget.dataset.order;
    console.log(order_id,'order_id')
    that.setData({showDetail:'1'})
    wx.request({
      url: app.globalData.httpUrl + 'yyyg/order_info.php',
      data: {
        order_id: order_id,
      },
      success: function (res) {
        console.log('获取预约案件详情：', res)
        let data = res.data
        if (data.state == 1) {
          that.setData({ yyDetail: data.order })
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
  // 回到预约列表 用于从二维码界面 不刷新页面
  backYyList() {
    this.setData({ showDetail: '0' })
  }
}) 