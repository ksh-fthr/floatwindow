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

    var _parent, _float_window, _header, _contents, _footer;

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
     * @param {evt} evt - イベント情報
     */
    _float_window.addEventListener('dragstart', function(evt) {
        // ドラッグをしてもいいオブジェクトか、エレメントから判断
        // これをやらないとポップアップ内のメッセージ選択時に、グレーエリアがドラッグされてしまう
        //  if (evt.srcElement.id !== '_float_window' &&
        //      evt.srcElement.id !== '_header' &&
        //      evt.srcElement.id !== '_contents' &&
        //      evt.srcElement.id !== '_footer') {
        //      return;
        //  }
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
     * @param {evt} evt - イベント情報
     */
    _parent.addEventListener('dragover', function(evt) {
        // dragoverイベントをキャンセルして、ドロップ先の要素がドロップを受け付けるようにする
        evt.preventDefault();
        evt.dataTransfer.dropEffect = 'move';
    }, false);

    /**
     * ドロップ(ドラッグ終了)
     * @param {evt} evt - イベント情報
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
     * @param {headerBg} - ヘッダ背景色
     * @param {contentsBg} - コンテンツ背景色
     * @param {footerBg} - フッタ背景色
     */
    this.setBgColor = function(headerBg, contentsBg, footerBg) {
        if (typeof headerBg !== 'string' || typeof contentsBg !== 'string' || typeof footerBg !== 'string') {
            console.log('param: headerBg, contentsBg, footerBg expect String');
            return;
        }

        _header.style.backgroundColor = headerBg;
        _contents.style.backgroundColor = contentsBg;
        _footer.style.backgroundColor = footerBg;
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
     * @param {isDrag} - ドラッグの有無
     * @return {undefined}
     */
    this.controlDnD = function(isDrag) {
      _float_window.draggable = isDrag;
    }
    return this;
};
