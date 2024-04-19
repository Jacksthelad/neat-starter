document.querySelector("form").addEventListener("submit", function(event) {
    event.preventDefault(); // Prevent the default form submit
  
    const form = event.target;
    const data = new FormData(form);
  
    fetch("/", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams(data).toString()
    })
    .then(() => alert("Form successfully submitted"))
    .catch((error) => alert("Error submitting form: " + error));
  });
  