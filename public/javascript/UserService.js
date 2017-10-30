var userDB = (function () {
    function User(username, password, email) {
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
    }
    
    UsersDB.prototype.addUser = function (username, password, email) {
        this._users.push(new User(username, password, email));
        //post in DB

    }
    UsersDB.prototype.login = function (username, password) {
        return this._users.some(user => {
            return user.username == username && user.password == password;
        });
        
    }
    var users = new UsersDB();
    setInterval(function(){
        //post in DB
    }, 5000)
    return users;
})();