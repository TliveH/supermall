export default {
  cartLength(state) {
    return state.cartList.length
  },
  cartList(state) {
    return state.cartList
  },
  // 映射请求加载
  isLoading (state) {
   return state.isLoading
  }
}
