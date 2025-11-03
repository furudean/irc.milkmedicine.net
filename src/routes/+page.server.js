import { get_motd } from '$lib/motd.server'
import { ERGO_API_AUTH_TOKEN } from '$env/static/private'

/**
 * @typedef {Object} ErgoStatus
 * @property {number} channels
 * @property {string} commit
 * @property {string} go_version
 * @property {number} servers
 * @property {string} start_time
 * @property {boolean} success
 * @property {Object} users
 * @property {number} users.invisible
 * @property {number} users.max
 * @property {number} users.operators
 * @property {number} users.total
 * @property {number} users.unknown
 * @property {string} version
 */

/** @type {import('./$types').PageServerLoad} */
export const load = async ({ fetch }) => {
	/**
	 * @type {null | ErgoStatus}
	 */
	let status = null

	if (ERGO_API_AUTH_TOKEN) {
		try {
			const response = await fetch('https://irc.milkmedicine.net/ergo/api/v1/status', {
				method: 'POST',
				headers: {
					Authorization: 'Bearer ' + ERGO_API_AUTH_TOKEN
				}
			})
			if (!response.ok) {
				console.error('fetch ircd status failed:', response.status, await response.text())
			}
			status = await response.json()
		} catch (err) {
			console.error('failed to fetch ergo status:', err)
		}
	} else {
		console.warn('ERGO_API_AUTH_TOKEN not set, skipping ircd status fetch')
	}

	/**
	 * @type {Array<{name: string, topic: string, users: number, is_registered: boolean}>}
	 */
	let channels = []
	try {
		const response = await fetch('/channels.json')
		if (!response.ok) {
			console.error('Failed to fetch channels:', response.status, await response.text())
		} else {
			channels = await response.json()
		}
	} catch (err) {
		console.error('error fetching channels:', err)
	}

	return {
		motd: get_motd(),
		status,
		channels
	}
}
