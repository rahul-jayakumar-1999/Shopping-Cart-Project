async function addToCart(productId) {
  try {
    console.log("inside addtocart");
    const response = await fetch(`/add-to-cart/${productId}`, {
      method: "get",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();

    if (data.status) {
      document.getElementById("cart-count").innerText = data.cartCount;
    }
  } catch (err) {
    console.log("ERROR" + err);
  }
}
