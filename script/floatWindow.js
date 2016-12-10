/**
 * フロートウィンドウの表示
 * @param {Object} parent - フロートウィンドウを乗せる親のDOM
 * @param {string} title - フロートウィンドウのタイトル
 * @param {string/Object} contents - フロートウィンドウのコンテンツに乗せる文字列 or DOM
 * @param {string/Object} footer - フロートウィンドウのフッタに乗せる文字列 or DOM
 */
var FloatWindow = function(parent, title, contents, footer) {

    //この関数はstrictモードで動作
    'use strict';

    var _parent, _float_window, _header, _contents, _footer, _is_restrict;

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
    // イベントハンドラ
    // -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
    var _offset_x, _offset_y;

    /**
     * ドラッグ開始
     * @param {Object} evt - イベント情報
     */
    _float_window.addEventListener('dragstart', function(evt) {
        // ドラッグをしてもいいオブジェクトか、エレメントから判断
        if (evt.srcElement.className === "") {
            return;
        }

        // ドラッグOKなオブジェクトならデータをセットする
        evt.dataTransfer.setData('text', evt.target.id);

        // 現在位置(ドラッグ開始時の位置)を退避
        _offset_x = evt.offsetX;
        _offset_y = evt.offsetY;
    }, false);

    /**
     * ドラッグ中
     * @param {Object} evt - イベント情報
     */
    _parent.addEventListener('dragover', function(evt) {
        // dragoverイベントをキャンセルして、ドロップ先の要素がドロップを受け付けるようにする
        evt.preventDefault();
        evt.dataTransfer.dropEffect = 'move';
    }, false);

    /**
     * ドロップ(ドラッグ終了)
     * @param {Object} evt - イベント情報
     */
    _parent.addEventListener('drop', function drop(evt) {
        evt.preventDefault();
        var id = evt.dataTransfer.getData('text');
        var target = document.getElementById(id);
        if (target === null) {
            return;
        }

        // ドロップ時のオブジェクトの位置と退避した元の位置から配置先を計算
        target.style.left = evt.clientX - _offset_x + 'px';
        target.style.top = evt.clientY - _offset_y + 'px';

        if(_is_restrict) {
          _restrict_move_range(target);
        }
    }, false);

    // -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
    // 内部メソッド
    // -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
    /**
     * 本クラスの初期化を担当. フロートウィンドウの生成を行う
     */
    function _initialize() {
        _createHeader();
        _createContents();
        _createFooter();
        _createFloatWindow();
    }

    /**
     * フロートウィンドウのヘッダ部生成
     */
    function _createHeader() {
        _header = document.createElement('div');
        _header.id = '_header';
        _header.innerHTML = title;
    }

    /**
     * フロートウィンドウのコンテンツ部生成
     */
    function _createContents() {
        _contents = document.createElement('div');
        _contents.id = '_contents';

        if (typeof contents === 'string') {
            _contents.innerHTML = contents;
        } else if (typeof contents === 'object' && (contents instanceof HTMLElement) === true) {
            _contents.appendChild(contents);
        }
    }

    /**
     * フロートウィンドウのフッタ部生成
     */
    function _createFooter() {
        _footer = document.createElement('div');
        _footer.id = '_footer';

        if (typeof footer === 'string') {
            _footer.innerHTML = footer;
        } else if (typeof footer === 'object' && (footer instanceof HTMLElement) === true) {
            _footer.appendChild(footer);
        }
    }

    /**
     * フロートウィンドウの本体生成
     */
    function _createFloatWindow() {
        _float_window = document.createElement('div');
        _float_window.className = "_float_window";
        _float_window.id = '_float_window';
        _float_window.draggable = true;
        _float_window.style.top = ((window.innerHeight / 3) + (50)) + "px";
        _float_window.style.left = ((window.innerWidth / 2 - 250) + (50)) + "px";

        _float_window.appendChild(_header);
        _float_window.appendChild(_contents);
        _float_window.appendChild(_footer);

        // フロートウィンドウを親要素に乗っける
        _parent = parent;
        _parent.appendChild(_float_window);
    }

    /**
     * 対象の要素に対して、移動範囲を制御する.
     * ブラウザの上下左右の端から「10px」分内側までを移動範囲とする
     * @param  {[type]} element 制限対象の要素
     */
    function _restrict_move_range(element) {
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
     * @param {number} width - フロートウィンドウの幅
     */
    this.setWidth = function(width) {
        _float_window.style.width = width + 'px';
    };

    /**
     * フロートウィンドウの高さを設定する
     * @param {number} height - フロートウィンドウの幅
     */
    this.setHeight = function(height) {
        _float_window.style.height = height + 'px';
    };

    /**
     * フロートウィンドウの背景色を設定する
     * @param {string} header_bg - ヘッダ背景色
     * @param {string} contents_bg - コンテンツ背景色
     * @param {string} footer_bg - フッタ背景色
     */
    this.setBgColor = function(header_bg, contents_bg, footer_bg) {
        if (typeof header_bg !== 'string' || typeof contents_bg !== 'string' || typeof footer_bg !== 'string') {
            console.log('param: header_bg, contents_bg, footer_bg expect string');
            return;
        }

        _header.style.backgroundColor = header_bg;
        _contents.style.backgroundColor = contents_bg;
        _footer.style.backgroundColor = footer_bg;
    };

    /**
     * フロートウィンドウを表示する
     * @return {undefined}
     */
    this.show = function() {
        _float_window.style.display = 'block';
    };

    /**
     * フロートウィンドウを非表示にする
     * @return {undefined}
     */
    this.hide = function() {
        _float_window.style.display = 'none';
    };

    /**
     * フロートウィンドウのドラッグ＆ドロップを制御する
     * @param  {Boolean} is_drag ドラッグの有無
     * @return {Boolean}         true/ドラッグ可能, false/ドラッグ不能
     */
    this.isDraggable = function(is_drag) {
      _float_window.draggable = is_drag;
    };

    /**
     * フロートウインドウの移動範囲を制限する
     * @param  {Boolean} is_restrict - 移動範囲を制限するか否か
     * @return {Boolean}               true/制限する, false/制限しない
     */
    this.isRestrictMoveRange = function(is_restrict) {
      _is_restrict = is_restrict;
    };

    return this;
};
