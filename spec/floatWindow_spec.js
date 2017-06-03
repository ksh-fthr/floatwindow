describe('Test floatWindow', function() {

  var fw_obj_;

  // 初期化処理
  beforeEach(function() {
    // テスト準備としてHTMLを読み込む
    document.body.innerHTML = window.__html__['sample.html'];
    // 上記コードではHTMLが読み込まれただけなのでテスト対象のオブジェクトはここで生成する
    fw_ = new FloatWindow(document.body, 'HEADER', 'CONTENTS', '<input id="_footer_button" type=button value=OK>');
  });

  // テストコード
  it('FloatWindow がDOMツリー上にいるかを確認', function() {
    var fw_element_ = document.getElementById('_float_window');
    expect(fw_element_).not.toBeNull();
  });

  it('setWidth()の確認', function() {
    fw_.setWidth(500);
    var fw_element_ = document.getElementById('_float_window');
    expect(fw_element_.offsetWidth).toEqual(500);
  });

  it('setHeight()の確認', function() {
    fw_.setHeight(500);
    var fw_element_ = document.getElementById('_float_window');
    expect(fw_element_.offsetHeight).toEqual(500);
  });

  it('setBgColor()の確認', function() {
    fw_.setBgColor('rgb(0, 0, 0)', 'rgb(0, 0, 0)', 'rgb(0, 0, 0)');
    var fw_header_ = document.getElementById('_header');
    var fw_contents_ = document.getElementById('_contents');
    var fw_footer_ = document.getElementById('_footer');
    expect(fw_header_.style.backgroundColor).toEqual('rgb(0, 0, 0)');
    expect(fw_header_.style.backgroundColor).toEqual('rgb(0, 0, 0)');
    expect(fw_header_.style.backgroundColor).toEqual('rgb(0, 0, 0)');
  });

  it('show()の確認', function() {
    fw_.show();
    var fw_element_ = document.getElementById('_float_window');
    expect(fw_element_.style.display).toEqual('block');
  });

  it('hide()の確認', function() {
    fw_.hide();
    var fw_element_ = document.getElementById('_float_window');
    expect(fw_element_.style.display).toEqual('none');
  });

  it('isDraggable(true)の確認', function() {
    fw_.isDraggable(true);
    var fw_element_ = document.getElementById('_float_window');
    expect(fw_element_.draggable).toBe(true);
  });

  it('isDraggable(false)の確認', function() {
    fw_.isDraggable(false);
    var fw_element_ = document.getElementById('_float_window');
    expect(fw_element_.draggable).toBe(false);
  });

  it('isRestrictMoveRange(true)の確認', function() {
    fw_.isRestrictMoveRange(true);
    expect(fw_.is_restrict_move_range_).toBe(true);
  });

  it('isRestrictMoveRange(false)の確認', function() {
    fw_.isRestrictMoveRange(false);
    expect(fw_.is_restrict_move_range_).toBe(false);
  });
});
