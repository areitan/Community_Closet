//Adding a new Post

async function newFormHandler(event) {
  event.preventDefault();

  const title = document.querySelector('input[name="post-title"]').value;
  const description = document.querySelector('input[name="description"]').value;
  const location = document.querySelector('input[name="location"]').value;
  const size = document.querySelector('input[name="size"]').value;


  //retrieve user input and get ready to add to database
  const response = await fetch(`/api/posts`, {
    method: "POST",
    body: JSON.stringify({
      title,
      description,
      location,
      size
    }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  //redirect to the dashboard and show new post
  if (response.ok) {
    document.location.replace("/profile");
  } else {
    alert(response.statusText);
  }
}

//listener for button click on submit
document.querySelector("#postBtn").addEventListener("click", newFormHandler);
