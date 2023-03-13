const newFormHandler = async (event) => {
  event.preventDefault();

  // gabbing html 
  const comment = document.querySelector('#blog-desc').value;
  const blog_id = document.querySelector('#blog_id').textContent;

   // create and post new 
   if (comment) {
    const response = await fetch(`/api/comments`, {
      method: 'POST',
      body: JSON.stringify({ comment, blog_id }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      console.log('yee')
      document.location.reload();
    } else {
      alert('Failed to create comment');
    }
  }
};

// event listener 
document
  .querySelector('.new-blog-form')
  .addEventListener('submit', newFormHandler);
