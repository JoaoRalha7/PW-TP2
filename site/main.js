document.addEventListener("DOMContentLoaded", () => {
  const token = localStorage.getItem("token");
  fetch("http://localhost:4242/api/education/getAll")
    .then((response) => response.json())
    .then((data) => {
      const educationList = document.querySelector(".educacao");

      educationList.innerHTML = "";

      data.forEach((education) => {
        const listItem = document.createElement("li");
        listItem.setAttribute("data-education-id", education.id);
        const startDate = document.createElement("h5");
        const degree = document.createElement("h4");
        const institution = document.createElement("h6");

        startDate.textContent = education.startDate + " - " + education.endDate;
        degree.textContent = education.degree;
        institution.textContent = education.institution;

        listItem.appendChild(startDate);
        listItem.appendChild(degree);
        listItem.appendChild(institution);

        if (token) {
          const editButton = document.createElement("button");
          const deleteButton = document.createElement("button");

          editButton.textContent = "Editar";
          editButton.classList.add("button-styleE");
          deleteButton.textContent = "Delete";
          deleteButton.classList.add("button-styleD");

          editButton.setAttribute("data-education-id", education.id);
          deleteButton.setAttribute("data-education-id", education.id);

          editButton.addEventListener("click", () => {
            createEditForm(education, listItem);
          });

          deleteButton.addEventListener("click", () => {
            const educationId = deleteButton.dataset.educationId;

            if (educationId) {
              deleteEducation(educationId);
            }
          });

          listItem.appendChild(editButton);
          listItem.appendChild(deleteButton);
        } else {
          const editButtons = listItem.querySelectorAll("button");
          editButtons.forEach((button) => {
            button.style.display = "none";
          });
        }

        educationList.appendChild(listItem);
      });
    })
    .catch((error) => {
      console.error(error);
    });
});

function createEditForm(education, listItem) {
  const form = document.createElement("form");
  const startDateInput = document.createElement("input");
  const endDateInput = document.createElement("input");
  const degreeInput = document.createElement("input");
  const institutionInput = document.createElement("input");
  const saveButton = document.createElement("button");

  startDateInput.value = education.startDate;
  endDateInput.value = education.endDate;
  degreeInput.value = education.degree;
  institutionInput.value = education.institution;
  saveButton.textContent = "Save";

  form.appendChild(startDateInput);
  form.appendChild(endDateInput);
  form.appendChild(degreeInput);
  form.appendChild(institutionInput);
  form.appendChild(saveButton);

  listItem.innerHTML = "";
  listItem.appendChild(form);

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    const updatedEducation = {
      startDate: startDateInput.value,
      endDate: endDateInput.value,
      degree: degreeInput.value,
      institution: institutionInput.value,
    };

    const educationId = listItem.dataset.educationId;

    updateEducation(
      educationId,
      updatedEducation,
      startDateInput,
      degreeInput,
      institutionInput
    );
  });
}

function updateEducation(
  educationId,
  updatedEducation,
  startDateElement,
  degreeElement,
  institutionElement
) {
  fetch(`http://localhost:4242/api/education/update/${educationId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(updatedEducation),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data);

      startDateElement.textContent =
        updatedEducation.startDate + " - " + updatedEducation.endDate;
      degreeElement.textContent = updatedEducation.degree;
      institutionElement.textContent = updatedEducation.institution;
      const listItem = startDateElement.parentNode.parentNode;
      listItem.innerHTML = "";
      location.reload();
    })
    .catch((error) => {
      console.error(error);
    });
}

function deleteEducation(educationId) {
  fetch(`http://localhost:4242/api/education/delete/${educationId}`, {
    method: "DELETE",
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data);

      const educationItem = document.querySelector(
        `[data-education-id="${educationId}"]`
      );
      educationItem.remove();
    })
    .catch((error) => {
      console.error(error);
    });
}

