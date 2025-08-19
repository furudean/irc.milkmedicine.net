import { get_motd } from '$lib/motd.server'

/** @type {import('./$types').PageServerLoad} */
export const load = () => {
	return {
		motd: get_motd()
	}
}
