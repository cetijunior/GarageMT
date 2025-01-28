const scrollToSection = (sectionId) => {
  const section = document.getElementById(sectionId);
  if (section) {
    // Use history.replaceState to prevent adding a new entry to browser history
    history.replaceState(null, '', window.location.pathname);

    section.scrollIntoView({
      behavior: "smooth",
      block: "start"
    });
  }
};

const handleNavigation = (sectionId) => {
  if (window.location.pathname !== "/") {
    navigate("#");
    setTimeout(() => {
      // Ensure section is scrolled after navigation
      const section = document.getElementById(sectionId);
      if (section) {
        history.replaceState(null, '', window.location.pathname);
        section.scrollIntoView({
          behavior: "smooth",
          block: "start"
        });
      }
    }, 300);
  } else {
    scrollToSection(sectionId);
  }
};