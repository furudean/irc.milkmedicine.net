<script>
	import Ascii from './Ascii.svelte'

	/** @type {import('./$types').PageProps} */
	let { data } = $props()
</script>

<svelte:head>
	<title>milkmedicine irc</title>
	<meta name="description" content="~ prescribed for any and all ailments ~" />
</svelte:head>

<div class="wrapper">
	<aside>
		<div class="aside-inner">
			<Ascii></Ascii>
		</div>
	</aside>

	<main>
		<section class="motd" aria-label="today's fortune">
			{data.motd}
		</section>
		<p>
			<span class="fake-h1">milkmedicine</span>
			is an IRC network, started by
			<a href="https://www.himawari.fun" rel="external">~meri</a> in 2025. it is an attempt to return
			to the roots of online communication. social networks can be fun, but they ask too much of you.
			IRC has no algorithms, nudging, or data collection. it's just chat, as it should've been.
		</p>
		<p>
			milkmedicine is still small, and relatively undefined. we like tech, music, art, programming &
			internet culture. come help figure out what this place is about, big sister.
		</p>

		<section>
			<a
				href="https://paralogue.org"
				rel="external"
				title="our sister site, paralogue.org"
				class="button"
				><img
					src="parabutton.png"
					alt="old-web style button for paralogue.org"
					height="31"
					width="88"
				/></a
			>
		</section>

		<h2>i want to join</h2>
		<p style="border: 1px solid currentColor; padding: 0.5em;">
			connect to address
			<a href="irc://irc.milkmedicine.net:6697" data-sveltekit-reload>irc.milkmedicine.net</a>
			on port 6697, using <abbr title="sometimes called secure connection, or SSL">TLS</abbr>
		</p>
		<p>after connecting, <code>/join #lounge</code> and say hi.</p>
		<p>
			consult your client's manual if unsure how to connect with TLS. if connect without it, your
			connection will be rejected.
		</p>
		<p>
			not sure what client to use? we have a list of <a href="#client-recommendation"
				>IRC client recommendations</a
			>
			below. you may also connect through our <a href="/gamja" data-sveltekit-reload>web client</a>.
		</p>

		<h2>good to know</h2>
		<blockquote>
			milkmedicine IRC runs on <a href="https://ergo.chat/about" rel="external">ergo</a>. you may
			want to read the
			<a href="https://github.com/ergochat/ergo/blob/stable/docs/USERGUIDE.md" rel="external"
				>ergo user guide</a
			> for more information on how to use the network.
		</blockquote>
		<p>
			you can register with <code>/msg NickServ register &lt;password&gt;</code> to protect your
			nickname. you can then use SASL authentication or
			<code>/msg NickServ identify &lt;password&gt;</code> to log in on future connections.
		</p>
		<p>
			chat history may be stored indefinitely in registered channels, though this can be disabled by
			channel operators. keep in mind that anything you say in a channel might be seen by anyone who
			joins, even if they join later.
		</p>

		<h2 id="client-recommendation">IRC client recommendation</h2>
		<p>
			as milkmedicine is an IRCv3 network, it works best with clients that support features such as
			SASL authentication, <code>chathistory</code> and more. you can review
			<a href="https://ircv3.net/software/clients">this client list</a>
			for some options. <a href="https://halloy.chat">halloy</a> is a good desktop one. i recommend doing
			your own research and experimenting with different clients to find one that suits you best.
		</p>
		<p>
			i personally run <a href="https://soju.im/" rel="external">soju</a> bouncer +
			<a href="https://git.sr.ht/~delthas/senpai/" rel="external">senpai</a> client, but it's pretty
			advanced to set up and use, so i wouldn't recommend it for beginners.
		</p>

		<details>
			<summary>
				<h2>the name</h2>
			</summary>
			<p>milkmedicine is always written as a single word, in lowercase.</p>
			<p>
				the name is a reference to chapter three of the nirvana sutra. in this chapter, the buddha
				tells the story of a foolish king who has a stubborn, elder doctor as his personal
				physician.
			</p>
			<p>
				the doctor refuses to treat the king with anything but milk. whether it was an illness of
				wind, of cold, of heat--in each case he nevertheless administered milk. the king could not
				discern if the physician himself understood what was beneficial or deleterious, good or bad,
				in his medicinal use of milk.
			</p>
			<p>
				there also was a brilliant physician in the kingdom who was proficient in all eight
				technical principles of healing, and this wise doctor manages to put himself in audience
				with the current physician. the elder is challenged, offering the brilliant one a challenge.
				"if you can agree to offer yourself in service to me for forty-eight years, only after that
				will i teach you the practice of medicine," the elder responds. the wise doctor immediately
				agrees.
			</p>
			<p>
				the elder physician brings the wise doctor to the king as a visiting physician. upon hearing
				this man speak of his ideas about medicine, the king realizes that the elder physician was
				an imbecile, and he orders him to immediately be banished from the country.
			</p>
			<p>
				the wise doctor, offered a large payment or high rank as a reward for his service, refuses.
				he says that he will not accept any payment, but that he will only ask that the milk remedy
				be prohibited in the kingdom. if you put a stop to this remedy, deaths will end and peace
				and happiness will befall the kingdom forever. the king agrees to this request.
			</p>
			<p>
				some time later, the king becomes ill once more and the wise doctor is summoned. this time,
				the doctor prescribes the milk remedy. the king, surprised and upset, asks how something
				previously banned as unsuitable medicine could now be recommended. the wise doctor replies
				in effect, "it all depends on the particular circumstances."
			</p>
			<p>
				those circumstances must be properly understood in order for the remedy to be effective. the
				wise doctor simply banned the milk remedy to teach the king a lesson about the nature of
				teaching itself.
			</p>
		</details>
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

	@media (width > 90ch) {
		.wrapper {
			gap: 3rem;
			grid-template-columns: 1fr 2fr;
			grid-template-areas: 'sidebar main';
		}

		main {
			padding-top: 1rem;
		}

		main > :first-child {
			margin-top: 0;
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
</style>
