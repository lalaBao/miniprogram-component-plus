module.exports = `
# h1 Heading
## h2 Heading
### h3 Heading
#### h4 Heading
##### h5 Heading
###### h6 Heading

** 粗体 **
* 斜体 *
~~删除线~~
> 这里是引用
****
这里分界线中间的内容
****

无序列表
* 实心1
* 实心2
* 实心3
	* 子项

有序列表
1. 项目1
2. 项目2
3. 项目3
    1. 项目1
    2. 项目2
    3. 项目3

图片
![小狗狗](https://avatars2.githubusercontent.com/u/26648209?v=4&s=400&u=4108ba0a850f9f390a449b40629651a8e31d05cd '我喜欢的狗狗')

链接
[baidu](https://www.baidu.com "我是百度")

\`\`\`html
<html>
    <head>
        <script src="main.js"></script>
    </head>
    <body>
    </body>
</html>
\`\`\`

\`\`\`javascript

    for(var i = 0; i< 11; i++) {
    	let j = i - 1;
    }
	const home = i18n.home;
\`\`\`

这是一段普通的文字，中间有一点\`代码\`。
用两个空格换行
多一行空行换行

<br>br换行</br>
An english fragment.

一段长数字: 123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890

| Tables        | Are           | Cool  |
| ------------- |:-------------:| -----:|
| col 3 is      | right-aligned | $1600 |
| col 2 is      | centered      |   $12 |
| zebra stripes | are neat      |    $1 |

<video>
<source src="http://html5demos.com/assets/dizzy.mp4">
</source>
</video>

<video src="http://html5demos.com/assets/dizzy.mp4"></video>
`;
