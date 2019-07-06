const $ = require('jquery');

const PasswordComponent = require('./password-component');
const PasswordGenerator = require('./password-generator');
const CustomStorage = require('./custom-storage');

$(document).ready(function () {
	
	var $passwords = $('.passwords').first();

	let customStorage = new CustomStorage();
	let passwordComponent = new PasswordComponent();

	loadPasswords(customStorage);

	$('#new').click(() => {
		passwordComponent.create('', '', $passwords, customStorage);
	});
});

function loadPasswords (customStorage)
{
	let $passwords = $('.passwords').first();
	let passwords = customStorage.load();

	$.each(passwords, (index) => {

		let passwordComponent = new PasswordComponent();
		var key = passwords[index]['key'];
		var value = passwords[index]['value'];

		passwordComponent.create(key, value, $passwords, customStorage);
	});
}

/**
 * Initialize fields
 */
function initialize ()
{
	if (typeof(Storage) == 'undefined') {
		throw "Sorry, it seems your browser does not support local storage.";
	}

	$('.password').each((i, password) => {
		
		var $password = $(password);

		var $key = $password.find('#key');
		var $value = $password.find('#value');
		var $copy = $password.find('#copy');
		var $generate = $password.find('#generate');

		// On copy button clicked
		$copy.click((e) => {
			e.preventDefault();

			$value.select();
			document.execCommand('copy');
		});

		// On generate button clicked
		$generate.click((e) => {
			e.preventDefault();
			$value.val(PasswordGenerator.generateCustomPassword());
		});
	});

	$('#new').click(() => {
		newPasswordField();
	})
}