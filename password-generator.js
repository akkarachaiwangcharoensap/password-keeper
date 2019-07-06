const Generator = require('password-generator');

const PasswordGenerator = (function () {

	this.maxLength = 18,
	this.minLength = 12,
	this.uppercaseMinCount = 3,
	this.lowercaseMinCount = 3,
	this.numberMinCount = 2,
	this.specialMinCount = 1,
	this.UPPERCASE_RE = /([A-Z])/g,
	this.LOWERCASE_RE = /([a-z])/g,
	this.NUMBER_RE = /([\d])/g,
	this.SPECIAL_CHAR_RE = /([\?\-])/g,
	this.NON_REPEATING_CHAR_RE = /([\w\d\?\-])\1{2,}/g,
	 
	this.isStrongEnough = function (password) {
		var uc = password.match(this.UPPERCASE_RE);
		var lc = password.match(this.LOWERCASE_RE);
		var n = password.match(this.NUMBER_RE);
		var sc = password.match(this.SPECIAL_CHAR_RE);
		var nr = password.match(this.NON_REPEATING_CHAR_RE);
		return password.length >= this.minLength &&
		    !nr &&
		    uc && uc.length >= this.uppercaseMinCount &&
		    lc && lc.length >= this.lowercaseMinCount &&
		    n && n.length >= this.numberMinCount &&
		    sc && sc.length >= this.specialMinCount;
	},
	 
	this.generateCustomPassword = function () {

		var password = "";
		var randomLength = Math.floor(Math.random() * (this.maxLength - this.minLength)) + this.minLength;

		while (!this.isStrongEnough(password)) {
	  		password = Generator(randomLength, false, /[\w\d\?\-]/);
		}

		return password;
	}
});

module.exports = PasswordGenerator;





