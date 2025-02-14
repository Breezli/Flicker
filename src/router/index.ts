import { createRouter, createWebHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'

const isMobile = () => {
	return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
		navigator.userAgent
	)
}

const routes: Array<RouteRecordRaw> = [
	{
		path: '/',
		component: () => import('../layout/index.vue'),
		children: [
			{
				path: '',
				name: 'Home',
				component: () => import('../views/home/index.vue'),
				meta: { title: '首页' },
			},
			{
				path: '/profile',
				name: 'Profile',
				component: () => import('../views/profile/index.vue'),
				meta: { title: '个人中心' },
			},
			{
				path: 'video/:id',
				name: 'VideoDetail',
				component: () => import('../views/video/detail.vue'),
				meta: { title: '视频详情' },
			},
			{
				path: '/video/upload',
				name: 'VideoUpload',
				component: () => import('../views/video/upload.vue'),
				meta: { title: '视频上传' },
			},
		],
	},
]

const router = createRouter({
	history: createWebHistory(),
	routes,
})

export default router
