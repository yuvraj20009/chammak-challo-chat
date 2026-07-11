export function renderOnline(users, onlineDiv) {
    onlineDiv.innerHTML = `
        <div class="onlineCount">
            👥 ${users.length} online
        </div>
    `;
}