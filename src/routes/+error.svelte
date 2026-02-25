<script lang="ts">
	import { page } from '$app/state'
</script>

<div class="wrapper">
	<main>
		<h1>{page.error?.message}</h1>
		<img src="bully.png" alt="reisen sad" width="952" height="340" />
	</main>
</div>

<style>
	img {
		width: 300px;
		max-width: 100%;
		height: auto;
		margin: 1rem 0;
	}
</style>
