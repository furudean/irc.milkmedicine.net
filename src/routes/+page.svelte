<script>
	import Ascii from './Ascii.svelte'

	/** @type {import('./$types').PageProps} */
	let { data } = $props()
</script>

<svelte:head>
	<title>milkmedicine IRC</title>
	<meta
		name="description"
		content="milkmedicine is an IRC network for anime, tech, music, art, programming & internet obscura"
	/>
	<meta name="theme-color" content="#007bff" />
</svelte:head>

<div class="wrapper">
	<aside>
		<div class="aside-inner">
			<Ascii status={data.status}></Ascii>
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
			music, art, programming & internet obscura. Come chat, big sister.
		</p>
		<p>
			Social networks can be fun, but they're always asking for more of you. We're a
			handful of users who decided to step sideways from all that. IRC has no algorithms
			whispering in your ear, no nudging toward engagement, no data harvesting. Just pure,
			unfiltered conversation— the way the internet used to dream of itself.
		</p>

		<h2>I want to join</h2>
		<p style="border: 1px solid currentColor; padding: 0.5em;">
			Connect to address
			<a href="ircs://irc.milkmedicine.net:6697" data-sveltekit-reload
				>irc.milkmedicine.net</a
			>
			on port 6697, using
			<abbr title="Sometimes called secure connection, or SSL">TLS</abbr>
		</p>
		<p>After connecting, <code>/join #lounge</code> and say hi.</p>
		<p>
			Consult your client's manual if unsure how to connect with TLS. If you connect
			without it, your connection will be rejected.
		</p>
		<p>
			Not sure what client to use? We have a list of <a href="#client-recommendation"
				>IRC client recommendations</a
			>
			below. You may also connect through our
			<a href="/gamja" data-sveltekit-reload>web client</a>.
		</p>
		<p>
			If you are completely new to IRC you may find <a
				href="https://www.irchelp.org/"
				rel="external">www.irchelp.com</a
			> a good resource on the basics.
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
			You can register with <code>/msg NickServ register &lt;password&gt;</code>
			to protect your nickname. You can then use SASL authentication or
			<code>/msg NickServ identify &lt;password&gt;</code> to log in on future connections.
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

		<details>
			<summary>
				<h2>The name</h2>
			</summary>
			<p>milkmedicine is always written as a single word, in lowercase.</p>
			<p>
				The name is a reference to Chapter Three of the Nirvana Sutra. In this chapter,
				the Buddha tells the story of a foolish king who has a stubborn, elder doctor as
				his personal physician.
			</p>
			<p>
				The doctor refuses to treat the king with anything but milk. Whether it was an
				illness of wind, of cold, of heat--in each case he nevertheless administered milk.
				The king could not discern if the physician himself understood what was beneficial
				or deleterious, good or bad, in his medicinal use of milk.
			</p>
			<p>
				There also was a brilliant physician in the kingdom who was proficient in all
				eight technical principles of healing, and this wise doctor manages to put himself
				in audience with the current physician. The elder is challenged, offering the
				brilliant one a challenge. "If you can agree to offer yourself in service to me
				for forty-eight years, only after that will I teach you the practice of medicine,"
				the elder responds. The wise doctor immediately agrees.
			</p>
			<p>
				The elder physician brings the wise doctor to the king as a visiting physician.
				Upon hearing this man speak of his ideas about medicine, the king realizes that
				the elder physician was an imbecile, and he orders him to immediately be banished
				from the country.
			</p>
			<p>
				The wise doctor, offered a large payment or high rank as a reward for his service,
				refuses. He says that he will not accept any payment, but that he will only ask
				that the milk remedy be prohibited in the kingdom. If you put a stop to this
				remedy, deaths will end and peace and happiness will befall the kingdom forever.
				The king agrees to this request.
			</p>
			<p>
				Some time later, the king becomes ill once more and the wise doctor is summoned.
				This time, the doctor prescribes the milk remedy. The king, surprised and upset,
				asks how something previously banned as unsuitable medicine could now be
				recommended. The wise doctor replies in effect, "It all depends on the particular
				circumstances."
			</p>
			<p>
				Those circumstances must be properly understood in order for the remedy to be
				effective. The wise doctor simply banned the milk remedy to teach the king a
				lesson about the nature of teaching itself.
			</p>
		</details>
		<hr />
		<p>
			<a
				href="https://paralogue.org"
				rel="external"
				title="Our sister site, paralogue.org"
				class="button"
				><img
					src="parabutton.png"
					alt="Old-web Style Button for paralogue.org"
					height="31"
					width="88"
				/></a
			>
			<a
				href="https://www.himawari.fun/"
				rel="external"
				title="~meri's Website"
				class="button"
				><img
					src="himawaributton.png"
					alt="Old-web Style Button for himawari.fun"
					height="31"
					width="88"
				/></a
			>
		</p>
	</main>
</div>

<style>
	.wrapper {
		display: grid;
		grid-template-areas:
			'main'
			'sidebar';
		max-width: 85ch;
		padding: 0 1em;
	}

	@media (width > 85ch) {
		.wrapper {
			gap: 3rem;
			grid-template-columns: 1fr 2fr;
			grid-template-areas: 'sidebar main';
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
	}

	.aside-inner {
		position: sticky;
		top: 0;
		padding-top: 1rem;
	}

	.button {
		display: inline-flex;
	}

	.button img {
		image-rendering: pixelated;
	}
</style>
