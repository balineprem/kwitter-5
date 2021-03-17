//YOUR FIREBASE LINKS
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

user_name = localStorage.getItem("user_name")
room_name = localStorage.getItem("room_name")

function send() {
      msg = document.getElementById("msg").value
      firebase.database().ref(room_name).push({
            name: user_name,
            message: msg,
            like: 0
      })
      document.getElementById("msg").value = ""
}



function getData() {
      firebase.database().ref("/" + room_name).on('value', function (snapshot) {
            document.getElementById("output").innerHTML = "";
            snapshot.forEach(function (childSnapshot) {
                  childKey = childSnapshot.key;
                  childData = childSnapshot.val();
                  if (childKey != "purpose") {
                        firebase_message_id = childKey;
                        message_data = childData;
                        //Start code
                        name = message_data["name"]
                        message = message_data["message"]
                        like = message_data["like"]

                        row = "<h4> " + name + "<img class='user_tick' src='tick.png'></h4><h4 class='message_h4'>" + message + "</h4><button class='btn btn-warning' id='" + firebase_message_id + "' value='" + like + "' onclick='updateLike(this.id)'><span class='glyphicon glyphicon-thumbs-up'>Like: " + like + "</span></button><hr>";
                        document.getElementById("output").innerHTML += row
                        //End code
                  }
            });
      });
}
getData();

function updateLike(message_id) {
      button_id = message_id
      likes = document.getElementById(button_id).value
      likesin_number = Number(likes) + 1
      console.log(likesin_number);
      firebase.database().ref(room_name).child(message_id).update({
            like: likesin_number
      })
}
function logout(){
      localStorage.removeItem("user_name")
      localStorage.removeItem("room_name")
      window.location = "index.html"
}