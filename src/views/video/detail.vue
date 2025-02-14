<template>
	<div class="video-detail" :class="{ entering: isEntering }">
		<div class="video-container">
			<div class="main-content">
				<div class="video-player">
					<div class="player-wrapper">
						<video
							ref="videoRef"
							class="video-element"
							controls
							preload="auto"
							autoplay
							:src="videoData.videoUrl"
							@ended="handleVideoEnd"></video>
					</div>
				</div>

				<div class="comments-section">
					<h2>评论 {{ formatNumber(videoData.comments) }}</h2>
					<div class="comment-input">
						<el-avatar :size="36" :src="currentUser.avatar" />
						<el-input
							v-model="commentText"
							placeholder="发一条友善的评论"
							:rows="2"
							type="textarea" />
						<el-button type="primary" :disabled="!commentText.trim()"
							>发布</el-button
						>
					</div>
				</div>
			</div>

			<div class="side-content">
				<div class="video-info">
					<div class="main-info">
						<h1 class="title">{{ videoData.title }}</h1>
						<div class="stats">
							<span class="views">
								<el-icon><View /></el-icon>
								{{ formatNumber(videoData.views) }}
							</span>
							<span class="likes">
								<el-icon><Star /></el-icon>
								{{ formatNumber(videoData.likes) }}
							</span>
							<span class="comments">
								<el-icon><ChatDotRound /></el-icon>
								{{ formatNumber(videoData.comments) }}
							</span>
							<span class="date">{{ formatDate(videoData.createTime) }}</span>
						</div>
					</div>

					<div class="author-info">
						<el-avatar :size="48" :src="videoData.author.avatar" />
						<div class="author-detail">
							<div class="name">{{ videoData.author.name }}</div>
							<div class="followers">
								{{ formatNumber(videoData.author.followers) }} 粉丝
							</div>
						</div>
						<el-button class="follow-btn" type="primary" :icon="Plus"
							>关注</el-button
						>
					</div>

					<div class="description">{{ videoData.description }}</div>

					<div class="action-bar">
						<div class="action-group">
							<el-button class="action-btn like" :icon="Star">
								{{ formatNumber(videoData.likes) }}
							</el-button>
							<el-button class="action-btn dislike" :icon="StarFilled">
								{{ formatNumber(videoData.dislikes) }}
							</el-button>
						</div>
						<div class="action-group">
							<el-button class="action-btn" :icon="Share">分享</el-button>
							<el-button class="action-btn" :icon="Collection">收藏</el-button>
						</div>
					</div>
				</div>

				<div class="recommended-videos">
					<h3>相关推荐</h3>
					<div class="video-list">
						<div
							v-for="item in recommendedVideos"
							:key="item.id"
							class="video-item"
							@click="playVideo(item)">
							<div class="video-cover">
								<el-image :src="item.cover" fit="cover" />
								<span class="duration">{{ item.duration }}</span>
							</div>
							<div class="video-content">
								<h4 class="title">{{ item.title }}</h4>
								<div class="meta">
									<span class="author">{{ item.author.name }}</span>
									<span class="views">{{ formatNumber(item.views) }} 播放</span>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
	import { ref, onMounted, nextTick } from 'vue'
	import { useRoute, useRouter } from 'vue-router'
	import { ElAvatar, ElButton, ElInput } from 'element-plus'
	import {
		View,
		Star,
		StarFilled,
		ChatDotRound,
		Share,
		Collection,
		Plus,
	} from '@element-plus/icons-vue'

	const route = useRoute()
	const router = useRouter()
	const videoRef = ref<HTMLVideoElement | null>(null)
	const commentText = ref('')
	const isEntering = ref(false)

	// 模拟当前用户数据
	const currentUser = {
		avatar: 'https://picsum.photos/36/36',
	}

	// 模拟视频数据
	const videoData = {
		id: route.params.id,
		title: '这是一个精彩的短视频',
		videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4', // 示例视频URL
		views: 1234567,
		likes: 45678,
		dislikes: 123,
		comments: 9876,
		createTime: new Date().getTime() - 24 * 60 * 60 * 1000, // 一天前
		description: '这是一段视频描述，详细介绍了视频的内容和创作背景。',
		author: {
			name: '视频创作者',
			avatar: 'https://picsum.photos/48/48',
			followers: 12345,
		},
	}

	// 添加推荐视频数据
	const recommendedVideos = ref(
		Array.from({ length: 10 }, (_, i) => ({
			id: i + 100,
			title: `推荐视频标题 ${i + 1}`,
			cover: `https://picsum.photos/320/180?random=${i}`,
			duration: '3:15',
			views: Math.floor(Math.random() * 1000000),
			author: {
				name: `创作者${i + 1}`,
			},
		}))
	)

	const formatNumber = (num: number): string => {
		if (num >= 10000) {
			return (num / 10000).toFixed(1) + 'w'
		}
		return num.toString()
	}

	const formatDate = (timestamp: number): string => {
		const now = new Date().getTime()
		const diff = now - timestamp
		const days = Math.floor(diff / (24 * 60 * 60 * 1000))
		const hours = Math.floor(diff / (60 * 60 * 1000))
		const minutes = Math.floor(diff / (60 * 1000))

		if (days > 0) return `${days}天前`
		if (hours > 0) return `${hours}小时前`
		if (minutes > 0) return `${minutes}分钟前`
		return '刚刚'
	}

	const handleVideoEnd = () => {
		if (videoRef.value) {
			videoRef.value.currentTime = 0
		}
	}

	const playVideo = (video: any) => {
		router.push(`/video/${video.id}`)
	}

	onMounted(() => {
		// 先设置为true,然后在下一帧设置为false以触发动画
		nextTick(() => {
			isEntering.value = true
		})
	})
</script>

