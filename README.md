# ACG-manager

A(ainme)・C(comic)・G(game)  
見たいアニメ・読みたいマンガ・したいゲームを管理するTodoアプリです

## 機能一覧
- Todoの一覧機能
- Todoの新規投稿機能
- Todoの編集機能
- Todoの削除機能

## 開発環境
- Ruby 
- Ruby on Rails
- javascript
- create-react-app
- MySQL
- GitHub
- Visual Studio Code 

## 使い方
Todoの一覧はページ下部のタブで切り替えが可能です  
<img src="https://gyazo.com/b9c7d12f2771338cb7ba1a6173d0d936.gif" width="500">

検索を使用することでTodoの絞り込みができます  
<img src="https://gyazo.com/874e939def6fa903f12a0da504602f43.gif" width="500">

コンテンツ名とカテゴリーを選択して新規で投稿ができます  
<img src="https://gyazo.com/501c444eb1ca089a49bb2f8d64ede0b5.gif" width="500">

編集のアイコンから編集ページでの編集ができます  
<img src="https://gyazo.com/2a76ce20817a7586635f389c6a19ddd5.gif" width="500">

Todo一覧画面からは全てのTodoが、各カテゴリーの一覧ページからはそのカテゴリーのTodo全てが削除できます  
<img src="https://gyazo.com/03ce4e79647c94512badc198c5814d25.gif" width="500">

## 工夫した点
- シンプルで見ただけで使い方がわかるようにすること
- カテゴリーごとに表示を切り替えること、またそのカテゴリーのTodoだけを全て削除すること

## 今後の実装
- 各Todoの編集画面にコメント機能の実装
- dockerの導入
- CircleCI による自動 CI/CD パイプライン構築
- AWSでのデプロイ

## DB設計

### todos テーブル

| Column       | Type    | Options                     |
| ------------ | ------- | --------------------------- |
| name         | string  | null: false                 |
| is_completed | boolean | default: false, null: false |
| category     | string  | null: false                 |

