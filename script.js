$(document).ready(function () {
    const localStorageKey = 'userData';

    // 1. Fetch data from a JSON endpoint or file
    $.getJSON('https://www.npoint.io/docs/29d19752fa608eea5817', function (data) {
        console.log('Fetched JSON data:', data);
        const storedData = getStoredData();

        // If data exists in localStorage, merge it with the fetched JSON
        const combinedData = storedData ? { ...data, ...storedData } : data;
        displayData(combinedData);
    });

    // 2. Display data on the page
    function displayData(data) {
        $('#data-container').html(`
            <p>Name: ${data.name || 'N/A'}</p>
            <p>Age: ${data.age || 'N/A'}</p>
        `);
    }

    // 3. Save new data to localStorage
    $('#save').click(function () {
        const name = $('#name').val();
        const age = $('#age').val();

        if (name && age) {
            const newData = { name, age };
            localStorage.setItem(localStorageKey, JSON.stringify(newData));
            displayData(newData); // Update displayed data
        } else {
            alert('Please fill in both fields.');
        }
    });

    // 4. Retrieve stored data from localStorage
    function getStoredData() {
        const data = localStorage.getItem(localStorageKey);
        return data ? JSON.parse(data) : null;
    }
});