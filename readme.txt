For our website to work properly, XAMPP needs to be installed. Remove the name from file called "USUŃ_NAZWĘ" leaving only ".htaccess". This is done because github breaks with files with no name.
Then move the entire website folder into "...\xampp\htdocs\" path. Then turn XAMPP control panel on, and start Apache and MySQL.
Click "Admin" in My SQL, and in the window that opens create a new database (Button "New" on sidebar on left) with name guitartuner.
Click "Import" option at the top of the screen, then select the file "guitartuner.sql" and click import at the bottom, this will create the database.
To open the website, in internet browser, type "http://localhost/[Name of the project folder]/website.html".
