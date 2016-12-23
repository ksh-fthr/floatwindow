#!/bin/bash
# 単体テストの準備

CUR_DIR=`pwd`

# npm のインストール
sudo apt-get install npm

# node が存在しないせいでPATHエラーとなるのでシンボリックリンクを貼る
cd /usr/bin/
sudo ln -s nodejs node

# karma のインストール
# プロジェクトは 下記にあると想定して動く
cd $CUR_DIR
npm install karma
sudo npm install -g karma-cli
npm install jasmine-core --save-dev

# karma init を実行
# 実行後、karma.conf.js を 本ツールを　pull した時に一緒に取得した同名ファイルで置き換える
cp -p karma.conf.js karma.conf.js.tmp
karma init
mv karma.conf.js.tmp karma.conf.js

# DOM操作のテストをするためのプラグインを追加
npm install karma-html2js-preprocessor --save-dev
