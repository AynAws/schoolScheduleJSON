// Initialize the user's schedule based on JSON data and user input
function getUserSchedule(schedule) {
  // Retrieve saved schedule from local storage, if available
  let savedData = localStorage.getItem('userSchedule');
  
  if (savedData) {
      // Parse saved data and update empty fields in the schedule
      savedData = JSON.parse(savedData);
      schedule.forEach((item, index) => {
          if (!item.name) item.name = savedData[index]?.name || "";
          if (!item.teacher) item.teacher = savedData[index]?.teacher || "";
          if (!item.room) item.room = savedData[index]?.room || "";
      });
  }

  // Prompt user input for empty fields and update schedule
  schedule.forEach((item) => {
      if (!item.name) item.name = prompt(`Enter subject name for period ${item.period}:`, item.name || "");
      if (!item.teacher) item.teacher = prompt(`Enter teacher for period ${item.period}:`, item.teacher || "");
      if (!item.room) item.room = prompt(`Enter room for period ${item.period}:`, item.room || "");
  });

  // Save the updated schedule to local storage
  localStorage.setItem('userSchedule', JSON.stringify(schedule));
}

function buildSchedule(letter) {
$.ajax({
    type: "GET",
    url: "https://api.npoint.io/29d19752fa608eea5817",
    dataType: "JSON",
    success: function (response) {
        const letterIndex = letter.charCodeAt(0) - 'A'.charCodeAt(0); // assigns each letter a number
        console.log(`Letter is ${letterIndex}.`); // A=0, B=1, C=2...
        const schedule = response.schedule;
        getUserSchedule(schedule); // fill empty data with user schedule
        const tableBody = $("#schedule-table tbody");
        let build = [];
        const getByPeriod = (period) => schedule.filter(item => item.period === period)[0];
        if (letter !== "G") {
          for (let i = 0; i < 3; i++) {
            let rotatedIndex = (i - letterIndex) % 4; // keeps numbers wrapping around 1-4
            console.log(`Pre-ternary rotatedIndex ${rotatedIndex}.`);
            rotatedIndex < 0 ? rotatedIndex += 4 : null; // makes numbers wrap around both ways
            console.log(`Post-ternary rotatedIndex ${rotatedIndex}.`);
            build.push(getByPeriod(rotatedIndex + 1));
          }
        } else {
          build = [getByPeriod(3), getByPeriod(4), getByPeriod(7)];
        }
        build.push(getByPeriod(0)); // Always add schedule[0] (lunch) in the middle
        if (letter !== "G") {
          for (let ii = 0; ii < 2; ii++) {
            let latterRotatedIndex = (ii - letterIndex) % 3; // Rotates through [0, 1, 2]
            let periodIndex = latterRotatedIndex + 5; // Map indices to periods [5, 6, 7]
            periodIndex < 5 ? periodIndex += 3 : null; // makes numbers wrap around both ways
            build.push(getByPeriod(periodIndex));
          }        
        } else {
          build.push(getByPeriod(5));
          build.push(getByPeriod(6));
        }
        console.log(build); // checking array to see if all is well
        tableBody.find(".remove").remove();
        // Loop through the schedule array and create table rows
        build.forEach(item => {
          let time;
          switch (item) {
            case 0:
              time = "12:00 - 12:35";
              break;
            case 1:
              time = "8:24 - 9:31";
              break;
            case 2:
              time = "9:36 - 10:43";
              break;
            case 3:
              time = "10:48 - 11:55";
              break;
            case 4:
              time = "12:41 - 1:48";
              break;
            case 5:
              time = "1:53 - 3:00";
              break;
          }
            let row = `
                <tr class="remove">
                    <td>${item.period || "N/A"}</td>
                    <td>${item.name || "N/A"}</td>
                    <td>${item.teacher || "N/A"}</td>
                    <td>${item.room || "N/A"}</td>
                    <td>${time || "N/A"}</td>
                </tr>
            `;
            tableBody.append(row);
        });
    },
    error: function (jqXHR, textStatus, errorThrown) {
        console.error("Error loading data:", textStatus, errorThrown); // Log error details
        alert("Failed to load schedule data. Check the console for more details.");
    }
});
}

// jQuery dropdown (W3schools)
function dropdownAppear() {
    document.getElementById("myDropdown").classList.toggle("show");
  }
  
  // Close the dropdown menu if the user clicks outside of it
  window.onclick = function(event) {
    if (!event.target.matches('.dropbtn')) {
      var dropdowns = document.getElementsByClassName("dropdown-content");
      var i;
      for (i = 0; i < dropdowns.length; i++) {
        var openDropdown = dropdowns[i];
        if (openDropdown.classList.contains('show')) {
          openDropdown.classList.remove('show');
        }
      }
    }
  }