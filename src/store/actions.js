export default {
  addCart(context, payload) {
    // let oldProduct = null
    // for (let item of state.cartList) {
    //   if (item.iid === payload.iid) {
    //     oldProduct = item
    //   }
    // }
    return new Promise((resolve, reject) => {
      //查找之前的数组是否有该商品
      let oldProduct = context.state.cartList.find(item => item.iid === payload.iid)
      //判断oldProduct
      if (oldProduct) {
        // oldProduct.count += 1
        context.commit('addCounter', oldProduct)
        resolve('当前商品数量+1')
      } else {
        payload.count = 1
        // context.state.cartList.push(payload)
        context.commit('addToCart', payload)
        resolve('添加购物车成功')
      }
    })
  }
}
