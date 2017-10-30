
function User(username, firstname, lastname, password, email, phone) {
    this.username = username;
    this.firstname = firstname;
    this.lastname = lastname;
    this.password = password;
    this.email = email;
    this.phone = phone;
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