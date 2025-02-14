<template>
	<div class="home">
		<div class="waterfall">
			<div
				v-for="item in videoList"
				:key="item.id"
				class="video-card"
				:data-video-id="item.id">
				<el-card
					:body-style="{ padding: '0px' }"
					shadow="hover"
					class="flip-container">
					<!-- 正面 -->
					<div class="flip-card front">
						<div class="video-cover" @click="playVideo(item)">
							<el-image :src="item.cover" fit="cover">
								<template #placeholder>
									<div class="image-placeholder">
										<el-icon><Picture /></el-icon>
									</div>
								</template>
							</el-image>
							<div class="play-icon">
								<el-icon><VideoPlay /></el-icon>
							</div>
							<div class="duration">{{ item.duration }}</div>
						</div>

						<div class="content">
							<h3 class="title" :title="item.title">{{ item.title }}</h3>
							<div class="author">
								<el-avatar :size="24" :src="item.author.avatar" />
								<span class="name">{{ item.author.name }}</span>
							</div>
							<div class="stats">
								<span class="stat-item">
									<el-icon><View /></el-icon>
									{{ formatNumber(item.views) }}
								</span>
								<span class="stat-item">
									<el-icon><Star /></el-icon>
									{{ formatNumber(item.likes) }}
								</span>
								<span class="stat-item">
									<el-icon><ChatDotRound /></el-icon>
									{{ formatNumber(item.comments) }}
								</span>
							</div>
						</div>
					</div>

					<!-- 背面
					<div class="flip-card back">
						<h3>视频详情</h3>
						<p>{{ item.title }}</p>
						<p>作者: {{ item.author.name }}</p>
					</div> -->
				</el-card>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
	import { ref } from 'vue'
	import { useRouter } from 'vue-router'
	import { ElCard, ElImage, ElAvatar } from 'element-plus'
	import {
		View,
		Star,
		ChatDotRound,
		Picture,
		VideoPlay,
	} from '@element-plus/icons-vue'

	interface Author {
		id: number
		name: string
		avatar: string
	}

	interface Video {
		id: number
		title: string
		cover: string
		duration: string
		views: number
		likes: number
		comments: number
		author: Author
	}

	const router = useRouter()

	// 模拟视频数据
	const videoList = ref<Video[]>(
		Array.from({ length: 20 }, (_, i) => ({
			id: i + 1,
			title: `这是一个非常有趣的短视频标题 ${i + 1}`,
			cover: `https://picsum.photos/300/400?random=${i}`,
			duration: '3:15',
			views: Math.floor(Math.random() * 1000000),
			likes: Math.floor(Math.random() * 50000),
			comments: Math.floor(Math.random() * 10000),
			author: {
				id: i + 1,
				name: `用户${i + 1}`,
				avatar: `https://picsum.photos/40/40?random=${i}`,
			},
		}))
	)

	const formatNumber = (num: number): string => {
		if (num >= 10000) {
			return (num / 10000).toFixed(1) + 'w'
		}
		return num.toString()
	}

	const playVideo = (video: Video) => {
		const card = document.querySelector(
			`[data-video-id="${video.id}"]`
		) as HTMLElement

		if (!card) {
			console.error(`未找到视频卡片，ID: ${video.id}`)
			return
		}

		// 添加点击动画类名
		card.classList.add('card-clicked')

		setTimeout(() => {
			// 移除动画类名
			card.classList.remove('card-clicked')
			router.push(`/video/${video.id}`)
		}, 600) // 动画持续时间为 0.6s
	}
</script>

