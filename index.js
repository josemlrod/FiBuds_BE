const { getApp } = require("./app");

getApp().listen(process.env.PORT || 11235, _ => {
  console.log("Server is running on port #11235");
});
