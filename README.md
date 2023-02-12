# はじめに
本リポジトリは HTML5, CSS3, JavaScript(ES2015 以降) の学習用リポジトリです。
学習の過程で実装した内容を追加していきます。

# 環境について

以下の環境で実行・確認しております。

| 環境         | バージョン | 備考                                     |
|--------------|------------|------------------------------------------|
| Node.js      | v19.6.0    | バージョンは `node --version` で確認     |
| npm          | v9.4.0     | バージョンは `npm --version` で確認      |
| Parcel       | v2.8.1     | バージョンは `npm list --depth=0` で確認 |
| Tailwind CSS | v3.2.6     | 同上                                     |
| PostCSS      | v8.4.21    | 同上                                     |

<details>
<summary>パッケージの確認</summary>

```bash
% npm list --depth=0
html-javascript-work@1.0.0 /path/to/html-javascript-work
├── eslint-config-standard@17.0.0
├── eslint-plugin-import@2.26.0
├── eslint-plugin-node@11.1.0
├── eslint-plugin-promise@6.1.1
├── eslint@8.34.0
├── jasmine-core@3.99.1
├── karma-chrome-launcher@3.1.1
├── karma-firefox-launcher@2.1.2
├── karma-html2js-preprocessor@1.1.0
├── karma-jasmine@4.0.2
├── karma@6.4.1
├── parcel@2.8.1
├── postcss@8.4.21
└── tailwindcss@3.2.6
```

</details>

# 現在は次の内容が入っています
- フロートウィンドウの動的生成
  - 動的にフロートウィンドウを生成する実装を試すサンプルプログラムです
- グリッドレイアウトの学習
  - [グリッドレイアウト](https://developer.mozilla.org/ja/docs/Web/CSS/CSS_Grid_Layout/Basic_Concepts_of_Grid_Layout) の概念を学習するためのサンプルプログラムです
- Tailwind CSS の学習
  - [Tailwind CSS](https://tailwindcss.com/) を学習するためのサンプルプログラムです
  - 本 PJ では Parcel でビルドしているので、公式の手順 - [Install Tailwind CSS with Parcel](https://tailwindcss.com/docs/guides/parcel) にのっとり Tailwind CSS を導入しました

# 本リポジトリの内容の確認について
本リポジトリではバンドラーに [Parcel](https://ja.parceljs.org/) を使用しています。
次の手順で実行してください。

1. package.json で管理しているプラグインのインストール

```bash
$ npm i
```

2. アプリ起動

```bash
$ npm run start

> html-javascript-work@1.0.0 start
> parcel index.html

Server running at http://localhost:1234
✨ Built in 253ms
```

3. アクセス
http://localhost:1234 にブラウザからアクセスするとフロートウィンドウの挙動が試せます。

