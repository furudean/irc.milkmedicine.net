import adapter from '@sveltejs/adapter-static'

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
			},
			handleMissingId: ({ id, message }) => {
				if (id.startsWith(':~:')) return

				throw new Error(message)
			}
		}
	}
}

export default config
