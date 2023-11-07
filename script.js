/* N Y
Script page
Updated: 09/05/2023
 */
/* GLOBAL VARIABLES */

/* FORM VARIABLES */
// REGEXES - Define Ranges allowed for fields (Learned from: https://www.w3schools.com/jsref/jsref_obj_regexp.asp and https://www.w3schools.com/js/js_regexp.asp)
// Regexes to be used with .test function
const letterRange = /[A-Za-z]/       // Checks for letters, returns true if letters found
const specialRange = /[^0-9a-zA-Z ]/ // Checks for Special characters by returning true if anything that isn't Alphanumeric is found
const emailRange = /[0-9a-zA-Z.-_]/  // Checks for valid email address characters.
const atKey = /@/                    // Checks for @ key
const numberRange = /[0-9]/;         // Checks for numbers
const nonWhiteSpace = /\S/;          // Checks for non-whitespace characters




/* CAR ARRAY VARIABLES */
const cars = [ // Cars Array
    {id: 0, make: "Mazda", model: "400", color: "red", price: "$500", category: "Hatch", description: "It's okay"},
    {id: 1, make: "Subaru", model: "T500", color: "blue", price: "$700", category: "Sedan", description: "My ex-wifes car, very good price"},
    {id: 2, make: "Toyota", model: "A400", color: "white", price: "$900", category: "Ute", description: "Was crushed into a cube and still runs"},
    {id: 3, make: "Car", model: "700S", color: "Pink", price: "$900", category: "Unsure", description: "The serial number was filed off when we got it"},
    {id: 4, make: "Sentinel", model: "400S", color: "black", price: "$1200", category: "Fast", description: "It's fast"},
    {id: 5, make: "Terminator", model: "T1000", color: "Silver", price: "$500", category: "Robot", description: "This isn't actually a car"},
    {id: 6, make: "Delorean", model: "DMC-12", color: "silver", price: "$500", category: "Sports-Car", description: "You already know the reference"},
    {id: 7, make: "Holden", model: "Commodore", color: "blue", price: "$2500", category: "Sedan", description: "Best car ever made"},
    {id: 8, make: "Toyota", model: "Z400", color: "black", price: "$1500", category: "Beast", description: "Was in a gas fire, still runs good"},
    {id: 9, make: "Mazda", model: "TT400", color: "aqua", price: "$600", category: "Hatch", description: "It's okay"},
]

// Tables for full list and booked cars list
let carTable = document.getElementById("carTable");
let bookingTable = document.getElementById("bookingTable");

/* FORM VARIABLES */

// SUBMISSION MESSAGE
const submissionMessage = document.getElementById("validationMessage")

/* CAR HOME PAGE
* startHome: loads page-specific elements and listeners (Uses onload) */
function startHome()
{
    addCars();  // Add cars from cars array to home page.
}

/* addCars: Adds cars from array to home page */
function addCars()
{
    // For until i equals cars length
    for (let i = 0; i < cars.length; i++)
    {
        // Create rows, columns and buttons. Append to end of cars table
        let carRow = document.createElement("div")  // Create carRow div
        carRow.className = "row row-cols-8";                                // Assign carRow div class of cols-8
        addToColumns(cars[i], carRow);                                      // Add currently iterated car to columns
        addButton("Book", cars[i], carRow);                     // Add 'book' button and associate to current car
        carTable.appendChild(carRow);                                      // Append row to carTable
    }
}


/* BOOKING PAGE:
* startBooking: Loads page-specific elements and listeners (Uses onload) */
function startBooking()
{
    loadBookingEventListeners(); // Load event listeners
    addBookedCars();             // Add cars from sessionStorage to booking page
}

/* loadBookingEventListeners: Loads Booking event listeners */
function loadBookingEventListeners()
{
    document.getElementById("submitCars").addEventListener("click", submitBookedCars);
    document.getElementById("clearCars").addEventListener("click", clearPrompt);
}


