let myLeads = [];
const inputEl = document.querySelector("#input-el");
const inputButton = document.querySelector("#input-btn");
const deleteButton = document.querySelector("#delete-btn");
const saveButton = document.querySelector("#save-btn");
const ulEl = document.querySelector("#ul-el");
const LeadsFromLocal = JSON.parse(localStorage.getItem("myLeads"));

if (LeadsFromLocal) {
  myLeads = LeadsFromLocal;
  render(myLeads);
}

saveButton.addEventListener("click", function () {
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    myLeads.push(tabs[0].url);
    localStorage.setItem("myLeads", JSON.stringify(myLeads));
    render(myLeads);
    // let activeTab = tabs[0];
    // let activeTabId = activeTab.id;
  });
});

inputButton.addEventListener("click", function () {
  myLeads.push(inputEl.value);
  inputEl.value = "";
  localStorage.setItem("myLeads", JSON.stringify(myLeads));

  render(myLeads);
});

function render(Leads) {
  let listItems = "";

  for (let i = 0; i < Leads.length; i++) {
    // // const li = document.createElement("li");
    // li.textContent = myLeads[i];
    // ulEl.append(li);

    listItems += `<li>
                      <a target ="_blank" href = ${Leads[i]}> 
                          ${Leads[i]} 
                       </a>
                  </li>`;
  }

  ulEl.innerHTML = listItems;
}

deleteButton.addEventListener("dblclick", function () {
  localStorage.clear();
  myLeads = [];
  // ulEl.innerHTML = "";
  render(myLeads);
});
