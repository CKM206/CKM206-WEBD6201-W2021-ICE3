/* custom JavaScript goes here */

//IIFE - Immediately Invoked Function Expression
//AKA - Anonymous Self-Executing Function
//Closure - limits scope leak

"use strict";

((core) => {
  function displayHome() {

    let paragraphOneText =
      "This is a simple site to demonstrate DOM Manipulation for ICE 1";

    let paragraphOneElement = document.getElementById("paragraphOne");

    paragraphOneElement.textContent = paragraphOneText;
    paragraphOneElement.className = "fs-5";

    // Step 1. document.createElement
    let newParagraph = document.createElement("p");
    // Step 2. configure the element
    newParagraph.setAttribute("id", "paragraphTwo");
    newParagraph.textContent = "...And this is paragraph two";
    // Step 3. select the parent element
    let mainContent = document.getElementsByTagName("main")[0];
    // Step 4. Add / Insert the element
    mainContent.appendChild(newParagraph);

    newParagraph.className = "fs-6";

    // another way of injecting content
    let paragraphDiv = document.createElement("div");
    let paragraphThree = `<p id="paragraphThree" class="fs-7 fw-bold">And this is the Third Paragraph</p>`;
    paragraphDiv.innerHTML = paragraphThree;

    // insertions

    // example of inserting before a node
    //newParagraph.before(paragraphDiv);

    // example of inserting after a node
    newParagraph.after(paragraphDiv);

    // deletions

    // example of removing a single element
    //paragraphOneElement.remove();

    // example of removeChild
    mainContent.removeChild(paragraphOneElement);

    // update / modification
    //mainContent.firstElementChild.textContent = "Welcome Home!";

    mainContent.innerHTML = `<h1 id="firstHeading">Welcome to WEBD6201 - Lab 1</h1>
         <p id="paragraphOne" class="fs-3 fw-bold">This is my first Paragraph</p>
        `;

  }


  function displayAbout() {

  }

  function displayProjects() {

  }

  function displayServices() {

  }

    function displayContact() {

      let messageArea = $("#messageArea").hide();

      
      // Form Validation using JQuery
      $("#fullName").on("blur", function() 
      {
        console.log($(this).val());
        if ($(this).val().length < 2) 
        {
          $(this).trigger("focus").trigger("select");

          messageArea.addClass("alert alert-danger")
                     .text("Please enter an appropriate Name")
                     .show();

        } 
        else 
        {
          messageArea.removeAttr("class").hide();
        }
      });

      $("#sendButton").on("click", () => 
      {

        if ($("#subscribeCheckBox")[0].checked)
        {
          let contact = new core.Contact(fullName.value, contactNumber.value, emailAddress.value);

          if (contact.serialize()) 
          {
            localStorage.setItem((localStorage.length + 1).toString(), contact.serialize());
          }
       }
      });
    }

  function displayContactList() {
    if (localStorage.length > 0) {
      let contactList = document.getElementById("contactList");

      let data = "";

      for (let index = 0; index < localStorage.length; index++) {
        let contactData = localStorage.getItem((index + 1).toString());

        let contact = new core.Contact();
        contact.deserialize(contactData);

        data += `<tr>
          <th scope="row">${index + 1}</th>
          <td>${contact.FullName}</td>
          <td>${contact.ContactNumber}</td>
          <td>${contact.EmailAddress}</td>
          <td class="text-center">
            <button value="${index + 1}" 
                    class="btn btn-primary btn-sm edit"><i class="fas fa-edit fa-sm"> Edit</i></button>
          </td>
          <td class="text-center">
            <button value="${index + 1}" 
                    class="btn btn-danger btn-sm delete"><i class="fas fa-trash-alt fa-sm"> Delete</i></button>
          </td>
        </tr>`;
      }
      contactList.innerHTML = data;

      $("button.edit").on("click", function()
      {
        console.log($(this).val());
      });

      $("button.delete").on("click", function()
      {
        localStorage.removeItem($(this).val());
      });
    }
  }



  function Start() {
    console.log("App Started...");

    switch (document.title) {
      case "Home":
        displayHome();
        break;
      case "About":
        displayAbout();
        break;
      case "Projects":
        displayProjects();
        break;
      case "Services":
        displayServices();
        break;
      case "Contact":
        displayContact();
        break;
      case "Contact-List":
        displayContactList();
        break;
    }

  }

  window.addEventListener("load", Start);

  core.Start = Start;

})(core || (core = {}));