/* addBookedCars: Adds cars in sessionStorage to booking page */
function addBookedCars()
{
    // If storage is not undefined
    if (typeof (Storage) !== 'undefined')
    {
        // For until i equals session storage length
        for (let i = 0; i < sessionStorage.length; i++)
        {
            // Create rows, columns and buttons. Append to end of booking table
            let carRow = document.createElement("div")  // Create carRow div
            carRow.className = "row row-cols-8";                                // Assign carRow div class of cols-8
            let item = sessionStorage.key(i);                            // Create Item and assign value of the current iterated key
            addToColumns(cars[item], carRow);                                   // Use current key value to find current car in Array and add to columns
            addButton("Remove", cars[item], carRow);                // Add remove button and associate to current Item
            bookingTable.appendChild(carRow);                                   // Append to booking table
        }
    }
}


/* addButton: Adds a different type of button listener depending on the argument passed to it */
function addButton(buttonOption, object, carRow)
{
    let button = document.createElement("div"); // Create div
    button.className = "col btn btn-primary";                           // Assign div class button primary
    button.innerHTML = buttonOption;                                    // Assign buttonOption to button's innerHTML
    carRow.appendChild(button);                                         // Append button to row

    // If button option is book
    if (buttonOption === "Book")
    {
        // Add object ID passed to sessionStorage
        button.addEventListener("click", function ()
        {
            // If type of Storage is not undefined
            if (typeof (Storage) !== 'undefined')
            {
                // Change carID to string and assign to key, assign carID to to value
                sessionStorage.setItem(object.id.toString(), object.id);
                console.log("Session Storage Length: " + sessionStorage.length);


            }
        })
    }
    // If option is remove
    else if (buttonOption === "Remove")
    {
        // Remove element from SessionStorage by ID
        button.addEventListener("click", function ()
        {
            console.log("Removed: " + sessionStorage.getItem(object.id));
            sessionStorage.removeItem(object.id);
            location.reload();
        })
    }
}


/* addToColumns: Add to columns, takes current object and adds its attributes to columns */
function addToColumns(object, row)
{
    const rowColumns = [];
    let i = 0;


    // For each attribute in cars (Learned from: https://www.w3schools.com/jsref/jsref_forin.asp)
    for (let attribute in object)
    {

        rowColumns[i] = document.createElement("div");  // Create div[i]
        rowColumns[i].className = "col";                        // Assign iterated divs class of "col"
        rowColumns[i].innerHTML = object[attribute];            // Assign div's innerHTML as objects currently iterated attribute
        row.appendChild(rowColumns[i]);                         // Append current column to 8 width row
        i++
    }
}

/* submitBookedCars: Submit Booked Cars
* Prompts user if there is no cars, otherwise, clears the list and gives confirmation message */
function submitBookedCars()
{
    // If sessionStorage is empty, alert user
    if (sessionStorage.length === 0)
    {
        alert("Your order cannot be processed as you have not reserved any cars");
    }
    else // Else, thank for order, clear booked cars and refresh page.
    {
        alert("Thank you for your order");
        clearBookedCars();
        window.location.reload();
    }
}


/* clearPrompt: Asks user if they are sure they want to clear their list (Learned from:
* https://www.w3schools.com/jsref/tryit.asp?filename=tryjsref_confirm3)
*/
function clearPrompt()
{
    let text = "Are you sure you want to clear your list?\n Press OK to confirm or cancel"

// If confirmation is provided, clear booked cars and redirect to home page, otherwise, reload page
    if (confirm(text))
    {
        clearBookedCars();
        alert("Your booking list is now empty");
        window.location.replace("index.html");
    }
    else
    {
        window.location.reload(); // Reload page
    }
}

/* clearBookedCars: empties sessionStorage */
function clearBookedCars()
{
    sessionStorage.clear(); // Clear sessionStorage
}

/* FORM */

// Random Numbers for Math Problem
let rand1 = 0;
let rand2 = 0;

/* startForm: Loads form page-specific elements and listeners (Uses onload) */
function startForm()
{
    // Randomize rand1 and 2
    rand1 = randomizeNumber();
    rand2 = randomizeNumber();
    document.getElementById("mathsProblem").placeholder = "Solve: " + rand1 + " + " + rand2 + " = ?" + (rand1 + rand2);

    loadFormEventListeners(); // Load form event listeners (At the bottom of this section)
}

