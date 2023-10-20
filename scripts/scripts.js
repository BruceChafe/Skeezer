// Event Listeners
document.addEventListener('click', function (event) {
    if (event.target.id === 'newJobs') {
        event.preventDefault();
        newPickupDropoff();
    }

    // if (event.target.id === 'acceptJob') {
    //     event.preventDefault();
        
    //     const jobContainer = event.target.closest('.newJob');
    //     const requestType = jobContainer.querySelector('#requestType').textContent;
    //     const distance = jobContainer.querySelector('#distance').textContent;
    //     const name = jobContainer.querySelector('#name').textContent;
    //     // const phoneNumber = jobContainer.querySelector('#phoneNumber').href;

    //     console.log('User Data:');
    //     console.log('First Name:', requestType);
    //     console.log('Last Name:', distance);
    //     console.log('Home Address:', name);

    //     const acceptedJobData = {
    //         requestType,
    //         distance,
    //         name,
    //         // phoneNumber,
    //     };

    //     localStorage.setItem('acceptedJobData', JSON.stringify(acceptedJobData));
    // }
    

    if (event.target.id === 'rejectJob') {
        event.preventDefault();
        const jobContainer = event.target.closest('.newJob');
        rejectJob(jobContainer);
    }

    if (event.target.id === 'activeJobs') {
        event.preventDefault();
        activeJob();
    }
})

// New Job Functions
function newPickupDropoff() {
    const newJob = document.getElementById('newJob')
    newJob.innerHTML = ''; // Clear content of newJob

    // Retrieve user data from localStorage
    const userData = JSON.parse(localStorage.getItem('userProfile'));
    const firstName = userData ? userData.firstName : ''; // Default to an empty string if data is not available
    const lastName = userData ? userData.lastName : ''; // Default to an empty string if data is not available
    const phoneNumber = userData ? userData.phoneNumber : '';
    const requestType = userData ? userData.requestType : '';

    let html = `
        <div class="newJob">
            <div class="top">
                <div class="top-left" id="requestType">${requestType}</div>
                <div class="top-right" id="distance">$Distance</div>
            </div>
            <div class="name" id="name">${firstName} ${lastName}</div>
            <div class="phone-content">
                <a href="tel:${phoneNumber}" id="phoneNumber">Call</a>
            </div>
            <div class="show-more">↓ Show More</div>
            <div class="button-container">
                <div class="button" id="acceptJob">Accept</div>
                <div class="button" id="rejectJob">Reject</div>
            </div>
        </div>

        <div class="newJob">
            <div class="top">
                <div class="top-left" id="requestType">${requestType}</div>
                <div class="top-right" id="distance">$Distance</div>
            </div>
            <div class="name" id="name">Bruce Chafe</div>
            <div class="phone-content">
                <a href="tel:${phoneNumber}" id="phoneNumber">Call</a>
            </div>
            <div class="show-more">↓ Show More</div>
            <div class="button-container">
                <div class="button" id="acceptJob">Accept</div>
                <div class="button" id="rejectJob">Reject</div>
            </div>
        </div>

        <div class="newJob">
            <div class="top">
                <div class="top-left" id="requestType">${requestType}</div>
                <div class="top-right" id="distance">$Distance</div>
            </div>
            <div class="name" id="name">River</div>
            <div class="phone-content">
                <a href="tel:${phoneNumber}" id="phoneNumber">Call</a>
            </div>
            <div class="show-more">↓ Show More</div>
            <div class="button-container">
            <div class="button" id="acceptJob">Accept</div>
            <div class="button" id="rejectJob">Reject</div>
            </div>
        </div>
    `;

    newJob.innerHTML = html;
}

function renderJobEntry(requestType, distance, firstName, lastName, phoneNumber) {
    const jobEntry = document.createElement('div');
    jobEntry.className = 'newJob';

    jobEntry.innerHTML = `
        <div class="top">
            <div class="top-left">${requestType}</div>
            <div class="top-right">${distance}</div>
        </div>
        <div class="name">${firstName} ${lastName}</div>
        <div class="phone-content">
            <a href="tel:${phoneNumber}" id="phoneNumber">Call</a>
        </div>
        <div class="show-more">↓ Show More</div>
        <div class="button-container">
            <div class="button accept-button">Accept</div>
            <div class="button reject-button">Reject</div>
        </div>
    `;

    // Add click event listeners for accept and reject buttons
    // const acceptButton = jobEntry.querySelector('.accept-button');
    // acceptButton.addEventListener('click', function() {
    //     // Handle the accept action
    //     handleAcceptAction(requestType, distance, firstName, lastName, phoneNumber);
    // });

    // Similar logic for reject button

    return jobEntry;
}

function acceptJob(jobContainer) {
    jobContainer.remove(); // Remove the job entry from the DOM
}

function rejectJob(jobContainer) {
    jobContainer.remove(); // Remove the job entry from the DOM
}


// Active Job Functions
function activeJob() {
    const resultsContainer = document.getElementById('activeJob');
    resultsContainer.innerHTML = ''; // Clear content of activeJob

        // Retrieve user data from localStorage
        const userData = JSON.parse(localStorage.getItem('acceptedJobData'));
        const firstName = userData ? userData.name : ''; // Default to an empty string if data is not available
        const lastName = userData ? userData.lastName : ''; // Default to an empty string if data is not available
        const phoneNumber = userData ? userData.phoneNumber : '';
        const requestType = userData ? userData.requestType : '';
        const address = userData ? userData.address : '';
        const dealershipAddress = '120 Kenmount Road';

        let html = `
        <div class="activeJob">
            <div class="top">
                <div class="top-left">${requestType}</div>
                <div class="top-right">$Distance</div>
            </div>
            <div class="name" id="name">${firstName} ${lastName}</div>
            <div class="phone-content-activeJob">
                <a href="tel:${phoneNumber}" id="phoneNumber">Call</a>
            </div>
            <div class="startLocation">${dealershipAddress}</div>
            <div class="endLocation">${address}</div>
            <div id="jobStatus">Client Boarded</div>
        </div>
    `;

    resultsContainer.innerHTML = html;

    const jobStatusDiv = document.getElementById('jobStatus');
    let currentState = 'Client Boarded';

    jobStatusDiv.addEventListener('click', function () {
        // Define an array of possible states or actions
        const states = ['Client Boarded', 'Completed', 'Next Job', 'reset'];

        // Find the index of the current state
        const currentIndex = states.indexOf(currentState);

        // Calculate the next state
        const nextIndex = (currentIndex + 1) % states.length;
        const nextState = states[nextIndex];

        // Update the text content to the next state
        jobStatusDiv.textContent = nextState;

        // Update the currentState for the next click
        currentState = nextState;

        // Check if we've reached "Pending" state
        if (nextState === 'reset') {
            performEndAction();
        }
    });
}

function performEndAction() {
    // Your code to perform an action when the "Pending" state is reached
    const resultsContainer = document.getElementById('activeJob');
    resultsContainer.innerHTML = ''; // Clear content of activeJob
    window.location.href = 'newJobs.html';
}

// Hisotric Job Functions

// Profile Functions
