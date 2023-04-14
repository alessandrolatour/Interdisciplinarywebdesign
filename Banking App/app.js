let account = null;

const routes = {
  "/login": { templateId: "login" }, // Route for login page
  "/dashboard": { // Route for dashboard page
    templateId: "dashboard",
    title: "Dashboard",
    after: function () {
      // Callback function to be executed after dashboard template is loaded
      console.log("Dashboard is shown");
    }
  }
};

// Function to update the route based on current URL
function updateRoute() {
  const path = window.location.pathname;
  const route = routes[path];

  if (!route) {
    return navigate("/login");
  }

  const template = document.getElementById(route.templateId);
  // Updates title of the document when the template changes
  const title = route.title || "Bank App";
  const view = template.content.cloneNode(true);
  const app = document.getElementById("app");

  document.title = title;

  app.innerHTML = "";
  app.appendChild(view);

  if (typeof route.after === "function") {
    route.after();
  }
}

// updateRoute();
function navigate(path) {
  window.history.pushState({}, path, path);
  updateRoute();
}

function onLinkClick(event) {
  event.preventDefault();
  navigate(event.target.href);
}

window.onpopstate = () => updateRoute();
updateRoute();

async function sendRequest(url, method, data = null) {
  try {
    const options = {
      method: method,
      headers: {
        'Content-Type': 'application/json'
      }
    };
    if (data) {
      options.body = JSON.stringify(data);
    }
    const response = await fetch(url, options);
    return await response.json();
  } catch (error) {
    return { error: error.message || 'Unknown error' };
  }
}

async function register() {
  const registerForm = document.getElementById('registerForm');
  const user = registerForm.user.value;
  const currency = registerForm.currency.value;
  const description = registerForm.description.value;
  const balance = registerForm.balance.value;

  // Perform registration logic here

  // Assuming you have a function called "createAccount" that creates an account
  const result = await sendRequest('//localhost:5000/api/accounts', 'POST', { user, currency, description, balance });

  console.log("Account created!", result);
  account = result;
  navigate('/dashboard');
}

// Function to handle user login
async function login() {
  const loginForm = document.getElementById('loginForm');
  const user = loginForm.user.value;
  const data = await sendRequest('//localhost:5000/api/accounts/' + encodeURIComponent(user), 'GET');

  if (data.error) {
    return console.log('loginError', data.error);
  }

  account = data;
  navigate('/dashboard');
}

// Function to update element text content
function updateElement(id, text) {
  const element = document.getElementById(id);
  element.textContent = text;
}

// Update loginError element if data.error is present
// Make sure data is defined and assigned a value before using it
(async () => {
  const data = await sendRequest('//localhost:5000/api/accounts/' + encodeURIComponent(user), 'GET');
  if (data.error) {
    return updateElement('loginError', data.error);
  }
})();
