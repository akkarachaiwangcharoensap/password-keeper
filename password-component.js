const $ = require('jquery');

const CustomStorage = require('./custom-storage');
const PasswordGenerator = require('./password-generator');

const PasswordComponent = (function () {

	this.$el = '';
	this.$parent = '';

	this.storage = null;
	this.passwordGenerator = null;

	this.create = function (key, value, $parent, storage) {

		this.setStorage(storage);
		this.setElement(key, value);
		this.setParent($parent);

		this.passwordGenerator = new PasswordGenerator();
		
		this.$parent.append(this.$el);

		this.registerEvents();

		this.storage.save();
	}

	/**
	 * Register event listeners
	 * @return void
	 */
	this.registerEvents = function () {
		var $key = this.$el.find('#key');
		var $value = this.$el.find('#value');
		var $copy = this.$el.find('#copy');
		var $generate = this.$el.find('#generate');
		var $remove = this.$el.find('#remove');

		// On copy button clicked
		$copy.click((e) => {
			e.preventDefault();

			$value.select();
			document.execCommand('copy');
		});

		// On generate button clicked
		$generate.click((e) => {
			e.preventDefault();
			$value.val(this.passwordGenerator.generateCustomPassword());

			this.storage.save();
		});

		// On value changed
		$key.change(() => {
			this.storage.save();
		})

		// On value changed
		$value.change(() => {
			this.storage.save();
		})

		// On remove clicked
		$remove.click((e) => {
			e.preventDefault();

			this.$el.remove();
			this.storage.save();
		});
	}

	/**
	 * Set the element based on the given
	 * parameters
	 *
	 * @param string key
	 * @param string value
	 *
	 * @return void
	 */
	this.setElement = function (key, value) {
		
		if (key === null || value === null) {
			throw 'Bad parameters';
		}

		this.$el = '<div class="col-12 password">'
			+ '<input type="text" id="key" placeholder="Key name" value="'+ key +'">'
			+ '<input type="text" id="value" placeholder="" value="'+ value +'">'
			+ '<button class="btn btn-primary" id="copy">Copy</button>'
			+ '<button class="btn btn-success" id="generate">Generate</button>'
			+ '<button class="btn btn-danger" id="remove">Remove</button>'
		+'</div>';

		this.$el = $(this.$el);
	}

	/**
	 * Set element's parent
	 *
	 * @param $Jquery $parent
	 * @return void
	 */
	this.setParent = function ($parent) {
		if (!$parent) {
			throw 'Bad parameters';
		}

		this.$parent = $parent;
	}

	/**
	 * Set storage
	 *
	 * @param storage
	 * @return void
	 */
	this.setStorage = function (storage) {
		this.storage = storage;
	}
});

module.exports = PasswordComponent;
