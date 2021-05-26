<template>
	<div>
		<tab-bar>
			<tab-bar-item path="/home" activeColor="lightpink">
				<img src="../../../assets/img/tabbar/home.svg" slot="item-icon">
				<img src="../../../assets/img/tabbar/home_active.svg" slot="item-icon-active">
				<div slot="item-text">
					首页
				</div>
			</tab-bar-item>
			<tab-bar-item path="/category" activeColor="lightpink">
				<img src="../../../assets/img/tabbar/category.svg" slot="item-icon">
				<img src="../../../assets/img/tabbar/category_active.svg" slot="item-icon-active">
				<div slot="item-text">
					分类
				</div>
			</tab-bar-item>
			<tab-bar-item path="/cart" activeColor="lightpink">
				<img src="../../../assets/img/tabbar/short.svg" slot="item-icon">
				<img src="../../../assets/img/tabbar/short_active.svg" slot="item-icon-active">
				<div slot="item-text">
					购物
				</div>
			</tab-bar-item>
			<tab-bar-item path="/profile" activeColor="lightpink">
				<img src="../../../assets/img/tabbar/profile.svg" slot="item-icon">
				<img src="../../../assets/img/tabbar/profile_active.svg" slot="item-icon-active">
				<div slot="item-text">
					我的
				</div>
			</tab-bar-item>
		</tab-bar>
	</div>
</template>

<script>
	import TabBar from './../../../components/common/tabbar/TabBar.vue'
	import TabBarItem from './../../../components/common/tabbar/TabBarItem.vue'
	export default{
		name:'MainTabBar',
		components:{
			TabBar,
			TabBarItem
		}
	}
</script>

<style>
</style>
