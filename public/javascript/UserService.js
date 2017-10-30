
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


// module.exports = User;