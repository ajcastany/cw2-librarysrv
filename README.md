# Assestment 2 StudentID: c1868921

## Preface

Our one-man-team at c1868921 Inc., is pleased to present the final version (1.0.0) of PontyPridd University's Library Service.  This dynamic application extends on top of the Express.js framework provided to create a deployable website that fully complies with the specification.

To reduce deployment time, we(me) have chosen to use:
  * **bootstrap** most basic templates from the [Bootstrap Cheat Sheet](https://github.com/adam-p/markdown-here/wiki/Markdown-Cheatsheet) by Alexander Rechsteiner; 
  * **jQuery** and **jQueryUI**: for interacting the database and the UX.
  * **pug**: as a view engine for the Express.js framework
  * **scss**: Not really needed, but it was prefferred over plain CSS for scalability, and $variables.

This applicaton has been [deployed](http://c1868921.appspot.com/) to Google Cloud and it's fully functional.


## Functionality:

The server.js file is deprecated.  It has been merged with app.js to provide the API and the webserver for easy deployment.  CORS has been disabled as there is no Cross-Site referencing.

The initial routes provided has been moved to `/routes/api` while the .pug files have been routed in `/routes/`.

`/public/javascripts/` contains script.js and user-script.js.

`/public/stylesheets/` contains the style.scss and the generated style.css.map

`/views` contains the pug files used by Express view engine.

`app.js` file contains the configuration for the Express.js framework, `compression` and `helmet` package were added, as well as `express-favicon` library.  Routes for the pug templates were also added.

### Compulsory

#### Users:

##### U1 - Add a new User to the Library system with the fields Name, Barcode and Member Type
(Staff/Student).
#####  U2 - Get a User’s details from the Library system by searching on Name or Barcode
#####  U3 - Update a User’s Name or Member Type
#####  U4 - Remove a User

#### Books:

##### B1 - Add a new Book to the Library system with the fields Title, ISBN, Authors.
##### B2 - Get a Book’s details by searching on Title
##### B3 - Remove a Book

### Loans:

##### L1 - Loan a Book to a User (if it is not already out on Loan), specifying the Due Date
##### L2 - Get a list of a User’s current Loans
##### L3 - Get the User currently borrowing a Book

### Extended

## ChangeLog

## Known Bugs:

 - Error on deleteting book (cause unknown): XML Parsing Error: no element found Location: http://localhost:3000/api/books/15 Line Number 1, Column 1:
 - User has to wait a few seconds for the sqlite database to unlock when adding a book with more than one autor.  setTimeout has been added to the function, but does not seem to have any effect.

You can visit this project [github.com](https://github.com/ajcastany/cw2-librarysrv).
