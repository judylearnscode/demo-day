const user = require("./models/user");

module.exports = function(app, passport, db) {

// normal routes ===============================================================

    // show the home page (will also have our login links)
    app.get('/', function(req, res) {
        res.render('index.ejs');
    });
    // app.get('/deleteAll', function(req, res) {
    //     res.render('profile.ejs');
    // });

    // PROFILE SECTION =========================
    app.get('/profile', isLoggedIn, function(req, res) {
      db.collection('recipes').find().toArray((err, result) => {
        if (err) return console.log(err)
        res.render('profile.ejs', {
          user : req.user,
          recipes: result,
        })
      })
        db.collection('users').find().toArray((err, result) => {
          if (err) return console.log(err)
          res.render('profile.ejs', {
            user : req.user,
          })
        })
    });

  //   app.get('/updateForm', isLoggedIn, function(req, res) {
  //     db.collection('messages').find().toArray((err, result) => {
  //       if (err) return console.log(err)
  //       res.render('update.ejs', {
  //         user : req.user,
  //         messages: result
  //       })
  //     })
  // });

  app.get('/contents', isLoggedIn, function(req, res) {
    db.collection('recipes').find().toArray((err, result) => {
      if (err) return console.log(err)
      res.render('contents.ejs', {
        user : req.user,
        recipes: result
      })
    })
});



  app.get('/photos', isLoggedIn, function(req, res) {
    db.collection('lines').find().toArray((err, result) => {
      if (err) return console.log(err)
      res.render('photos.ejs', {
        user : req.user,
        recipes: result
      })
    })
});

app.get('/userProfile', isLoggedIn, function(req, res) {
  if (req.user.local.superStarRecipe) {
    // find the user's superStarRecipe and make it available to the thing that renders it (user profile.ejs) and find all the user's recipes and make that list available to userProfile.ejs to populate the pull down list
  // db.collection('recipes').findOne({'_id': req.user.local.superStarRecipe},(err, result)) => {
  }
  db.collection('users').find().toArray((err, result) => {
    if (err) return console.log(err)
    res.render('userProfile.ejs', {
      user : req.user,
    })
  })
});

app.get('/ourRecipes', isLoggedIn, function(req, res) {
  db.collection('recipes').find().toArray((err, result) => {
    if (err) return console.log(err)
    res.render('ourRecipes.ejs', {
      user : req.user,
      recipes: result
    })
  })
});

    // LOGOUT ==============================
    app.get('/logout', function(req, res) {
        req.logout();
        res.redirect('/');
    });

    // ----------------- upload page 

    app.get('/uploadRecipe', isLoggedIn, function(req, res) {
      // db.collection('users').find().
      db.collection('recipes').find().toArray((err, result) => {
        if (err) return console.log(err)
        res.render('uploadRecipe.ejs', {
          user : req.user,
          recipes: result,
        })
      })
  });

// message board routes ===============================================================

    app.post('/postRecipe', async(req, res) => {
        console.log('this is body', req.body)
        console.log('this is user', req.user)
      db.collection('recipes').save({
        // user: req.body.local.email,
        title: req.body.title, 
        author: req.body.author, 
        bg: req.body.bg, 
        ingredients: req.body.ingredients, 
        instructions: req.body.instructions, 
        recipeUser: req.user._id,
        recipeUserEmail: req.user.local.email
      }, (err, result) => {
        if (err) return console.log(err)
        console.log('saved to database')
        res.redirect('/uploadRecipe')
      })
    })

    app.post('/update', (req, res) => {
      db.collection('users').findOneAndUpdate({
        _id: ObjectId(req.user._id)
      },{
        $set: {
          local:{
            email: req.body.email,
            password: req.user.local.password,
          }
        }
      },{
        upsert: false
      },(error, result)=>{
        if(error) return console.log(error)
        console.log("save to database")
        res.redirect('/profile')
      })
    })

    // app.put('/messages', (req, res) => {
    //   db.collection('recipes')
    //   .findOneAndUpdate({name: req.body.name, msg: req.body.msg}, {
    //     $set: {
    //       thumbUp:req.body.thumbUp + 1
    //     }
    //   }, {
    //     sort: {_id: -1},
    //     upsert: true
    //   }, (err, result) => {
    //     if (err) return res.send(err)
    //     res.send(result)
    //   })
    // })

    // app.put('/thumbDown', (req, res) => {
    //   db.collection('messages')
    //   .findOneAndUpdate({name: req.body.name, msg: req.body.msg}, {
    //     $set: {
    //       thumbUp:req.body.thumbUp - 1
    //     }
    //   }, {
    //     sort: {_id: -1},
    //     upsert: true
    //   }, (err, result) => {
    //     if (err) return res.send(err)
    //     res.send(result)
    //   })
    // })

    app.delete('/deleteRecipe', (req, res) => {
      db.collection('recipes').findOneAndDelete({title: req.body.title, author: req.body.author},(err, result) => {
        if (err) return res.send(500, err)
        res.send('delete')
      })
    })
  

// =============================================================================
// AUTHENTICATE (FIRST LOGIN) ==================================================
// =============================================================================

    // locally --------------------------------
        // LOGIN ===============================
        // show the login form
        app.get('/login', function(req, res) {
            res.render('login.ejs', { message: req.flash('loginMessage') });
        });

        // process the login form
        app.post('/login', passport.authenticate('local-login', {
            successRedirect : '/profile', // redirect to the secure profile section
            failureRedirect : '/login', // redirect back to the signup page if there is an error
            failureFlash : true // allow flash messages
        }));

        // SIGNUP =================================
        // show the signup form
        app.get('/signup', function(req, res) {
            res.render('signup.ejs', { message: req.flash('signupMessage') });
        });

        // process the signup form
        app.post('/signup', passport.authenticate('local-signup', {
            successRedirect : '/profile', // redirect to the secure profile section
            failureRedirect : '/signup', // redirect back to the signup page if there is an error
            failureFlash : true // allow flash messages
        }));

// =============================================================================
// UNLINK ACCOUNTS =============================================================
// =============================================================================
// used to unlink accounts. for social accounts, just remove the token
// for local account, remove email and password
// user account will stay active in case they want to reconnect in the future

    // local -----------------------------------
    app.get('/unlink/local', isLoggedIn, function(req, res) {
        var user            = req.user;
        user.local.email    = undefined;
        user.local.password = undefined;
        user.save(function(err) {
            res.redirect('/profile');
        });
    });

};

// route middleware to ensure user is logged in
function isLoggedIn(req, res, next) {
    if (req.isAuthenticated())
        return next();

    res.redirect('/');
}
