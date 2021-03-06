import getModalDesc from './curd';

//命名空间
const namespace = "ad";
//全局提示
const alertMessage = "您可以在这里设置广告（首页轮播）";
//默认每页条数
const pageSize = 7;
//操作列宽度
const actionWidth = 1;
//默认添加形式
const defaultCreateDesc = {
  model: namespace,
  pay_status: 0
}
//默认更新形式
const defaultUpdateDesc = {
  model: namespace
}
//默认拉取形式
const defaultReadDesc = {
  model: namespace,
  order: "id desc",
  page: 1,
  pageSize
}
//获取模型操作过程
const { effects, reducers } = getModalDesc(namespace, { defaultCreateDesc, defaultUpdateDesc, defaultReadDesc });

/*
 * 字段对应表  
 * columnMatch: {
 *   数据库字段名: [显示的字段名, 表格中是否开启,表单字段展示类型, 表单中是否开启, 表格列描述, 表格字段展示类型],
 *   id: ["ID", true, 'varchar'],
 *   column_2: [….…],
 *   ……
 * }
 * 4个汉字宽90px 5个汉字宽105px
 */
const columnMatch = {
                                id: ["ID", true, 'varchar', true, "varchar required", {width: 120}, true],
                    ad_position_id: ["ad_position_id", false, 'varchar', false, "varchar", {width: 150}, false],
                        media_type: ["media_type", false, 'varchar', false, "varchar", {width: 150}, false],
                              name: ["名称", true, 'varchar', true, "varchar", {width: 150}, true],
                              link: ["链接", false, 'varchar', false, "varchar", {width: 150}, false],
                         image_url: ["大图", true, 'image', true, "image", {width: 150}, false],
                           content: ["内容", true, 'varchar', true, "textArea", {width: 150}, true],
                          end_time: ["结束时间", false, 'date_time', false, "varchar", {width: 150}, false],
                           enabled: ["是否启用", true, 'switch', true, "switch", {width: 150}, false],
                          add_time: ["添加时间", true, 'date_time', false, "varchar", {width: 150}, false],
    };
//计算表格总宽度
const totalWidth = (() => {
  let totalWidth = 0;
  Object.keys(columnMatch).forEach(key => totalWidth += columnMatch[key][1]?columnMatch[key][5]["width"]:0);
  return 0;
})();
export default {
  namespace,
  state: {
    dataList: [],
    columnMatch,
    alertMessage,
    totalWidth,
    pageSize,
    actionWidth,
    loading: false
  },
  subscriptions: {
    setup({ dispatch, history }) {
      let fun = location => {
        if(typeof fun["executed"] === "undefined"){
          const hash = window.location.hash.split("#/")[1];
          if(hash === 'shop/ad'){
            dispatch({
              type: 'readData'
            });
            fun["executed"] = true;
          }
        }
      };
      history.listen(fun);
    }
  },
  effects: {
    ...effects
  },
  reducers: {
    ...reducers
  }
}
