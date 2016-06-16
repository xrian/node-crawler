/**
 * Created by xrain on 16/3/18.
 */
var maskIsHide = true;	//全局变量,用来判断是否可以滑动页面
//是否可以滑动页面,maskIsHide为false无法滑动页面,即弹出模态窗的时候,maskIsHide为true可以滑动页面
$('body').on('touchmove', function (e) {
  //console.log("阻止touchmove事件");
  if (!maskIsHide){
    console.log(!maskIsHide);
    e.preventDefault();
  }
});
function xrModalShow(name){
  if("xr_dialog_alert"==name){
    $('body').append('<div class="xr_dialog_alert" id="xr_dialog_alert" style="display: none;"><div class="xr_mask"></div><div class="xr_dialog"><div class="xr_dialog_hd"><strong class="xr_dialog_title">提醒</strong></div><div class="xr_dialog_bd"></div><div class="xr_dialog_ft"><a href="javascript:;" class="xr_btn_dialog xrprimary">确定</a></div></div></div>');
  }else if("xr_dialog_confirm"==name){
    $('body').append('<div class="xr_dialog_confirm" id="xr_dialog_confirm" style="display: none;"><div class="xr_mask"></div><div class="xr_dialog"><div class="xr_dialog_hd"><strong class="xr_dialog_title">确定</strong></div><div class="xr_dialog_bd"></div><div class="xr_dialog_ft"><a href="javascript:;" class="xr_btn_dialog xrdefault">取消</a><a href="javascript:;" class="xr_btn_dialog xrprimary">确定</a></div></div></div>');
  }else if("xr_more_confirm"==name){
    $('body').append('<div class="xr_more_confirm" id="xr_more_confirm" style="display: none"><div class="xr_mask"></div><div class="xr_dialog2"><div class="xr_tip"><div class="xr_msg"></div></div><div class="xr_btns"><div class="xr_btn_cancel">取消</div></div></div></div>');
  }
}


/**
 * 居中确定模态窗口
 * @param {Object} obj对象
 * msg  	内容文本,必填
 * hdMsg	标题,如果为空或不填不显示
 * sureObj	确定按钮样式{text:按钮文字,class:新增的按钮class,msgClass:新增的内容class}
 * closeObj	取消按钮{text:按钮文字,class:新增的按钮class,msgClass:新增的标题class}
 * width    弹出框百分比,默认85%,如果要修改,请填入数字
 * positions  (默认)xr_dialog_mid垂直居中 可选值xr_dialog_bot底部
 */
function xrConfirm(obj) {
  maskIsHide = false;
  xrModalShow('xr_dialog_confirm');
  //居中确定框内容
  $('.xr_dialog_confirm .xr_dialog .xr_dialog_bd').html(obj.msg);
  //居中确定框标题内容
  if(typeof obj.hdMsg != "undefined" && ""!= obj.hdMsg){
    $('.xr_dialog_confirm .xr_dialog .xr_dialog_hd').show();
    $('.xr_dialog_confirm .xr_dialog .xr_dialog_hd .xr_dialog_title').html(obj.hdMsg);
  }else{
    $('.xr_dialog_confirm .xr_dialog .xr_dialog_hd').hide();
  }
  if(typeof obj.sureObj != "undefined") {
    //确定按钮上的文字
    obj.sureObj.text && $('.xr_dialog_confirm .xr_dialog_ft .xrprimary').text(obj.sureObj.text);
    //确定按钮的class
    obj.sureObj.class && $('.xr_dialog_confirm .xr_dialog_ft .xrprimary').addClass(obj.sureObj.class);
    //内容class
    obj.sureObj.msgClass && $('.xr_dialog_confirm .xr_dialog .xr_dialog_bd').addClass(obj.sureObj.msgClass);
  }
  if(typeof closeObj != "undefined") {
    //取消按钮上的文字
    obj.sureObj.text && $('.xr_dialog_confirm .xr_dialog_ft .xrdefault').text(obj.sureObj.text);
    //取消按钮的class
    obj.sureObj.class && $('.xr_dialog_confirm .xr_dialog_ft .xrdefault').addClass(obj.sureObj.class);
    //内容class
    obj.sureObj.msgClass && $('.xr_dialog_confirm .xr_dialog .xr_dialog_hd').addClass(obj.sureObj.msgClass);
  }
  if(typeof obj.width != 'undefined'){
    $('.xr_dialog_confirm .xr_dialog').css('width',obj.width+'%');
  }else{
    $('.xr_dialog_confirm .xr_dialog').css('width','85%');
  }
  if(typeof obj.positions != 'undefined'){
    $('.xr_dialog_confirm .xr_dialog').addClass(obj.positions);
  }else{
    $('.xr_dialog_confirm .xr_dialog').addClass('xr_dialog_mid');
  }
  //模态框出现是动画效果
  $(".xr_dialog_confirm").show();
  //弹出模态窗隐藏
  $(document).off("xrConfirm_modal:hide").one("xrConfirm_modal:hide", function (e) {
    maskIsHide = true;
    $(".xr_dialog_confirm").hide();
    $(".xr_dialog_confirm").remove();
  });
  //点击背景,取消按钮,确定按钮会触发该事件
  $('.xr_dialog_confirm .xr_dialog_ft .xrdefault,.xr_dialog_confirm .xr_dialog_ft .xrprimary').off('click').one('click', function (e) {
    e.preventDefault();
    //触发隐藏模态框事件
    $(document.body).trigger("xrConfirm_modal:hide");
    //如果有sure这个类,说明是确定按钮,触发确定事件
    if ($(e.target).hasClass('xrprimary')) {
      $(document.body).trigger('xrConfirm_modal:sure');
    }
    if ($(e.target).hasClass('xrdefault')) {
      $(document.body).trigger('xrConfirm_modal:close');
    }
  });
}




