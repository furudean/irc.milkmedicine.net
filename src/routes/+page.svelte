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
			is an IRCv3 network, conjured into being by
			<a href="https://www.himawari.fun" rel="external">~meri</a> in 2025. We like anime, tech,
			music, art, programming & internet obscura.
		</p>
		<p>
			IRC has no algorithms, engagement nudging or no data harvesting. We are defining
			community how we like it. The internet used to dream of itself, and now we dream in
			its hollow husk. Come dream with us, big sister. World domination is at hand.
		</p>

		<h2>Connect</h2>
		<p>Use one of the supported connection methods to connect from your client:</p>
		<dl>
			<dt>
				IRC over <abbr title="Also called SSL or secure connection">TLS</abbr>
			</dt>
			<dd>ircs://irc.milkmedicine.net:6697</dd>
			<dt>
				IRC over secure WebSocket <sup
					><a
						href="https://ircv3.net/specs/extensions/websocket"
						title="Link to the draft specification"
						rel="external">(?)</a
					></sup
				>
			</dt>
			<dd>wss://irc.milkmedicine.net/webirc</dd>
		</dl>
		<p>
			No insecure connection is provided. Almost all modern clients support TLS today,
			consult your client's manual if you are unsure how to do this.
		</p>
		<p>
			<b
				>You may connect through
				<a href="/gamja" data-sveltekit-reload>the web client Gamja</a></b
			>, which we provide as a low-friction (and low-feature) alternative.
		</p>

		<p>
			If you are completely new to IRC you may find
			<a href="https://libera.chat/guides/basics" rel="external"
				>the Libera Chat IRC guide</a
			> a good introduction.
		</p>

		<h2>Good to know</h2>
		<ul>
			<li>
				The milkmedicine IRC runs on <a href="https://ergo.chat/about" rel="external"
					>Ergo</a
				>. You may want to read the
				<a
					href="https://github.com/ergochat/ergo/blob/stable/docs/USERGUIDE.md"
					rel="external">Ergo user guide</a
				> for more information about some features that are unique to Ergo, like always-on
				and chat history.
			</li>
			<li>
				You may register for an account using NickServ to protect your nickname, and then
				use SASL to authenticate on future connections. Message the NickServ user (<code
					>/query NickServ</code
				>) for more information on what options are available.
			</li>
			<li>
				Chat history may be stored indefinitely in registered channels by default. This
				can be disabled by channel operators. Keep in mind that anything you say in a
				channel might be seen by anyone who joins, even if they join later.
			</li>
		</ul>
		<h2 id="client-recommendation">IRC client recommendations</h2>
		<p>
			As milkmedicine is an IRCv3 network, it works best with clients that support
			features such as SASL authentication, chat history and more. You can review
			<a href="https://ircv3.net/software/clients">this client list</a>
			for some options.
			<b
				><a href="https://halloy.chat">Halloy</a> is a good desktop client I've found myself
				using that supports a great variety of setups.</b
			> I recommend doing your own research and experimenting with different clients to find
			one that suits you best.
		</p>
		<p>
			I personally run <a href="https://soju.im/" rel="external">soju</a> as a bouncer and
			<a href="https://git.sr.ht/~delthas/senpai/" rel="external">senpai</a> as client, or
			halloy if I feel like it, but it's an advanced thing to set up and use, so I wouldn't
			recommend it for beginners.
		</p>
		<footer>
			<div class="medicine">
				<img src="/medicine.webp" alt="Medicine is yummy!!!!" height="757" width="995" />
				<p>
					<a
						href="https://xcancel.com/NES_Ghost/status/1973016819087864027"
						rel="external noreferrer">(image source)</a
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
