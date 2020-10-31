function hasPermission(route, role) {
  let {keys, values, entries} = Object;
  if (route.meta && route.meta.roles) {
    //console.log(route.meta.roles
      if(JSON.parse(role)[route.name]){
        return true
      }
  }else{
    return true
  }
}

// 该处的role为登录角色，可根据实际需要进行动态生成
export const generateRoutes = function(asyncRoutes, role){
  const res= []
  asyncRoutes.forEach(item => {
    //console.log(item)
    const mid = {...item}
    if (hasPermission(mid, role)) {

      if (mid.children) {
        mid.children = generateRoutes(mid.children, role)  // 对子路由进行递归，防止遗漏（同时该部分支持多级子路由的递归生成）
      }
      res.push(mid)
    }
  })
  return res
}