document.addEventListener("DOMContentLoaded", () => {
  const addEducationButton = document.getElementById("addEducationButton");
  const educationForm = document.getElementById("educationForm");
  const educationList = document.querySelector(".educacao");

  addEducationButton.addEventListener("click", () => {
    addEducationButton.style.display = "none";
    educationForm.style.display = "block";
  });

  const form = document.getElementById("educationForm");

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    const startDate = document.getElementById("startDateInput").value;
    const endDate = document.getElementById("endDateInput").value;
    const degree = document.getElementById("degreeInput").value;
    const institution = document.getElementById("institutionInput").value;

    const educationData = {
      startDate,
      endDate,
      degree,
      institution,
    };

    fetch("http://localhost:4242/api/education/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(educationData),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);

        form.reset();

        addEducationButton.style.display = "block";
        educationForm.style.display = "none";

        const listItem = document.createElement("li");
        const startDateElement = document.createElement("h5");
        const degreeElement = document.createElement("h4");
        const institutionElement = document.createElement("h6");
        const editButton = document.createElement("button");
        const deleteButton = document.createElement("button");

        startDateElement.textContent = startDate + " - " + endDate;
        degreeElement.textContent = degree;
        institutionElement.textContent = institution;
        editButton.textContent = "Edit";
        deleteButton.textContent = "Delete";
        deleteButton.setAttribute("data-education-id", data.id);
        editButton.setAttribute("data-education-id", data.id);

        editButton.addEventListener("click", () => {
          createEditForm(data, listItem);
        });

        deleteButton.addEventListener("click", () => {
          deleteEducation(data.id);
        });

        listItem.appendChild(startDateElement);
        listItem.appendChild(degreeElement);
        listItem.appendChild(institutionElement);
        listItem.appendChild(editButton);
        listItem.appendChild(deleteButton);
        educationList.appendChild(listItem);

        location.reload();
      })
      .catch((error) => {
        console.error(error);
      });
  });
});

fetch("http://localhost:4242/api/idioma/getAll")
  .then((response) => response.json())
  .then((data) => {
    const languageList = document.querySelector(".idioma");

    languageList.innerHTML = "";

    data.forEach((language) => {
      const listItem = document.createElement("li");
      const languageName = document.createElement("span");
      const percentContainer = document.createElement("span");
      const percentBar = document.createElement("div");

      languageName.classList.add("texto");
      percentContainer.classList.add("percent");
      percentBar.style.width = `${language.percent}%`;

      languageName.textContent = language.name;

      percentContainer.appendChild(percentBar);

      listItem.appendChild(languageName);
      listItem.appendChild(percentContainer);

      languageList.appendChild(listItem);
    });
  })
  .catch((error) => {
    console.error(error);
  });

document.addEventListener("DOMContentLoaded", () => {
  const addLanguageButton = document.getElementById("addLanguageButton");
  const languageForm = document.getElementById("languageForm");
  const languageList = document.querySelector(".idioma");

  addLanguageButton.addEventListener("click", () => {
    addLanguageButton.style.display = "none";
    languageForm.style.display = "block";
  });

  const form = document.getElementById("languageForm");

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    const language = document.getElementById("languageInput").value;
    const proficiency = document.getElementById("proficiencyInput").value;

    const languageData = {
      name: language,
      percent: proficiency,
    };

    fetch("http://localhost:4242/api/idioma/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(languageData),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);

        form.reset();

        addLanguageButton.style.display = "block";
        languageForm.style.display = "none";

        const listItem = document.createElement("li");
        const languageName = document.createElement("span");
        const percentContainer = document.createElement("span");
        const percentBar = document.createElement("div");

        languageName.classList.add("texto");
        percentContainer.classList.add("percent");
        percentBar.style.width = `${data.percent}%`;

        languageName.textContent = data.name;

        percentContainer.appendChild(percentBar);

        listItem.appendChild(languageName);
        listItem.appendChild(percentContainer);

        languageList.appendChild(listItem);
      })
      .catch((error) => {
        console.error(error);
      });
  });
});

document.addEventListener("DOMContentLoaded", () => {
  const deleteLanguageButton = document.getElementById("deleteLanguageButton");
  const deleteModal = document.getElementById("deleteModal");
  const languageSelect = document.getElementById("languageSelect");
  const confirmDeleteButton = document.getElementById("confirmDeleteButton");

  deleteLanguageButton.addEventListener("click", () => {
    fetch("http://localhost:4242/api/idioma/getAll")
      .then((response) => response.json())
      .then((data) => {
        languageSelect.innerHTML = "";

        data.forEach((language) => {
          const option = document.createElement("option");
          option.value = language.id;
          option.textContent = language.name;
          languageSelect.appendChild(option);
        });

        deleteModal.style.display = "block";
      })
      .catch((error) => {
        console.error(error);
      });
  });
  // ...

  const cancelDeleteButton = document.getElementById("cancelDeleteButton");

  cancelDeleteButton.addEventListener("click", hideModal);

  function hideModal() {
    const modal = document.getElementById("deleteModal");
    modal.classList.remove("show");
    modal.style.display = "none";
  }

  // ...

  confirmDeleteButton.addEventListener("click", () => {
    const selectedLanguageId = languageSelect.value;

    if (selectedLanguageId) {
      deleteLanguage(selectedLanguageId);
    }
  });

  function deleteLanguage(languageId) {
    fetch(`http://localhost:4242/api/idioma/delete/${languageId}`, {
      method: "DELETE",
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);

        const optionToRemove = languageSelect.querySelector(
          `option[value="${languageId}"]`
        );
        optionToRemove.remove();

        deleteModal.style.display = "none";
        location.reload();
      })
      .catch((error) => {
        console.error(error);
      });
  }
});

