import { encoded, translations } from './data.js'

const NOT_DECODED = ['groupId', 'service', 'formatSize', 'ca']

const decode = (idBase) => {
	idBase.forEach((idObject) => {
		const ALL_KEYS = Object.keys(idObject)

		ALL_KEYS.forEach((key) => {
			if (!NOT_DECODED.includes(key)) {
				idObject[key] = translations[idObject[key]]
			}
		})
	})

	return idBase
}

decode(encoded)