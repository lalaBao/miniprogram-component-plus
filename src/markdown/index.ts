const { getProcessor } = require("./libs/bytemd.min.js");
const gfm = require("./libs/gfm.min.js");
const highlight = require("./libs/highlight.min.js");
const md = require("./demo.md");
const processor = getProcessor({
  plugins: [
    gfm(),
    highlight({
      subset: ["javascript", "html", "css"]
    })
  ]
});

Component({
  properties: {
    md: {
      type: String,
      value: '',
      observer: function (newval, oldval) {
        console.log('✨newval: ', newval);
        this.getMDNodes(md)
      },
    }, 
    pnode: null,
  },
  data: {
    // 组件内部数据
    nodes: {},
  },
  lifetimes: {
    created: function () {
      this.app = getApp();
      // this.setData({ isPc: this.app.globalData.isPc });
    },
    ready: function () { }
  },
  methods: {
    getMDNodes(md) {
      const ast = processor.runSync(processor.parse(md));
      this.parseTreeJson(ast.children, ast);
      console.log('ast: ', ast);
      this.setData({ nodes: ast });
    },
    parseTreeJson(array, parentNode) {
      for (let index = 0; index < array.length; index++) {
        const element = array[index];
        if (element.children && typeof element.children == "object") {
          if (element.tagName === "pre") {
            element.codeIndex = this.data.codeIndex++;
          }
          this.parseTreeJson(element.children, element);
        } else {
          // 子节点 && text
          if (element.type == "text") {
            let text = element.value;
            if (parentNode.tagName !== "code" && parentNode.tagName !== "span") {
              // 换行全部干掉
              text = text.replace(/(\r?\n)+|(\r)+/g, "");
              // // 空格切词
              // const wordWithSignArr = text.split(" ");
              // const wordArr = wordWithSignArr.map(word => {
              //   const newWord = word.replace(/(\W+$|^\W+)/g, " $1 ");
              //   const wordWithoutSignArr = newWord.split(" ");
              //   return wordWithoutSignArr;
              // });
              // console.log("wordArr: ", wordArr);
              // element.value = wordArr;
            } else {
              element.value = text;
            }
          }
        }
      }
    },
    onLinkClick(event) {
      // tt.openSchema({
      //   schema: event.currentTarget.dataset.url,
      //   external: true,
      //   success(res) {
      //     console.log(`${res}`);
      //   },
      //   fail(res) {
      //     console.log(`open fail`);
      //   }
      // });
    },
    copyCode(e) {
      // const codeList = getApp().globalData.codeList;
      // const codeindex = e.currentTarget.dataset.codeindex;
      // const code = codeList[codeindex];
      // this.authorizeWithGuide({
      //   scope: 'scope.clipboard',
      //   guideTips: '拷贝代码需要你授予剪切板权限才能正常使用，是否去设置开启？',
      //   success: () => {
      //     tt.setClipboardData({
      //       data: code,
      //       success(res) {
      //         tt.showToast({
      //           title: detail.copied, // 内容
      //           success: res => {
      //             setTimeout(() => {
      //               tt.hideToast();
      //             }, 1000);
      //           }
      //         });
      //       },
      //       fail(res) {
      //         console.log('res: ', res);
      //         console.log(`setClipboardData 调用失败`);
      //       }
      //     });
      //   }
      // })
    },
    authorizeWithGuide(params) {
      // tt.getSetting({
      //   success(res) {
      //     let scopeValue = res.authSetting[params.scope]
      //     if (undefined === scopeValue || null === scopeValue || scopeValue) {
      //       params.success()
      //     } else {
      //       tt.showModal({
      //         content: params.guideTips,
      //         confirmText: '去设置',
      //         success(res) {
      //           if (res.confirm) {
      //             tt.openSetting({
      //               success(res) {
      //                 if (res.authSetting[params.scope]) {
      //                   params.success()
      //                 } else {
      //                   params.fail()
      //                 }
      //               }
      //             })
      //           } else {
      //             params.fail()
      //           }
      //         }
      //       })
      //     }
      //   }
      // })
    },
    imagePreview({
      currentTarget: {
        dataset: { src }
      }
    }) {
      // if (src.indexOf('http') === -1 && src.indexOf('https') === -1) {
      //   src = `http:${src}`
      // }
      // tt.previewImage({
      //   urls: [src],
      //   current: src,
      //   success(res) {
      //     console.log(`previewImage 调用成功`);
      //   },
      //   fail(res) {
      //     console.log(`previewImage 调用失败`);
      //   }
      // });
    }
  }
});
