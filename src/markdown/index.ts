const { getProcessor } = require("./libs/bytemd.min.js");
const gfm = require("./libs/gfm.min.js");
const highlight = require("./libs/highlight.min.js");
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
        this.getMDNodes(newval)
      },
    }, 
    pnode: null,
    code: null
  },
  data: {
    // 组件内部数据
    nodes: {},
  },
  lifetimes: {
    created: function () {
      this.app = getApp();
    },
    ready: function () { }
  },
  methods: {
    getMDNodes(md) {
      const ast = processor.runSync(processor.parse(md));
      ast.children = ast.children.filter((item) => !(item.type === 'text' && item.value.trim() === ''))
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
    imagePreview({
      currentTarget: {
        dataset: { src }
      }
    }) {
      wx.previewImage({
        current: src, // 当前显示图片的http链接
        urls: [src] // 需要预览的图片http链接列表
      })
    }
  }
});
