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

/**
 * @typedef {Object} ErgoChannel
 * @property {string} name
 * @property {boolean} hasKey
 * @property {boolean} inviteOnly
 * @property {boolean} secret
 * @property {number} userCount
 * @property {string} topic
 * @property {string} [topicSetAt]
 * @property {string} createdAt
 * @property {boolean} registered
 * @property {string} [owner]
 * @property {string} [registeredAt]
 */

/**
 * @typedef {Object} ErgoChannelsResponse
 * @property {boolean} success
 * @property {ErgoChannel[]} channels
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
			if (response.ok) {
				status = await response.json()
			} else {
				console.error('fetch ircd status failed:', response.status, await response.text())
			}
		} catch (err) {
			console.error('failed to fetch ergo status:', err)
		}
	} else {
		console.warn('ERGO_API_AUTH_TOKEN not set, skipping ircd status fetch')
	}

	/**
	 * @type {Array<ErgoChannel>}
	 */
	let channels = []
	try {
		const response = await fetch('https://irc.milkmedicine.net/ergo/api/v1/list', {
			method: 'POST',
			headers: {
				Authorization: 'Bearer ' + ERGO_API_AUTH_TOKEN
			}
		})
		if (response.ok) {
			const parsed_response = /** @type {ErgoChannelsResponse} */ (await response.json())
			channels = parsed_response.channels
				.filter((c) => !c.secret)
				.toSorted((a, b) => b.userCount - a.userCount)
		} else {
			console.error('fetch ircd status failed:', response.status, await response.text())
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
