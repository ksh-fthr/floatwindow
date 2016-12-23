#!/bin/bash
# 単体テストの準備
# karma init は「karma.conf.js」を git 登録してあるので割愛

# npm のインストール
sudo apt-get install npm

# node が存在しないせいでPATHエラーとなるのでシンボリックリンクを貼る
/usr/bin//usr/bin/
sudo ln -s nodejs node

# karma のインストール
cd ${テスト対象のプロジェクトディレクトリ}
npm install karma
npm install -g karma-cli
npm install jasmine-core --save-dev

# DOM操作のテストをするためのプラグインを追加
npm install karma-html2js-preprocessor --save-dev
