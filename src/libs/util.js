let util = {

};
util.title = function (title) {
    title = title ? title + ' - 客来餐饮管理' : '客来餐饮管理';
    window.document.title = title;
};

export default util;