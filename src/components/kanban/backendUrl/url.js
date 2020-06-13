const production = true
const url = production ? "https://hrms-project.herokuapp.com/api/" : "http://localhost:3001/api/"

module.exports = {
    backendUrl: url
}