import "./style.css";
import { createRoom } from "./services/room";
import { joinRoom } from "./services/joinRoom";

document.body.innerHTML = `
<div class="container">

    <div class="logo">
        chammakchallo
        <span>CHAT</span>
    </div>

    <h1>
        Until we are under
        <br>
        the same roof
    </h1>

   <p>
    A love dedicated project ❤
</p>

<input
    id="roomInput"
    placeholder="Enter Kamra Code"
/>

<button id="joinBtn">
        Join Kamra
    </button>

    <button id="createBtn">
        Create Kamra
    </button>

</div>
`;document
.getElementById("createBtn")
.addEventListener("click",async()=>{

    const room=await createRoom();

    alert("Your Kamra Code\n\n"+room);

});document
.getElementById("joinBtn")
.addEventListener("click", async () => {

    const code =
        document
        .getElementById("roomInput")
        .value;

    const result =
        await joinRoom(code);

    if (!result.success) {

        alert("Kamra not found 💔");

        return;

    }

    alert("Joined Kamra ❤️");

});