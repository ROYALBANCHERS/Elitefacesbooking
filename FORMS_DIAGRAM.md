# Complete Forms Overview

## 1. Welcome Modal (Appears on First Visit)

```
┌─────────────────────────────────────────────────────┐
│                 Welcome Modal                        │
├─────────────────────────────────────────────────────┤
│                                                      │
│  STEP 1: GREETING                                   │
│  ═══════════════════════════════════════════════    │
│                                                      │
│  ✨                                                  │
│  Welcome to EliteFaces!                             │
│                                                      │
│  Ready to book your perfect celebrity, influencer,  │
│  magician, or anchor for your next big event?       │
│                                                      │
│  [BOOK NOW Button]    [BROWSE FIRST Button]        │
│                                                      │
│ ─────────────────────────────────────────────────── │
│                                                      │
│  STEP 2: BOOKING FORM                               │
│  ═══════════════════════════════════════════════    │
│                                                      │
│  Full Name *                          Phone *       │
│  [________________]                  [____________]  │
│                                                      │
│  Company Name *                       Location *    │
│  [________________]                  [____________]  │
│                                                      │
│  What are you looking for? *                        │
│  [Dropdown: Celebrity/Influencer/Magician/Anchor]  │
│                                                      │
│  Preferred Celebrity (Optional)   Event Date *      │
│  [________________]               [_____________]    │
│                                                      │
│  Additional Details (Optional)                      │
│  [                                                   │
│   Tell us more about your event...                  │
│   (3 line textarea)                                 │
│  ]                                                   │
│                                                      │
│  [SUBMIT BOOKING REQUEST]    [BACK]                │
│                                                      │
│ ─────────────────────────────────────────────────── │
│                                                      │
│  SUCCESS STATE:                                     │
│  ✓ Booking Request Received!                        │
│  Thank you {name}!                                  │
│  We'll contact you shortly at {phone}              │
│  Redirecting...                                     │
│                                                      │
└─────────────────────────────────────────────────────┘
```

**Booking Types Dropdown:**
```
▼ What are you looking for?
├─ Celebrity
├─ Influencer
├─ Magician
├─ Anchor
└─ Other
```

**Data Sent to Email:**
```
{
  to_email: 'elitefacesbooking@gmail.com',
  from_name: 'John Doe',
  from_phone: '+91 98765 43210',
  from_company: 'XYZ Brands',
  location: 'Mumbai, India',
  booking_type: 'Celebrity',
  preferred_celebrity: 'Celebrity Name',
  event_date: '2024-03-15',
  additional_details: 'Custom requirements...',
  message: 'Full formatted message'
}
```

---

## 2. Celebrity Booking Modal (When clicking on celebrity card)

```
┌──────────────────────────────────────────────┐
│          Book: [Celebrity Name]              │
├──────────────────────────────────────────────┤
│                                              │
│  Full Name *              Email *            │
│  [________________]      [________________]   │
│                                              │
│  Event Date *             Event Location *   │
│  [_____________]         [________________]   │
│                                              │
│  What's your booking?                        │
│  [Dropdown: All booking types]              │
│                                              │
│  Tell us more about requirements...          │
│  [                                           │
│   (3 line textarea)                          │
│  ]                                           │
│                                              │
│  [SUBMIT REQUEST]   [Close]                 │
│                                              │
└──────────────────────────────────────────────┘
```

**Data Sent to Email:**
```
{
  to_email: 'elitefacesbooking@gmail.com',
  from_name: 'John Doe',
  from_email: 'john@example.com',
  celebrity_name: 'Celebrity Name',
  event_type: 'Brand Endorsement',
  event_date: '2024-03-15',
  event_location: 'Mumbai',
  requirements: 'Specific details...',
  category: 'Actor/Model/Influencer'
}
```

---

## 3. AI Expert Consultant Form (Homepage)

```
┌────────────────────────────────────────────────────┐
│          Talent Consultant (AI Powered)            │
├────────────────────────────────────────────────────┤
│                                                    │
│  Not sure who to pick? Let our intelligent        │
│  advisor recommend the perfect talent             │
│                                                    │
│  Campaign Goal *          Target Audience *        │
│  [______________]        [__________________]     │
│  e.g. Luxury Car         e.g. Gen Z               │
│                                                    │
│  Budget Scale *                                    │
│  [Dropdown Options]                               │
│  ├─ Premium (Tier 1 Stars)                        │
│  ├─ Medium (Mid-range Stars)                      │
│  └─ Digital Only (Emerging Talent)                │
│                                                    │
│  [GENERATE EXPERT ADVICE]                         │
│                                                    │
│ ────────────────────────────────────────────────  │
│                                                    │
│  RESPONSE BOX (After Submit):                     │
│  [AI Generated Recommendations...]                │
│  (Scrollable box with detailed advice)            │
│                                                    │
└────────────────────────────────────────────────────┘
```

**Form Inputs:**
- Campaign Goal: Text input (e.g., "Luxury Car Launch")
- Target Audience: Text input (e.g., "Gen Z Professionals")
- Budget Scale: Select dropdown with 3 options

