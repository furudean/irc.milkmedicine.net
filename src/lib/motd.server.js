import motd_file from '$lib/motd.txt?raw'

const motds = motd_file
	.split('\n')
	.map((line) => line.trim())
	.filter((line) => line.length > 0)

const ms_in_a_day = 1000 * 60 * 60 * 24

/**
 * @param {Date} [date]
 */
export function get_motd(date) {
	const now_ms = date ? date.getTime() : Date.now()
	const days_since_epoch = Math.floor(now_ms / ms_in_a_day)
	const index = days_since_epoch % motds.length
	return motds[index]
}
