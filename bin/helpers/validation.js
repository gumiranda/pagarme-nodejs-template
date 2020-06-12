class ValidationContract {
  constructor() {
    this._errors = [];
  }

  isNotArrayOrEmpty(value, message) {
    if (!value && value.length == 0) {
      this._errors.push({ message });
    }
  }

  isTrue(value, message) {
    if (value) {
      this._errors.push({ message });
    }
  }

  isRequired(value, message) {
    if (!value || value.length <= 0) {
      this._errors.push({ message });
    }
  }

  isEmail(value, message) {
    const reg = new RegExp(/^\w+([-+,']\w+)*@\w+([-,]\w+)*\.\w+([-.]\w+)*$/);
    if (!reg.test(value)) {
      this._errors.push({ message });
    }
  }

  errors() {
    return this._errors;
  }

  isValid() {
    return this._errors.length == 0;
  }
}

module.exports = ValidationContract;
