const CustomStorage = (function () {

	/**
	 * Save to the localStorage
	 * @return void
	 */
	this.save = function () {
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

	/**
	 * Load from localStorage and assign value to the password component
	 * 
	 * @param PasswordComponent component
	 * @return void
	 */
	this.load = function () {
		return JSON.parse(localStorage.getItem('passwords'));
	}
});

module.exports = CustomStorage;