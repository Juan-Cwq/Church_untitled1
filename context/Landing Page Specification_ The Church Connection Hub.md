# Landing Page Specification: The Church Connection Hub

## 1. Strategy & Target Audience

| Category | Detail | Source |
| :--- | :--- | :--- |
| **Page Goal** | Drive immediate adoption and first-time use of the new digital platform. The primary conversion is a click-through to the **Frictionless Group Finder** custom component. | |
| **Target Avatar** | **Sarah "The Seeker" Miller** (Problem Aware) | `problem_aware_avatar.md` |
| **Core Pain Point** | **Loneliness and Frustration** caused by disorganized, fragmented church communication (broken links, buried PDFs, wasted time searching). | `problem_aware_avatar.md` (Section D & E) |
| **Core Message** | **"Frictionless Connection."** The page must validate her pain and offer immediate, emotional relief. The focus is on the *result* (belonging) not the *features* (API integration). | `research_summary.md` |
| **Brand Voice** | Reassuring, Confident, and Inviting. The tone must feel like a supportive guide. | `brand_identity_design_system.md` |

## 2. Page Structure & Content

The page is designed as a single-scroll narrative that follows the Problem Aware sales letter structure: **Acknowledge Pain → Agitate → Present Solution as Relief → Call to Action.**

| Section | Title/Headline (H2) | Primary Copy Focus (Voice) | Key Visual/Component | Technical Notes (Design System Reference) |
| :--- | :--- | :--- | :--- | :--- |
| **A. Hero Section** | **Stop Feeling Like a Stranger in Your Own Church.** | **Headline (H1):** Validate the pain. **Sub-Headline:** "The Connection Hub is your single, simple path to finding your people, your purpose, and your place." | Image: A diverse group of people laughing in a small group setting. Overlayed with the **Gradient Base** (Rose Pink to Mint Green) for warmth. | **Typography:** H1 uses Secondary Font (DM Serif Display) for impact. CTA Button uses **Ocean Blue** primary color with a subtle **Button Hover** micro-interaction. |
| **B. Pain Validation** | **Tired of the Digital Scavenger Hunt?** | Directly address her top frustrations (D. Top 3 Frustrations): "No more broken links. No more buried PDFs. No more wasted time searching for the one thing you need." | Iconography: Three **Heroicons** (e.g., Broken Link, File Icon, Clock) rendered in **Error** functional color, followed by a checkmark in **Success** color. | **Layout:** Three-column layout using **Light Gray** background to separate the section. Uses **Medium Gray** for secondary text. |
| **C. The Solution (Benefit-Focused)** | **Find Your People. Find Your Place. Instantly.** | Pivot to the solution's *benefit*. Focus on the three key areas of connection: **Small Groups, Events, Volunteering.** Use emotive language (E. Dominant Positive Emotions: Relief, Belonging). | **Custom Component Preview:** A clean, static screenshot of the **Frictionless Group Finder** component, highlighting the simple filter and one-click join button. | **Custom Component:** Screenshot must adhere to the **Intuitive** Brand Essence. Use **Inter** (Primary Font) for all body copy. |
| **D. Social Proof** | **"I finally feel plugged in."** | Use a short, powerful testimonial that echoes Sarah's journey (e.g., "I used to feel so lonely. Now I have a group I can call on."). | **Testimonial Carousel (MagicUI):** A rotating carousel of 3-4 short, authentic quotes with Avatars. | **Micro-Interaction:** Use the **Scroll Animation** from MagicUI to reveal this section smoothly. Use **Rose Pink** as a background accent color. |
| **E. Feature Bridge** | **What You Can Do in Under 5 Minutes.** | Briefly list the *actions* she can take. This bridges the gap between the emotional problem and the functional solution. *1. Filter groups by interest. 2. Register for the retreat. 3. Sync events to your calendar.* | **Member Dashboard Widget Preview:** A clean, personalized screenshot of the custom dashboard widget showing "Next Group Meeting." | **Component:** Use a **Disclosure (Accordion)** component (21st.dev) to hide technical details, keeping the focus on simplicity. |
| **F. Final Call to Action** | **Ready to Connect?** | Simple, direct, and reassuring final prompt. Reiterate the zero-risk nature of the offer (F. Price Tolerance: $0.00). | **Primary CTA Button:** Large, centralized button. | **Typography:** H2 uses Secondary Font. CTA uses **Ocean Blue** with a **Semibold (600)** weight. |

## 3. Technical & Design Implementation

| Aspect | Specification | Design System Reference |
| :--- | :--- | :--- |
| **CSS Framework** | Tailwind CSS + DaisyUI. Utility-first approach is mandatory. | `brand_identity_design_system.md` (Implementation Guidelines) |
| **Primary Font** | Inter (sans-serif) for all body text and most UI elements. | `brand_identity_design_system.md` (Typography) |
| **Headline Font** | DM Serif Display (serif) for H1 and H2 tags. | `brand_identity_design_system.md` (Typography) |
| **Color Usage** | Primary CTA: **Ocean Blue** (`#007bff`). Success/Positive Feedback: **Mint Green** (`#90ee90`). Pain/Warning: **Error** (`#E53E3E`). Backgrounds: **Light Gray** (`#EDF2F7`). | `brand_identity_design_system.md` (Color Palette) |
| **Mobile Strategy** | **Mobile-First.** The layout must be fully functional and aesthetically pleasing on the smallest screen (`sm: 640px`). Navigation must collapse to a simple hamburger menu. | `brand_identity_design_system.md` (Responsive Design) |
| **Micro-Interactions** | Implement **Button Hover** and **Scroll Animations** (using Framer Motion) to give the page a polished, modern feel and enhance the sense of quality and reliability. | `brand_identity_design_system.md` (Micro-Interactions & Animation Library) |
| **Accessibility** | Strict adherence to WCAG AA. Ensure proper color contrast, especially on the gradient background, and visible focus indicators for all interactive elements. | `brand_identity_design_system.md` (Accessibility) |
| **Key Component** | The primary conversion point links directly to the **Frictionless Group Finder** (Custom Component 1). | `research_summary.md` |

## 4. Call to Action (CTA) Matrix

The primary CTA must be clear, singular, and repeated strategically.

| Location | CTA Text | Button Style | Goal |
| :--- | :--- | :--- | :--- |
| **Hero Section** | **Find Your Group Now (1-Click)** | Primary (Ocean Blue, Solid) | Immediate conversion/click-through. |
| **After Pain Validation (Section B)** | **Stop Searching. Start Connecting.** | Secondary (Ocean Blue, Outline) | Reassurance and encouragement to scroll. |
| **Final Section (F)** | **Take the First Step: Find Your Community** | Primary (Ocean Blue, Solid) | Final, high-impact conversion point. |

This specification ensures that the landing page is not only visually consistent with the Brand Identity & Design System but is also strategically focused on the emotional and relational needs of the Problem Aware customer, Sarah Miller. The page's success will be measured by the click-through rate on the primary CTA.
