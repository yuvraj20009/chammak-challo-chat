export function renderOnline(
    users,
    onlineDiv
) {

    if (users.length <= 1) {

        onlineDiv.innerHTML =
            "🟡 Waiting for someone...";

        return;

    }

    onlineDiv.innerHTML =
        `🟢 ${users.length} People Online`;

}