<script>
	import { onMount } from 'svelte'
	import ascii from './ascii.txt?raw'
	import { htmlEscape, htmlUnescape } from 'escape-goat'

	/** @type {{ status: import("./$types").PageData['status'], channels: import("./$types").PageData['channels'] }} */
	let { status, channels } = $props()

	const filtered_channels = $derived(channels?.filter((channel) => channel.is_registered))

	let line_length = $state(47)

	/** @type {HTMLPreElement} */
	let pre_element

	const reisen =
		'>\n' +
		ascii
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
	 * remove simple html tags from a string. this will break on tags with
	 * attributes, so don't use it for complex html.
	 * @param {string} str
	 * @returns {string}
	 */
	function strip_simple_html_tags(str) {
		return str.replace(/<[^>]*>/g, '')
	}

	/**
	 * Slices a string so that
	 * `htmlUnescape(strip_simple_html_tags(str.slice(0, n)))` has length <= `n`.
	 * @param {string} str
	 * @param {number} n
	 */
	function slice_by_visible(str, n) {
		let low = 0,
			high = str.length
		while (low < high) {
			const mid = Math.ceil((low + high) / 2)
			const visible = htmlUnescape(strip_simple_html_tags(str.slice(0, mid)))
			if (visible.length > n) {
				high = mid - 1
			} else {
				low = mid
			}
		}
		return low
	}

	/**
	 * Splits a string into chunks based on line length, ignoring HTML tags
	 * for visible length.
	 * @param {string} text
	 * @param {number} max_len
	 * @returns {string}
	 */
	function chunked_text(text, max_len) {
		const lines = text.split('\n')
		const result_chunks = []

		for (const line of lines) {
			if (line === '') {
				result_chunks.push('')
				continue
			}
			const words = line.split(' ')
			let current_line = ''
			for (let i = 0; i < words.length; i++) {
				let word = words[i]
				let sep = current_line ? ' ' : ''
				while (word.length > 0) {
					const test_line = current_line + sep + word
					let test_line_visible = htmlUnescape(strip_simple_html_tags(test_line))
					if (test_line_visible.length > max_len - 3) {
						if (current_line) {
							result_chunks.push(current_line)
							current_line = ''
							sep = ''
						} else {
							const cut = slice_by_visible(word, max_len - 3)
							result_chunks.push(word.slice(0, cut))
							word = word.slice(cut)
						}
					} else {
						current_line = test_line
						word = ''
					}
				}
			}
			if (current_line) result_chunks.push(current_line)
		}

		return result_chunks.map((chunk) => (chunk === '' ? '>' : '> ' + chunk)).join('\n')
	}

	function update_line_length() {
		const context = document.createElement('canvas')?.getContext('2d')

		if (context) {
			const style = getComputedStyle(pre_element)
			context.font = style.font
			context.letterSpacing = style.letterSpacing
			const metrics = context.measureText('a')
			const char_width = metrics.width
			line_length = Math.floor(pre_element.clientWidth / char_width)
			return
		}
	}
	const server_status = $derived.by(() => {
		let result = ''

		if (status) {
			result += `There are ${numeric(status.users.total)}/${numeric(status.users.max)} users `
			result += `online in ${numeric(status.channels)} channels.\n\n`

			result += `The server has been up since `
			result += `${locale.format(new Date(status.start_time))}.\n\n`
			result += `Running on Ergo ${status.version} (#${status.commit.slice(0, 8)}), `
			result += `compiled using ${status.go_version}.\n`
		} else {
			result += 'could not fetch server status :-(\n'
		}

		return result
	})
	const channels_status = $derived.by(() => {
		let result = ''
		for (const channel of filtered_channels ?? []) {
			result += `<b>${channel.name}</b> `
			result += `(${numeric(channel.users)} user${channel.users == 1 ? '' : 's'})`

			const safe_topic = htmlEscape(channel?.topic ?? '')
			if (safe_topic) {
				result += ' -- ' + safe_topic.trim()
			}
			result += '\n\n'
		}
		result = result.slice(0, -1)
		return result
	})

	/**
	 * Linkifies each line, avoiding splitting inside HTML tags.
	 * @param {string} text
	 * @param {number} max_len
	 * @returns {string}
	 */
	function linkify_lines(text, max_len) {
		const lines = chunked_text(text, max_len).split('\n')
		return lines.map(linkify).join('\n')
	}

	onMount(() => {
		document.fonts.ready.then(update_line_length)

		const resize_observer = new ResizeObserver(update_line_length)
		resize_observer.observe(pre_element)

		return () => {
			resize_observer.disconnect()
		}
	})
</script>

<pre aria-hidden="true">
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
<pre title="Server status" bind:this={pre_element}>{@html chunked_text(
		server_status,
		line_length
	)}</pre>
{#if channels_status}
	<details>
		<summary>
			<pre aria-hidden="true">*** Registered channels ***</pre>
			<span class="screenreader">Registered channels</span>
		</summary>
		<pre>{@html linkify_lines(channels_status, line_length)}</pre>
		<pre>> *** End of LIST ***</pre>
	</details>
{/if}
<pre>></pre>

<style>
	pre {
		/* word-wrap: break-word; */
		/* overflow-wrap: break-word; */
		max-width: 100%;
		/* overflow-x: none; */
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
	}
</style>
