document.addEventListener('DOMContentLoaded', function(){
    document.getElementById('signIn').addEventListener('click', function(){
        document.querySelectorAll('.regInputs').forEach(function(element){
            if(element.length < 1){
                alert('Fill all fields');
            }
        })
    })
})

