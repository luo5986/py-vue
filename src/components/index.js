/*
 * 描述: 封装组件库
 */

import bgAnimation from './bgAnimation' // 登录界面背景图动画
import modal from './modal' // 自定义全局模态框


const components = {
  bgAnimation,
  modal
};

const install = (Vue = {}) => {
  if (install.installed) return;
  Object.keys(components).forEach(component => {
    Vue.component(components[component].name, components[component]);
  });

  install.installed = true;
};

install.installed = false;

if (typeof window !== "undefined" && window.Vue) {
  install(window.Vue);
  install.installed = true;
}

const Vcomp = {
  ...components,
  install
};


export default Vcomp
