/**
 * @description 获取当前时间对应的提示语
 * @return string
 */
export function getTimeState() {
    // 获取当前时间
    let timeNow = new Date();
    // 获取当前小时
    let hours = timeNow.getHours();
    // 判断当前时间段
    if (hours >= 6 && hours <= 10) return `早上好 ⛅`;
    if (hours >= 10 && hours <= 14) return `中午好 🌞`;
    if (hours >= 14 && hours <= 18) return `下午好 🌞`;
    if (hours >= 18 && hours <= 24) return `晚上好 🌛`;
    if (hours >= 0 && hours <= 6) return `凌晨好 🌛`;
}


/**
 * @description 递归找出所有面包屑存储到 pinia/vuex 中
 * @param {Array} menuList 所有菜单列表
 * @param {Object} result 输出的结果
 * @param {Array} parent 父级菜单
 * @returns object
 */
export const getAllBreadcrumbList = (menuList, result = {}, parent = []) => {
    for (const item of menuList) {
        if (parent && parent.length > 0) { // 父级菜单不为空
            // 父级菜单不为空，则将当前菜单和父级菜单组合成为新的面包屑
            result[item.path] = [...parent, item];
        } else { // 父级菜单为空
            // 父级菜单为空，则将当前菜单作为新的面包屑
            result[item.path] = [item];
        }
        if (item.children) {
            // 递归调用，获取子菜单的面包屑
            getAllBreadcrumbList(item.children, result, result[item.path]);
        }
    }
    return result;
};