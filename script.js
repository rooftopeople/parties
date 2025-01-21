document.getElementById('instagramForm').addEventListener('submit', async function (e) {
  e.preventDefault();

  const instagramName = document.getElementById('instagramName').value;
  const responseElement = document.getElementById('response');
  const imageContainer = document.getElementById('imageContainer');

  if (!instagramName) {
    responseElement.innerText = "Please enter a valid Instagram username.";
    return;
  }

  responseElement.innerText = `Saving Instagram name: ${instagramName}...`;

  try {
    // Replace with your GitHub repository details
    const username = "rooftopeople";
    const repo = "parties";
    const path = "instagramNames.txt";
    const token = "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";

    const fileContent = await fetch(`https://api.github.com/repos/${username}/${repo}/contents/${path}`, {
      headers: { Authorization: `token ${token}` }
    }).then(res => res.json());

    const currentContent = atob(fileContent.content);
    const updatedContent = currentContent + `\n${instagramName}`;

    const result = await fetch(`https://api.github.com/repos/${username}/${repo}/contents/${path}`, {
      method: 'PUT',
      headers: {
        Authorization: `token ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        message: `Add Instagram name: ${instagramName}`,
        content: btoa(updatedContent),
        sha: fileContent.sha
      })
    });

    if (result.ok) {
      responseElement.innerText = "Instagram name saved successfully!";
      imageContainer.classList.remove('hidden');
    } else {
      throw new Error('Failed to save Instagram name.');
    }
  } catch (error) {
    console.error(error);
    responseElement.innerText = "An error occurred while saving the Instagram name.";
  }
});
