const searchInput = document.querySelector(".search input");
const searchButton = document.querySelector(".search button");

// Add an event listener to the search button click
searchButton.addEventListener("click", function (event) {
  // Prevent the default button click behavior
  event.preventDefault();

  // Get the search query
  const searchQuery = searchInput.value.trim();

  // Redirect to the search.html page with the search term as a query parameter
  window.location.href = `search.html?search=${encodeURIComponent(
    searchQuery
  )}`;
});
