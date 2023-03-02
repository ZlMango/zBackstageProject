<template>
		<div class="layout">
				<div>
						<keep-alive>
								<div class="topBar">
										<topBar/>
								</div>
						</keep-alive>
						<div class="content">
								<keep-alive>
										<div class="sideBar">
												<sidebar/>
										</div>
								</keep-alive>
								<div class="routerView">
										<router-view></router-view>
								</div>
						</div>
				</div>
		</div>
</template>

<script setup>
import sidebar from './menu/index.vue'
import topBar from './topBar/index.vue'
</script>

<style scoped>
.layout {
		background: #fffef9;
		height: 100%;
}

.content {
		display: flex;
}

.sideBar {
		width: 12%;
}

.routerView {
		width: 88%;
}

.topBar {
}
</style>