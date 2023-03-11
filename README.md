# DentalKart-csv-project
User can download all data in form of csv and upload csv file to all more data in database.

## ⬇️ Installation

- First, fork this repository 🍴 and follow the given instructions:

```
# clone the repository to your local machine
$ git clone `git clone https://github.com/<YOUR-GITHUB-USERNAME>/DentalKart-csv-project.git`

# navigate to the project's directory and install all the relevant dev-dependencies
$ cd DentalKart-csv-project && npm intsall

# Make a .env file and include the details as per config.js

# Start application
$ node index.js


## 🔨 API Endpoints

`/`
| REQUEST METHODS | ENDPOINTS | DESCRIPTION |
| :-------------- | :-------: | ------------------: |
| GET | / | Show all detail of student |
| POST | / | Add new student detail to DB|
| GET  | /download | download file from DB |

`/user`
| REQUEST METHODS | ENDPOINTS | DESCRIPTION |
| :-------------- | :-------: | ------------------: |
| POST | /register| registration of user |
| POST | /login   | login of user        |