fetch("http://localhost:4242/api/skills/getAll")
  .then((response) => response.json())
  .then((data) => {
    const skillsContainer = document.querySelector(".skills");
    skillsContainer.innerHTML = "";

    const skillsTitle = document.createElement("h3");
    skillsTitle.textContent = "Skills";
    skillsContainer.appendChild(skillsTitle);

    data.forEach((skill) => {
      const skillBox = document.createElement("div");
      skillBox.classList.add("box");

      const skillName = document.createElement("h4");
      skillName.textContent = skill.name;

      const skillPercentContainer = document.createElement("span");
      skillPercentContainer.classList.add("percent");

      const skillPercent = document.createElement("div");
      skillPercent.style.width = `${skill.percent}%`;

      skillPercentContainer.appendChild(skillPercent);
      skillBox.appendChild(skillName);
      skillBox.appendChild(skillPercentContainer);

      if (token) {
        const editButton = document.createElement("button");
        editButton.textContent = "Editar";
        editButton.classList.add("editButton");
        editButton.addEventListener("click", () => {
          openModal(skill, data);
        });
        skillBox.appendChild(editButton);
      }
      skillsContainer.appendChild(skillBox);
    });
  })
  .catch((error) => {
    console.error("Ocorreu um erro:", error);
  });

function openModal(skill, data) {
  const modal = document.getElementById("editModal");
  const percentRange = document.getElementById("percentRange");
  const percentValue = document.getElementById("percentValue");

  percentRange.value = skill.percent;

  modal.style.display = "block";

  percentValue.textContent = percentRange.value + "%";

  percentRange.addEventListener("input", () => {
    const selectedPercent = percentRange.value;
    percentValue.textContent = selectedPercent + "%";
  });

  const saveButton = document.getElementById("saveButton");
  saveButton.addEventListener("click", saveChanges);

  const cancelButton = document.getElementById("cancelButton");
  cancelButton.addEventListener("click", cancelChanges);

  function saveChanges() {
    const selectedPercent = percentRange.value;

    skill.percent = parseInt(selectedPercent);

    const url = `http://localhost:4242/api/skills/update/${skill.id}`;
    fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(skill),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Informação atualizada com sucesso:", data);
        closeModal();
        location.reload();
      })
      .catch((error) => {
        console.error("Ocorreu um erro ao atualizar a informação:", error);
      });
  }

  function cancelChanges() {
    closeModal();
  }

  function closeModal() {
    saveButton.removeEventListener("click", saveChanges);
    cancelButton.removeEventListener("click", cancelChanges);

    // Oculta o modal
    modal.style.display = "none";
  }
}

document.addEventListener("DOMContentLoaded", function () {
  const addSkillButton = document.getElementById("addSkillButton");

  const addSkillModal = document.getElementById("addSkillModal");
  const addSkillForm = document.getElementById("addSkillForm");
  const skillNameInput = document.getElementById("skillName");
  const skillPercentRange = document.getElementById("addSkillPercentRange");
  const addSkillPercentValue = document.getElementById("addSkillPercentValue");

  addSkillPercentRange.value = 0;

  addSkillPercentRange.addEventListener("input", updateAddSkillPercent);

  function updateAddSkillPercent() {
    const selectedPercent = addSkillPercentRange.value;
    addSkillPercentValue.textContent = selectedPercent + "%";
  }

  const token = localStorage.getItem("token");
  if (token) {
    addSkillButton.addEventListener("click", openAddSkillModal);
  } else {
    addSkillButton.style.display = "none";
  }

  addSkillForm.addEventListener("submit", saveNewSkill);

  const closeButton = addSkillModal.querySelector(".close");
  closeButton.addEventListener("click", closeAddSkillModal);

  function openAddSkillModal() {
    addSkillModal.style.display = "block";
  }

  function closeAddSkillModal() {
    addSkillModal.style.display = "none";
  }

  function saveNewSkill(event) {
    event.preventDefault();

    const newSkill = {
      name: skillNameInput.value,
      percent: parseInt(skillPercentRange.value),
    };

    fetch("http://localhost:4242/api/skills/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newSkill),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Nova skill adicionada com sucesso:", data);
        closeAddSkillModal();
        location.reload();
      })
      .catch((error) => {
        console.error("Ocorreu um erro ao adicionar a nova skill:", error);
      });
  }
});

