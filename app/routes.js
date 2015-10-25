// app/routes.js

var userRoles = require('../public/js/routingConfig').userRoles
  , accessLevels = require('../public/js/routingConfig').accessLevels;

module.exports = function(app, passport) {

	// =====================================
	// HOME PAGE (with login links) ========
	// =====================================
	/*app.get('/', function(req, res) {
		res.render('index.ejs'); // load the index.ejs file
	});*/

	// render partials for angularjs
	app.get('/partials/:name', function (req, res) {
	  var name = req.params.name;
	  res.render('partials/' + name);
	});

	// process the login form
	app.post('/login', passport.authenticate('local-login'), function(req, res) {
		if (req.body.remember) {
          req.session.cookie.maxAge = 1000 * 60 * 3;
        } else {
          req.session.cookie.expires = false;
        }
		
		res.send({
                    email: req.user.local.email,
                    role: req.user.local.role
                });
	});

	// process the signup form
	app.post('/signup', passport.authenticate('local-signup'), function(req, res) {
		res.send({
                    email: req.user.local.email,
                    role: req.user.local.role
                });
	});

	// logout
	app.post('/logout', function(req, res) {
		req.logout();
		res.send(200);
		//res.redirect('/');
	});

	app.get('/*', function(req, res){
		var role = userRoles.public, email = '';
        if(req.user) {
            role = req.user.local.role;
            email = req.user.local.email;
        }
        res.cookie('user', JSON.stringify({
            'email': email,
            'role': role
        }));
        res.render('index.ejs');
	});
};

// route middleware to make sure
function isLoggedIn(req, res, next) {

	// if user is authenticated in the session, carry on
	if (req.isAuthenticated())
		return next();

	res.send(401);
}
