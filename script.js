



document.getElementById('instagramForm').addEventListener('submit', async function (e) {
  e.preventDefault();

  const instagramName = document.getElementById('instagramName').value;
  const responseElement = document.getElementById('response');

  if (!instagramName) {
    responseElement.innerText = "Please enter a valid Instagram username.";
    return;
  }

  responseElement.innerText = "Approving Instagram name...";

  try {
    // Replace with your SheetDB API endpoint
    const sheetdbApiUrl = "https://sheetdb.io/api/v1/dq7dca4w9unkw";

    // Send POST request to SheetDB
    const response = await fetch(sheetdbApiUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        data: [{ InstagramName: instagramName }],
      }),
    });

    if (response.ok) {
      responseElement.innerText = `Instagram name "${instagramName}" saved successfully!`;
    } else {
      const error = await response.json();
      responseElement.innerText = `Failed to save: ${error.message}`;
    }
  } catch (error) {
    console.error(error);
    responseElement.innerText = "An error occurred while saving the Instagram name.";
  }
});