fetch("http://localhost:4242/api/experience/getAll")
  .then((response) => response.json())
  .then((data) => {
    experienceSection.innerHTML = "";

    const h3Experience = document.createElement("h3");
    h3Experience.textContent = "Experiência";
    experienceSection.appendChild(h3Experience);

    data.forEach((experience) => {
      const box = document.createElement("div");
      box.classList.add("box");

      const anoEmpresa = document.createElement("div");
      anoEmpresa.classList.add("ano_empresa");

      const h5StartDateEndDate = document.createElement("h5");
      h5StartDateEndDate.textContent =
        experience.startDate + " - " + experience.endDate;

      const h5CompanyName = document.createElement("h5");
      h5CompanyName.textContent = experience.companyName;

      anoEmpresa.appendChild(h5StartDateEndDate);
      anoEmpresa.appendChild(h5CompanyName);

      const text = document.createElement("div");
      text.classList.add("text");

      const h4Position = document.createElement("h4");
      h4Position.textContent = experience.position;

      const pDescription = document.createElement("p");
      pDescription.textContent = experience.description;

      text.appendChild(h4Position);
      text.appendChild(pDescription);

      box.appendChild(anoEmpresa);
      box.appendChild(text);

      experienceSection.appendChild(box);
    });

    experienceSection.appendChild(addButton);
  })
  .catch((error) => {
    console.error(error);
  });

document.addEventListener("DOMContentLoaded", () => {
  const experienceSection = document.querySelector(".infoE");

  fetch("http://localhost:4242/api/experience/getAll")
    .then((response) => response.json())
    .then((data) => {
      experienceSection.innerHTML = "";

      const h3Experience = document.createElement("h3");
      h3Experience.textContent = "Experiência";
      experienceSection.appendChild(h3Experience);

      data.forEach((experience) => {
        const box = document.createElement("div");
        box.classList.add("box");

        const anoEmpresa = document.createElement("div");
        anoEmpresa.classList.add("ano_empresa");

        const h5StartDateEndDate = document.createElement("h5");
        h5StartDateEndDate.textContent =
          experience.startDate + " - " + experience.endDate;

        const h5CompanyName = document.createElement("h5");
        h5CompanyName.textContent = experience.companyName;

        anoEmpresa.appendChild(h5StartDateEndDate);
        anoEmpresa.appendChild(h5CompanyName);

        const text = document.createElement("div");
        text.classList.add("text");

        const h4Position = document.createElement("h4");
        h4Position.textContent = experience.position;

        const pDescription = document.createElement("p");
        pDescription.textContent = experience.description;

        text.appendChild(h4Position);
        text.appendChild(pDescription);

        box.appendChild(anoEmpresa);
        box.appendChild(text);

        experienceSection.appendChild(box);
      });
    })
    .catch((error) => {
      console.error(error);
    });
});

document.addEventListener("DOMContentLoaded", () => {
  const token = localStorage.getItem("token");

  if (token) {
    const addEducationButton = document.getElementById("addEducationButton");
    addEducationButton.style.display = "block";
    addEducationButton.addEventListener("click", addEducationHandler);

    const addLanguageButton = document.getElementById("addLanguageButton");
    addLanguageButton.style.display = "block";
    addLanguageButton.addEventListener("click", addLanguageHandler);

    const deleteLanguageButton = document.getElementById(
      "deleteLanguageButton"
    );
    deleteLanguageButton.style.display = "block";
    deleteLanguageButton.addEventListener("click", deleteLanguageHandler);
  } else {
    const addEducationButton = document.getElementById("addEducationButton");
    addEducationButton.style.display = "none";

    const addLanguageButton = document.getElementById("addLanguageButton");
    addLanguageButton.style.display = "none";

    const deleteLanguageButton = document.getElementById(
      "deleteLanguageButton"
    );
    deleteLanguageButton.style.display = "none";
  }
});

function addEducationHandler(event) {
  event.preventDefault();

  const educationForm = document.getElementById("educationForm");
  educationForm.style.display = "block";
}

function addLanguageHandler(event) {
  event.preventDefault();
  const languageForm = document.getElementById("languageForm");
  languageForm.style.display = "block";
}

function deleteLanguageHandler(event) {
  event.preventDefault();

  const deleteModal = document.getElementById("deleteModal");
  deleteModal.style.display = "block";
}
