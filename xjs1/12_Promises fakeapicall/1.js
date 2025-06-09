  data = {
    users: ["john doe", "jane doe", "alice smith"],
    posts: ["post1", "post2", "post3"],
    comments: ["comment1", "comment2", "comment3"],
  };


function fakeAPicall(endpoint) {

  chances = Math.floor(Math.random() * 1.3) ? false : true;
  console.log(chances);
  delay = Math.random() * 1000 + 500;

  return new Promise((res, rej) => {
    setTimeout(() => {
      data[endpoint].forEach((elem) => {
        elem;
      });
      chances ? res() : rej();
    }, delay);
  });
}


fakeAPicall("users")
  .then(() => {
    data.users.forEach((user) => {
      console.log(user);
    });
    
    return fakeAPicall("posts");
  })
  .then(() => {
    data.posts.forEach((post) => {
      console.log(post);
    });
    return fakeAPicall("comments");
  })
  .then(() => {
    data.comments.forEach((comment) => {
      console.log(comment);
    });
    console.log("All data fetched successfully");
  })
  .catch(() => {
    console.log("error in fetching data");
  });
