// pages/zxla/sccl/sccl.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    qsz: [],
    dsrsf:[],
    zjcl:[],
    qrs:[],
    noClick:0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
  },

  inputUserInfo(){
    var that = this
    that.setData({
      noClick:1
    })
    if (that.data.qsz.length == 0) {
      that.checkModal('请上传起诉状类材料')
      that.setData({
        noClick: 0
      })
      return;
    }
    // } else if (that.data.dsrsf.length == 0) {
    //   that.checkModal('请上传当事人身份材料')
    //   return;
    // } else if (that.data.zjcl.length == 0) {
    //   that.checkModal('请上传证件材料')
    //   return;
    // } else if (that.data.qrs.length == 0) {
    //   that.checkModal('请上传确认书')
    //   return;
    // }
    wx:wx.navigateTo({
      url: '../ajxx/ajxx',
      success: function(res) {
        that.setData({
          noClick: 0
        })
      },
    })
  },

  chooseImageTap: function (e) {
    let _this = this;
    let m_type = e.target.dataset.type

    wx.showActionSheet({
      itemList: ['从相册中选择', '拍照'],
      itemColor: "#f7982a",
      success: function (res) {
        if (!res.cancel) {
          if (res.tapIndex == 0) {
            _this.chooseWxImage('album', m_type)
          } else if (res.tapIndex == 1) {
            _this.chooseWxImage('camera')
          }
        }
      }
    })
  },

  chooseWxImage: function (type, m_type) {
    let _this = this;
    wx.chooseImage({
      sizeType: ['original', 'compressed'],
      sourceType: [type],
      success: function (res) {
        console.log('选择图片上传',res);
        let arr=[];
        let fileName='';
        if (m_type == 1){
          arr = _this.data.qsz;
          arr.push(res.tempFilePaths[0])
          _this.setData({
            qsz: arr,
          })
        } else if (m_type == 2){
          arr = _this.data.dsrsf;
          arr.push(res.tempFilePaths[0])
          _this.setData({
            dsrsf: arr,
          })
        } else if (m_type == 3){
          arr = _this.data.zjcl;
          arr.push(res.tempFilePaths[0])
          _this.setData({
            zjcl: arr,
          })
        } else if (m_type == 4){
          arr = _this.data.qrs;
          arr.push(res.tempFilePaths[0])
          _this.setData({
            qrs: arr,
          })
        }
        _this.upLoad(res.tempFilePaths[0], m_type)
      }
    })
  },

  upLoad(param, m_type){

    wx.uploadFile({
      url: app.globalData.httpUrl +'/zxla/material_insert.php',
      filePath: param,
      name: 'file',
      formData: {
        'user_token': wx.getStorageSync('user_token'),
        'material_type': m_type
      },
      success: function (res) {
        var data = res
        console.log('上传图片',data)
      }
    })
  },

  // 检测弹窗
  checkModal(text){
    wx.showModal({
      title: '提示',
      content: text,
      success: function (res) {
        if (res.confirm) {
          console.log('用户点击确定')
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  },

})