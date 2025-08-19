import adapter from '@sveltejs/adapter-node'

/** @type {import('@sveltejs/kit').Config} */
const config = {
	kit: {
		adapter: adapter(),
		prerender: {
			// eslint-disable-next-line no-unused-vars
			handleHttpError: ({ path, referrer, message }) => {
				if (path === '/gamja') return

				// otherwise fail the build
				throw new Error(message)
			}
		}
	}
}

export default config
