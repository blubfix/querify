@@ -1,47 +1,28 @@
# Read me

## Allgemein

- Start command: npm start
- Port: 3001
- Test: Postman

# Read me Datenbank

# Installing mit Windows

- Für GUI DBeaver installieren: https://dbeaver.io/files/dbeaver-ce-latest-x86_64-setup.exe
- Download MariaDB: https://mariadb.org/download/?t=mariadb&p=mariadb&r=10.11.2&os=windows&cpu=x86_64&pkg=msi&m=hs-esslingen
- Beim Installierungsprozess: Root passwort "alfred1" festlegen
- "Use UTF-8 as character Set" festlegen, TCP Port 3306 lassen
- MySQL Client (MariaDB) öffnen, "alfred1" als Passwort eingeben und mit "### Initializing (im Terminal) fortfahren"

# Installing mit Mac
- Terminal öffnen
- "brew install mariadb"
- "brew install dbeaver" (if you want to have a gui)

# Initializing (im Terminal) (sowohl Mac als Windows)
- "brew services start mariadb" (eventuell) (nur mac)
- "mariadb"
- "CREATE DATABASE wishhzDB;"
- "show DATABASES;"
- "CREATE USER 'alfred'@localhost IDENTIFIED BY 'alfred1';"
- "GRANT ALL PRIVILEGES ON wishhzDB.* TO alfred@localhost;"
- "GRANT ALL PRIVILEGES ON wishhzDB.* TO alfred@localhost;"
- "FLUSH PRIVILEGES;"
- "SHOW GRANTS FOR alfred@localhost;"
- can now connect (via Code, DBeaver, etc)

# Create Tables etc

- "cd backend" um in den backend Ordner zu kommen
- "npm run initdb", alternativ "node initDatabase.js"
- after successfull run, go for "npm start" to start backend

# DBeaver

- new Connection 
- select mariadb
- enter databasename, username, and passwort