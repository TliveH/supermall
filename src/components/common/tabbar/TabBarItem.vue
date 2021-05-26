<template>
	<div class="tab-bar-item" @click="itemclick">
		<slot v-if="!isActive" name="item-icon"></slot>
		<slot v-else name="item-icon-active"></slot>
		<div :style="activestyle">
			<slot name="item-text"></slot>
		</div>
	</div>
</template>

<script>
	export default {
		name: 'TabBarItem',
		props:{
			path:String,
			activeColor:{
				type:String,
				default:'blue'
			}
		},
		data() {
			return {
				
			}
		},
		computed:{
			isActive(){
				return this.$route.path.indexOf(this.path)!=-1
			},
			activestyle(){
				return this.isActive?{color:this.activeColor}:{}
			}
		},
		methods:{
			itemclick(){
				this.$router.push(this.path).catch(erro=>{})
			}
		}
	}
</script>

<style>
	.tab-bar-item {
		flex: 1;
		text-align: center;
		height: 49px;
	}

	.tab-bar-item img {
		height: 24px;
		width: 24px;
		margin-top: 2px;
	}
</style>
