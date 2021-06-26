describe('Test floatWindow', function() {
  let _fw_obj;

  // 初期化処理
  beforeEach(function() {
    // テスト準備としてHTMLを読み込む
    document.body.innerHTML = window.__html__['sample.html'];
    // 上記コードではHTMLが読み込まれただけなのでテスト対象のオブジェクトはここで生成する
    _fw_obj = new FloatWindow(document.body, 'HEADER', 'CONTENTS', '<input id="_footer_button" type=button value=OK>');
  });

  // テストコード
  it('FloatWindow がDOMツリー上にいるかを確認', function() {
    const _fw_element = document.getElementById('_float_window');
    expect(_fw_element).not.toBeNull();
  });

  it('setWidth()の確認', function() {
    _fw_obj.setWidth(500);
    const _fw_element = document.getElementById('_float_window');
    expect(_fw_element.offsetWidth).toEqual(500);
  });

  it('setHeight()の確認', function() {
    _fw_obj.setHeight(500);
    const _fw_element = document.getElementById('_float_window');
    expect(_fw_element.offsetHeight).toEqual(500);
  });

  it('setBgColor()の確認', function() {
    _fw_obj.setBgColor('rgb(0, 0, 0)', 'rgb(0, 0, 0)', 'rgb(0, 0, 0)');
    const fw_header_ = document.getElementById('_header');
    expect(fw_header_.style.backgroundColor).toEqual('rgb(0, 0, 0)');
    expect(fw_header_.style.backgroundColor).toEqual('rgb(0, 0, 0)');
    expect(fw_header_.style.backgroundColor).toEqual('rgb(0, 0, 0)');
  });

  it('show()の確認', function() {
    _fw_obj.show();
    const _fw_element = document.getElementById('_float_window');
    expect(_fw_element.style.display).toEqual('block');
  });

  it('hide()の確認', function() {
    _fw_obj.hide();
    const _fw_element = document.getElementById('_float_window');
    expect(_fw_element.style.display).toEqual('none');
  });

  it('isDraggable(true)の確認', function() {
    _fw_obj.isDraggable(true);
    const _fw_element = document.getElementById('_float_window');
    expect(_fw_element.draggable).toBe(true);
  });

  it('isDraggable(false)の確認', function() {
    _fw_obj.isDraggable(false);
    const _fw_element = document.getElementById('_float_window');
    expect(_fw_element.draggable).toBe(false);
  });

  it('isRestrictMoveRange(true)の確認', function() {
    _fw_obj.isRestrictMoveRange(true);
    expect(_fw_obj._is_restrict_move_range).toBe(true);
  });

  it('isRestrictMoveRange(false)の確認', function() {
    _fw_obj.isRestrictMoveRange(false);
    expect(_fw_obj._is_restrict_move_range).toBe(false);
  });
});
