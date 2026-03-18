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
	if (!ERGO_API_AUTH_TOKEN) {
		console.warn('ERGO_API_AUTH_TOKEN not set, skipping ircd status fetch')
	}

	const headers = { Authorization: 'Bearer ' + ERGO_API_AUTH_TOKEN }

	const [status_response, list_response] = await Promise.allSettled([
		fetch('https://irc.milkmedicine.net/ergo/api/v1/status', { method: 'POST', headers }),
		fetch('https://irc.milkmedicine.net/ergo/api/v1/list', { method: 'POST', headers })
	])

	/** @type {null | ErgoStatus} */
	let status = null
	if (status_response.status === 'fulfilled') {
		if (status_response.value.ok) {
			status = await status_response.value.json()
		} else {
			console.error(
				'fetch ircd status failed:',
				status_response.value.status,
				await status_response.value.text()
			)
		}
	} else {
		console.error('failed to fetch ergo status:', status_response.reason)
	}

	/** @type {Array<ErgoChannel>} */
	let channels = []
	if (list_response.status === 'fulfilled') {
		if (list_response.value.ok) {
			const parsed = /** @type {ErgoChannelsResponse} */ (
				await list_response.value.json()
			)
			channels = parsed.channels
				.filter((c) => !c.secret)
				.toSorted((a, b) => b.userCount - a.userCount)
		} else {
			console.error(
				'fetch ircd list failed:',
				list_response.value.status,
				await list_response.value.text()
			)
		}
	} else {
		console.error('error fetching channels:', list_response.reason)
	}

	return {
		motd: get_motd(),
		status,
		channels
	}
}
