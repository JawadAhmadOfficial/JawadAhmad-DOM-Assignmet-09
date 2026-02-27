const userList = document.getElementById("userList");
const userDetails = document.getElementById("userDetails");
const searchInput = document.getElementById("searchInput");
const reloadBtn = document.getElementById("reloadBtn");

let usersData = []; // store fetched data

// ===== Fetch Users Function =====
function fetchUsers() {
  userList.innerHTML = "<li>Loading...</li>";
  userDetails.innerHTML = "";

  fetch("https://jsonplaceholder.typicode.com/users")
    .then((res) => res.json())
    .then((data) => {
      usersData = data; // store data globally
      displayUsers(usersData);
    })
    .catch((err) => {
      userList.innerHTML = "<li>Failed to fetch data</li>";
      console.error(err);
    });
}

// ===== Display Users in List =====
function displayUsers(users) {
  userList.innerHTML = ""; // clear list
  if (users.length === 0) {
    userList.innerHTML = "<li>No users found</li>";
    return;
  }
  users.forEach((user) => {
    const li = document.createElement("li");
    li.textContent = user.name;
    li.dataset.id = user.id;
    userList.appendChild(li);
  });
}

// ===== Click User to Show Details =====
userList.addEventListener("click", (e) => {
  if (e.target.tagName === "LI" && e.target.dataset.id) {
    const user = usersData.find((u) => u.id == e.target.dataset.id);
    userDetails.innerHTML = `
            <strong>Email:</strong> ${user.email}<br>
            <strong>Phone:</strong> ${user.phone}<br>
            <strong>Website:</strong> ${user.website}
        `;
  }
});

// ===== Search Filter =====
searchInput.addEventListener("input", () => {
  const query = searchInput.value.toLowerCase();
  const filtered = usersData.filter((user) =>
    user.name.toLowerCase().includes(query),
  );
  displayUsers(filtered);
});

// ===== Reload Button =====
reloadBtn.addEventListener("click", fetchUsers);

// ===== Initial Fetch =====
window.addEventListener("load", fetchUsers);
