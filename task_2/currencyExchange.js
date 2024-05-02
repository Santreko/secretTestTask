const API_KEY = 'd1dbab06b7e36a609cc20f94'

async function getSupportedCodes() {
	const response = await fetch(`https://v6.exchangerate-api.com/v6/${API_KEY}/codes`)
	console.log(response.text())
}

getSupportedCodes()

const test = () => console.log('test')

const button = document.querySelector('.test_button')

button.addEventListener(onclick, test())