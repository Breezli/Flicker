<template>
	<div class="layout">
		<Background />
		<el-container>
			<el-header height="100px">
				<div class="header">
					<div class="left-section">
						<div class="logo">Flicker</div>
					</div>
					<div class="center-section">
						<div class="search">
							<el-input
								placeholder="搜索"
								:prefix-icon="Search"
								v-model="searchText" />
						</div>
					</div>
					<div class="right-section">
						<div class="actions">
							<div class="auth-buttons">
								<el-button class="btn-primary" type="primary">登录</el-button>
								<el-button class="btn-secondary">注册</el-button>
							</div>
							<div class="icon-group">
								<el-button class="btn-icon" :icon="Message" circle></el-button>
								<el-button class="btn-icon" :icon="Setting" circle></el-button>
							</div>
						</div>
					</div>
				</div>
			</el-header>

			<el-container class="main-container">
				<el-aside width="0px">
					<div class="side-menu-container">
						<el-menu class="side-menu" default-active="1">
							<el-menu-item index="1">
								<el-icon><Promotion /></el-icon>
								<span>推荐</span>
							</el-menu-item>
							<el-menu-item index="2">
								<el-icon><Star /></el-icon>
								<span>关注</span>
							</el-menu-item>
							<el-menu-item index="3">
								<el-icon><Location /></el-icon>
								<span>同城</span>
							</el-menu-item>
							<el-menu-item index="4">
								<el-icon><Histogram /></el-icon>
								<span>热门</span>
							</el-menu-item>
							<el-menu-item index="5">
								<el-icon><Timer /></el-icon>
								<span>最新</span>
							</el-menu-item>
						</el-menu>
						<div class="menu-divider"></div>
						<el-menu class="side-menu">
							<el-menu-item index="more" @click="showMoreOptions = true">
								<el-icon><More /></el-icon>
								<span>更多</span>
							</el-menu-item>
						</el-menu>
					</div>
				</el-aside>

				<el-main>
					<div class="category-bar">
						<el-scrollbar>
							<div class="categories">
								<div
									v-for="item in categories"
									:key="item"
									:class="[
										'category-item',
										{ active: currentCategory === item },
									]"
									@click="currentCategory = item">
									{{ item }}
									<span
										class="divider"
										v-if="item !== categories[categories.length - 1]"
										>|</span
									>
								</div>
							</div>
						</el-scrollbar>
					</div>
					<router-view></router-view>
				</el-main>
			</el-container>
		</el-container>

		<el-drawer
			v-model="showMoreOptions"
			title="更多选项"
			direction="btt"
			:before-close="handleMoreOptionsClose"
			:modal-class="'more-options-modal'"
			:size="400"
			:with-header="false">
			<div class="more-options">
				<div class="options-group main-options">
					<div
						class="option-item"
						v-for="option in mainOptions"
						:key="option.name">
						<el-icon><component :is="option.icon" /></el-icon>
						<span>{{ option.name }}</span>
					</div>
				</div>
				<div class="options-divider"></div>
				<div class="options-group bottom-options">
					<div
						class="option-item"
						v-for="option in bottomOptions"
						:key="option.name">
						<el-icon><component :is="option.icon" /></el-icon>
						<span>{{ option.name }}</span>
					</div>
				</div>
			</div>
		</el-drawer>
	</div>
</template>

<script setup lang="ts">
	import { ref } from 'vue'
	import Background from '../components/Background.vue'
	import {
		ElContainer,
		ElHeader,
		ElAside,
		ElMain,
		ElMenu,
		ElMenuItem,
		ElButton,
		ElInput,
		ElScrollbar,
		ElDrawer,
	} from 'element-plus'
	import {
		Search,
		Message,
		Setting,
		Promotion,
		Star,
		Location,
		Histogram,
		Timer,
		More,
		InfoFilled,
		Document,
		QuestionFilled,
		Monitor,
		Moon,
	} from '@element-plus/icons-vue'

	const searchText = ref('')
	const currentCategory = ref('推荐')
	const showMoreOptions = ref(false)

	const categories = [
		'推荐',
		'游戏',
		'音乐',
		'舞蹈',
		'美食',
		'旅游',
		'动漫',
		'科技',
		'运动',
		'时尚',
		'生活',
		'美妆',
		'知识',
		'汽车',
		'宠物',
	]

	const mainOptions = [
		{ name: '关于Flicker', icon: 'InfoFilled' },
		{ name: '隐私与协议', icon: 'Document' },
		{ name: '帮助', icon: 'QuestionFilled' },
	]

	const bottomOptions = [
		{ name: '添加Flicker到桌面', icon: 'Monitor' },
		{ name: '深色模式', icon: 'Moon' },
	]

	const handleMoreOptionsClose = (done: () => void) => {
		done()
	}
</script>

