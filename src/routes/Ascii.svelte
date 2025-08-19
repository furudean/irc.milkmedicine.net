<script>
	import ascii from './ascii.txt?raw'

	const formatted = ascii
		.split('\n')
		.map((line) => '> ' + line)
		.join('\n')
</script>

<h1 class="screenreader">irc.milkmedicine.net</h1>
<p class="screenreader">prescribed for any and all ailments</p>
<pre aria-hidden="true">
{@html formatted}
> <b>irc.milkmedicine.net</b>
> <span style="margin-top: -0.5rem; background-color: #007bff; color: #fff;"
		>~ prescribed for any and all ailments ~</span
	>
>
</pre>
