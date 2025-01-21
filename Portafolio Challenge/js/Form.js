class Form {
    constructor(formTarget, errors = {}, submitButton = formTarget.querySelector('.form-buttons__submit')) {
        this.errors = errors;
        this.inputsToGo = Object.keys(errors).length;
        this.inputsCurrentlyValid = new Set();
        this.submitButton = submitButton;
        this.formTarget = formTarget

        for (let dataSetInput in errors) {
            this.formTarget.querySelector(`[data-input=${dataSetInput}]`).addEventListener("change", (event) => {
                let currentTarget = event.target;
                if (this.clearInput(currentTarget)) {
                    return;
                }
                let error = errors[dataSetInput];
                this.trimValue(currentTarget);
                if (this.validation(currentTarget.value, error.regExp)) {
                    this.displayCheckOnInput(currentTarget);
                    this.inputsCurrentlyValid.add(currentTarget);
                    return;
                }
                this.modifyInputBackgroundOnError(currentTarget);
                this.displayWarningError(currentTarget, error);
                this.inputsCurrentlyValid.delete(currentTarget);
            });
        }
        submitButton.addEventListener('click', e => {
            if (this.inputsToGo !== this.inputsCurrentlyValid.size) {
                const inputsWithError = this.formTarget.querySelectorAll('.error-popup__input-error');
                if (!inputsWithError.length) return;
                e.preventDefault();
                inputsWithError.forEach(inputWithError => {
                    this.displayWarningError(inputWithError, this.errors[inputWithError.dataset.input]);
                })
            } 
        });
    }
    validation(value, regExp) {
        return regExp.test(value);
    }

    clearInput(target) {
        if (target.value === "") {
            target.classList.remove('error-popup__input-check','error-popup__input-error')
            return true;
        }
        return false;
    }

    trimValue(target) {
        target.value = target.value.trim();
    }

    displayWarningError(target, err) {
        let divError = document.createElement("div");
        divError.classList.add("error-popup");
        divError.innerHTML = err.message;
        target.parentNode.append(divError)
        setTimeout(() => divError.remove(), 3000);
        return divError;
    }

    displayCheckOnInput(target) {
        target.classList.add('error-popup__input-check');
        target.classList.remove('error-popup__input-error');
    }

    modifyInputBackgroundOnError(target) {
        target.classList.add('error-popup__input-error');
        target.classList.remove('error-popup__input-check');
    }
}
