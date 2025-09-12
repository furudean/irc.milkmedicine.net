<script>
	import { onMount } from 'svelte'
	import ascii from './ascii.txt?raw'

	/** @type {{ status: import("./$types").PageData['status'] }} */
	let { status } = $props()

	let line_length = $state(42)

	/** @type {HTMLPreElement} */
	let pre_element

	const reisen = ascii
		.split('\n')
		.map((line) => '> ' + line)
		.join('\n')

	const locale = Intl.DateTimeFormat('en-US', {
		year: 'numeric',
		month: 'short',
		day: 'numeric',
		hour: '2-digit',
		minute: '2-digit',
		timeZoneName: 'short',
		timeZone: 'America/Los_Angeles'
	})

	/** @type {(n: number) => string} */
	const numeric = (n) => n.toLocaleString('en-US')

	function update_line_length() {
		const context = document.createElement('canvas')?.getContext('2d')

		if (context) {
			context.font = getComputedStyle(pre_element).font
			const metrics = context.measureText('a')
			const char_width = metrics.width
			line_length = Math.floor(pre_element.clientWidth / char_width)
			return
		}

		// fallback
		line_length = 42
	}

	const info = $derived.by(() => {
		if (status) {
			let result = `There are ${numeric(status.users.total)}/${numeric(status.users.max)} users `
			result += `online in ${numeric(status.channels)} channels.`
			result += '\n\n'
			result += `The server is running Ergo version ${status.version}.`
			result += '\n\n'
			result += `The server has been running since `
			result += `${locale.format(new Date(status.start_time))}.`
			result += '\n'
			return result
		} else {
			return 'could not fetch server status :-(\n'
		}
	})

	onMount(() => {
		update_line_length()

		document.fonts.ready.then(() => {
			update_line_length()
		})

		const resize_observer = new ResizeObserver(update_line_length)
		resize_observer.observe(pre_element)

		return () => {
			resize_observer.disconnect()
		}
	})

	const formatted_info = $derived.by(() => {
		const lines = info.split('\n')
		const chunks = lines.flatMap((line) => {
			// if line is empty, preserve it
			if (line === '') return ['']
			const chunks = []
			let words = line.split(' ')
			let current_line = ''
			for (const word of words) {
				if ((current_line + (current_line ? ' ' : '') + word).length > line_length) {
					// if adding the word would exceed the line length, push current_line
					// and start new
					if (current_line) chunks.push(current_line)
					current_line = word
				} else {
					// else, add the word to the current line
					current_line += (current_line ? ' ' : '') + word
				}
			}
			if (current_line) chunks.push(current_line)
			return chunks
		})
		return chunks.map((chunk) => (chunk === '' ? '>' : '> ' + chunk)).join('\n')
	})
</script>

<h1 class="screenreader">irc.milkmedicine.net</h1>
<p class="screenreader">prescribed for any and all ailments</p>
<pre aria-hidden="true" bind:this={pre_element}><!-- prettier-ignore -->
{reisen}
>
> <b>irc.milkmedicine.net</b>
> <span style="margin-top: -0.5rem; background-color: #007bff; color: #fff;"
		>~ prescribed for any and all ailments ~</span
	>
>
{formatted_info}
</pre>

<style>
	pre {
		word-wrap: break-word;
		overflow-wrap: break-word;
		max-width: 100%;
		overflow-x: none;
	}
</style>