/**
 * 警告模态窗口
 * @param {Object} obj对象
 * msg		主要内容,必填
 * hdMsg	标题,如果为空或不填不显示
 * callback 回调函数
 * sureObj	确定按钮样式{text:按钮文字,class:确定按钮新增的class,msgClass:描述文本新增的class}
 * width    弹出框百分比,默认85%,如果要修改,请填入数字
 * positions  (默认)xr_dialog_mid垂直居中 可选值xr_dialog_bot底部
 */
function xrAlert(obj) {
  //静止背景滑动
  maskIsHide = false;
  xrModalShow('xr_dialog_alert');
  $(".xr_dialog_alert .xr_dialog .xr_dialog_bd").html(obj.msg);
  if(typeof obj.width != 'undefined'){
    $('.xr_dialog_alert .xr_dialog').css('width',obj.width+'%');
  }else{
    $('.xr_dialog_alert .xr_dialog').css('width','85%');
  }
  if(typeof obj.positions != 'undefined'){
    $('.xr_dialog_alert .xr_dialog').addClass(obj.positions);
  }else{
    $('.xr_dialog_alert .xr_dialog').addClass('xr_dialog_mid');
  }
  $(".xr_dialog_alert").show();
  //居中警告框标题文字,如果为空就隐藏
  if(typeof obj.hdMsg != "undefined" && ""!= obj.hdMsg){
    $('.xr_dialog_alert .xr_dialog .xr_dialog_hd').show();
    $('.xr_dialog_alert .xr_dialog .xr_dialog_hd .xr_dialog_title').html(obj.hdMsg);
  }else{
    $('.xr_dialog_alert .xr_dialog .xr_dialog_hd').hide();
  }

  if(typeof obj.sureObj != "undefined") {
    //确定按钮上的文字
    sureObj.text && $('.xr_dialog_alert .xr_dialog_ft .xrprimary').text(obj.sureObj.text);
    //确定按钮的class
    sureObj.class && $('.xr_dialog_alert .xr_dialog_ft .xrprimary').addClass(obj.sureObj.class);
    //描述文本class
    sureObj.msgClass && $('.xr_dialog_alert .xr_dialog .xr_dialog_bd').addClass(obj.sureObj.msgClass);
  }

  //隐藏弹出框模态窗
  $(document).off("xrAlertMid_modal:hide").one("xrAlertMid_modal:hide", function (e) {
    maskIsHide = true;
    $(".xr_dialog_alert").hide();
    $(".xr_dialog_alert").remove();
    if (typeof(obj.callback) == 'function') setTimeout(obj.callback, 0);
  });

  $('.xr_dialog_alert .xr_dialog_ft .xrprimary').off('click').one('click', function (e) {
    e.preventDefault();
    //关闭居中弹出框
    $(document.body).trigger("xrAlertMid_modal:hide");
  });
}







/**
 * 底部多个按钮组
 * @param obj 传入一个对象,该对象可能有三个属性
 * sureObj (必须)多个按钮的html,
 * callback  (可选)取消后的回调函数
 * onlyBtnClose (可选)为true.只能通过取消按钮关闭,默认为false
 */
function xrMoreConfirmBot(obj){
  maskIsHide = false;
  xrModalShow('xr_more_confirm');
  if(typeof obj.sureObj != "undefined") {
    $(".xr_more_confirm .xr_btns .xr_btn_cancel").before(obj.sureObj);
  }
  $(".xr_more_confirm").show();
  //$(".xr_more_confirm .xr_mask").animate({opacity: "0.4"}, 250);
  $(".xr_more_confirm .xr_dialog2").animate({bottom: "0px"}, 250);
  $(document).off("xr_more_confirm_modal:hide").one("xr_more_confirm_modal:hide", function (e) {
    maskIsHide = true;
    $(".xr_more_confirm .xr_mask").animate({opacity: "0"}, 250);
    var height = '-' + $(".xr_more_confirm .xr_dialog2").height() + 'px';
    $(".xr_more_confirm .xr_dialog2").animate({bottom: height}, 250, function () {
      $(".xr_more_confirm").hide();
      $(".xr_more_confirm").remove();		//移除刚刚新增的内容
    });
  });
  var closeObj = '.xr_mask,.xr_btn_cancel,.xr_btn_confirm';
  if(typeof obj.onlyBtnClose != "undefined" && obj.onlyBtnClose == true) {
    closeObj = '.xr_btn_cancel,.xr_btn_confirm';
  }
  $('.xr_more_confirm').off('click').one('click',closeObj, function (e) {
    e.preventDefault();
    $(document.body).trigger("xr_more_confirm_modal:hide");
    if(!$(this).hasClass('xr_btn_confirm')&&typeof obj.callback == 'function'){
      obj.callback();
    }
  });
}