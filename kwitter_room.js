var firebaseConfig = {
      apiKey: "AIzaSyAuY_zhN1klllYuIXHJiQpuuuveUqPfkhc",
      authDomain: "kwitter-e883b.firebaseapp.com",
      databaseURL: "https://kwitter-e883b-default-rtdb.firebaseio.com",
      projectId: "kwitter-e883b",
      storageBucket: "kwitter-e883b.appspot.com",
      messagingSenderId: "725952393298",
      appId: "1:725952393298:web:3ee4477413792bff02af8b",
      measurementId: "G-G56GJKCW9F"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
//ADD YOUR FIREBASE LINKS HERE
user_name = localStorage.getItem("user_name")
document.getElementById("user_name").innerHTML = "welcome" + user_name + "!"

function add_room() {

      room_name = document.getElementById("room_name").value
      firebase.database().ref("/").child(room_name).update({
            purpose: "adding_room_name"
      }) 
      localStorage.setItem("room_name", room_name)
      window.location = "kwitter_page.html"


}

function getData() {
      firebase.database().ref("/").on('value', function (snapshot) {
            document.getElementById("output").innerHTML = "";
            snapshot.forEach(function (childSnapshot) {
                  childKey = childSnapshot.key;
                  Room_names = childKey;
                  //Start code
                  row = "<div class='room_name'id=" + Room_names + "onclick='redirectToRoomName(this.id)'>#" + Room_names + "</div><hr>"
                  document.getElementById("output").innerHTML += row

                  //End code
            });
      });
}

getData();
function redirectToRoomName(name){
      console.log(name);
      localStorage.setItem("room_name",name)
window.location="kwitter_page.htl"


}
function logout() {
      localStorage.removeItem("user_name")
      localStorage.removeItem("room_name")
      window.location = "index.html"
}