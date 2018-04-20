var app=getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    type_arr: ['自然人', '法人'],
    volk_arr: ['汉族','壮族','满族','回族','维吾尔族'],
    sex_arr: ['男','女','其他'],
    nation_arr : ['中国','美国','英国','日本','南朝鲜','北朝鲜'],
    showYg:1,
    showBg:0,
    lxIndexYg:'',
    mzIndexYg:'',
    xbIndexYg:'',
    gjIndexYg:'',
    lxIndexBg:'',
    mzIndexBg:'',
    xbIndexBg:'',
    gjIndexBg:'',
    ryxx:{
      yg:[{
        type:1,
        lx:0,
        name:'刘志强',
        sfz:'340822199203203331',
        mz:0,
        gender:0,
        nationality:0,
        tel:'17777777777',
        address:'江苏南京'
      }],
      bg: [{
        type: 2,
        lx: 1,
        name: '刘强',
        sfz: '340822199203203332',
        mz: 0,
        gender: 0,
        nationality: 0,
        tel: '18888888888',
        address: '江苏南京'
      }],
      ygdlr: [{
        type: 3,
        lx: 1,
        name: '周周',
        sfz: '340822199203203333',
        mz: 0,
        gender: 0,
        nationality: 0,
        tel: '19999999999',
        address: '江苏南京'
      }]
    },
    currentYg:{},
    currentYgIndex:0,
    currentBg:{},
    currentBgIndex:0,
    isAdd:0,
    ygState:[],
    bgState:[],
    noClick:0
  },
  //选择类型
  choiceType: function (e) {
    console.log(e)
    console.log('picker发送选择改变，携带值为', e.detail.value)
    let type = e.currentTarget.dataset.type;
    if(type == 1){
      this.setData({
        lxIndexYg: e.detail.value
      })
    }else if(type == 2){
      this.setData({
        lxIndexBg: e.detail.value
      })
    }
  },
  //选择民族
  choice_volk:function(e){
    let type = e.currentTarget.dataset.type;
    if (type == 1) {
      this.setData({
        mzIndexYg: e.detail.value
      })
    } else if (type == 2) {
      this.setData({
        mzIndexBg: e.detail.value
      })
    }
  },
  //选择性别
  choice_sex:function(e){
    let type = e.currentTarget.dataset.type;
    if (type == 1) {
      this.setData({
        xbIndexYg: e.detail.value
      })
    } else if (type == 2) {
      this.setData({
        xbIndexBg: e.detail.value
      })
    }
  },
  //选择国籍
  choiceNation:function(e){
    let type = e.currentTarget.dataset.type;
    if (type == 1) {
      this.setData({
        gjIndexYg: e.detail.value
      })
    } else if (type == 2) {
      this.setData({
        gjIndexBg: e.detail.value
      })
    }
  },
  //删除当事人信息的弹窗
  deleteDsr(e){
    console.log('长按：',e)
    let that = this
    let type = e.currentTarget.dataset.type
    // 当前选中的人员序号
    let ryIndex = e.target.dataset.index
    wx.showModal({
      title: '提示',
      content: '您确定要删除该原告的信息吗？',
      success: function (res) {
        if (res.confirm) {
          if (type == 1){
            let newYg = that.data.ryxx.yg;
            newYg.splice(ryIndex,1)
            that.setData({
              'ryxx.yg':newYg
            })
            // 考虑当前选中了人员 需要修改currentIndex 以及 currentYg
            if (that.data.currentYgIndex == ryIndex){
              var oobj = that.data.ryxx.yg[0]||{}
                that.setData({
                  currentYg: oobj,
                  currentYgIndex:0
                })
            } else if (that.currentYgIndex > ryIndex){
              that.setData({
                currentYgIndex: that.currentYgIndex - 1 
              })
            }

          }else if(type == 2){

            let newBg = that.data.ryxx.bg;
            newBg.splice(ryIndex, 1)
            that.setData({
              'ryxx.bg': newBg
            })

            // 考虑当前选中了人员 需要修改currentIndex 以及 currentYg
            if (that.data.currentBgIndex == ryIndex) {
              that.setData({
                currentBg: that.data.ryxx.bg[0] || {},
                currentBgIndex: 0
              })
            } else if (that.currentBgIndex > ryIndex) {
              that.setData({
                currentBgIndex: that.currentBgIndex - 1
              })
            }
          }
        } else if (res.cancel) {
          return;
        }
      }
    })
  },

  // 当事人
  addDsr(e){
    let that = this
    let type = e.currentTarget.dataset.type
    console.log('type',type)
    //  type 1 原告 2 被告 3 当事人
    if (type == 1){
      if(that.data.showYg == 0){
        that.changeCurrent(e)
      }
      // 首先将 form 表单清空
      that.setData({
        currentYg:{},
        lxIndexYg:'',
        mzIndexYg:'',
        xbIndexYg:'',
        gjIndexYg:'',
        isAdd:1
      })

    }else if(type == 2){
      if (that.data.showBg == 0) {
        that.changeCurrent(e)
      }
      that.setData({
          currentBg: {},
          lxIndexBg: '',
          mzIndexBg: '',
          xbIndexBg: '',
          gjIndexBg: '',
          isAdd: 1
      })
    }
  },

  // 多个当事人点击切换
  changeCurrent(e){
    console.log('人员点击:',e)
    let that = this
    let type = e.currentTarget.dataset.type
    // 当前选中的人员序号 
    let ryIndex='';   
    if(type == 1){

      if ((e.target.dataset.index + '') == "" || e.target.dataset.index == null || e.target.dataset.index == undefined){
        ryIndex = that.data.currentYgIndex
      }else{
        ryIndex = e.target.dataset.index;
      }

      this.setData({
        showYg:1,
        showBg:0,
        isAdd:0,
        currentYgIndex: ryIndex,
        currentYg: that.data.ryxx.yg[ryIndex]
      })
    }else if(type == 2){
      
      if ((e.target.dataset.index + '') == "" || e.target.dataset.index == null || e.target.dataset.index == undefined) {
        ryIndex = that.data.currentBgIndex
      } else {
        ryIndex = e.target.dataset.index;
      }
      this.setData({
        showYg: 0,
        showBg: 1,
        isAdd:0,
        currentBgIndex: ryIndex,
        currentBg: that.data.ryxx.bg[ryIndex]
      })
    }
  },

  // 保存
  saveForm(e){
    console.log('保存表单数据',e)
    let that = this;
    // type = 1 原告 2 被告
    let type = e.currentTarget.dataset.type;
    let formData = e.detail.value;
    let currentObj='';
    let obj = '';
    if (type == 1){
      let curtIdx = that.data.currentYgIndex;
      let currentRyxx = that.data.ryxx.yg
      currentObj = that.data.currentYg
      // 表单信息获取
      obj = {
        type:1,
        lx: that.data.lxIndexYg || currentObj.lx,
        name: formData.name,
        sfz: formData.sfz,
        mz:  that.data.mzIndexYg || currentObj.mz,
        gender:  that.data.xbIndexYg || currentObj.gender,
        nationality: that.data.gjIndexYg || currentObj.nationality,
        tel: formData.tel,
        address: formData.address
      }

      // 判断表单是否为空情况
      if ((obj.lx + '') == '' || obj.lx == undefined) {
        that.checkModal('请选择案件类型')
        return;
      } else if (obj.name == '' || obj.name.trim() == '' || !obj.name) {
        that.checkModal('请填写当事人姓名')
        return;
      } else if (obj.sfz == '' || obj.sfz.trim() == '' || !obj.sfz) {
        that.checkModal('请填写身份证号')
        return;
      } else if ((obj.mz + "") == '' || obj.mz == undefined) {
        that.checkModal('请选择民族')
        return;
      } else if ((obj.gender + "") == '' || obj.gender == undefined) {
        that.checkModal('请选择性别')
        return;
      } else if ((obj.nationality + "") == '' || obj.gender == undefined) {
        that.checkModal('请选择国籍')
        return;
      } else if (obj.tel == '' || obj.tel.trim() == '' || !obj.tel) {
        that.checkModal('请填写联系电话')
        return;
      } else if (obj.address == '' || obj.address.trim() == '' || !obj.address) {
        that.checkModal('请选择地址')
        return;
      }

      // 增加的人员信息
      if (that.data.isAdd == 1 || that.data.ryxx.yg.length == 0) {
        var _arr = that.data.ryxx.yg;
        _arr.push(obj);
        let len = _arr.length - 1
        that.setData({
          'ryxx.yg': _arr,
          isAdd: 0,
          currentYgIndex: len
        })
      } else {
        currentRyxx.splice(curtIdx, 1, obj)
      }
      
      that.setData({
        currentYg:obj,
        'ryxx.yg':currentRyxx
      })

     
    }else if(type == 2){
      let curtIdx = that.data.currentBgIndex;
      let currentRyxx = that.data.ryxx.bg
      currentObj = that.data.currentBg
      // 表单信息获取
      obj = {
        type: 2,
        lx: that.data.lxIndexBg || currentObj.lx,
        name: formData.name,
        sfz: formData.sfz,
        mz: that.data.mzIndexBg || currentObj.mz,
        gender: that.data.xbIndexBg || currentObj.gender,
        nationality: that.data.gjIndexBg || currentObj.nationality,
        tel: formData.tel,
        address: formData.address
      }

      // 判断表单是否为空情况
      if ((obj.lx + '') == '' || obj.lx == undefined){
        that.checkModal('请选择案件类型')         
        return;
      }else if(obj.name== ''|| obj.name.trim()== '' || !obj.name){
        that.checkModal('请填写当事人姓名')
        return;
      }else if(obj.sfz == ''|| obj.sfz.trim()== '' || !obj.sfz){
        that.checkModal('请填写身份证号')
        return;
      } else if ((obj.mz + "") == '' || obj.mz == undefined){
        that.checkModal('请选择名族')
        return;
      } else if ((obj.gender + '') == '' || obj.gender == undefined){
        that.checkModal('请选择性别')
        return;
      } else if ((obj.nationality + "") == '' || obj.nationality == undefined){
        that.checkModal('请选择国籍')
        return;
      } else if (obj.tel == ''|| obj.tel.trim()== '' || !obj.tel){
        that.checkModal('请填写联系电话')
        return;
      } else if (obj.address == '' || obj.address.trim()== '' || !obj.address){
        that.checkModal('请选择地址')
        return;
      } 


      // 增加的人员信息
      if (that.data.isAdd == 1 || that.data.ryxx.bg.length == 0) {
        var _arr = that.data.ryxx.bg;
        _arr.push(obj);
        let len = _arr.length - 1
        that.setData({
          'ryxx.bg': _arr,
          isAdd: 0,
          currentBgIndex: len
        })
      }else{
        currentRyxx.splice(curtIdx, 1, obj)
      }

      that.setData({
        currentBg: obj,
        'ryxx.bg': currentRyxx
      })

    }else{
      return
    }

    wx.showToast({
      title: '保存成功',
      icon: 'success',
      duration: 500
    })

  },

  // 检测有效值弹窗
  checkModal(text) {
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

  // 重置输入框
  reset(e){
    let that = this;
    // type = 1 原告 2 被告
    let type = e.currentTarget.dataset.type;
    console.log(e)
    // 将原来的信息填入
    if(type == 1){
      that.setData({
        currentYg: that.data.ryxx.yg[that.data.currentYgIndex],
        lxIndexYg: '',
        mzIndexYg: '',
        xbIndexYg: '',
        gjIndexYg: '',
        isAdd:0
      })
    }else if(type == 2){
      that.setData({
        currentBg: that.data.ryxx.bg[that.data.currentBgIndex],
        lxIndexBg: '',
        mzIndexBg: '',
        xbIndexBg: '',
        gjIndexBg: '',
        isAdd:0
      })
    }
  },

  submitCase(){
    // 获取case_id
    let case_id = wx.getStorageSync('case_id')

    var that = this;
    var arr = that.data.ryxx.yg.concat(that.data.ryxx.bg);
    var newArr = [];
    // 数组格式化 去掉代耗
    that.setData({
      noClick:1
    })

    arr.forEach(function(value){
      value.lx = that.data.type_arr[value.lx]
      value.nationality = that.data.nation_arr[value.nationality]
      value.mz = that.data.volk_arr[value.mz]
      newArr.push(value)
    })

    wx.request({
      url: app.globalData.httpUrl + 'zxla/dsr_insert.php',
      data: {
        dsr_list: JSON.stringify(newArr),
        case_id:case_id
      },
      success: function (res) {
        console.log('立案提交', res)

        let data = res.data

        if (data.state == 1) {
          wx.showToast({
            title: '立案成功',
            icon: 'success',
            success:function(){
              setTimeout(function(){
                wx.setStorageSync('zxla', 1)
                wx.navigateBack({
                  delta:3
                })
              },800)
            }
          })
        } else {
          wx.showToast({
            title: '提交失败',
            icon: 'loading',
            duration: 500
          })
        }
      },
      fail: function (err) {
        console.log(err)
      },
      complete: function () {
        that.setData({
          noClick: 0
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this;
    that.setData({
      currentYg: that.data.ryxx.yg[that.data.currentYgIndex],
      currentBg: that.data.ryxx.bg[that.data.currentBgIndex]
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    
  },

})