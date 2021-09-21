export const info = (...params) => {
	if (process.env.NODE_ENV !== 'TEST')
		console.log(...params)
}

const error = (...params) => {
	if (process.env.NODE_ENV !== 'TEST')
		console.error(...params)
}

export default {info, error}
