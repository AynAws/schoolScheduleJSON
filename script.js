function buildSchedule(letter) {
$.ajax({
    type: "GET",
    url: "https://api.npoint.io/29d19752fa608eea5817",
    dataType: "JSON",
    success: function (response) {
        const letterIndex = letter.charCodeAt(0) - 'A'.charCodeAt(0); // assigns each letter a number
        const schedule = response.schedule;
        const tableBody = $("#schedule-table tbody");
        let build = [];
        if (letter !== "G") {
          for (let i = 0; i < 3; i++) {
            let rotatedIndex = (i + letterIndex) % 4; // keeps numbers wrapping around 1-4
            build.push(schedule[rotatedIndex + 1]);
          }
        } else {
          build = [schedule[3], schedule[4], schedule[7]]
        }
        build.push(schedule[0]); // Always add schedule[0] (lunch) in the middle
        if (letter !== "G") {
          for (let ii = 0; ii < 2; ii++) {
            let latterRotatedIndex = (ii + letterIndex) % 3; // Rotates through [0, 1, 2]
            let periodIndex = [5, 6, 7][latterRotatedIndex]; // Map indices to periods [5, 6, 7]
            build.push(schedule[periodIndex]);
          }        
        } else {
          build.push([schedule[5], schedule[6]])
        }
        tableBody.find(".remove").remove();
        // Loop through the schedule array and create table rows
        build.forEach(item => {
            let row = `
                <tr class="remove">
                    <td>${item.period}</td>
                    <td>${item.name || "N/A"}</td>
                    <td>${item.teacher || "N/A"}</td>
                    <td>${item.room || "N/A"}</td>
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