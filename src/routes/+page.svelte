<script>
	import { page } from '$app/state'
	import Ascii from './Ascii.svelte'

	/** @type {import('./$types').PageProps} */
	let { data } = $props()

	const title = 'milkmedicine IRC'
	const description =
		'milkmedicine is an IRC network for anime, tech, music, art, programming & internet obscura'
	const medicine_url = new URL('/medicine.webp', page.url.href).href
</script>

<svelte:head>
	<title>{title}</title>
	<meta name="description" content={description} />
	<meta name="theme-color" content="#007bff" />

	<meta property="og:title" content={title} />
	<meta property="og:description" content={description} />
	<meta property="og:image" content={medicine_url} />

	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:title" content={title} />
	<meta name="twitter:description" content={description} />
	<meta name="twitter:image" content={medicine_url} />
</svelte:head>

<div class="wrapper">
	<aside>
		<Ascii status={data.status} channels={data.channels}></Ascii>
		<div class="buttons">
			<a
				href="https://webchain.milkmedicine.net/?node=irc.milkmedicine.net_"
				rel="external"
				title="View this site on the milkmedicine webchain"
				class="button"
			>
				<img
					src="https://webchain.milkmedicine.net/button.png"
					height="31"
					width="88"
					alt="Old-web style button for webchain.milkmedicine.net"
				/>
			</a>
			<a
				href="https://paralogue.org"
				rel="external"
				title="Our sister site, paralogue.org"
				class="button"
				><img
					src="https://paralogue.org/images/parabutton.png"
					alt="Old-web Style Button for paralogue.org"
					height="31"
					width="88"
				/></a
			>
		</div>
	</aside>

	<main>
		<section class="motd" aria-label="Today's Fortune">
			<a
				href="https://github.com/furudean/irc.milkmedicine.net/blob/main/src/lib/motd.txt"
				rel="external">{data.motd}</a
			>
		</section>
		<p>
			<span class="fake-h1">milkmedicine</span>
			is an IRC network, conjured into being by
			<a href="https://www.himawari.fun" rel="external">~meri</a> in 2025. We like anime, tech,
			music, art, programming & internet obscura.
		</p>
		<p>
			Social networks can be fun, but they're always asking for more of you. We wanted to
			step away from that. IRC has no algorithms, no engagement nudging, and no data
			harvesting. It's just conversation — in the way the internet used to dream of
			itself. Come chat, big sister.
		</p>

		<h2>Connect</h2>

		<dl>
			<dt>
				IRC over <abbr title="Also called SSL or secure connection">TLS</abbr>
			</dt>
			<dd>
				<a href="ircs://irc.milkmedicine.net:6697" target="_blank" data-sveltekit-reload
					>irc.milkmedicine.net:6697</a
				>
			</dd>
			<dt>IRC over secure WebSocket</dt>
			<dd>irc.milkmedicine.net/webirc</dd>
		</dl>
		<p>
			<b
				>You may also connect through the
				<a href="/gamja" data-sveltekit-reload>web client</a></b
			>. After connecting, join
			<code>#lounge</code> and say hi.
		</p>
		<blockquote>
			Only TLS connections are accepted. Consult your client's manual if unsure how to
			connect securely
		</blockquote>
		<p>
			If you are completely new to IRC you may find <a
				href="https://libera.chat/guides/basics"
				rel="external">libera's guide</a
			>
			or <a href="https://www.irchelp.org/" rel="external">www.irchelp.com</a> a good resource
			on the basics.
		</p>
		<p>
			Not sure what client to use? We have a list of <a href="#client-recommendation"
				>IRC client recommendations</a
			>
			below.
		</p>

		<h2>Good to know</h2>
		<blockquote>
			milkmedicine IRC runs on <a href="https://ergo.chat/about" rel="external">Ergo</a>.
			You may want to read the
			<a
				href="https://github.com/ergochat/ergo/blob/stable/docs/USERGUIDE.md"
				rel="external">Ergo user guide</a
			> for more information on how to use the network.
		</blockquote>
		<p>
			You may register for an account using <code
				>/msg NickServ register &lt;password&gt; [email]</code
			>
			to protect your nickname. After doing this successfully, you can use SASL authentication
			(preferred) or alternatively,
			<code>/msg NickServ identify &lt;username&gt; &lt;password&gt;</code> to log in on
			future connections. You can <code>/msg NickServ help</code> for more information.
		</p>
		<p>
			Chat history may be stored indefinitely in registered channels, though this can be
			disabled by channel operators. Keep in mind that anything you say in a channel might
			be seen by anyone who joins, even if they join later.
		</p>

		<h2 id="client-recommendation">IRC client recommendations</h2>
		<p>
			As milkmedicine is an IRCv3 network, it works best with clients that support
			features such as SASL authentication, <code>chathistory</code>
			extensions and more. You can review
			<a href="https://ircv3.net/software/clients">this client list</a>
			for some options. <a href="https://halloy.chat">Halloy</a> is a good desktop one. I recommend
			doing your own research and experimenting with different clients to find one that suits
			you best.
		</p>
		<p>
			I personally run <a href="https://soju.im/" rel="external">Soju</a>
			bouncer +
			<a href="https://git.sr.ht/~delthas/senpai/" rel="external">Senpai</a> client, but it's
			pretty advanced to set up and use, so I wouldn't recommend it for beginners.
		</p>
		<footer>
			<div class="medicine">
				<img src="/medicine.webp" alt="Medicine is yummy!!!!" height="757" width="995" />
				<p>
					<a
						href="https://x.com/NES_Ghost/status/1973016819087864027"
						rel="external noreferrer">[img source]</a
					>
				</p>
			</div>
		</footer>
	</main>
