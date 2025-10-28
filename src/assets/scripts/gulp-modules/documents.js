import { gsap, ScrollTrigger, CustomEase, CSSRulePlugin } from 'gsap/all';
gsap.registerPlugin(ScrollTrigger, CustomEase, CSSRulePlugin);




document.addEventListener('DOMContentLoaded', function() {
  gsap.timeline().fromTo(".page-title__wrap", {
    y:-150,
    opacity:0
  }, {
    y:0,
    opacity:1
  }).fromTo(".documents-page-list", {
    y:150,
    opacity:0
  }, {
    y:0,
    opacity:1,
    stagger:0.2
  }, "<")

})


const listWrapper = document.querySelectorAll('.documents-page-card-content-inner');
listWrapper.forEach(wrapper => {
  wrapper.addEventListener('click', function(event) {
    const button = event.target.closest('.documents-page-card-content-btn');

    if (button) {
      const dataId = button.getAttribute('data-id');

      // Check if data-id is null and log an error if it is
      if (!dataId) {
        console.error('Button does not have a valid data-id attribute.');
        return; // Exit the function if data-id is null
      }

      const cardContent = button.closest('.documents-page-card-content');

      // Remove the active class from all buttons in this block
      cardContent.querySelectorAll('.documents-page-card-content-btn').forEach(btn => {
        btn.classList.remove('active');
      });

      // Add the active class to the clicked button
      button.classList.add('active');

      // Hide all lists in this block
      cardContent.querySelectorAll('.documents-page-card-content-list').forEach(list => {
        list.style.display = 'none';
      });

      // Show the list that matches the data-id of the clicked button
      const activeList = cardContent.querySelector(
        `.documents-page-card-content-list[data-id="${dataId}"]`,
      );

      if (activeList) {
        activeList.style.display = 'flex';
      } else {
        console.warn(`No list found with data-id="${dataId}"`);
      }
    }
  });
});
document.addEventListener('DOMContentLoaded', () => {
  // Select all blocks on the page
  const contentBlocks = document.querySelectorAll('.documents-page-card-content');

  contentBlocks.forEach(block => {
    // Hide all lists with a valid data-id within this block initially
    block.querySelectorAll('.documents-page-card-content-list').forEach(list => {
      if (list.hasAttribute('data-id')) {
        list.style.display = 'none';
      }
    });

    // Find and activate the button with data-id="1" within this block
    const defaultButton = block.querySelector('.documents-page-card-content-btn[data-id="1"]');
    const defaultList = block.querySelector('.documents-page-card-content-list[data-id="1"]');

    if (defaultButton) {
      // Add the active class to the button
      defaultButton.classList.add('active');
    }

    // Show the associated list with data-id="1" if it exists
    if (defaultList) {
      defaultList.style.display = 'flex';
    }
  });
});