<style scoped lang="scss">
	@import '../../styles/variables.scss';

	.home {
		padding: 20px 0;
		height: calc(100vh - 180px);
		overflow-y: auto;

		.waterfall {
			display: flex;
			justify-content: center;
			flex-wrap: wrap;
			gap: 20px;
			padding: 0 0px;

			.video-card {
				flex: 0 0 calc(20% - 16px);
				min-width: 220px;
				margin-bottom: 10px;
				position: relative;
				transition: all 0.3s ease;
				transform-origin: center;

				@media (max-width: 1600px) {
					flex: 0 0 calc(25% - 15px);
				}

				@media (max-width: 1200px) {
					flex: 0 0 calc(33.333% - 14px);
				}

				@media (max-width: 900px) {
					flex: 0 0 calc(50% - 10px);
				}

				@media (max-width: 600px) {
					flex: 0 0 100%;
				}

				&:hover {
					transform: translateY(-5px);
				}

				&.card-clicked {
					transform: translateY(20px) rotateX(10deg) rotateY(5deg)
						rotateZ(-2deg); /* 触发时翻转到背面 */
						scale: 0.9;
				}

				// .flip-container {
				// 	perspective: 1000px; /* 创建三维空间 */
				// 	transition: transform 0.6s;
				// }

				// .flip-card {
				// 	position: absolute;
				// 	width: 100%;
				// 	height: 100%;
				// 	backface-visibility: hidden; /* 隐藏背面 */
				// 	transition: transform 0.6s;

				// 	&.front {
				// 		z-index: 2;
				// 		transform: rotateY(0deg); /* 初始状态为正面 */
				// 	}

				// 	&.back {
				// 		transform: rotateY(180deg); /* 初始状态为背面朝内 */
				// 		background-color: #f9f9f9;
				// 		border-radius: 16px;
				// 		padding: 16px;
				// 		box-shadow: 0 8px 30px rgba($text-color, 0.1);
				// 	}
				// }

				:deep(.el-card) {
					background: rgba(255, 255, 255, 0.95);
					border-radius: 16px;
					box-shadow: 0 8px 30px rgba($text-color, 0.1);
					border: 1px solid rgba($border-color, 0.5);
					backdrop-filter: blur(4px);
					overflow: hidden;
					transition: all 0.3s ease;

					&:hover {
						box-shadow: 0 12px 40px rgba($text-color, 0.15);
					}
				}

				.video-cover {
					position: relative;
					height: 300px;
					overflow: hidden;
					cursor: pointer;

					.el-image {
						width: 100%;
						height: 100%;
						transition: transform 0.3s ease;

						&:hover {
							transform: scale(1.05);
						}
					}

					.image-placeholder {
						height: 100%;
						background: linear-gradient(
							135deg,
							$quaternary-color,
							lighten($quaternary-color, 15%)
						);
						display: flex;
						align-items: center;
						justify-content: center;

						.el-icon {
							font-size: 40px;
							color: rgba(255, 255, 255, 0.8);
						}
					}

					.play-icon {
						position: absolute;
						top: 50%;
						left: 50%;
						transform: translate(-50%, -50%);
						width: 60px;
						height: 60px;
						background: linear-gradient(
							135deg,
							$primary-color,
							$secondary-color
						);
						border-radius: 50%;
						display: flex;
						align-items: center;
						justify-content: center;
						opacity: 0;
						transition: all 0.3s ease;
						box-shadow: 0 4px 12px rgba($text-color, 0.2);

						.el-icon {
							font-size: 24px;
							color: #fff;
						}
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
						backdrop-filter: blur(4px);
					}
				}

				.content {
					padding: 16px;

					.title {
						margin: 0 0 12px;
						font-size: 15px;
						line-height: 1.4;
						color: $text-color;
						overflow: hidden;
						text-overflow: ellipsis;
						display: -webkit-box;
						-webkit-line-clamp: 2;
						-webkit-box-orient: vertical;
					}

					.author {
						display: flex;
						align-items: center;
						margin-bottom: 12px;

						:deep(.el-avatar) {
							border: 2px solid #fff;
							box-shadow: 0 2px 8px rgba($text-color, 0.1);
						}

						.name {
							margin-left: 8px;
							font-size: 14px;
							color: $text-color;
							font-weight: 500;
						}
					}

					.stats {
						display: flex;
						gap: 16px;
						color: $sub-text-color;
						font-size: 13px;

						.stat-item {
							display: flex;
							align-items: center;
							gap: 4px;
							transition: color 0.3s;

							&:hover {
								color: $tertiary-color;
							}

							.el-icon {
								font-size: 16px;
							}
						}
					}
				}
			}
		}
	}

	@include respond-to('xl') {
		.home .waterfall {
			grid-template-columns: repeat(4, 1fr);
		}
	}

	@include respond-to('lg') {
		.home .waterfall {
			grid-template-columns: repeat(3, 1fr);
		}
	}

	@include respond-to('md') {
		.home .waterfall {
			grid-template-columns: repeat(2, 1fr);
			overflow-y: auto; /* 确保在较小屏幕下仍然可以滚动 */
		}
	}
</style>
