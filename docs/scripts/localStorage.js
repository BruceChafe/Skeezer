document.addEventListener('DOMContentLoaded', function () {
    const newContactForm = document.getElementById('newContactForm');
    newContactForm.addEventListener('submit', function (event) {
        event.preventDefault();

        // Get user input
        const firstName = document.getElementById('firstName').value;
        const middleName = document.getElementById('middleName').value;
        const lastName = document.getElementById('lastName').value;
        const gender = document.getElementById('gender').value;
        const dob = document.getElementById('dob').value;
        // const language = document.getElementById('language').value;
        const phonePhoneNumber = document.getElementById('phonePhoneNumber').value;
        const mobilePhoneNumber = document.getElementById('mobilePhoneNumber').value;
        const businessPhoneNumber = document.getElementById('businessPhoneNumber').value;
        const email1 = document.getElementById('email1').value;
        const email2 = document.getElementById('email2').value;
        const streetAddress = document.getElementById('streetAddress').value;
        const postalCode = document.getElementById('email2').value;
        const city = document.getElementById('city').value;
        const province = document.getElementById('email2').value;
        const country = document.getElementById('email1').value;

        // Create a user object
        const user = {
            firstName,
            middleName,
            lastName,
            gender,
            dob,
            phonePhoneNumber,
            mobilePhoneNumber,
            businessPhoneNumber,
            email1,
            email2,
            streetAddress,
            postalCode,
            city,
            province,
            country,
        };

        // Store user data in localStorage
        localStorage.setItem('contactProfile', JSON.stringify(user));
    });

});

document.addEventListener('click', function (event) {
    if (event.target.id === 'acceptJob') {
        event.preventDefault();
        
        const jobContainer = event.target.closest('.newJob');
        const requestType = jobContainer.querySelector('#requestType').textContent;
        const distance = jobContainer.querySelector('#distance').textContent;
        const name = jobContainer.querySelector('#name').textContent;
        const phoneNumber = jobContainer.querySelector('#phoneNumber').href;

        console.log('User Data:', phoneNumber);
        console.log('First Name:', requestType);
        console.log('Last Name:', distance);
        console.log('Home Address:', name);

        const acceptedJobData = {
            requestType,
            distance,
            name,
            phoneNumber,
        };

        localStorage.setItem('acceptedJobData', JSON.stringify(acceptedJobData));
    }
})
