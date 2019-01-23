# Assestment 2 StudentID: c1868921

## Preface

Our one-man-team at c1868921 Inc., is pleased to present the final version (1.0.0) of PontyPridd University's Library Service.  This dynamic application extends on top of the Express.js framework provided to create a deployable website that fully complies with the specification.

To reduce deployment time, we(me) have chosen to use:
  * **bootstrap** most basic templates from the [Bootstrap Cheat Sheet][https://github.com/adam-p/markdown-here/wiki/Markdown-Cheatsheet] by Alexander Rechsteiner; 
  * **jQuery** and **jQueryUI**: for interacting the database and the UX.
  * **pug**: as a view engine for the Express.js framework
  * **scss**: Not really needed, but it was prefferred over plain CSS for scalability, and $variables.

This applicaton has been [deployed][http://c1868921.appspot.com/] to Google Cloud. (-at the time of writing the database was not uploaded-).

You can visit this project [github.com][https://github.com/ajcastany/cw2-librarysrv].

## Functionality:



## ChangeLog

## Known Bugs:

 - Error on deleteting book (cause unknown): XML Parsing Error: no element found Location: http://localhost:3000/api/books/15 Line Number 1, Column 1:
 - User has to wait a few seconds for the sqlite database to unlock when adding a book with more than one autor.  setTimeout has been added to the function, but does not seem to have any effect.
