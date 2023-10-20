document.addEventListener('DOMContentLoaded', function () {
    const userProfileForm = document.getElementById('userProfileForm');
    userProfileForm.addEventListener('submit', function (event) {
        event.preventDefault();

        // Get user input
        const firstName = document.getElementById('firstName').value;
        const lastName = document.getElementById('lastName').value;
        const address = document.getElementById('address').value;
        const phoneNumber = document.getElementById('phoneNumber').value;
        const requestType = document.querySelector('input[name="action"]:checked').value;

        // Create a user object
        const user = {
            firstName,
            lastName,
            address,
            phoneNumber,
            requestType,
        };

        // Store user data in localStorage
        localStorage.setItem('userProfile', JSON.stringify(user));
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
