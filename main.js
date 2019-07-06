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