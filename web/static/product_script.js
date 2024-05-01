function getProducts() {
  fetch("/api/products")
    .then((response) => response.json())
    .then((data) => {
      // Handle data
      // Get table body
      var productListBody = document.querySelector("#product-list tbody");
      productListBody.innerHTML = ""; // Clear previous data

      // Loop through users and populate table rows
      data.forEach((product) => {
        var row = document.createElement("tr");

        // Name
        var nameCell = document.createElement("td");
        nameCell.textContent = product.name;
        row.appendChild(nameCell);

        // Description
        var descriptionCell = document.createElement("td");
        descriptionCell.textContent = product.description;
        row.appendChild(descriptionCell);

        // Price
        var priceCell = document.createElement("td");
        priceCell.textContent = product.price;
        row.appendChild(priceCell);

        // Available
        var availableCell = document.createElement("td");
        var statusIndicator = document.createElement("div");

        statusIndicator.className = product.available
          ? "h-4 w-4 bg-green-500 rounded-full"
          : "h-4 w-4 bg-red-500 rounded-full";
        statusIndicator.title = product.available ? "Yes" : "No";

        availableCell.className = "flex text-center items-center align-middle";

        availableCell.appendChild(statusIndicator);
        row.appendChild(availableCell);

        // Actions
        var actionsCell = document.createElement("td");

        // Edit link
        var editLink = document.createElement("a");
        editLink.href = `/edit_product/${product.id}`;
        //editLink.href = `edit.html?id=${user.id}`;
        editLink.textContent = "Edit";
        editLink.className =
          "bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded focus:outline-none focus:shadow-outline";
        actionsCell.appendChild(editLink);

        // Delete link
        var deleteLink = document.createElement("button");
        deleteLink.textContent = "Delete";
        deleteLink.className =
          "bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded focus:outline-none focus:shadow-outline";
        deleteLink.addEventListener("click", function () {
          deleteProduct(product.id);
        });
        actionsCell.appendChild(deleteLink);

        row.appendChild(actionsCell);

        productListBody.appendChild(row);
      });
    })
    .catch((error) => console.error("Error:", error));
}

function createProduct() {
  var data = {
    name: document.getElementById("product-name").value,
    description: document.getElementById("product-description").value,
    price: document.getElementById("product-price").value,
    available: document.getElementById("product-availability").checked,
  };

  fetch("/api/products", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((data) => {
      // Handle success
      console.log(data);
    })
    .catch((error) => {
      // Handle error
      console.error("Error:", error);
    });
}

function updateProduct() {
  var productId = document.getElementById("product-id").value;
  var data = {
    name: document.getElementById("product-name").value,
    description: document.getElementById("product-description").value,
    price: document.getElementById("product-price").value,
    available: document.getElementById("product-availability").checked,
  };

  fetch(`/api/products/${productId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((data) => {
      // Handle success
      console.log(data);
      // Optionally, redirect to another page or show a success message
    })
    .catch((error) => {
      // Handle error
      console.error("Error:", error);
    });
}

function deleteProduct(productId) {
  console.log("Deleting products with ID:", productId);
  if (confirm("Are you sure you want to delete this product?")) {
    fetch(`/api/products/${productId}`, {
      method: "DELETE",
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        // Handle success
        console.log("Product deleted successfully:", data);
        // Reload the user list
        getProducts();
      })
      .catch((error) => {
        // Handle error
        console.error("Error:", error);
      });
  }
}
