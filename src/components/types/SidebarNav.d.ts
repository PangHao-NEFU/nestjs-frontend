//定义每个菜单项所包含的信息,通常通过后端传递以动态注册路由实现权限管理
export interface MenuItem {
  id: number;     //第几个左侧导航栏
  name: string;   //导航栏内的名称
  path: string;   //路由的path路径
  routeName?: string; //导航对应路由的name属性
}
