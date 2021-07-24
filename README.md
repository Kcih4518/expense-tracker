# Expense Tracker

使用 Node.js + Express + express-handlebars + mongoDB 打造的生活開支記錄網頁。

## Getting Started

本專案已經設定 npm script, 因此可以直接透過 npm install 與 npm run 的方式來執行。

### Development environment

| Package               | Version  |
| --------------------- | -------- |
| mac Big Sur           | 11.4     |
| VS code               | 1.57.1   |
| Node.js               | v14.17.1 |
| Npm                   | 7.19.0   |
| Nvm                   | 0.34.0   |
| Nodemon               | 2.0.7    |
| Express               | 4.17.1   |
| Express-handlebars    | 5.3.2    |
| handlebars-handlebars | 0.10.0   |
| Mongoose              | 5.13.2   |
| MongoDB               | 4.2.5    |
| method-override"      | 3.0.0"   |
| standard"             | 16.0.3"  |

### Description

- 使用者可以瀏覽全部支出 : 支出分類、支出名稱、支出日期、支出金額
- 使用者可以點擊右方按鈕進行更多操作 : 編輯、刪除
- 使用者可以透過類別進行支出的篩選
- 使用者新增支出時在名稱輸入空白會進行提醒
- 使用者點擊編輯時會自動帶入過往資訊
- 使用者點擊刪除時會進行刪除提醒與確認

### Installing

1. 透過 https 取得此專案

```bash
$ git clone https://github.com/Kcih4518/expense-tracker.git
```

2. 安裝 node module

```bash
$ cd AC-S2-3-W2-My-Restaurant-List-CRUD
$ npm install
```

3. 載入 Restaurants Seeds

本專案需在 local 建立 MongoDB 並且使用預設 port 27017。

```bash
$ npm run seed
```

4. 透過 npm 在 local 啟動 web server

```bash
$ npm run dev
Express is running on http://localhost:3000
```

5. 透過 Browser 打開 [http://localhost:3000](http://localhost:3000)

![](https://i.imgur.com/nMePNVu.png)
