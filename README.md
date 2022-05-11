# はじめに
本リポジトリは動的にフロートウィンドウを生成する実装を試すサンプルプログラムです.

# 機能
FloatWindow には以下の機能を設けています.

1. 表示 / 非表示の切り替え
2. 幅 / 高さを設定
3. 背景色の設定
4. 表示したフロートウィンドウのドラッグ＆ドロップ

# 使い方
バンドラーに [parcel](https://ja.parceljs.org/) を使用しています。
次の手順で実行してください。

1. package.json で管理しているプラグインのインストール

```bash
$ npm i
```

2. アプリ起動

```bash
$ npm run dev 
> floatwindow@1.0.0 dev /home/ksh/workspace/floatwindow
> parcel sample.html

Server running at http://localhost:1234 
✨  Built in 815ms.
```

3. アクセス
http://localhost:1234 にブラウザからアクセスするとフロートウィンドウの挙動が試せます。

# 外部 I/F
現在、次の I/F を提供しています.

### setWidth(width)
* フロートウィンドウの幅を設定する.

### setHeight(height)
* フロートウィンドウの高さを設定する.

### setBgColor(header_bg, contents_bg, footer_bg)
* フロートウィンドウのヘッダ、コンテンツ、フッタの各背景色を設定する.

### show()
* フロートウィンドウを表示する.

### hide()
* フロートウィンドウを非表示にする.

### isDraggable(is_drag)
* フロートウィンドウに対してDrag & DropのON/OFFを設定する.
 * ON(is_drag == true)の場合, フロートウィンドウの移動ができる
 * OFF(is_drag == false)の場合, フロートウィンドウの移動ができない

### isRestrictMoveRange(is_restrict)
* フロートウィンドウの移動範囲に対する制限のON/OFFを設定する.
 * ON(is_restrict == true)の場合, ブラウザの領域から外れてフロートウィンドウが隠れないよう制限する
 * OFF(is_restrict == false)の場合, ブラウザの領域内から外れてフロートウィンドウが隠れても移動できる

# テスト
## 準備
次のコマンドを実行し準備を整えます｡
対話形式で `karma` と `jasmine` のインストールが始まります｡ご自身の環境に合わせて回答してください｡

```bash
$ npm run test-prepare
```

## テスト実行
次のコマンドでテストが実行されます｡

## Chrome で実行

```bash
$ npm run test:ch
```

## Firefox で実行

```bash
$ npm run test:fx
```

## テスト結果
ブラウザが起動し次の画面が表示されます｡

(以下は `Chrome 91.0.4472 (Mac OS X 10.15.7)` の環境で実施した結果です)

<img width="1200" alt="スクリーンショット 2021-06-20 22 22 33" src="https://user-images.githubusercontent.com/3907225/122675965-d899be80-d216-11eb-85d1-4033a21cddf8.png">

テストを実行したターミナルには次のログが出ているはずです｡

```bash
Chrome 91.0.4472 (Mac OS X 10.15.7): Executed 10 of 10 SUCCESS (0.012 secs / 0.016 secs)
```

