<template>
	<div class="mobile-home">
		<div
			class="video-container"
			@touchstart="handleTouchStart"
			@touchmove="handleTouchMove"
			@touchend="handleTouchEnd">
			<div
				class="video-wrapper"
				:style="{ transform: `translateY(${currentIndex * -100}vh)` }">
				<div v-for="(item, index) in 10" :key="index" class="video-item">
					<div class="video-content">
						<div class="placeholder">视频 {{ index + 1 }}</div>
					</div>
					<div class="video-info">
						<div class="author">
							<el-avatar :size="40" src="https://placeholder.co/40"
								>用户{{ index + 1 }}</el-avatar
							>
							<span class="name">用户{{ index + 1 }}</span>
						</div>
						<div class="description">这是第 {{ index + 1 }} 个精彩视频</div>
						<div class="actions">
							<div class="action-item">
								<el-icon><Heart /></el-icon>
								<span>{{ Math.floor(Math.random() * 1000) }}</span>
							</div>
							<div class="action-item">
								<el-icon><ChatDotRound /></el-icon>
								<span>{{ Math.floor(Math.random() * 100) }}</span>
							</div>
							<div class="action-item">
								<el-icon><Share /></el-icon>
								<span>分享</span>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
	import { ref } from 'vue'
	import { ElAvatar } from 'element-plus'
	import { Heart, ChatDotRound, Share } from '@element-plus/icons-vue'

	const currentIndex = ref(0)
	let startY = 0
	let moveY = 0

	const handleTouchStart = (e: TouchEvent) => {
		startY = e.touches[0].clientY
	}

	const handleTouchMove = (e: TouchEvent) => {
		moveY = e.touches[0].clientY - startY
	}

	const handleTouchEnd = () => {
		if (Math.abs(moveY) > 50) {
			if (moveY > 0 && currentIndex.value > 0) {
				currentIndex.value--
			} else if (moveY < 0 && currentIndex.value < 9) {
				currentIndex.value++
			}
		}
		moveY = 0
	}
</script>

<style scoped lang="scss">
	.mobile-home {
		height: 100vh;
		overflow: hidden;
		background-color: #000;

		.video-container {
			height: 100%;
			touch-action: none;
		}

		.video-wrapper {
			transition: transform 0.3s ease-out;
		}

		.video-item {
			height: 100vh;
			position: relative;

			.video-content {
				height: 100%;
				display: flex;
				align-items: center;
				justify-content: center;

				.placeholder {
					color: #fff;
					font-size: 24px;
				}
			}

			.video-info {
				position: absolute;
				bottom: 80px;
				left: 20px;
				right: 80px;
				color: #fff;

				.author {
					display: flex;
					align-items: center;
					margin-bottom: 10px;

					.name {
						margin-left: 10px;
						font-weight: bold;
					}
				}

				.description {
					margin-bottom: 15px;
				}
			}

			.actions {
				position: absolute;
				right: -60px;
				bottom: 0;
				display: flex;
				flex-direction: column;
				gap: 20px;

				.action-item {
					display: flex;
					flex-direction: column;
					align-items: center;
					gap: 5px;

					.el-icon {
						font-size: 28px;
					}

					span {
						font-size: 12px;
					}
				}
			}
		}
	}
</style>