**Response Format:**
AI generates detailed recommendations about which talent fits best based on inputs.

---

## 4. Contact Us Form (On Contact Page)

```
┌──────────────────────────────────────────────────┐
│         Get In Touch - Contact Us               │
├──────────────────────────────────────────────────┤
│                                                  │
│  Your Name *              Your Email *           │
│  [________________]       [_________________]    │
│                                                  │
│  Company Name *           Phone *                │
│  [________________]       [_________________]    │
│                                                  │
│  Subject *                                       │
│  [_________________________________]            │
│                                                  │
│  Message *                                       │
│  [                                               │
│   Write your message here...                     │
│   (5 line textarea)                              │
│  ]                                               │
│                                                  │
│  [SEND MESSAGE]                                  │
│                                                  │
│ ─────────────────────────────────────────────── │
│                                                  │
│  Contact Information:                            │
│  Email: elitefacesbooking@gmail.com              │
│  Phone: [Your Phone]                             │
│  Address: [Your Address]                         │
│                                                  │
└──────────────────────────────────────────────────┘
```

---

## Form Field Reference

### Required Fields (marked with *)
| Form | Required Fields |
|------|-----------------|
| Welcome Modal | Name, Phone, Company, Location, Booking Type, Event Date |
| Celebrity Booking | Name, Email, Event Date, Location, Event Type |
| AI Consultant | Campaign Goal, Target Audience, Budget Scale |
| Contact Us | Name, Email, Company, Phone, Subject, Message |

### Optional Fields
| Form | Optional Fields |
|------|-----------------|
| Welcome Modal | Preferred Celebrity, Additional Details |
| Celebrity Booking | Requirements |
| AI Consultant | None |
| Contact Us | None |

---

## Email Template Variables

### Welcome Modal Email Variables
```
{{from_name}} → Full Name
{{from_phone}} → Phone Number
{{from_company}} → Company Name
{{location}} → Location
{{booking_type}} → Selected booking type
{{preferred_celebrity}} → Preferred talent name
{{event_date}} → Event date
{{additional_details}} → Extra requirements
{{message}} → Full formatted message
```

### Celebrity Booking Email Variables
```
{{from_name}} → Full Name
{{from_email}} → Email Address
{{celebrity_name}} → Celebrity Name
{{event_type}} → Booking Type
{{event_date}} → Event Date
{{event_location}} → Location
{{requirements}} → Special requirements
{{category}} → Celebrity Category
```

### Contact Us Email Variables
```
{{from_name}} → User's Name
{{from_email}} → User's Email
{{from_company}} → Company Name
{{from_phone}} → Phone Number
{{subject}} → Subject Line
{{message}} → Message Content
```

---

## Form Validation Rules

### Text Fields
- Required fields cannot be empty
- Name fields: minimum 2 characters

### Email Fields
- Must be valid email format
- Example: user@example.com

### Phone Fields
- No specific format enforced
- Accept any format (e.g., +91, (123) 456-7890, etc.)

### Date Fields
- Must be valid date format
- Browser date picker ensures correct format

### Textarea Fields
- No minimum length
- Can be left empty if optional

### Dropdown Fields
- Must select one option
- Default values provided

---

## Success Messages

### Welcome Modal Success
```
✓ Booking Request Received!
Thank you for your interest, [Name]!
We'll review your request and contact you shortly at [Phone]
```

### Celebrity Booking Success
```
✓ Request Submitted!
Thank you for your interest in booking [Celebrity Name]
We'll be in touch soon!
```

### Contact Form Success
```
✓ Message Sent Successfully!
Thank you [Name]!
We'll get back to you as soon as possible
```

---

## Error Messages

| Error | When It Appears |
|-------|-----------------|
| "Please fill in all required fields" | Any required field empty |
| "Failed to submit booking" | Email service error |
| "Invalid email format" | Invalid email in field |
| "Please enter a valid phone number" | Invalid phone format |

---

## Mobile Responsive Behavior

### Welcome Modal
- Full width on mobile (with padding)
- Single column layout on small screens
- Stacked buttons
- Touch-friendly input fields
- Scrollable on small screens

### Celebrity Booking
- Same responsive behavior as Welcome Modal
- Adjusts width for mobile devices

### Forms on Other Pages
- All forms stack vertically on mobile
- Buttons expand to full width
- Text inputs become more spacious

---

## Accessibility Features

- All form fields have labels
- Required fields marked with *
- Error messages are readable
- Keyboard navigation supported
- Focus states visible
- Color contrast compliant
- Mobile touch targets (min 44x44px)

---

## Integration Points

| Form | Sends To | Via |
|------|----------|-----|
| Welcome Modal | elitefacesbooking@gmail.com | EmailJS |
| Celebrity Booking | elitefacesbooking@gmail.com | EmailJS |
| Contact Us | elitefacesbooking@gmail.com | EmailJS |
| AI Consultant | Gemini API | Google API |

