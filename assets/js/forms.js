/**
 * NATUVA GOURMET — FORM VALIDATION & ENQUIRY ENGINE
 * Handles accessible client-side validation, inline error messaging,
 * auto-focus on first invalid input, and simulated asynchronous submission states.
 */

(function () {
  'use strict';

  document.addEventListener('DOMContentLoaded', function () {
    initFormValidation();
  });

  function initFormValidation() {
    // Select all forms requiring validation
    const forms = document.querySelectorAll('.needs-validation');

    forms.forEach(form => {
      form.querySelectorAll('input[type="date"][data-validate="not-past-date"]').forEach(input => {
        input.min = getLocalDateValue();
      });

      form.addEventListener('submit', function (event) {
        event.preventDefault();
        event.stopPropagation();

        const isValid = validateCustomForm(form);

        if (!isValid) {
          form.classList.add('was-validated');
          // Focus first invalid element
          const firstInvalid = form.querySelector('.is-invalid, :invalid');
          if (firstInvalid) {
            firstInvalid.focus();
          }
          return;
        }

        // Form is valid: simulate async submission
        simulateFormSubmission(form);
      });

      // Clear invalid state on input
      form.querySelectorAll('input, select, textarea').forEach(input => {
        input.addEventListener('input', function () {
          if (this.matches('[data-validate="person-name"]') && !isValidPersonName(this.value)) {
            this.classList.add('is-invalid');
            this.classList.remove('is-valid');
          } else if (this.matches('[data-validate="not-past-date"]') && isPastDate(this.value)) {
            this.classList.add('is-invalid');
            this.classList.remove('is-valid');
          } else if (this.checkValidity()) {
            this.classList.remove('is-invalid');
            this.classList.add('is-valid');
          }
        });
      });
    });
  }

  function validateCustomForm(form) {
    let isValid = true;

    form.querySelectorAll('[data-validate="person-name"]').forEach(input => {
      if (!isValidPersonName(input.value)) {
        input.classList.add('is-invalid');
        input.classList.remove('is-valid');
        isValid = false;
      }
    });

    form.querySelectorAll('[data-validate="not-past-date"]').forEach(input => {
      input.min = getLocalDateValue();
      if (isPastDate(input.value)) {
        input.classList.add('is-invalid');
        input.classList.remove('is-valid');
        isValid = false;
      }
    });

    // 1. Check native HTML5 validity
    if (!form.checkValidity()) {
      isValid = false;
    }

    // 2. Validate email fields specifically
    const emailInputs = form.querySelectorAll('input[type="email"]');
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    emailInputs.forEach(input => {
      const val = input.value.trim();
      if (!val || !emailRegex.test(val)) {
        input.classList.add('is-invalid');
        input.classList.remove('is-valid');
        isValid = false;
      } else {
        input.classList.remove('is-invalid');
        input.classList.add('is-valid');
      }
    });

    // 3. Validate phone fields if present
    const phoneInputs = form.querySelectorAll('input[type="tel"], input[name="phone"]');
    const phoneRegex = /^[+]?[(]?[0-9]{1,4}[)]?[-\s./0-9]{6,15}$/;
    phoneInputs.forEach(input => {
      const val = input.value.trim();
      if (input.required && (!val || !phoneRegex.test(val))) {
        input.classList.add('is-invalid');
        input.classList.remove('is-valid');
        isValid = false;
      } else if (val && !phoneRegex.test(val)) {
        input.classList.add('is-invalid');
        input.classList.remove('is-valid');
        isValid = false;
      } else if (val) {
        input.classList.remove('is-invalid');
        input.classList.add('is-valid');
      }
    });

    // 4. Validate quantity fields
    const qtyInputs = form.querySelectorAll('input[type="number"]');
    qtyInputs.forEach(input => {
      const val = parseFloat(input.value);
      const min = parseFloat(input.getAttribute('min')) || 1;
      if (input.required && (isNaN(val) || val < min)) {
        input.classList.add('is-invalid');
        isValid = false;
      }
    });

    return isValid;
  }

  function isValidPersonName(value) {
    const name = value.trim();
    return name.length >= 2 && /^[\p{L}][\p{L}\p{M}\s.'’\-]*$/u.test(name);
  }

  function getLocalDateValue() {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  function isPastDate(value) {
    return Boolean(value) && value < getLocalDateValue();
  }

  function simulateFormSubmission(form) {
    const submitBtn = form.querySelector('button[type="submit"]');
    const originalBtnText = submitBtn ? submitBtn.innerHTML : 'Submit';

    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.innerHTML = `
        <span class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
        Processing Enquiry...
      `;
    }

    // Simulate 1.2s network transit
    setTimeout(() => {
      if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalBtnText;
      }

      // Check form identity
      const isNewsletter = form.id === 'newsletter-form' || form.classList.contains('footer-newsletter-form');
      const isBulk = form.id === 'bulk-order-form';
      const isContact = form.id === 'contact-form';

      // Show accessible feedback modal or replacement alert
      if (isNewsletter) {
        form.innerHTML = `
          <div class="alert alert-success border-0 rounded-3 py-2 px-3 small d-flex align-items-center gap-2 mb-0">
            <i class="bi bi-patch-check-fill text-success fs-5"></i>
            <div>
              <strong>Subscribed!</strong> Welcome to Natuva Gourmet Journal.
            </div>
          </div>
        `;
      } else {
        const formParent = form.parentElement;
        const refNumber = 'NAT-' + Math.floor(100000 + Math.random() * 900000);
        
        form.style.display = 'none';

        const successAlert = document.createElement('div');
        successAlert.className = 'alert alert-success border-0 p-4 rounded-4 shadow-sm';
        successAlert.innerHTML = `
          <div class="d-flex align-items-start gap-3">
            <div class="text-success" style="font-size: 2.2rem; line-height: 1;">
              <i class="bi bi-check-circle-fill"></i>
            </div>
            <div>
              <h5 class="font-serif fw-bold mb-1">Enquiry Successfully Dispatched</h5>
              <p class="small text-muted mb-2">
                Reference ID: <strong>${refNumber}</strong> (Simulated Submission)
              </p>
              <p class="small mb-3">
                Thank you for reaching out to Natuva Gourmet. Our wholesale & corporate concierge team will review your specifications and respond within 24 business hours.
              </p>
              <button type="button" class="btn btn-sm btn-outline-custom btn-new-enquiry">
                <i class="bi bi-arrow-repeat me-1"></i> Send Another Enquiry
              </button>
            </div>
          </div>
        `;

        formParent.appendChild(successAlert);

        successAlert.querySelector('.btn-new-enquiry').addEventListener('click', function () {
          successAlert.remove();
          form.reset();
          form.classList.remove('was-validated');
          form.querySelectorAll('.is-valid, .is-invalid').forEach(el => {
            el.classList.remove('is-valid', 'is-invalid');
          });
          form.style.display = '';
        });
      }
    }, 1200);
  }
})();
