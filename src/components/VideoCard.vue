<template>
	<div
		class="video-card"
		:class="{ 'card-clicked': isClicked }"
		@click="playVideo">
		<div class="video-cover">
			<el-image :src="video.cover" fit="cover" loading="lazy">
				<template #placeholder>
					<div class="image-placeholder">
						<el-icon><VideoPlay /></el-icon>
					</div>
				</template>
			</el-image>
			<div class="duration">{{ formatDuration(video.duration) }}</div>
			<div class="play-icon">
				<el-icon><VideoPlay /></el-icon>
			</div>
		</div>

		<div class="content">
			<div class="author">
				<el-avatar :size="32" :src="video.author.avatar" />
				<span class="name">{{ video.author.name }}</span>
			</div>
			<h3 class="title">{{ video.title }}</h3>
			<div class="stats">
				<span class="views">
					<el-icon><View /></el-icon>
					{{ formatNumber(video.views) }}
				</span>
				<span class="likes">
					<el-icon><Star /></el-icon>
					{{ formatNumber(video.likes) }}
				</span>
				<span class="comments">
					<el-icon><ChatDotRound /></el-icon>
					{{ formatNumber(video.comments) }}
				</span>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
	import { ref } from 'vue'
	import { useRouter } from 'vue-router'
	import { ElImage, ElAvatar } from 'element-plus'
	import { VideoPlay, View, Star, ChatDotRound } from '@element-plus/icons-vue'

	const props = defineProps({
		video: {
			type: Object,
			required: true,
		},
	})

	const router = useRouter()
	const isClicked = ref(false)

	const formatNumber = (num: number): string => {
		if (num >= 10000) {
			return (num / 10000).toFixed(1) + 'w'
		}
		return num.toString()
	}

	const formatDuration = (seconds: number): string => {
		const minutes = Math.floor(seconds / 60)
		const remainingSeconds = seconds % 60
		return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`
	}

	const playVideo = () => {
		isClicked.value = true

		// 添加点击动画效果
		const card = document.querySelector('.card-clicked') as HTMLElement
		if (card) {
			const rect = card.getBoundingClientRect()
			const centerX = window.innerWidth / 2 - rect.left - rect.width / 2
			const centerY = window.innerHeight / 2 - rect.top - rect.height / 2

			card.style.setProperty('--translate-x', `${centerX}px`)
			card.style.setProperty('--translate-y', `${centerY}px`)
		}

		// 延迟导航以等待动画完成
		setTimeout(() => {
			router.push(`/video/${props.video.id}`)
		}, 500)
	}
</script>

<style scoped lang="scss">
	@import '../styles/variables';

	.video-card {
		position: relative;
		border-radius: 16px;
		overflow: hidden;
		background: rgba(255, 255, 255, 0.9);
		backdrop-filter: blur(10px);
		cursor: pointer;
		transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
		transform-origin: center;
		will-change: transform;

		&:hover {
			transform: translateY(-4px);
			box-shadow: 0 8px 24px rgba($text-color, 0.1);

			.video-cover {
				.el-image {
					transform: scale(1.05);
				}

				.play-icon {
					opacity: 1;
					transform: translate(-50%, -50%) scale(1);
				}
			}
		}

		&.card-clicked {
			position: fixed;
			z-index: 1000;
			animation: card-click 0.5s cubic-bezier(0.4, 0, 0.2, 1) forwards;
		}

		.video-cover {
			position: relative;
			padding-top: 56.25%;
			overflow: hidden;

			.el-image {
				position: absolute;
				top: 0;
				left: 0;
				width: 100%;
				height: 100%;
				transition: transform 0.3s ease;
			}

			.image-placeholder {
				width: 100%;
				height: 100%;
				display: flex;
				align-items: center;
				justify-content: center;
				background: linear-gradient(
					135deg,
					rgba($primary-color, 0.1),
					rgba($tertiary-color, 0.1)
				);
				color: $primary-color;
				font-size: 24px;
			}

			.duration {
				position: absolute;
				bottom: 8px;
				right: 8px;
				padding: 4px 8px;
				background: rgba(0, 0, 0, 0.7);
				color: #fff;
				border-radius: 4px;
				font-size: 12px;
			}

			.play-icon {
				position: absolute;
				top: 50%;
				left: 50%;
				transform: translate(-50%, -50%) scale(0.8);
				width: 64px;
				height: 64px;
				background: rgba($primary-color, 0.9);
				border-radius: 50%;
				display: flex;
				align-items: center;
				justify-content: center;
				color: #fff;
				font-size: 32px;
				opacity: 0;
				transition: all 0.3s ease;
				backdrop-filter: blur(4px);
			}
		}

		.content {
			padding: 16px;

			.author {
				display: flex;
				align-items: center;
				gap: 8px;
				margin-bottom: 12px;

				.name {
					font-size: 14px;
					color: $text-color;
					font-weight: 500;
				}
			}

			.title {
				font-size: 16px;
				font-weight: 600;
				color: $text-color;
				margin-bottom: 12px;
				line-height: 1.4;
				display: -webkit-box;
				-webkit-line-clamp: 2;
				-webkit-box-orient: vertical;
				overflow: hidden;
			}

			.stats {
				display: flex;
				gap: 16px;
				color: $sub-text-color;
				font-size: 13px;

				span {
					display: flex;
					align-items: center;
					gap: 4px;

					.el-icon {
						font-size: 14px;
					}
				}
			}
		}
	}

	@keyframes card-click {
		0% {
			transform: scale(1);
		}
		50% {
			transform: scale(1.05) rotate(2deg);
		}
		100% {
			transform: translate(var(--translate-x), var(--translate-y)) scale(1.5)
				rotate(0deg);
			opacity: 0;
		}
	}
</style>
