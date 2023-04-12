\
![ImageQuizLogo](src/res/testlogo.png)


This project was implemented in Metropolia's Web Application Development 2 course. The requirements of the project were:

- the use of a database
- the use of at least one open API
- React.js frontend

The result was a picture guessing web game with features like:

- User accounts
- Tracking game scores
- User levels
- Achievements

## Running locally
Create a MySQL database called "imagequiz_db". In the root directory of the project there is a sql script called "db.sql" which you need to run to create all the necessary tables. 
```sh  
mysql -u username -p imagequiz_db < db.sql
```  
In the root folder of the project, run the commands
```sh  
npm install
```  
and
```sh  
npm start
```  
Create an .env file

```sh  
JWT_SECRET=
DB_HOST=localhost
DB_PASSWORD=
DB_USERNAME=
DB_DATABASE=imagequiz_db
```
> edit the .env file with your database password and username\
> A secure jwt secret can be created with the command
> ```sh  
> node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
> ```
> Which you can then copy from the terminal

Run the server
```sh  
node Server.js
```  

Now you can access the app from http://localhost:3000

## Rest-API calls

- **POST** **(/api/login)** - Logins the user
- **POST** **(/api/register)** - Registers the user
- **POST**  **(/api/checkUsername)** - Checks the validity of the user's token
- **POST** **(/api/setStats)** - Saves stats after a game has ended
- **GET** **(/api/getStats)** - Returns stats for user profile view
- **GET** **(/api/getHighScores)** - Returns top10 players from each game
- **GET** **(/api/getPersonalScores)** - Returns users personal game scores
- **GET** **(/api/getFlags)** - Returns information for the game "Flags"
- **GET** **(/api/getAnimals)** - Returns information for the game "Animals"
- **POST** **(/api/scoreFlags)** - Saves points for the game "Flags"
- **POST** **(/api/scoreAnimals)** - Saves points for the game "Animals"

## The games


For the game **Animals**, I used a npm package "random-animals-api", which returns images of eight different animals. At first, this game seemed too easy, so I added effects (blur, distortion, transform) to each image of the game with CSS, which restore over time.

For the game **Flags**, I used restcountries' open API. This worked well because from the same API fetch you get a picture of the flag and the Finnish name of the country. I didn't add effects to this game, because it felt challenging enough.

Currently, if the connection to an image API is not successful, the game does not report it.

## Screenshots

GIFs: (They might load slowly...)

![exploring the app](images/ExploringGif.gif)

![playing game "Animals"](images/AnimalsGameGif.gif)

![playing game "Flags"](images/FlagsGameGif.gif)