/* Validate: Runs a series of functions dedicated toward validating user input */
function validate()
{
    //Declare Booleans


    // Starting Error Message
    submissionMessage.innerHTML = "The following errors were found:<br>";

    // Declare field variables
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const phone = document.getElementById("phone").value;
    const message = document.getElementById("message").value;
    const mathAnswer = parseInt(document.getElementById("mathsProblem").value);

    // Check that fields contain valid input, concatenate strings to error message
    let validName = checkName(name);
    let validPhone = checkPhone(phone);
    let validEmail = checkEmail(email);
    let validMessage = checkMessage(message);
    let validAnswer = checkMath(mathAnswer, getNum(rand1), getNum(rand2))

    // If any of the fields are invalid then set style of the submissionMessage paragraph to red, and font weight to bold.
    if (!validName || !validPhone || !validEmail || !validMessage)
    {
        submissionMessage.style.color = "red";
        submissionMessage.style.fontWeight = "bold";

    }
    // Else, check to see if the answer to the math problem is accurate, provide error if not
    else if (!validAnswer)
    {
        submissionMessage.style.color = "red";
        submissionMessage.style.fontWeight = "bold";
        submissionMessage.innerHTML = "The answer to the maths problem is incorrect!"

    }
    // Else, provide confirmation message advising user their form was successfully submitted
    else
    {

        submissionMessage.style.color = "green";
        submissionMessage.style.fontWeight = "bold";
        submissionMessage.innerHTML = "Dear " + name + ", Thank you for your inquiry. One of our team members will be in touch with you shortly";
    }

// Return false so error/validation message remains on screen.
    return false;

    /* Function: Checks that name content is valid, checks if empty, then checks for numbers and special characters, returns a boolean */
}

function checkMath(ans, n1, n2)
{
    return (ans === (n1 + n2));
}

/* checkName: Checks that name field has been filled out
Criteria: Can't be empty, contain numbers or special characters
 */
function checkName(name)
{
    try
    {
        if (isEmpty(name))
        {
            throw "Name field is empty<br>"
        }
        else if (containsNumbers(name) || containsSpecials(name))
        {
            throw "Name cannot contain numbers or special characters<br>";
        }
        else
        {
            return true;
        }

    } catch (error)
    {
        submissionMessage.innerHTML = submissionMessage.innerHTML + error
        return false;
    }

}

/* checkPhone: Checks that phone field has been filled out
Criteria: Can't be empty, contain letters, special characters or be longer or shorter than 10 digits */
function checkPhone(phone)
{
    try
    {
        if (isEmpty(phone))                                         // If empty
        {
            throw "Phone field is empty<br>";
        }
        else if (containsLetters(phone) || containsSpecials(phone)) // If contains letters or special characters
        {
            throw "Phone field can only contain numbers<br>";
        }
        else if (phone.length !== 10) // If longer or shorter than 11 digits
        {
            throw "Phone number must be 10 numbers in length numbers in length<br>";
        }
        else
        {
            return true;
        }
    } catch (error)
    {
        submissionMessage.innerHTML = submissionMessage.innerHTML + error;
        return false;
    }
}

/* checkEmail: Checks that email field has been filled out
Criteria: Can't be empty, must contain @ key, cannot end with @ key
(I did think of more criteria but I wanted to keep this short)
 */
function checkEmail(email)
{
    try
    {
        if (isEmpty(email))                         // If empty
        {
            throw "Email field is empty<br>";
        }
        else if (!emailRange.test(email))           // If does not contain valid email characters
        {
            throw "Email field contains invalid characters<br>";
        }
        else if (!atKey.test(email))                // If does not contain @ key
        {
            throw "Email address is missing '@' key<br>";
        }
        else if (email.charAt(email.length - 1) === "@")    // If ends with @ key
        {
            throw "There is nothing after the '@' key<br>"
        }
        else
        {
            return true;
        }
    } catch (error)
    {
        submissionMessage.innerHTML = submissionMessage.innerHTML + error;
        return false;
    }
}

