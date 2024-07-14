const passwordInput = document.getElementById('password');
const showPasswordCheckbox = document.getElementById('show-password');
const passwordStrengthElement = document.getElementById('password-strength');
const passwordStatsElement = document.getElementById('password-stats');
const passwordStatsList = document.getElementById('password-stats-list');
const timeToCrackElement = document.getElementById('time-to-crack');

let password = '';

passwordInput.addEventListener('input', () => {
  password = passwordInput.value;
  updatePasswordStrength();
});

showPasswordCheckbox.addEventListener('change', () => {
  if (showPasswordCheckbox.checked) {
    passwordInput.type = 'text';
  } else {
    passwordInput.type = 'password';
  }
});

function updatePasswordStrength() {
  const lowerCase = /[a-z]/.test(password);
  const upperCase = /[A-Z]/.test(password);
  const numbers = /\d/.test(password);
  const symbols = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password);

  let passwordStrength = 'No Password';
  let passwordStats = '';
  let timeToCrack = '0 seconds';

  if (password.length > 0) {
    passwordStrength = 'Weak';
    if (lowerCase) passwordStats += 'Lower case, ';
    if (upperCase) passwordStats += 'Upper case, ';
    if (numbers) passwordStats += 'Numbers, ';
    if (symbols) passwordStats += 'Symbols, ';
    passwordStats = passwordStats.trim().slice(0, -1); // remove trailing comma and space

    if (password.length > 8) {
      passwordStrength = 'Medium';
      if (password.length > 12) {
        passwordStrength = 'Strong';
      }
    }

    // estimate time to crack password (very rough estimate!)
    if (password.length < 6) {
      timeToCrack = 'less than 1 second';
    } else if (password.length < 8) {
      timeToCrack = 'less than 1 minute';
    } else if (password.length < 10) {
      timeToCrack = 'less than 1 hour';
    } else if (password.length < 12) {
      timeToCrack = 'less than 1 day';
    } else {
      timeToCrack = 'ore than 1 day';
    }
  }

  passwordStrengthElement.textContent = passwordStrength;
  passwordStatsElement.textContent = `0 characters containing: ${passwordStats}`;
  timeToCrackElement.textContent = `Time to crack your password: ${timeToCrack}`;
}