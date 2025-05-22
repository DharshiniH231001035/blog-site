firebase.auth().onAuthStateChanged(user => {
  if (!user) {
    window.location.href = "/admin-login.html";
  } else {
    const adminEmails = ["admin@gmail.com"]; // add your admin email(s)
    if (!adminEmails.includes(user.email)) {
      alert("Access Denied: Not an Admin.");
      firebase.auth().signOut().then(() => window.location.href = "/");
    } else {
      loadBlogs(); // Load blogs if user is an admin
    }
  }
});

function loadBlogs() {
  const blogList = document.getElementById("blog-list");
  blogList.innerHTML = ""; // Clear existing blogs

  db.collection("blogs").get().then(snapshot => {
    snapshot.forEach(doc => {
      const data = doc.data();

      const blogCard = document.createElement("div");
      blogCard.className = "blog-card";

      blogCard.innerHTML = `
        <h2>${data.title}</h2>
        <img src="${data.bannerImage || ''}" alt="Blog Image"/>
        <button class="delete-btn" onclick="deleteBlog('${doc.id}')">Delete</button>
      `;

      blogList.appendChild(blogCard);
    });
  }).catch(error => {
    console.error("Error fetching blogs:", error);
  });
}

function deleteBlog(blogId) {
  if (confirm("Are you sure you want to delete this blog?")) {
    db.collection("blogs").doc(blogId).delete().then(() => {
      alert("Blog deleted successfully.");
      window.location.reload(); // Refresh to show updated list
    }).catch(error => {
      console.error("Error deleting blog:", error);
      alert("Failed to delete blog.");
    });
  }
}

document.getElementById("logout-btn").addEventListener("click", () => {
  firebase.auth().signOut()
    .then(() => {
      alert("Logged out successfully.");
      window.location.href = "/";
    })
    .catch(error => {
      console.error("Logout error:", error);
      alert("Error logging out.");
    });
});