<style scoped lang="scss">
	@import '../../styles/variables';

	.video-detail {
		padding: 20px;
		height: calc(100vh - 100px);
		overflow-y: auto;

		.video-container {
			display: grid;
			grid-template-columns: minmax(0, 1fr) 300px;
			gap: 20px;
			max-width: 1600px;
			margin: 0 auto;
		}

		.main-content {
			display: flex;
			flex-direction: column;
			gap: 20px;
		}

		.side-content {
			display: flex;
			flex-direction: column;
			gap: 20px;
		}

		.video-player {
			background: rgba(255, 255, 255, 0.9);
			border-radius: 16px;
			overflow: hidden;
			box-shadow: 0 8px 30px rgba($text-color, 0.1);

			.player-wrapper {
				position: relative;
				padding-top: 56.25%; // 16:9 比例

				.video-element {
					position: absolute;
					top: 0;
					left: 0;
					width: 100%;
					height: 100%;
					object-fit: cover;
				}
			}
		}

		.video-info {
			background: rgba(255, 255, 255, 0.9);
			backdrop-filter: blur(10px);
			border-radius: 16px;
			padding: 24px;
			margin-bottom: 20px;
			box-shadow: 0 4px 12px rgba($text-color, 0.05);

			.main-info {
				margin-bottom: 20px;

				.title {
					font-size: 24px;
					font-weight: 600;
					color: $text-color;
					margin-bottom: 12px;
				}

				.stats {
					display: flex;
					gap: 24px;
					color: $sub-text-color;
					font-size: 14px;

					span {
						display: flex;
						align-items: center;
						gap: 4px;

						.el-icon {
							font-size: 16px;
						}
					}
				}
			}

			.author-info {
				display: flex;
				align-items: center;
				margin-bottom: 20px;
				padding-bottom: 20px;
				border-bottom: 1px solid rgba($border-color, 0.5);

				.author-detail {
					margin-left: 12px;
					flex: 1;

					.name {
						font-size: 16px;
						font-weight: 500;
						color: $text-color;
					}

					.followers {
						font-size: 14px;
						color: $sub-text-color;
						margin-top: 4px;
					}
				}

				.follow-btn {
					background: linear-gradient(135deg, $primary-color, $tertiary-color);
					border: none;
					height: 40px;
					border-radius: 20px;
					padding: 0 24px;

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
			}

			.description {
				font-size: 14px;
				line-height: 1.6;
				color: $text-color;
				margin-bottom: 20px;
			}

			.action-bar {
				display: flex;
				justify-content: space-between;

				.action-group {
					display: flex;
					gap: 8px;

					.action-btn {
						height: 40px;
						border-radius: 20px;
						padding: 0 20px;
						font-size: 14px;
						background: rgba(255, 255, 255, 0.9);
						border: 1px solid rgba($border-color, 0.5);
						color: $text-color;

						&:hover {
							background: rgba(255, 255, 255, 1);
							border-color: $tertiary-color;
							color: $tertiary-color;
							transform: translateY(-2px);
							box-shadow: 0 4px 12px rgba($text-color, 0.1);
						}

						&.like {
							background: rgba($primary-color, 0.1);
							border-color: rgba($primary-color, 0.3);
							color: $primary-color;

							&:hover {
								background: rgba($primary-color, 0.2);
								border-color: $primary-color;
							}
						}

						&.dislike {
							background: rgba($quaternary-color, 0.1);
							border-color: rgba($quaternary-color, 0.3);
							color: $text-color;

							&:hover {
								background: rgba($quaternary-color, 0.2);
								border-color: $quaternary-color;
							}
						}
					}
				}
			}
		}

		.recommended-videos {
			background: rgba(255, 255, 255, 0.9);
			backdrop-filter: blur(10px);
			border-radius: 16px;
			padding: 20px;
			box-shadow: 0 4px 12px rgba($text-color, 0.05);

			h3 {
				font-size: 18px;
				font-weight: 600;
				color: $text-color;
				margin-bottom: 16px;
			}

			.video-list {
				display: flex;
				flex-direction: column;
				gap: 16px;
			}

			.video-item {
				display: flex;
				gap: 12px;
				cursor: pointer;
				transition: all 0.3s ease;

				&:hover {
					transform: translateY(-2px);
				}

				.video-cover {
					position: relative;
					width: 160px;
					height: 90px;
					border-radius: 8px;
					overflow: hidden;

					.el-image {
						width: 100%;
						height: 100%;
					}

					.duration {
						position: absolute;
						bottom: 4px;
						right: 4px;
						padding: 2px 4px;
						background: rgba(0, 0, 0, 0.7);
						color: #fff;
						border-radius: 4px;
						font-size: 12px;
					}
				}

				.video-content {
					flex: 1;
					min-width: 0;

					.title {
						font-size: 14px;
						line-height: 1.4;
						color: $text-color;
						margin-bottom: 8px;
						overflow: hidden;
						text-overflow: ellipsis;
						display: -webkit-box;
						-webkit-line-clamp: 2;
						-webkit-box-orient: vertical;
					}

					.meta {
						display: flex;
						flex-direction: column;
						gap: 4px;
						font-size: 12px;
						color: $sub-text-color;
					}
				}
			}
		}

		// 响应式布局
		@include respond-to('xl') {
			.video-container {
				grid-template-columns: 1fr;
			}

			.side-content {
				max-width: 800px;
				margin: 0 auto;
			}

			.recommended-videos .video-item .video-cover {
				width: 200px;
				height: 112px;
			}
		}
	}

	// 添加页面过渡动画
	.fade-enter-active,
	.fade-leave-active {
		transition: opacity 0.3s ease;
	}

	.fade-enter-from,
	.fade-leave-to {
		opacity: 0;
	}
</style>