</div>

<style>
	.wrapper {
		display: grid;
		grid-template-areas:
			'main'
			'sidebar';
		max-width: 90ch;
		padding: 0 1em;
	}

	@media (width > 50rem) {
		.wrapper {
			gap: 1rem;
			grid-template-columns: 2fr 3fr;
			grid-template-areas: 'sidebar main';
		}

		aside {
			position: sticky;
			top: 0;
			padding: 1rem 0;
			max-height: 100vh;
			overflow-y: auto;
		}
	}

	main {
		grid-area: 'main';
		margin-bottom: 4rem;
	}

	.motd {
		display: block;
		text-align: right;
		font-family: 'Fantasque Sans Mono', monospace;
		font-size: 0.8em;
		opacity: 0.5;
		text-wrap: balance;
		margin: 1rem 0;
	}

	.motd :any-link {
		color: inherit;
		text-decoration: none;
	}

	.motd :any-link:hover,
	.motd :any-link:focus {
		text-decoration: underline;
	}

	aside {
		grid-area: 'sidebar';
		box-sizing: border-box;
	}

	.buttons {
		margin-top: 1rem;
		display: flex;
		flex-wrap: wrap;
		gap: 0.5rem;
	}

	.button {
		display: inline-flex;
	}

	.button img {
		image-rendering: pixelated;
	}

	footer {
		margin-top: 3rem;
	}

	footer img {
		display: block;
		max-width: 100%;
		height: auto;
	}

	footer .medicine {
		max-width: 24rem;
		margin: 0 auto;
	}

	footer p {
		font-size: 0.8rem;
		text-align: right;
	}

	footer :any-link {
		color: inherit;
	}

	/* footer :any-link {
		font-size: 0.8em;
		float: right;
		color: inherit;
	} */

	dl {
		border: 2px double currentColor;
		padding: 0.5em;
	}

	dt {
		font-weight: bold;
	}

	dd {
		font-family: 'Fantasque Sans Mono', monospace;
		margin: 0.25em 0;
		margin-left: 2em;
	}
</style>
