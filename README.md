# SUTRA — The Venture Catalyst
> **"Connecting Idea to Opportunity."**  
> *One connecting thread. Every stage of entrepreneurship.*

SUTRA is a modern, responsive, and cohesive startup ecosystem platform engineered to bridge the Idea-to-Action Gap. It unifies verified government schemes, AI venture readiness diagnostics, vetted co-builders, multi-venture portfolio management, and ecosystem guidance into one connected workspace.

---

## 🌟 Key Features

1. **Public Marketing Showcase**
   - Brand identity with the signature SUTRA leaf and connecting thread logo.
   - Comprehensive problem and solution breakdown addressing founder overload, resource inequality, and network dependency.
   - Interactive live dashboard preview and 5-stage roadmap overview.

2. **Authentication & Multi-Role Onboarding**
   - Separate onboarding paths for **Founders** (stage, sector, support needs, first venture setup) and **Freelancers** (services, rates, portfolio, availability).
   - Instant 1-Click Demo accounts for rapid evaluation (`Demo Founder` and `Demo Freelancer`).

3. **Founder Cockpit & Multi-Venture Management**
   - Manage multiple independent startups from a single account.
   - Dynamic venture switcher instantly shifts dashboard context, milestones, readiness scores, and application records.
   - Add, edit, archive, and delete ventures with confirmation.

4. **Opportunities & Government Schemes**
   - Verified Indian & Global funding sources: **Startup India Seed Fund Scheme (SISFS)**, **BIRAC BIG**, **NIDHI-PRAYAS**, **MeitY TIDE 2.0**, **Y Combinator**, **AWS Activate**, and **National Startup Awards**.
   - Filtering across Categories, Stages, Sectors, and Cutoff Deadlines.
   - Genuine official portal links for applications.
   - In-app application tracker (Applied, Under Review, Shortlisted, Accepted, Not Selected).

5. **AI Venture Readiness Assessment**
   - Comprehensive 9-pillar interactive diagnostic:
     1. Problem & Solution
     2. Target Customers & Beachhead
     3. Market Moat & Defensibility
     4. Business Model & Willingness to Pay
     5. Financial Planning & Runway
     6. Team Execution Capabilities
     7. Product / MVP Development
     8. Execution Traction & Feedback
     9. Legal, Corporate & DPIIT Compliance
   - Detailed visual report with radar breakdown, identified strengths, critical vulnerabilities, and practical next steps.
   - History tracking per venture and print/PDF export support.

6. **Vetted Freelancer Marketplace & Dedicated Workspace**
   - Browse vetted designers, full-stack engineers, and startup lawyers.
   - Send project inquiries with specific deliverables and proposed budgets.
   - Dedicated Freelancer Dashboard for receiving, accepting, and replying to founder scopes.

7. **Knowledge Hub & Ecosystem Mentors**
   - Curated founder toolkits: validation checklists, DPIIT registration blueprints, pitch deck formulas, and downloadable financial models.
   - 1-on-1 mentor introductions with connection tracking.

8. **Ask SUTRA AI Assistant & Notification Center**
   - Context-aware chatbot grounded in your active venture's stage and sector.
   - Deadlines and scheme update notifications.

---

## 🚀 Getting Started

### 1. Prerequisites
- Node.js (v18 or newer recommended, tested on v26)
- npm or yarn

### 2. Installation
```bash
# Clone or navigate to the project directory
cd /path/to/prototype

# Install dependencies
npm install
```

### 3. Running Locally
```bash
# Start Vite development server
npm run dev
```
Open **http://localhost:5173** in your browser.

### 4. Building for Production
```bash
npm run build
npm run preview
```

---

## ⚙️ Environment Variables & External Configurations

Create a `.env` file in the root directory if connecting to live Firebase and LLM APIs:

```env
# Optional Firebase Credentials
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id

# Optional LLM / Gemini API Key for Ask SUTRA
VITE_GEMINI_API_KEY=your_gemini_api_key
```

*Note: SUTRA includes a built-in reactive local persistence and rule-based diagnostic engine, so the entire application functions 100% out of the box even without external API credentials.*

---

## 🎨 Design System
- **Royal Blue**: `#2563EB` (Primary buttons, active states, key CTAs)
- **Navy Blue**: `#0F2B5B` (Headings, primary brand contrast)
- **Cloud White**: `#F4F7FC` (Clean page backgrounds)
- **Pure White**: `#FFFFFF` (Card surfaces)
- **Teal**: `#14B8A6` (AI diagnostics and intelligence)
- **Growth Green**: `#22C55E` (Milestones completed, positive progress)
- **Amber**: `#F59E0B` (Deadlines and risk alerts)
# Sutra
