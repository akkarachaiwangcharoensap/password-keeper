const $ = require('jquery');
const passwordGenerator = require('password-generator');

$(document).ready(function () {
	// initialize();

	$('#new').click(() => {
		newPasswordField();
		save();
	});

	load();
	save();
});

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
			$value.val(generateCustomPassword());
		});
	});

	$('#new').click(() => {
		newPasswordField();
	})
}

function load ()
{
	var passwords = JSON.parse(localStorage.getItem('passwords'));

	$.each(passwords, (index) => {
		var DOM = 
		'<div class="col-12 password">'
			+ '<input type="text" id="key" placeholder="Key name" value="'+ passwords[index].key +'">'
			+ '<input type="text" id="value" readonly="" placeholder="" value="'+ passwords[index].value +'">'
			+ '<button class="btn btn-primary" id="copy">Copy</button>'
			+ '<button class="btn btn-success" id="generate">Generate</button>'
			+ '<button class="btn btn-danger" id="remove">Remove</button>'
		+'</div>';
		
		var $passwords = $('.passwords').first();
		var $password = $(DOM);

		$passwords.append($password);

		var $key = $password.find('#key');
		var $value = $password.find('#value');
		var $copy = $password.find('#copy');
		var $remove = $password.find('#remove');
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
			$value.val(generateCustomPassword());
			save();
		});

		// On value changed
		$key.change(() => {
			save();
		})

		// On remove clicked
		$remove.click((e) => {
			e.preventDefault();
			$password.remove();
			save();
		});
	});
}

function save () 
{
	var passwords = [];
	$passwords = $('.password');

	$.each($passwords, (index, password) => {
		var $password = $(password);
		var $key = $password.find('#key');
		var $value = $password.find('#value');

		var obj = {
			key: $key.val(),
			value: $value.val()
		};

		passwords.push(obj);
	});

	localStorage.setItem('passwords', JSON.stringify(passwords));
}

function newPasswordField ()
{
	var DOM = '<div class="col-12 password" data-id="0">'
				+ '<input type="text" id="key" placeholder="Key name">'
				+ '<input type="text" id="value" readonly="" placeholder="">'
				+ '<button class="btn btn-primary" id="copy">Copy</button>'
				+ '<button class="btn btn-success" id="generate">Generate</button>'
				+ '<button class="btn btn-danger" id="remove">Remove</button>'
			+'</div>';

	var $passwords = $('.passwords').first();
	var $password = $(DOM);

	$passwords.append($password);

	var $key = $password.find('#key');
	var $value = $password.find('#value');
	var $copy = $password.find('#copy');
	var $remove = $password.find('#remove');
	var $generate = $password.find('#generate');

	// On copy button clicked
	$copy.click((e) => {
		e.preventDefault();

		$value.select();
		document.execCommand('copy');
	});

	// On value changed
	$key.change(() => {
		save();
	})

	// On generate button clicked
	$generate.click((e) => {
		e.preventDefault();
		$value.val(generateCustomPassword());
		save();
	});

	// On remove clicked
	$remove.click((e) => {
		e.preventDefault();
		$password.remove();
		save();
	});
}

var maxLength = 18;
var minLength = 12;
var uppercaseMinCount = 3;
var lowercaseMinCount = 3;
var numberMinCount = 2;
var specialMinCount = 1;
var UPPERCASE_RE = /([A-Z])/g;
var LOWERCASE_RE = /([a-z])/g;
var NUMBER_RE = /([\d])/g;
var SPECIAL_CHAR_RE = /([\?\-])/g;
var NON_REPEATING_CHAR_RE = /([\w\d\?\-])\1{2,}/g;
 
function isStrongEnough(password) {
  var uc = password.match(UPPERCASE_RE);
  var lc = password.match(LOWERCASE_RE);
  var n = password.match(NUMBER_RE);
  var sc = password.match(SPECIAL_CHAR_RE);
  var nr = password.match(NON_REPEATING_CHAR_RE);
  return password.length >= minLength &&
    !nr &&
    uc && uc.length >= uppercaseMinCount &&
    lc && lc.length >= lowercaseMinCount &&
    n && n.length >= numberMinCount &&
    sc && sc.length >= specialMinCount;
}
 
function generateCustomPassword() {
  var password = "";
  var randomLength = Math.floor(Math.random() * (maxLength - minLength)) + minLength;
  while (!isStrongEnough(password)) {
    password = passwordGenerator(randomLength, false, /[\w\d\?\-]/);
  }
  return password;
}