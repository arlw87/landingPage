# Landing Page

## What is it?

Single page website that uses HTML, CSS and vanilla Javascript to create an interactive navigational experience for the user. The webpage is for a fictitious book club.

## Overview

The website provides a simple and clean interface for the user that is responsive to varies desktop / laptop screen sizes. It has the following features:

1. Navigation Bar
2. Header Banner
3. Sections
4. Floating Scroll to top button
5. Footer

# Navigation Bar

The navigation bar provides links to the varies section of the webpage on the right and a link to return to the top of the webpage on the left.

The links are created dynamically, depending on what sections are in the HTML, using Javascript

The navigation bar is fixed to the top of the viewport, when the user scrolls down from the top of the page the navigation bar has a shadow style added to it to distinguish it from the rest of the pages content.

When user hovers over the navigation links a transform effect is used to enlarge the link, to emphasise to the user that their pointer is on that link.

The navigation links will also underline when the section that that navigation link represents is on the screen.

Finally clicking on the navigational link with smoothly scroll the viewport to that section of the webpage.

# Header Banner

The header takes up most of the page when the page first loads. This provides a nice clean introduction to the webpage. It shows what the webpage is for and a opening image of books.

The header also includes a nice animation fading in and out different text, that are quotes about the book club.

# Sections

The webpage includes four sections each with:

- An image set using the background image css properties
- A text container with:
  - A title
  - Text about that section
  - A button with an action relevant to that section (note the button dont do anything)

Each section has its own accent color for the underline of the title and the button. The button button style changes to add a shadow on a hover action.

The sections alternate which side the image is on use the flex box order property and class definitions.

# Floating scroll to the top button

A button that when clicked will smoothly scroll the viewport back to the top of the page. This button is fixed to the bottom right of the viewport and only appears after the user has scrolled so the first section is visible. It uses a fade in animation with CSS when it appears.

# Footer

A basic footer than is black to contrast with the white of the rest of the page.
