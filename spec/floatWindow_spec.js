describe('Test floatWindow', function() {
  let _fwObj;

  // 初期化処理
  beforeEach(function() {
    // テスト準備としてHTMLを読み込む
    document.body.innerHTML = window.__html__['sample.html'];
    // 上記コードではHTMLが読み込まれただけなのでテスト対象のオブジェクトはここで生成する
    _fwObj = new FloatWindow(document.body, 'HEADER', 'CONTENTS', '<input id="_footer_button" type=button value=OK>');
  });

  // テストコード
  it('FloatWindow がDOMツリー上にいるかを確認', function() {
    const _fwElement = document.getElementById('_float_window');
    expect(_fwElement).not.toBeNull();
  });

  it('setWidth()の確認', function() {
    _fwObj.setWidth(500);
    const _fwElement = document.getElementById('_float_window');
    expect(_fwElement.offsetWidth).toEqual(500);
  });

  it('setHeight()の確認', function() {
    _fwObj.setHeight(500);
    const _fwElement = document.getElementById('_float_window');
    expect(_fwElement.offsetHeight).toEqual(500);
  });

  it('setBgColor()の確認', function() {
    _fwObj.setBgColor('rgb(0, 0, 0)', 'rgb(0, 0, 0)', 'rgb(0, 0, 0)');
    const fwHeader = document.getElementById('_header');
    expect(fwHeader.style.backgroundColor).toEqual('rgb(0, 0, 0)');
    expect(fwHeader.style.backgroundColor).toEqual('rgb(0, 0, 0)');
    expect(fwHeader.style.backgroundColor).toEqual('rgb(0, 0, 0)');
  });

  it('show()の確認', function() {
    _fwObj.show();
    const fwElement = document.getElementById('_float_window');
    expect(fwElement.style.display).toEqual('block');
  });

  it('hide()の確認', function() {
    _fwObj.hide();
    const fwElement = document.getElementById('_float_window');
    expect(fwElement.style.display).toEqual('none');
  });

  it('isDraggable(true)の確認', function() {
    _fwObj.isDraggable(true);
    const fwElement = document.getElementById('_float_window');
    expect(fwElement.draggable).toBe(true);
  });

  it('isDraggable(false)の確認', function() {
    _fwObj.isDraggable(false);
    const fwElement = document.getElementById('_float_window');
    expect(fwElement.draggable).toBe(false);
  });

  it('isRestrictMoveRange(true)の確認', function() {
    _fwObj.isRestrictMoveRange(true);
    expect(_fwObj._isRestrictMoveRange).toBe(true);
  });

  it('isRestrictMoveRange(false)の確認', function() {
    _fwObj.isRestrictMoveRange(false);
    expect(_fwObj._isRestrictMoveRange).toBe(false);
  });
});
