document.addEventListener("DOMContentLoaded", function () {
    const inventoryTable = document.querySelector("#inventoryTable tbody");
    const searchInput = document.querySelector("#searchItem");
    const modal = document.querySelector("#modal");
    const closeModal = document.querySelector(".close");
    const addItemBtn = document.querySelector("#addItemBtn");
    const saveItemBtn = document.querySelector("#saveItem");

    let inventoryData = [];

    function loadInventory() {
        fetch("data/inventory.json")
            .then(response => response.json())
            .then(data => {
                inventoryData = data;
                updateTable();
                updateChart();
            })
            .catch(error => console.error("Erro ao carregar os dados:", error));
    }

    function updateTable() {
        inventoryTable.innerHTML = "";
        inventoryData.forEach(({ item, descricao, quantidade }, index) => {
            const row = document.createElement("tr");
            row.innerHTML = `
                <td>${item}</td>
                <td>${descricao}</td>
                <td>${quantidade}</td>
                <td><button class="delete" data-index="${index}">🗑️</button></td>
            `;
            inventoryTable.appendChild(row);
        });
    }

    function updateChart() {
        const ctx = document.getElementById("stockChart").getContext("2d");
        if (window.myChart) window.myChart.destroy();

        window.myChart = new Chart(ctx, {
            type: "bar",
            data: {
                labels: inventoryData.map(i => i.item),
                datasets: [{
                    label: "Quantidade",
                    data: inventoryData.map(i => i.quantidade),
                    backgroundColor: "#4CAF50"
                }]
            }
        });
    }

    searchInput.addEventListener("input", function () {
        const searchTerm = this.value.toLowerCase();
        const filteredData = inventoryData.filter(({ item }) =>
            item.toLowerCase().includes(searchTerm)
        );
        inventoryData = filteredData;
        updateTable();
        updateChart();
    });

    addItemBtn.addEventListener("click", () => modal.style.display = "block");
    closeModal.addEventListener("click", () => modal.style.display = "none");

    saveItemBtn.addEventListener("click", () => {
        const newItem = {
            item: document.querySelector("#itemName").value,
            descricao: document.querySelector("#itemDesc").value,
            quantidade: parseInt(document.querySelector("#itemQty").value)
        };
        inventoryData.push(newItem);
        updateTable();
        updateChart();
        modal.style.display = "none";
    });

    inventoryTable.addEventListener("click", function (e) {
        if (e.target.classList.contains("delete")) {
            const index = e.target.dataset.index;
            inventoryData.splice(index, 1);
            updateTable();
            updateChart();
        }
    });

    loadInventory();

    searchInput.addEventListener("input", function () {
        const searchTerm = this.value.toLowerCase();

        if (searchTerm === "") {
            // Se o campo de pesquisa estiver vazio, recarregamos os dados originais
            loadInventory();
        } else {
            // Filtra os dados para mostrar apenas os itens pesquisados
            const filteredData = inventoryData.filter(({ item }) =>
                item.toLowerCase().includes(searchTerm)
            );
            updateTable(filteredData);
            updateChart(filteredData);
        }
    });
});

