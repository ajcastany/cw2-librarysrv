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

`app.js` file contains the configuration for the Express.js framework, `compression` and `helmet` package were added for deployment, as well as `express-favicon` library.  Routes for the pug templates were also added.

### Compulsory

#### Users:

This functions are in `public/javascripts/user-script.js`.

## U1 - Add a new User to the Library system with the fields Name, Barcode and Member Type(Staff/Student)

![alt text][user]

Write down the new user's Name and Barcode, select from the list the member type (Staff or Student) and click the add button.  The entry added will appear bellow.

##  U2 - Get a User’s details from the Library system by searching on Name or Barcode

### Search by Name
![alt][search-user]

Type a search string and click on the Search button and the results will appear bellow.  If all fields are left empty, but either Staff or Student is selected, all Students or Staff members will be listed in the Results (details on ).

### Search by Barcode
![alt][search-barcode]

Type a search string and click on the Search button and the results will appear bellow.

##  U3 - Update a User’s Name or Member Type
[!alt](./readme-img/ponty-update-usr.png "Update User")

Search a User to update and *click* the left-hand selection box.  The fields will change and become editable by the user.  Fields show their current values (in the database) if left blank it will send the same data.  Click Update to save changes to the database.

[!alt](./readme-img/ponty-update-usr-after.png "Update User Alert")

After the database has been written an alert box will show the entry just updated.

#####  U4 - Remove a User

[!alt][delete-user]

Search for an user and then *click* on the left hand side selection box.  Selected Entry will turn red.  Click on the delete button to delete the entry selected.  A confirm message box will ask if the user want to delete the selected entry(ies).  If answered **Ok**, it will show another alert after every entry is deleted from the database.  If more than one entry is selected it will bulk delete them.

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

 - Error on deleteting book (cause unknown): `XML Parsing Error: no element found Location: http://localhost:8000/api/books/15 Line Number 1, Column 1`
 - User has to wait a few seconds for the sqlite database to unlock when adding a book with more than one autor.  setTimeout has been added to the function, but does not seem to have any effect.

You can visit this project [github.com](https://github.com/ajcastany/cw2-librarysrv).

[add-user]: /readme-img/ponty-add-usr.png "Add User"
[search-user]: /readme-img/ponty-search-usr.png "Search User"
[search-barcode]: /readme-img/ponty-search-bar.png "Search barcode"
<!-- [delete-user]: ./readme-img/ponty-delete-usr.png "Delete User" -->
