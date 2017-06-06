export class FloatWindow {

  // -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
  // プライベート変数
  // -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
  /**
   * @private {Object} - フロートウィンドウの親要素
   */
  private parent_: any;
  /**
   * @private {number} - ドラッグ＆ドロップ時のX座標を保持する
   */
  private offset_x_: number;
  /**
   * @private {number} - ドラッグ＆ドロップ時のY座標を保持する
   */
  private offset_y_: number;

  // -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
  // メンバ変数
  // -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
  /**
   * @param {Object} - フロートウィンドウ
   * @memberof FloatWindow
   */
  private float_window_: any;
  /**
   * @param {Object} - フロートウィンドウのヘッダ
   * @memberof FloatWindow
   */
  private header_: any;
  /**
   * @param {Object} - フロートウィンドウのコンテンツ
   * @memberof FloatWindow
   */
  private contents_: any;
  /**
   * @private {Object} - フロートウィンドウのフッタ
   */
  private footer_: any;
  /**
   * @param {Object} - フロートウィンドウの移動範囲を制限するか
   * @memberof FloatWindow
   */
  private is_restrict_move_range_: boolean;

  /**
   * フロートウィンドウの表示
   * @constructor
   * @param {Object} parent - フロートウィンドウを乗せる親のDOM
   * @param {string} title - フロートウィンドウのタイトル
   * @param {string/Object} contents - フロートウィンドウのコンテンツに乗せる文字列 or DOM
   * @param {string/Object} footer - フロートウィンドウのフッタに乗せる文字列 or DOM
   */
  constructor(parent, title, contents, footer) {
    //この関数はstrictモードで動作
    'use strict';

    const self: FloatWindow = this;

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

    // フロートウィンドウのヘッダ部生成
    self.header_ = document.createElement('div');
    self.header_.id = '_header';
    self.header_.innerHTML = title;

    // フロートウィンドウのコンテンツ部生成
    self.contents_ = document.createElement('div');
    self.contents_.id = '_contents';

    if (typeof contents === 'string') {
      self.contents_.innerHTML = contents;
    } else if (typeof contents === 'object' && (contents instanceof HTMLElement) === true) {
      self.contents_.appendChild(contents);
    }

    // フロートウィンドウのフッタ部生成
    self.footer_ = document.createElement('div');
    self.footer_.id = '_footer';

    if (typeof footer === 'string') {
      self.footer_.innerHTML = footer;
    } else if (typeof footer === 'object' && (footer instanceof HTMLElement) === true) {
      self.footer_.appendChild(footer);
    }

    // フロートウィンドウの本体生成
    self.float_window_ = document.createElement('div');
    self.float_window_.id = '_float_window';
    self.float_window_.draggable = true;
    self.float_window_.style.top = ((window.innerHeight / 3) + (50)) + "px";
    self.float_window_.style.left = ((window.innerWidth / 2 - 250) + (50)) + "px";

    self.float_window_.appendChild(self.header_);
    self.float_window_.appendChild(self.contents_);
    self.float_window_.appendChild(self.footer_);

    // フロートウィンドウを親要素に乗っける
    self.parent_ = parent;
    self.parent_.appendChild(self.float_window_);

    // -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
    // イベントハンドラ
    // -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
    /**
     * ドラッグ開始
     * @param {Object} evt - イベント情報
     */
    self.float_window_.addEventListener('dragstart', function(evt) {
      // ドラッグをしてもいいオブジェクトか、エレメントから判断
      if (evt.target.id !== "_float_window") {
        return;
      }

      // ドラッグOKなオブジェクトならデータをセットする
      evt.dataTransfer.setData('text', evt.target.id);

      // 現在位置(ドラッグ開始時の位置)を退避
      self.offset_x_ = evt.offsetX;
      self.offset_y_ = evt.offsetY;
    }, false);

    /**
     * ドラッグ中
     * @param {Object} evt - イベント情報
     */
    self.parent_.addEventListener('dragover', function(evt) {
      // dragoverイベントをキャンセルして、ドロップ先の要素がドロップを受け付けるようにする
      evt.preventDefault();
      evt.dataTransfer.dropEffect = 'move';
    }, false);

    /**
     * ドロップ(ドラッグ終了)
     * @param {Object} evt - イベント情報
     */
    self.parent_.addEventListener('drop', function(evt) {
      evt.preventDefault();
      var id = evt.dataTransfer.getData('text');
      var target = document.getElementById(id);
      if (target === null) {
        return;
      }

      // ドロップ時のオブジェクトの位置と退避した元の位置から配置先を計算
      target.style.left = evt.clientX - self.offset_x_ + 'px';
      target.style.top = evt.clientY - self.offset_y_ + 'px';

      if(self.is_restrict_move_range_) {
        self.restrict_move_range_(target);
      }
    }, false);
  }

  /**
   * 対象の要素に対して、移動範囲を制御する.
   * ブラウザの上下左右の端から「10px」分内側までを移動範囲とする
   * @private
   * @param  {[type]} element 制限対象の要素
   */
  public restrict_move_range_(element): void {
    var rect = element.getBoundingClientRect();
    var adjustmentValue = 10;
    var compareWidth = window.innerWidth;
    var compareHeight = window.innerHeight;

    // 上端と左端/右端の制御
    if(rect.top < adjustmentValue) {
      element.style.top = adjustmentValue + "px";
      if(rect.left < adjustmentValue) {
        element.style.left = adjustmentValue + "px";
      }
      else if(rect.left + element.offsetWidth > compareWidth - adjustmentValue) {
        element.style.left = compareWidth - element.offsetWidth - (adjustmentValue*2) + "px";
      }
      return;
    }

    // 下端と左端/右端の制御
    if(rect.top + element.offsetHeight > compareHeight - adjustmentValue) {
      element.style.top = compareHeight - element.offsetHeight - (adjustmentValue*2) + "px";
      if(rect.left < adjustmentValue) {
        element.style.left = adjustmentValue + "px";
      }
      else if(rect.left + element.offsetWidth > compareWidth - adjustmentValue) {
        element.style.left = compareWidth - element.offsetWidth - (adjustmentValue*2) + "px";
      }
      return;
    }

    // 上記までだと、単純な左端と右端の制御が漏れるので対応する
    if(rect.left < adjustmentValue) {
      element.style.left = adjustmentValue + "px";
      return;
    }
    if(rect.left + element.offsetWidth > compareWidth - adjustmentValue) {
      element.style.left = compareWidth - element.offsetWidth - (adjustmentValue*2) + "px";
      return;
    }

    return;
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
  public setWidth(width): void {
    const self = this;
    self.float_window_.style.width = width + 'px';
  };

  /**
   * フロートウィンドウの高さを設定する
   * @public
   * @param {number} height - フロートウィンドウの幅
   * @memberof FloatWindow
   */
  public setHeight(height): void {
    const self = this;
    self.float_window_.style.height = height + 'px';
  };

  /**
   * フロートウィンドウの背景色を設定する
   * @public
   * @param {string} header_bg - ヘッダ背景色
   * @param {string} contents_bg - コンテンツ背景色
   * @param {string} footer_bg - フッタ背景色
   * @memberof FloatWindow
   */
  public setBgColor(header_bg, contents_bg, footer_bg): void {
    const self = this;
    if (typeof header_bg !== 'string' || typeof contents_bg !== 'string' || typeof footer_bg !== 'string') {
      console.log('param: header_bg, contents_bg, footer_bg expect string');
      return;
    }

    self.header_.style.backgroundColor = header_bg;
    self.contents_.style.backgroundColor = contents_bg;
    self.footer_.style.backgroundColor = footer_bg;
  };

  /**
   * フロートウィンドウを表示する
   * @public
   * @return {undefined}
   * @memberof FloatWindow
   */
  public show(): void {
    const self = this;
    self.float_window_.style.display = 'block';
  };

  /**
   * フロートウィンドウを非表示にする
   * @public
   * @return {undefined}
   * @memberof FloatWindow
   */
  public hide(): void {
    const self = this;
    self.float_window_.style.display = 'none';
  };

  /**
   * フロートウィンドウのドラッグ＆ドロップを制御する
   * @public
   * @param  {Boolean} is_drag ドラッグの有無
   * @return {Boolean}         true/ドラッグ可能, false/ドラッグ不能
   * @memberof FloatWindow
   */
  public isDraggable(is_drag): void {
    const self = this;
    self.float_window_.draggable = is_drag;
  };

  /**
   * フロートウインドウの移動範囲を制限する
   * @public
   * @param  {Boolean} is_restrict - 移動範囲を制限するか否か
   * @return {Boolean}               true/制限する, false/制限しない
   * @memberof FloatWindow
   */
  public isRestrictMoveRange(is_restrict): void {
    const self = this;
    self.is_restrict_move_range_ = is_restrict;
  };
}
