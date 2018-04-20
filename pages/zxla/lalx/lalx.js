//index.js 
//获取应用实例 
var app = getApp()
Page({
  data: {
    // 页面配置  
    winWidth: 0,
    winHeight: 0,
    currentTab:0, // tab切换 
    fxxz:1,
    pageInfo:[{
      titleImg:'../../../image/ms.png',
      title:'民商事一审',
      context: '民商事案件指以民商事法律所调整的社会关系为内容的案件或纠纷。'
    },{
        titleImg: '../../../image/zx.png',
      title: '执行案件',
      context: '指民事案件、刑事案件、行政案件通过法院判决、裁定或仲裁，被告没有履行在法院所需进行的下一步工作。'
    },{
        titleImg: '../../../image/xz.png',
      title: '行政案件',
      context: '指国家行政机关的行政行为不当，侵犯公民、法人合法权益时，由法院立案处理的行政争议案件。'
    }],
    laRecode:[]
  },
  onLoad: function (options) {
    var that = this;
    var recode = wx.getStorageSync('zxla')
    console.log("立案记录：", recode)
    if (recode == 1){
      that.setData({
        currentTab:1
      })
      that.getLaCaseList()
    }
    // 获取系统信息 
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          winWidth: res.windowWidth,
          winHeight: res.windowHeight
        });
      }
    });
  },
  // 滑动切换tab 
  bindChange: function (e) {
    var that = this;
    that.setData({ currentTab: e.detail.current });
    // that.getYyRecode();
  },
  // 点击tab切换 
  swichNav: function (e) {
    var that = this;

    if (e.target.dataset.current == 1){
        that.getLaCaseList();
    }

    if (this.data.currentTab === e.target.dataset.current) {
      return false;
    } else {
      that.setData({
        currentTab: e.target.dataset.current
      })
    }
    if (this.data.showDetail == 1) {
      that.backYyList()
    }
  },
  // 点击我要立案
  wyla(event){
    /**
     * type 0 民商
     *      1 执行
     *      2 行政
     */
    var type = event.currentTarget.dataset.type;
    wx.navigateTo({
      url: '../sccl/sccl',
      success:function(){
        wx.setStorageSync('laType', type)
      }
    })
  },


  // 获取案件列表
  getLaCaseList() {
    var that = this;
    wx.request({
      url: app.globalData.httpUrl + 'zxla/case_list.php',
      data: {
        sfz: wx.getStorageSync('sfz'),
      },
      success: function (res) {
        console.log('立案记录获取', res)

        let data = res.data

        if (data.state == 1) {
          that.setData({ laRecode: data.case_list })
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
  agree() {
    this.setData({ 'fxxz':0})
  },
  getLaDetail(e){
    let caseId = e.currentTarget.dataset.caseid;
    wx:wx.navigateTo({
      url: '../laxq/laxq?caseId='+caseId,
    })
  }
}) 