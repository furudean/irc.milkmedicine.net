import motd_file from '$lib/motd.txt?raw'

const motds = motd_file
	.split('\n')
	.map((line) => line.trim())
	.filter((line) => line.length > 0)

export function get_motd() {
	const index = Math.floor(Math.random() * motds.length)
	return motds[index]
}
