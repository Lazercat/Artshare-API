/* ARTSHARE API ROUTING
**************************/
  function returnHomePage (req, res) {
   res.render('home');
  }








/* EXPORT FUNCTIONS
*********************/
module.exports = {
  returnHomePage: returnHomePage,
}