/* checkMessage: Checks that message field has been filled properly
Criteria: Can't be empty, can't be longer than 500 characters */

function checkMessage(message)
{
    try
    {
        if (isEmpty(message))           // If empty
        {
            throw " Message field is empty<br>";
        }
        else if (message.length > 500) // If longer than 500 characters
        {
            throw " Message cannot be greater than 500 characters.<br>"
        }
        else
        {
            return true;
        }
    } catch (error)
    {
        submissionMessage.innerHTML = submissionMessage.innerHTML + error;
        return false;
    }
}


/* containsSpecials: Checks for special charactrs, returns boolean */
function containsSpecials(attribute)
{
    return specialRange.test(attribute);
}

/* containsNumbers: Checks for numbers, returns boolean */
function containsNumbers(attribute)
{
    return numberRange.test(attribute);
}

/* containsLetters: Checks for letters, returns boolean */
function containsLetters(attribute)
{
    return letterRange.test(attribute);
}


/* isEmpty: Checks if empty, returns boolean */
function isEmpty(attribute)
{
    if (attribute === "" || !isNotWhiteSpaceOnly(attribute))
    {
        return true;
    }
}

/* isNotWhiteSpaceOnly: Checks that field does not contain only white spaces */
function isNotWhiteSpaceOnly(attribute)
{
    return (nonWhiteSpace.test(attribute));
}

/* checkMath: checks the users answer to the random question
function checkMath(answer)
{

}


/* FORM EVENT LISTENERS */


/* Form Page: Loads page-specific elements and listeners (Uses onload) */


/* Loads form page specific event listeners */
function loadFormEventListeners()
{
    /* FOCUS EVENT HANDLERS
    * The fields will turn light blue when clicked */

    // FOCUS: Name
    document.getElementById("name").addEventListener("focus", function ()
    {
        focusHandler("name");
    });
    // FOCUS: Email
    document.getElementById("email").addEventListener("focus", function ()
    {
        focusHandler("email");
    });
    // FOCUS: Phone
    document.getElementById("phone").addEventListener("focus", function ()
    {
        focusHandler("phone");
    });
    // FOCUS: Message
    document.getElementById("message").addEventListener("focus", function ()
    {
        focusHandler("message");
    });

    /* UNBLUR EVENT LISTENERS */
    // FOCUS: Name
    document.getElementById("name").addEventListener("blur", function ()
    {
        blurHandler("name");
    });
    // FOCUS: Email
    document.getElementById("email").addEventListener("blur", function ()
    {
        blurHandler("email");
    });
    // FOCUS: Phone
    document.getElementById("phone").addEventListener("blur", function ()
    {
        blurHandler("phone");
    });
    // FOCUS: Message
    document.getElementById("message").addEventListener("blur", function ()
    {
        blurHandler("message");
    });


    // CLICK: Submit
    document.getElementById("submit").addEventListener("click", function ()
    {
        console.log("Submit button clicked");
    })

    // CLICK: Reset
    document.getElementById("reset").addEventListener("click", function ()
    {
        console.log("Reset button clicked");
    });

    /* FUNCTIONAL LISTENERS */
    // CLICK: Reset (Clears error message, input and provides alert
    document.getElementById("contactForm").addEventListener("reset", function ()
    {
        alert("Form has been cleared");
        document.getElementById("validationMessage").innerHTML = "";
        startForm();
    });


}

/* randomizeNumber: Used to randomize Numbers for math problem */
function randomizeNumber()
{
    return Math.floor((Math.random() * 10) + 1);
}

/* getNum: Getter for variable */
function getNum(num)
{
    return (num);
}

/* focusHandler: Takes string parameter and changes focused field to blue */
function focusHandler(string)
{
    console.log(string);
    document.getElementById(string).style.background = "#e4f2f7";
}

/* blurHandler: Takes string parameter and reverts focused field back to white once unclicked */
function blurHandler(string)
{
    console.log(string);
    document.getElementById(string).style.background = "#ffffff";
}










