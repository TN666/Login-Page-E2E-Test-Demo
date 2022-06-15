# amazon_login_automation_tests

### Summary

Automation tests of Amazon login page.

### Environment

Node.js V12.22.1

### Installation

```shellscript
npm install
```
### Usage

###### check the format of codes

```shellscript
yarn test
```

###### run tests

```shellscript
yarn e2e -b {Browser_Alias}[:headless] -a {Your_Amazon_Account} -p {Your_Amazon_Password}
```

* support browsers

![image](https://user-images.githubusercontent.com/44137240/173104269-bcd30c2a-277e-4711-9bc6-25989a2c33cc.png)

### ScreenShots of Export Report

#### CLI

* All test cases pass report

![截圖 2022-06-11 上午12 19 41](https://user-images.githubusercontent.com/44137240/173111362-c8a2718e-dad4-4f0a-b6da-3163b10bc552.png)

* Find a bug

![截圖 2022-06-11 上午12 22 45](https://user-images.githubusercontent.com/44137240/173111254-4b9bc50c-6b40-4e52-ba60-1197999ba3de.png)

#### Persistent File

* Path

  `logs/`

* All test cases pass report

![截圖 2022-06-11 上午12 20 23](https://user-images.githubusercontent.com/44137240/173111637-913d18f5-d2a7-4f4c-b6a3-9ea5a6731218.png)

* Find a bug(click on the thumbnail besides error message can display the full screenshot)

![截圖 2022-06-11 上午12 25 59](https://user-images.githubusercontent.com/44137240/173111808-0f88ebd1-664c-4160-9a02-f763295e0e26.png)

![截圖 2022-06-11 上午12 26 23](https://user-images.githubusercontent.com/44137240/173112364-0fb1bd85-ab20-4b37-b69b-10facb00ae1d.png)






