const routes = {
    "/login": { templateId: "login" },
    "/dashboard": {
      templateId: "dashboard",
      title: "Dashboard",
      after: function () {
        //Runs 'Dashboard is shown' whenever the template changes
        console.log("Dashboard is shown");
      }
    }
  };
  
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
  
  if (typeof route.after === "function") {
    route.after();
  }

  async function register() {
    const registerForm = document.getElementById('registerForm');
    const formData = new FormData(registerForm);
    const jsonData = JSON.stringify(Object.fromEntries(formData));
    const result = await createAccount(jsonData);
  
    if (result.error) {
      return console.log('An error occurred:', result.error);
    }
  
    console.log('Account created!', result);
  }