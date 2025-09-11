<script>
	import ascii from './ascii.txt?raw'

	/** @type {{ status: import("./$types").PageData['status'] }} */
	let { status } = $props()

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

	let info = $state('')

	if (status) {
		info += `There are ${numeric(status.users.total)}/${numeric(status.users.max)} users `
		info += `online in ${numeric(status.channels)} channels.`
		info += '\n\n'
		info += `Server is running Ergo version ${status.version}.`
		info += '\n\n'
		info += `The server has been running since `
		info += `${locale.format(new Date(status.start_time))}.`
		info += '\n'
	} else {
		info += 'could not fetch server status :-(\n'
	}

	const line_length = 40

	const formatted_info = $derived.by(() => {
		const lines = info.split('\n')
		const chunks = lines.flatMap((line) => {
			// If the line is empty, preserve it as a reset (empty line)
			if (line === '') return ['']
			const lineChunks = []
			for (let i = 0; i < line.length; i += line_length) {
				let chunk = line.slice(i, i + line_length)
				// Remove leading space from wrapped lines except the first
				if (i > 0) chunk = chunk.replace(/^\s+/, '')
				lineChunks.push(chunk)
			}
			return lineChunks
		})
		return chunks.map((chunk) => (chunk === '' ? '>' : '> ' + chunk)).join('\n')
	})
</script>

<h1 class="screenreader">irc.milkmedicine.net</h1>
<p class="screenreader">prescribed for any and all ailments</p>
<pre aria-hidden="true"><!-- prettier-ignore -->
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
