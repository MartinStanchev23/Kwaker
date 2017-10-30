document.addEventListener('DOMContentLoaded', function () {
    var userDB = (function () {
        function User(firstname, lastname, username, email, phoneNumber, password) {
            this.username = username;
            this.firstname = "";
            this.lastname = '';
            this.password = password;
            this.email = email;
            this.kwaks = [];
            this.likes = [];
            this.comments = [];
            this.followers = [];
            this.following = [];
            this.age = ''; ///dateTimeNow - birthDate
            this.birthDate = '';
            this.gender = '';
            this.country = '';
            this.lists = [];
        };


        function UsersDB() {
            //this._users = db.Down
            this._users = [];
        }

        UsersDB.prototype.addUser = function (firstname, lastname, username, email, phoneNumber, password) {
            this._users.push(new User(firstname, lastname, username, email, phoneNumber, password));
            //post in DB
        }
        UsersDB.prototype.login = function (username, password) {
            return this._users.some(user => {
                return user.username == username && user.password == password;
            });

        }
        var users = new UsersDB();
        console.log(users)
        setInterval(function () {
            //post in DB
        }, 5000)
        return users;
    })();
})