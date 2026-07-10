document
  .getElementById("check-out-form")
  .addEventListener("submit", async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);

    try {
      const response = await fetch("/place-order", {
        method: "Post",
        body: formData,
      });

      const data = await response.json();
      if (data.success) {
        location.href = "/order-success"
      }
    } catch (error) {
      console.error(error);
    }
  });
