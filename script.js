$.ajax({
    type: "GET",
    url: "https://api.npoint.io/29d19752fa608eea5817",
    dataType: "JSON",
    success: function (response) {
        const schedule = response.schedule;
        const tableBody = $("#schedule-table tbody");

        // Loop through the schedule array and create table rows
        schedule.forEach(item => {
            const row = `
                <tr>
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