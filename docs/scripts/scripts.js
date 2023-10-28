// Event Listeners
document.addEventListener('click', function (event) {
    if (event.target.id === 'newJobs') {
        event.preventDefault();
        newPickupDropoff();
    }

    if (event.target.id === 'acceptJob') {
        event.preventDefault();
        
        const jobContainer = event.target.closest('.newJob');
        const requestType = jobContainer.querySelector('#requestType').textContent;
        const distance = jobContainer.querySelector('#distance').textContent;
        const name = jobContainer.querySelector('#name').textContent;
        // const phoneNumber = jobContainer.querySelector('#phoneNumber').href;

        console.log('User Data:');
        console.log('First Name:', requestType);
        console.log('Last Name:', distance);
        console.log('Home Address:', name);

        const acceptedJobData = {
            requestType,
            distance,
            name,
            // phoneNumber,
        };

        localStorage.setItem('acceptedJobData', JSON.stringify(acceptedJobData));
    }
    
    if (event.target.id === 'rejectJob') {
        event.preventDefault();
        const jobContainer = event.target.closest('.newJob');
        rejectJob(jobContainer);
    }

    if (event.target.id === 'activeJobs') {
        event.preventDefault();
        activeJob();
    }

    if (event.target.id === 'sideBarContacts') {
        event.preventDefault();
        console.log('Clicked');
        renderContactEntry();
    }

    if (event.target.id === 'sideBarChat') {
        event.preventDefault();
        console.log('Clicked');
        renderCustomerChatSummary();
        sendSMS();
    }

    if (event.target.id === 'chat-entry') {
        event.preventDefault();
        console.log('chatEntryClicked');
        sendSMS();
    }
})

// New Job Functions
function newPickupDropoff() {
    const newJob = document.getElementById('newJob')
    newJob.innerHTML = ''; // Clear content of newJob

    // Retrieve user data from localStorage
    const userData = JSON.parse(localStorage.getItem('contactProfile'));
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
            <div class="startLocation"><a href="http://maps.google.com/?q=Capital+Hyundai+515+Kenmount+Rd+A1B+4G1+Newfoundland+and+Labrador+St.+John%E2%80%99s">${dealershipAddress}</a></div>
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

// Customer Functions
function renderContactEntry() {
    const contactEntryTable = document.getElementById('tbody');

    // Retrieve user data from localStorage
    const contactData = JSON.parse(localStorage.getItem('contactProfile'));
    const firstName = contactData ? contactData.firstName : '';
    const lastName = contactData ? contactData.lastName : '';
    const mobilePhoneNumber = contactData ? contactData.mobilePhoneNumber : '';
    const email1 = contactData ? contactData.email1 : '';
    const streetAddress = contactData ? contactData.streetAddress : '';

    const contactEntry = `
    <tr>
        <td>${firstName} ${lastName}</td>
        <td>${email1}</td>
        <td>${mobilePhoneNumber}</td>
        <td>${streetAddress}</td>
    </tr>
    `;

    // Append the new row to the table
    contactEntryTable.innerHTML += contactEntry;
}

// Chat Functions
function renderCustomerChatSummary() {
    const customerChatSummary = document.getElementById('customerChatTable');

    // Retrieve user data from localStorage
    const contactData = JSON.parse(localStorage.getItem('contactProfile'));
    const firstName = contactData ? contactData.firstName : '';
    const lastName = contactData ? contactData.lastName : '';
    const mobilePhoneNumber = contactData ? contactData.mobilePhoneNumber : '';
    const email1 = contactData ? contactData.email1 : '';
    const streetAddress = contactData ? contactData.streetAddress : '';

    const chatEntryData = `
    <div class="chat-entry" id="chat-entry" data-chat-id="1">
        <div class="chatEntry-head row">
            <div class="col-md-6">
                <b>${firstName} ${lastName}</b>
            </div>
            <div class="col-md-6">
                <i>${firstName} ${lastName}</i>
            </div>
        </div>
        <div class="chatEntry-body">
        bob
        </div>
    </div>

    <div class="chat-entry" id="chat-entry" data-chat-id="2">
        <div class="chatEntry-head row">
            <div class="col-md-6">
                <b>Bruce Chafe</b>
            </div>
            <div class="col-md-6">
                <i>Bruce Chafe</i>
            </div>
        </div>
        <div class="chatEntry-body">
        bob
        </div>
    </div>
    `;

      // Append the new entry to the table
    customerChatSummary.innerHTML += chatEntryData;

    const chatEntries = document.querySelectorAll('.chat-entry');

    chatEntries.forEach(chatEntry => {
    chatEntry.addEventListener('click', function() {
        console.log('chatlcik');
        // Extract data from the clicked chat entry
        const chatId = this.getAttribute('data-chat-id');
        console.log('chatid', chatId);

        fetchChatData(chatId); // Replace with your data retrieval logic
    });
});
}

function fetchChatData(chatid) {
    const customerChatHead = document.getElementById('customerChat-head');
    const customerChatbody = document.getElementById('customerChat-body');
    customerChatHead.innerHTML = '';
    customerChatbody.innerHTML = '';

    const customerChatHeadData = `
    <div class="customerChat-head"><h5>customerChatHeader</h5></div>
    `;

    const customerChatBodyData = `
    <div class="customerChat-body"><h5>Breastr</h5></div>
    `;

    customerChatHead.innerHTML += customerChatHeadData;
    customerChatbody.innerHTML += customerChatBodyData;
}

function sendSMS() {
    console.log('hehe');
    const accountSid = 'AC8241409e4161387061d96975cbd2ac56';
    const authToken = 'f6223fe68f9a0cb04aa49809fd61ffe6';
  
    const client = require('twilio')(accountSid, authToken);
  
    client.messages.create({
      body: 'Your message here',
      from: '+12056714163',
      to: '+17097706182',
    })
    .then(message => console.log(message.sid))
    .catch(error => console.error(error));
  };
  
  // Call the function to send the SMS
  
  