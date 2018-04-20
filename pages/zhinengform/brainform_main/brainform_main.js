
//获取应用实例 
var app = getApp()
Page({
  data: {
    winWidth: 0,  // 页面配置  
    winHeight: 0,
    currentTab: 0,    // tab切换 
    isShowFormDetail:true,   //是否显示智能填单的详情页
    isShowRecodeDetail:true,   //是否显示填单记录详情页
    listData:[],   //表单列表
    tiandan_list:[],   //填单记录
    codeimg:'',
    happen_time :'',
    typecode:''
  },
  //智能填单切换页面的显示与隐藏
  changeFormDetail_fun:function(e){
    let _this = this;
    let _code = e.currentTarget.dataset.code;
    if (_code == 'sddzqrs'){
      _this.setData({
        isShowFormDetail: false
      });
    }else{
      wx.showModal({
        title: '提示',
        content: '正在开发当中',
        success: function (res) {
          if (res.confirm) {
            console.log('用户点击确定')
          } else if (res.cancel) {
            console.log('用户点击取消')
          }
        }
      })
    }
  },
  //案件的填充信息
  caseDetail_fun:function(e){
    //对于必填字段的校验
    if (e.detail.value.casepeo === ''){
      //当事人
      wx.showToast({
        title: '当事人为空',
        icon: 'loading',
        duration: 2000
      })
      return false;
    }
    if (e.detail.value.caseaddr === ''){
      //送达地址
      wx.showToast({
        title: '送达地址为空',
        icon: 'loading',
        duration: 2000
      })
      return false;
    }

    if (e.detail.value.casepost === '') {
      //邮编
      wx.showToast({
        title: '邮编为空',
        icon: 'loading',
        duration: 2000
      })
      return false;
    }

    if (e.detail.value.casephone === '') {
      //联系电话
      wx.showToast({
        title: '联系电话为空',
        icon: 'loading',
        duration: 2000
      })
      return false;
    }

    if (e.detail.value.otherssqq === '') {
      //诉讼与事实请求
      wx.showToast({
        title: '诉讼与事实请求为空',
        icon: 'loading',
        duration: 2000
      })
      return false;
    }

    wx.request({
      url: app.globalData.httpUrl + 'zntd/sddzqrs_insert.php',
      data: {
        sfz: wx.getStorageSync('sfz'),
        ay: e.detail.value.casereason,
        ah: e.detail.value.casenum,   //案号
        dsr: e.detail.value.casepeo,   //当事人
        saddz: e.detail.value.caseaddr,  //送达地址
        yb: e.detail.value.casepost,   //
        tel: e.detail.value.casephone,
        dzsddz: e.detail.value.caseeaddr,
        qtlxfs: e.detail.value.otheraddr,
        ssyssll: e.detail.value.otherssqq,
      },
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        //表单验证成功
        if (res.data.state === 1) {
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
        } else {
          //表单验证失败
          wx.showToast({
            title: '验证失败',
            icon: 'loading',
            duration: 500
          })
        }
      }
    })
  },
  //填单记录的显示与隐藏
  toRecodeListDetail_fun:function(e){
    let _this = this;
    let _type = e.currentTarget.dataset.type;
    let _id = e.currentTarget.dataset.zentdid;
    if (_type == 'sddzqrs') {
      _this.setData({
        isShowRecodeDetail: false
      });
      wx.request({
        url: app.globalData.httpUrl + 'zntd/zntd_info.php',
        data: {
          zntd_id: _id
        },
        header: {
          'content-type': 'application/json'
        },
        success: function (res) {
          //获取数据信息
          if (res.data.state === 1) {
            //表示请求成功
            _this.setData({
              codeimg: res.data.zntd_info.url,
              happen_time: res.data.zntd_info.happen_time,
              typecode: res.data.zntd_info.type
            });
          }else{
            wx.showToast({
              title: '验证失败',
              icon: 'loading',
              duration: 500
            })
          }
        }
      });
    }

  },
  onLoad: function () {
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
  },
  /**
 * 生命周期函数--监听页面初次渲染完成
 */
  onReady: function () {
    let _this = this;
    _this.listData = [];
    //加载智能填单数据
    wx.request({
      url: app.globalData.httpUrl + 'zntd/get_file_type.php',
      data: {},
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        //获取数据信息
        if (res.data.state === 1){
          //表示请求成功
          console.log(res.data.type_list,'pppppp')
          _this.setData({
            listData:res.data.type_list
          });
        }else{
          wx.showToast({
            title: '验证失败',
            icon: 'loading',
            duration: 500
          })
        }
      }
    });

    //加载填单记录数据
    _this.tiandan_list = [];
    wx.request({
      url: app.globalData.httpUrl + 'zntd/zntd_list.php',
      data: {
        sfz: wx.getStorageSync('sfz')
      },
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        //获取数据信息
        if (res.data.state === 1) {
          _this.setData({
            tiandan_list: res.data.zntd_list
          })
        }else{
          wx.showToast({
            title: '验证失败',
            icon: 'loading',
            duration: 500
          })
        }
      }
    });
  },

  // 滑动切换tab 
  bindChange: function (e) {
    var that = this;
    that.setData({ currentTab: e.detail.current });
  },
  // 点击tab切换 
  swichNav: function (e) {
    var _this = this;
    if (e.target.dataset.current === '0'){
      //智能填单页面
      _this.setData({
        isShowFormDetail: true
      });
    }else{
      //填单记录页面
      _this.setData({
        isShowRecodeDetail: true
      });
    }
    if (this.data.currentTab === e.target.dataset.current) {
      return false;
    } else {
      _this.setData({
        currentTab: e.target.dataset.current
      })
    }
  }
}) 