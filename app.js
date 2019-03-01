// Listen for submit button
const loanForm = document.querySelector('#loan-form');
loanForm.addEventListener('submit', function(e){
	document.getElementById('results').classList.add('d-none');

	// show the loader image for 2 seconds, then calculate
	document.getElementById('loading').classList.add('d-block');

	setTimeout(calculateResults, 2000);

	e.preventDefault();
});

// UI Variables
const amountEl = document.getElementById('amount');
const interestEl = document.getElementById('interest');
const yearsEl = document.getElementById('years');
const monthlyPaymentEl = document.getElementById('monthly-payment');
const totalPaymentEl = document.getElementById('total-payment');
const totalInterestEl = document.getElementById('total-interest');

function calculateResults() {
	const principal = parseFloat(amountEl.value);
	const calculatedInterest = (parseFloat(interestEl.value) / 100) / 12;
	const calculatedPayments = parseFloat(yearsEl.value) * 12;

	// Compute monthly payment
	const x = Math.pow(1 + calculatedInterest, calculatedPayments);
	const monthly = (principal * x * calculatedInterest) / (x - 1);

	// Check that the monthly value is finite - if so, display value in the proper fields
	if(isFinite(monthly)) {
		document.getElementById('loading').classList.remove('d-block');
		document.getElementById('results').classList.remove('d-none');
		monthlyPaymentEl.value = monthly.toFixed(2); //set decimal points to 2
		totalPaymentEl.value = (monthly * calculatedPayments).toFixed(2);
		totalInterestEl.value = ((monthly * calculatedPayments) - principal).toFixed(2);
	} else {
		//create element, add to the DOM
		showError('Please check your input numbers');
	}
}

// Display error on DOM
function showError(error) {
	//hide the loader image
	document.getElementById('loading').classList.remove('d-block');

	// create the div
	const errorDiv = document.createElement('div');

	//grab the elements for inserting
	const card = document.querySelector('.card');
	const heading = document.querySelector('.heading');

	// add boostrap classes
	errorDiv.className = 'alert alert-danger';

	// create a text node from the passed in arg and append it to the div
	errorDiv.appendChild(document.createTextNode(error));

	// insert error above heading
	card.insertBefore(errorDiv, heading);

	// Clear the error from the DOM after 1 seconds
	setTimeout(clearError, 1000);
}

function clearError() {
	document.querySelector('.alert').remove();
}
