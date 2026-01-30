import adapter from '@sveltejs/adapter-node'

/** @type {import('@sveltejs/kit').Config} */
const config = {
	compilerOptions: {
		runes: true
	},
	kit: {
		adapter: adapter(),
		prerender: {
			handleHttpError: ({ path, message }) => {
				if (path === '/gamja') return

				// otherwise fail the build
				throw new Error(message)
			},
			handleUnseenRoutes: 'ignore'
		}
	}
}

export default config
