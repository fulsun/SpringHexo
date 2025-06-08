import { addCollection } from "@iconify/iconify";

// 导入需要预加载的图标集（示例：mdi-light）
 import {icons as mdiLight} from "@iconify-json/mdi-light"; 
 // 按需添加其他图标集（如ep、ant-design等）
// import elementPlus from "@iconify-json/ep";

// 注册图标集（可扩展多个）
export function registerIcons() {
  addCollection(mdiLight);  // 注册mdi-light图标集
}