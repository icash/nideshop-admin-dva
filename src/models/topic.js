import getModalDesc from './curd';

//命名空间
const namespace = "topic";
//全局提示
const alertMessage = "您可以在这里设置专题";
//默认每页条数
const pageSize = 7;
//操作列宽度
const actionWidth = 108;
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
 *   column_2: [……],
 *   ……
 * }
 * 4个汉字宽90px 5个汉字宽105px
 */
const columnMatch = {
               id: ["ID", true, 'varchar', true, "varchar required", {width: 80, fixed: 'left'}, true],
            title: ["标题", true, 'varchar', true, "varchar", {width: 150, fixed: 'left'}, true],
          content: ["内容", true, 'varchar', true, "varchar", {width: 150}, true],
           avatar: ["头像", true, 'image', true, "image", {width: 150}, true],
     item_pic_url: ["item_pic_url", true, 'image', true, "image", {width: 150}, true],
         subtitle: ["抬头", true, 'varchar', true, "varchar", {width: 150}, true],
topic_category_id: ["topic_category_id", true, 'varchar', true, "varchar", {width: 150}, true],
       price_info: ["price_info", true, 'varchar', true, "varchar", {width: 150}, true],
       read_count: ["read_count", true, 'varchar', true, "varchar", {width: 150}, true],
    scene_pic_url: ["scene_pic_url", true, 'image', true, "image", {width: 150}, true],
topic_template_id: ["topic_template_id", true, 'varchar', true, "varchar", {width: 150}, true],
     topic_tag_id: ["topic_tag_id", true, 'varchar', true, "varchar", {width: 150}, true],
       sort_order: ["排序", true, 'varchar', true, "varchar", {width: 150}, true],
          is_show: ["是否显示", true, 'switch', true, "switch", {width: 150}, true],
         add_time: ["添加时间", true, 'data_time', true, "varchar", {width: 150}, true],

};
//计算表格总宽度
const totalWidth = (() => {
  let totalWidth = 0;
  Object.keys(columnMatch).forEach(key => totalWidth += columnMatch[key][1]?columnMatch[key][5]["width"]:0);
  return totalWidth;
})();
export default {
  namespace,
  state: {
    dataList: [],
    a: 1,
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
          if(hash === 'shop/topic'){
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