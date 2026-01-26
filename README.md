# MedXMentor Website

A modern, responsive website for MedXMentor - a mentorship program for young health professionals in Africa.

## Overview

MedXMentor is a hybrid mentorship program launched in 2022, targeting future health science professionals across Africa. The website showcases the organization's mission, team, resources, and provides a platform for potential mentees and mentors to connect.

## Features

### Design
- **Modern Blue & White Theme**: Primary colors are blue (#2563eb) and white, with gray and black as secondary colors
- **Responsive Design**: Fully responsive layout that works on desktop, tablet, and mobile devices
- **Professional Typography**: Uses Inter font family for clean, readable text
- **Smooth Animations**: Subtle animations and transitions for enhanced user experience

### Pages
1. **Home** (`index.html`): Hero section, features overview, statistics, testimonials
2. **About** (`about.html`): Mission, vision, objectives, and program achievements
3. **The Team** (`team.html`): Leadership team and campus ambassadors from across Africa
4. **Resources** (`resources.html`): Mentorship resources, guides, and newsletter
5. **Contact** (`contact.html`): Contact information, form, and ways to get involved

### Content Features
- Team information sourced from medxmentor.org
- Contact details and social media links
- Mentoring best practices and statistics from mentoring.org
- Campus ambassadors from 5 African countries
- Comprehensive resource library for mentors and mentees

### Interactive Elements
- Mobile-responsive navigation menu
- Contact form with validation
- Newsletter subscription
- Smooth scrolling and animations
- Social media integration

## Technical Details

### File Structure
```
MedXMentor/
├── index.html          # Home page
├── about.html          # About page
├── team.html           # Team page
├── resources.html      # Resources page
├── contact.html        # Contact page
├── css/
│   └── style.css       # Main stylesheet
├── js/
│   └── script.js       # JavaScript functionality
└── README.md           # This file
```

### Technologies Used
- **HTML5**: Semantic markup
- **CSS3**: Modern styling with CSS Grid and Flexbox
- **JavaScript (ES6+)**: Interactive functionality
- **Font Awesome 6.0**: Icons
- **Google Fonts**: Inter typography

### Color Palette
- **Primary Blue**: #2563eb
- **Blue Variants**: #1d4ed8 (dark), #3b82f6 (light)
- **Gray Scale**: #f9fafb to #111827
- **White**: #ffffff
- **Gradients**: Blue gradient backgrounds

### Responsive Breakpoints
- **Desktop**: 1200px+ (max-width container)
- **Tablet**: 768px - 1199px
- **Mobile**: < 768px

## Content Sources

### MedXMentor.org
- Team member information
- Contact details (+256 788 340086, info@medxmentor.org)
- Mission and vision statements
- Program achievements and statistics
- Campus ambassador details

### Mentoring.org
- Mentoring best practices
- Statistical benefits of mentoring
- Resource categories and content inspiration

## Setup Instructions

1. **Download/Clone**: Get all files in the correct directory structure
2. **Open**: Open `index.html` in a web browser
3. **Local Server** (recommended): Use a local server for best experience
   - Python: `python -m http.server 8000`
   - Node.js: `npx serve .`
   - VS Code: Use Live Server extension

## Customization

### Adding New Team Members
1. Open `team.html`
2. Add new `.team-member` or `.ambassador-card` div
3. Update the content with member details

### Updating Contact Information
1. Update contact details in all page footers
2. Modify contact form action if integrating with a backend service

### Adding Resources
1. Open `resources.html`
2. Add new `.resource-item` divs in appropriate categories
3. Update links to actual resource files

### Color Scheme Changes
1. Modify CSS custom properties in `:root` section of `style.css`
2. Update gradient definitions if needed

## Integration Opportunities

### Form Handling
- Contact form can be integrated with services like:
  - Formspree
  - Netlify Forms
  - Custom backend API

### Newsletter
- Newsletter signup can connect to:
  - Mailchimp
  - ConvertKit
  - Custom email service

### Analytics
- Add Google Analytics or similar tracking
- Social media click tracking is prepared in JavaScript

### Content Management
- Can be converted to use CMS like:
  - WordPress
  - Strapi
  - Contentful

## Browser Support
- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## Performance Features
- Optimized CSS with minimal unused styles
- Efficient JavaScript with event delegation
- Semantic HTML for better SEO
- Responsive images support ready

## Accessibility
- Semantic HTML structure
- Proper heading hierarchy
- Alt text support for images
- Keyboard navigation support
- Color contrast compliance

## Future Enhancements
- Blog/News section
- Member login portal
- Event calendar
- Resource downloads
- Multi-language support
- Dark mode toggle

## Contact
For questions about this website implementation, refer to the contact information provided on the website or the original MedXMentor organization.
