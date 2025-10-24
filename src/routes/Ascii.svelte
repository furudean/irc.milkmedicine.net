<script>
	import { onMount } from 'svelte'
	import ascii from './ascii.txt?raw'

	/** @type {{ status: import("./$types").PageData['status'], channels: import("./$types").PageData['channels'] }} */
	let { status, channels } = $props()

	const filtered_channels = $derived(channels.filter((channel) => channel.is_registered))

	let line_length = $state(45)

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

	/**
	 * Converts URLs in a string to HTML anchor tags.
	 * @param {string} text
	 * @returns {string}
	 */
	function linkify(text) {
		const urlRegex = /((https?:\/\/|www\.)[^\s<]+)/g
		return text.replace(urlRegex, (url) => {
			const href = url.startsWith('http') ? url : 'http://' + url
			return `<a href="${href}" rel="noopener noreferrer">${url}</a>`
		})
	}

	/**
	 * @param {string} text
	 * @return {string}
	 */
	function chunked_text(text) {
		const lines = text.split('\n')
		const chunks = lines.flatMap((line) => {
			// if line is empty, preserve it
			if (line === '') return ['']
			const chunks = []
			let current_line = ''
			for (const word of line.split(' ')) {
				if ((current_line + (current_line ? ' ' : '') + word).length > line_length) {
					if (current_line) chunks.push(current_line)
					current_line = word
				} else {
					current_line += (current_line ? ' ' : '') + word
				}
			}
			if (current_line) chunks.push(current_line)
			return chunks
		})
		return (
			chunks
				.map((chunk) => {
					if (chunk === '') return '>'
					return '> ' + chunk
				})
				// Linkify each line
				.map((line) => linkify(line))
				.join('\n')
		)
	}

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
		line_length = 39
	}

	const info = $derived.by(() => {
		if (status) {
			let result = `There are ${numeric(status.users.total)}/${numeric(status.users.max)} users `
			result += `online in ${numeric(status.channels)} channels.`
			result += '\n'

			return result
		} else {
			return 'could not fetch server status :-(\n'
		}
	})

	const channel_text = $derived.by(() => {
		if (filtered_channels) {
			let result = ''
			for (const channel of filtered_channels) {
				result += `<b>${channel.name}</b> (${numeric(channel.users)} users)`
				if (channel.topic) {
					result += ` -- ${channel.topic}`
				}
				result += '\n\n'
			}
			result = result.slice(0, -2)
			return result
		} else {
			return ''
		}
	})

	const bottom_text = $derived.by(() => {
		if (!status) return 'could not fetch status :-('
		let result = `The server has been up since `
		result += `${locale.format(new Date(status.start_time))}.`
		result += '\n\n'
		result += `Running on Ergo ${status.version} (#${status.commit.slice(0, 8)}), `
		result += `compiled using ${status.go_version}.`
		result += '\n'
		return result
	})

	onMount(() => {
		update_line_length()

		document.fonts.ready.then(update_line_length)

		const resize_observer = new ResizeObserver(update_line_length)
		resize_observer.observe(pre_element)

		return () => {
			resize_observer.disconnect()
		}
	})
</script>

<pre aria-hidden="true" bind:this={pre_element}><!-- prettier-ignore -->
{reisen}
>
> <b>irc.milkmedicine.net</b>
> <span style="margin-top: -0.5rem; background-color: #007bff; color: #fff;"
		>~ prescribed for any and all ailments ~</span
	>
>
</pre>
<h1 class="screenreader">irc.milkmedicine.net</h1>
<p class="screenreader">prescribed for any and all ailments</p>
<pre aria-hidden="true" bind:this={pre_element}>
{@html chunked_text(info)}</pre>
<pre>{@html chunked_text(bottom_text)}</pre>
<details>
	<summary><pre>*** Registered channels ***</pre></summary>
	<pre>{@html chunked_text(channel_text)}</pre>
</details>
<pre>></pre>

<style>
	pre {
		word-wrap: break-word;
		overflow-wrap: break-word;
		max-width: 100%;
		overflow-x: none;
	}

	summary {
		line-height: inherit;
	}

	summary > pre {
		/* font-style: italic; */
		display: inline;
		margin: 0;
	}

	details {
		border-top: 1px dotted currentColor;
		border-bottom: 1px dotted currentColor;
	}

	pre :global(a) {
		color: inherit;
		text-decoration: dotted;
	}
</style>
