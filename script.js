function buscarPlaca() {
    const input = document.getElementById("searchInput").value.toUpperCase();
    const table = document.getElementById("placasTable");
    const rows = table.getElementsByTagName("tr");

    for (let i = 1; i < rows.length; i++) {
        const cells = rows[i].getElementsByTagName("td");
        const placa = cells[0].textContent || cells[0].innerText;

        if (placa.toUpperCase().includes(input)) {
            rows[i].style.display = "";
        } else {
            rows[i].style.display = "none";
        }
    }
}
