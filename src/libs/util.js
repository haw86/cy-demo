let util = {

};
util.title = function (title) {
    title = title ? title + ' - 客来通' : '客来通';
    window.document.title = title;
};

export default util;