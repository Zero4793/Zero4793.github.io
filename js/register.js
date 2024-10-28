// jQuery onLoad: this will run once the DOM has been loaded
$(function () {
	// Wait until DOM is loaded
	$("#geek_register").on("submit", validate);
});


// Add an error message to the #errors element
function addError(message) {
	var p = $("<p>").text(message);
	$("#errors").append(p);
}


// Clear all error messages from the #errors element
function clearErrors() {
	$("#errors").html("");
}


// Validate the form, returning true if valid, false otherwise
function validate(e) {
	e.preventDefault();
	clearErrors();
	var success = true;

	//fname
	if ($("#geek_register [name='fname']").val().length === 0) {
		success = false;
		addError("First name is required");
	} else if (!/^[a-zA-Z-' ]+$/.test($("#geek_register [name='fname']").val())) {
		success = false;
		addError("First name must only contain letters");
	}

	//lname
	if ($("#geek_register [name='lname']").val().length === 0) {
		success = false;
		addError("Last name is required");
	} else if (!/^[a-zA-Z-' ]+$/.test($("#geek_register [name='lname']").val())) {
		success = false;
		addError("Last name must only contain letters");
	}

	//age
	if ($("#geek_register [name='age']").val().length === 0) {
		success = false;
		addError("Age is required");
	} else if (!/^[0-9]+$/.test($("#geek_register [name='age']").val())) {
		success = false;
		addError("Age must only contain numbers");
	} else if (parseInt($("#geek_register [name='age']").val()) < 18) {
		success = false;
		addError("You must be 18 or older to register");
	} else if (parseInt($("#geek_register [name='age']").val()) > 130) {
		success = false;
		addError("You must be 130 or younger to register");
	}

	//email
	if ($("#geek_register [name='email']").val().length === 0) {
		success = false;
		addError("Email is required");
	}
	if (!/^[a-zA-Z0-9]+@(une|myune)[.]edu[.]au/.test($("#geek_register [name='email']").val())) {
		success = false;
		addError("Email must be a UNE email address");
	}

	//mobile
	if ($("#geek_register [name='mobile']").val().length === 0) {
		success = false;
		addError("Phone number is required");
	} else if (!/^04[0-9]{8}$/.test($("#geek_register [name='mobile']").val())) {
		success = false;
		addError("Invalid phone number");
	}

	if (success) {
		//Delay
		$("#success").html("<h1>Thank you for registering!</h1>");

		setTimeout(() => {
			//cant use jquery submit as it just recalls this function, need to use native directly
			document.getElementById("geek_register").submit();
		}, 5000); //5s
	}
}
