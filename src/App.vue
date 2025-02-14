<script setup lang="ts"></script>

<template>
	<router-view></router-view>
</template>

<style>
	* {
		margin: 0;
		padding: 0;
		box-sizing: border-box;
		scrollbar-width: none; /* Firefox */
		-ms-overflow-style: none; /* IE and Edge */
	}

	*::-webkit-scrollbar {
		display: none; /* Chrome, Safari, Opera */
	}

	html,
	body {
		height: 100%;
		overflow: hidden;
	}
</style>
