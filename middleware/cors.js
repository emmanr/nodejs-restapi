module.exports = (req, res, next) => {
  // middleware to disable CORS in browser, this is most commonly use for sharing API(data) to different server or host
  // res.setHeader('Access-Control-Allow-Origin', 'www.facebook.com'); we can lock on where site we will share our data, but if we want to share it to all will use *(wildcard)
  // if has multiple domains, we can separate it with commans ('Access-Cont...', 'mydomain.com, domain2.com, sparkledomain.com')
  res.setHeader('Access-Control-Allow-Origin', '*'); // note that this is only data, not the method we can allow like post or get
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE'); // to allow methods or specific methods
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization'); // to allow our clients to set their own headers, but we can also specify what kind of headers
  // Authorization - for authorizing user in our client to what to access, and for the client to set content-type (note client means browser or any server);
  next();
};

// to setup fetching data with some header:
// button.addEventListener('click', async () => {
//   try {
//     const blogpost = fetch('http://localhost/feed/create-post', {
//       method: 'POST',
//       body: JSON.stringify({
//         title: "My post title",
//         content: "Lorem ipsum dolor"
//       }),
//       headers: {
//         'Content-Type': 'application-json'
//       }
//     });
//   } catch (e) return console.error("Has error!");
// })
// we can set our headers because we allow it in 'Access-Control-Allow-Headers', this is important because when we send data the default will be in "plain text"

// CORS errors occur when using an API that does not set CORS headers
