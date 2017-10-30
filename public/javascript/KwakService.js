document.addEventListener('DOMContentLoaded', function () {
    var kwaksDB = (function () {
        function Kwak(text, url) {
            this.text = text;
            this.url = url;
            this.likes = [];
            this.comments = [];
            this.shareCount = 0;
        };


        function KwaksDB() {
            //this._users = db.Down
        }

        KwaksDB.prototype.addKwak = function (text, url) {
            this._kwaks.push(new Kwak(text, url));
            //post in DB
        }
        KwaksDB.prototype.removeKwak = function (id) {
            _kwaks.splice(_kwaks.findIndex(x => x.id == id), 1);
            //post in DB
        }
        var kwaks = new KwaksDB();
        setInterval(function () {
            //post in DB
        }, 5000)
        return kwaks;
    })();
})