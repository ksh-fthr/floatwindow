/**
 * フロートウィンドウの表示
 * @constructor
 * @param {Object} parent - フロートウィンドウを乗せる親のDOM
 * @param {string} title - フロートウィンドウのタイトル
 * @param {string/Object} contents - フロートウィンドウのコンテンツに乗せる文字列 or DOM
 * @param {string/Object} footer - フロートウィンドウのフッタに乗せる文字列 or DOM
 */
function FloatWindow (parent, title, contents, footer) {
  // この関数はstrictモードで動作
  'use strict';

  // -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
  // プライベート変数
  // -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
  /**
   * @private {Object} - 自分自身
   */
  const self = this;
  /**
   * @private {Object} - フロートウィンドウの親要素
   */
  let _parent;
  /**
   * @private {number} - ドラッグ＆ドロップ時のX座標を保持する
   */
  let _offsetX;
  /**
   * @private {number} - ドラッグ＆ドロップ時のY座標を保持する
   */
  let _offsetY;

  // -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
  // メンバ変数
  // -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
  /**
   * @param {Object} - フロートウィンドウ
   * @memberof FloatWindow
   */
  self._floatWindow;
  /**
   * @param {Object} - フロートウィンドウのヘッダ
   * @memberof FloatWindow
   */
  self._header;
  /**
   * @param {Object} - フロートウィンドウのコンテンツ
   * @memberof FloatWindow
   */
  self._contents;
  /**
   * @private {Object} - フロートウィンドウのフッタ
   */
  self._footer;
  /**
   * @param {Object} - フロートウィンドウの移動範囲を制限するか
   * @memberof FloatWindow
   */
  self._isRestrictMoveRange;

  // -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
  // コンストラクタとしての処理
  // -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
  if (typeof parent !== 'object' || (parent instanceof HTMLElement) === false) {
    console.log('param:parent expect HTMLElement.');
    return;
  }
  if (typeof title !== 'string') {
    console.log('param:parent expect HTMLElement.');
    return;
  }

  _initialize();

  // -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
  // イベントハンドラに紐づく各処理
  // -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
  /**
   * ドラッグ開始時のイベント処理
   *
   * @param {*} evt
   * @returns null
   */
  const dragstart = (evt) => {
    // ドラッグをしてもいいオブジェクトか、エレメントから判断
    if (evt.target.id !== '_float_window') {
      return;
    }

    // ドラッグOKなオブジェクトならデータをセットする
    evt.dataTransfer.setData('text', evt.target.id);

    // 現在位置(ドラッグ開始時の位置)を退避
    _offsetX = evt.offsetX;
    _offsetY = evt.offsetY;

    return null;
  };

  /**
   * ドラッグしている最中のイベント処理
   *
   * @param {*} evt
   * @returns null
   */
  const dragover = (evt) => {
    // dragoverイベントをキャンセルして、ドロップ先の要素がドロップを受け付けるようにする
    evt.preventDefault();
    evt.dataTransfer.dropEffect = 'move';
    return null;
  };

  /**
   * ドラッグ終了時のイベント処理
   *
   * @param {*} evt
   * @returns null
   */
  const drop = (evt) => {
    evt.preventDefault();
    const id = evt.dataTransfer.getData('text');
    const target = document.getElementById(id);
    if (target === null) {
      return;
    }

    // ドロップ時のオブジェクトの位置と退避した元の位置から配置先を計算
    target.style.left = evt.clientX - _offsetX + 'px';
    target.style.top = evt.clientY - _offsetY + 'px';

    if (self._isRestrictMoveRange) {
      restrictMoveRange(target);
    }
    return null;
  };

  // -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
  // イベントハンドラの設定
  // -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
  /**
   * ドラッグ開始
   * @param {Object} evt - イベント情報
   */
  self._floatWindow.addEventListener('dragstart', dragstart, false);

  /**
   * ドラッグ中
   * @param {Object} evt - イベント情報
   */
  _parent.addEventListener('dragover', dragover, false);

  /**
   * ドロップ(ドラッグ終了)
   * @param {Object} evt - イベント情報
   */
  _parent.addEventListener('drop', drop, false);

  // -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
  // 内部メソッド
  // -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
  /**
   * 本クラスの初期化を担当. フロートウィンドウの生成を行う
   * @private
   */
  function _initialize () {
    createHeader();
    createContents();
    createFooter();
    createFloatWindow_();
  }

  /**
   * フロートウィンドウのヘッダ部生成
   * @private
   */
  function createHeader () {
    self._header = document.createElement('div');
    self._header.id = '_header';
    self._header.innerHTML = title;
  }

  /**
   * フロートウィンドウのコンテンツ部生成
   * @private
   */
  function createContents () {
    self._contents = document.createElement('div');
    self._contents.id = '_contents';

    if (typeof contents === 'string') {
      self._contents.innerHTML = contents;
    } else if (typeof contents === 'object' && (contents instanceof HTMLElement) === true) {
      self._contents.appendChild(contents);
    }
  }

  /**
   * フロートウィンドウのフッタ部生成
   * @private
   */
  function createFooter () {
    self._footer = document.createElement('div');
    self._footer.id = '_footer';

    if (typeof footer === 'string') {
      self._footer.innerHTML = footer;
    } else if (typeof footer === 'object' && (footer instanceof HTMLElement) === true) {
      self._footer.appendChild(footer);
    }
  }

  /**
   * フロートウィンドウの本体生成
   * @private
   */
  function createFloatWindow_ () {
    self._floatWindow = document.createElement('div');
    self._floatWindow.id = '_float_window';
    self._floatWindow.draggable = true;
    self._floatWindow.style.top = ((window.innerHeight / 3) + (50)) + 'px';
    self._floatWindow.style.left = ((window.innerWidth / 2 - 250) + (50)) + 'px';

    self._floatWindow.appendChild(self._header);
    self._floatWindow.appendChild(self._contents);
    self._floatWindow.appendChild(self._footer);

    // フロートウィンドウを親要素に乗っける
    _parent = parent;
    _parent.appendChild(self._floatWindow);
  }

  /**
   * 対象の要素に対して、移動範囲を制御する.
   * ブラウザの上下左右の端から「10px」分内側までを移動範囲とする
   * @private
   * @param  {[type]} element 制限対象の要素
   */
  function restrictMoveRange (element) {
    const rect = element.getBoundingClientRect();
    const adjustmentValue = 10;
    const compareWidth = window.innerWidth;
    const compareHeight = window.innerHeight;

    // 上端と左端/右端の制御
    if (rect.top < adjustmentValue) {
      element.style.top = adjustmentValue + 'px';
      if (rect.left < adjustmentValue) {
        element.style.left = adjustmentValue + 'px';
      } else if (rect.left + element.offsetWidth > compareWidth - adjustmentValue) {
        element.style.left = compareWidth - element.offsetWidth - (adjustmentValue * 2) + 'px';
      }
      return;
    }

    // 下端と左端/右端の制御
    if (rect.top + element.offsetHeight > compareHeight - adjustmentValue) {
      element.style.top = compareHeight - element.offsetHeight - (adjustmentValue * 2) + 'px';
      if (rect.left < adjustmentValue) {
        element.style.left = adjustmentValue + 'px';
      } else if (rect.left + element.offsetWidth > compareWidth - adjustmentValue) {
        element.style.left = compareWidth - element.offsetWidth - (adjustmentValue * 2) + 'px';
      }
      return;
    }

    // 上記までだと、単純な左端と右端の制御が漏れるので対応する
    if (rect.left < adjustmentValue) {
      element.style.left = adjustmentValue + 'px';
      return;
    }
    if (rect.left + element.offsetWidth > compareWidth - adjustmentValue) {
      element.style.left = compareWidth - element.offsetWidth - (adjustmentValue * 2) + 'px';
    }
  }

  return self;
}