<style scoped lang="scss">
	@import '../styles/variables';

	.layout {
		min-height: 100vh;
		display: flex;
		flex-direction: column;

		.header {
			display: flex;
			align-items: center;
			height: 100%;
			backdrop-filter: blur(10px);
			background: rgba(255, 255, 255, 0.8);
			width: 100%;

			.left-section {
				width: 300px;
				padding-left: 40px;

				.logo {
					font-size: 36px;
					font-weight: bold;
					color: $primary-color;
					cursor: pointer;
					font-family: 'Comic Sans MS', cursive;
					text-shadow: 2px 2px 4px rgba($text-color, 0.1);
					height: 100px;
					line-height: 100px;
				}
			}

			.center-section {
				flex: 1;
				display: flex;
				justify-content: center;
				padding: 0 40px;

				.search {
					width: 600px;
					height: 60px;
					display: flex;
					align-items: center;

					:deep(.el-input__wrapper) {
						background: rgba(255, 255, 255, 0.9);
						border: 1px solid rgba($border-color, 0.5);
						backdrop-filter: blur(4px);
						box-shadow: 0 4px 12px rgba($text-color, 0.05);
						height: 60px;
						border-radius: 30px;
						padding: 0 30px;

						.el-input__inner {
							font-size: 18px;
						}

						.el-input__prefix {
							font-size: 20px;
						}
					}
				}
			}

			.right-section {
				width: 300px;
				padding-right: 40px;

				.actions {
					display: flex;
					align-items: center;
					justify-content: flex-end;
					gap: 8px;
					height: 60px;

					.auth-buttons {
						display: flex;
						gap: 4px;

						.btn-primary {
							background: linear-gradient(
								135deg,
								$primary-color,
								$tertiary-color
							);
							border: none;
							height: 50px;
							border-radius: 25px;
							padding: 0 30px;
							font-size: 16px;

							&:hover {
								background: linear-gradient(
									135deg,
									lighten($primary-color, 5%),
									lighten($tertiary-color, 5%)
								);
								transform: translateY(-2px);
								box-shadow: 0 4px 12px rgba($primary-color, 0.2);
							}
						}

						.btn-secondary {
							background: rgba($quaternary-color, 0.1);
							border: 1px solid rgba($quaternary-color, 0.3);
							color: $text-color;
							height: 50px;
							border-radius: 25px;
							padding: 0 30px;
							font-size: 16px;

							&:hover {
								background: rgba($quaternary-color, 0.2);
								border-color: $quaternary-color;
								transform: translateY(-2px);
								box-shadow: 0 4px 12px rgba($text-color, 0.1);
							}
						}
					}

					.icon-group {
						display: flex;
						gap: 8px;

						.btn-icon {
							width: 50px;
							height: 50px;
							padding: 0;
							background: rgba(255, 255, 255, 0.9);
							border: 1px solid rgba($border-color, 0.5);
							color: $text-color;
							font-size: 20px;

							&:hover {
								background: rgba(255, 255, 255, 1);
								border-color: $tertiary-color;
								color: $tertiary-color;
								transform: translateY(-2px);
								box-shadow: 0 4px 12px rgba($text-color, 0.1);
							}
						}
					}
				}
			}
		}

		.main-container {
			flex: 1;
			position: relative;
			margin-left: 300px;
		}

		.side-menu-container {
			position: fixed;
			top: 100px;
			left: 0;
			bottom: 0;
			width: 300px;
			padding: 20px 0px;
			z-index: 2;
			display: flex;
			flex-direction: column;
		}

		.menu-divider {
			flex: 1;
			min-height: 20px;
		}

		.side-menu {
			background: rgba(255, 255, 255, 0.9);
			backdrop-filter: blur(10px);
			border-right: none;
			margin: 0 40px;
			width: 260px !important;
			border-radius: 16px;
			padding: 15px 0;

			:deep(.el-menu-item) {
				height: 60px;
				line-height: 60px;
				margin: 5px 15px;
				border-radius: 12px;
				font-size: 16px;

				&:hover,
				&.is-active {
					background: linear-gradient(
						to right,
						rgba($primary-color, 0.1),
						transparent
					);
					color: $primary-color;
				}

				.el-icon {
					font-size: 20px;
				}
			}
		}

		.category-bar {
			margin: 0px 20px 10px 0;
			padding: 15px 0;
			background: rgba(255, 255, 255, 0.9);
			backdrop-filter: blur(10px);
			border-radius: 16px;

			.categories {
				display: flex;
				padding: 0 30px;
				flex-wrap: nowrap;
				white-space: nowrap;

				.category-item {
					display: inline-flex;
					align-items: center;
					padding: 0 20px;
					font-size: 15px;
					color: $sub-text-color;
					cursor: pointer;
					transition: all 0.3s;
					position: relative;

					&.active {
						color: $text-color;
						font-weight: 500;
					}

					&:hover {
						color: $primary-color;
					}

					.divider {
						position: absolute;
						right: 0;
						color: $border-color;
						font-weight: 300;
					}
				}
			}
		}
	}

	.more-options {
		padding: 20px;

		.options-group {
			.option-item {
				display: flex;
				align-items: center;
				padding: 15px 20px;
				font-size: 16px;
				color: $text-color;
				cursor: pointer;
				border-radius: 12px;
				transition: all 0.3s;

				&:hover {
					background: rgba($primary-color, 0.1);
					color: $primary-color;
				}

				.el-icon {
					margin-right: 12px;
					font-size: 20px;
				}
			}

			&.bottom-options {
				border-top: 1px solid $border-color;
				margin-top: 10px;
				padding-top: 10px;
			}
		}

		.options-divider {
			height: 1px;
			background: $border-color;
			margin: 10px 0;
		}
	}

	:deep(.el-drawer) {
		position: fixed !important;
		left: 40px !important;
		bottom: 160px !important;
		top: auto !important;
		width: 260px !important;
		height: auto !important;
		border-radius: 16px;
		overflow: hidden;
		box-shadow: 0 -4px 20px rgba($text-color, 0.1);
		background: rgba(255, 255, 255, 0.95);
		backdrop-filter: blur(10px);
	}

	.more-options-modal {
		pointer-events: none;

		:deep(.el-overlay-dialog) {
			position: absolute;
			left: 40px;
			bottom: 100px;
			pointer-events: auto;
		}
	}
</style>
