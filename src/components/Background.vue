<template>
	<div class="background-wrapper">
		<canvas ref="auroraCanvas" class="aurora-canvas"></canvas>
	</div>
</template>

<script setup lang="ts">
	import { ref, onMounted, onUnmounted } from 'vue'

	const auroraCanvas = ref<HTMLCanvasElement | null>(null)
	let animationFrame: number

	const createAurora = () => {
		const canvas = auroraCanvas.value
		if (!canvas) return

		const ctx = canvas.getContext('2d')
		if (!ctx) return

		const resize = () => {
			canvas.width = window.innerWidth
			canvas.height = window.innerHeight
		}

		let direction = Math.random() * Math.PI * 2
		let speed = 1000 // 加快速度

		// 定义新的颜色
		const colors = {
			light1: '#caaea2',
			light2: '#fff',
			dark1: '#f8811b',
			dark2: '#c45834',
			highlight: '#fff',
		}

		const animate = () => {
			// 随机改变方向
			direction += (Math.random() - 0.5) * 0.1

			// 使用整个画布作为绘制区域
			const gradientX = (Math.cos(direction) * canvas.width) / 4
			const gradientY = (Math.sin(direction) * canvas.height) / 4

			// 创建渐变
			const gradient = ctx.createRadialGradient(
				canvas.width / 2 + gradientX,
				canvas.height / 2 + gradientY,
				0,
				canvas.width / 2,
				canvas.height / 2,
				Math.max(canvas.width, canvas.height)
			)

			// 使用新的颜色
			gradient.addColorStop(0, colors.highlight)
			gradient.addColorStop(0.2, colors.light1)
			gradient.addColorStop(0.4, colors.light2)
			gradient.addColorStop(0.6, colors.dark2)
			gradient.addColorStop(1, colors.dark1)

			ctx.fillStyle = gradient
			ctx.fillRect(0, 0, canvas.width, canvas.height)

			// 添加一些随机的光点
			for (let i = 0; i < 5; i++) {
				const x = Math.random() * canvas.width
				const y = Math.random() * canvas.height
				const radius = Math.random() * 2 + 1

				ctx.beginPath()
				ctx.arc(x, y, radius, 0, Math.PI * 2)
				ctx.fillStyle = colors.highlight
				ctx.fill()
			}

			animationFrame = requestAnimationFrame(animate)
		}

		resize()
		window.addEventListener('resize', resize)
		animate()

		return () => {
			window.removeEventListener('resize', resize)
			cancelAnimationFrame(animationFrame)
		}
	}

	onMounted(() => {
		const cleanup = createAurora()
		if (cleanup) {
			onUnmounted(cleanup)
		}
	})
</script>

<style scoped lang="scss">
	@import '../styles/variables';

	.background-wrapper {
		position: fixed;
		width: 100vw;
		height: 100vh;
		background: linear-gradient(
			180deg,
			#ffffff 0%,
			#f8f8f8 30%,
			#f0f0f0 60%,
			#d29000 100%
		);
		z-index: -1;
	}

	.aurora-canvas {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		opacity: 0.3;
		mix-blend-mode: screen;
	}
</style>