// -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
// 外部メソッド(API)
// -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
/**
 * フロートウィンドウの幅を設定する
 * @public
 * @param {number} width - フロートウィンドウの幅
 * @memberof FloatWindow
 */
FloatWindow.prototype.setWidth = function setWidth (width) {
  const self = this;
  self._floatWindow.style.width = width + 'px';
};

/**
 * フロートウィンドウの高さを設定する
 * @public
 * @param {number} height - フロートウィンドウの幅
 * @memberof FloatWindow
 */
FloatWindow.prototype.setHeight = function setHeight (height) {
  const self = this;
  self._floatWindow.style.height = height + 'px';
};

/**
 * フロートウィンドウの背景色を設定する
 * @public
 * @param {string} _headerbg - ヘッダ背景色
 * @param {string} _contentsbg - コンテンツ背景色
 * @param {string} _footerbg - フッタ背景色
 * @memberof FloatWindow
 */
FloatWindow.prototype.setBgColor = function setBgColor (_headerbg, _contentsbg, _footerbg) {
  const self = this;
  if (typeof _headerbg !== 'string' || typeof _contentsbg !== 'string' || typeof _footerbg !== 'string') {
    console.log('param: _headerbg, _contentsbg, _footerbg expect string');
    return;
  }

  self._header.style.backgroundColor = _headerbg;
  self._contents.style.backgroundColor = _contentsbg;
  self._footer.style.backgroundColor = _footerbg;
};

/**
 * フロートウィンドウを表示する
 * @public
 * @return {undefined}
 * @memberof FloatWindow
 */
FloatWindow.prototype.show = function show () {
  const self = this;
  self._floatWindow.style.display = 'block';
};

/**
 * フロートウィンドウを非表示にする
 * @public
 * @return {undefined}
 * @memberof FloatWindow
 */
FloatWindow.prototype.hide = function hide () {
  const self = this;
  self._floatWindow.style.display = 'none';
};

/**
 * フロートウィンドウのドラッグ＆ドロップを制御する
 * @public
 * @param  {Boolean} isDrag ドラッグの有無
 * @return {Boolean}         true/ドラッグ可能, false/ドラッグ不能
 * @memberof FloatWindow
 */
FloatWindow.prototype.isDraggable = function isDraggable (isDrag) {
  const self = this;
  self._floatWindow.draggable = isDrag;
};

/**
 * フロートウインドウの移動範囲を制限する
 * @public
 * @param  {Boolean} isRestrict - 移動範囲を制限するか否か
 * @return {Boolean}               true/制限する, false/制限しない
 * @memberof FloatWindow
 */
FloatWindow.prototype.isRestrictMoveRange = function isRestrictMoveRange (isRestrict) {
  const self = this;
  self._isRestrictMoveRange = isRestrict;
};
