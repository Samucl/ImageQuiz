# ImageQuiz

This project was implemented in Metropolia's Web Application Development 2 course. The aim of the project was to use at least:

- Database
- Use of an open API
- React based UI

The result was a picture guessing game web app with features like:

- User account
- Tracking game scores
- User levels
- Achievements
 


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

## Screenshots


![exploring the app](images/ExploringGif.gif =x350)

![playing game "Animals"](images/AnimalsGameGif.gif =x350)

![playing game "Flags"](images/FlagsGameGif.gif =x350)
