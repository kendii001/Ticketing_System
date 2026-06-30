sherehesasa/
│
├── app/
│   ├── page.tsx                  # Landing page
│   ├── home/
│   ├── about/
│   ├── pricing/
│   ├── blog/
│   ├── help/
│   ├── contact/
│   │
│   ├── events/
│   │   ├── page.tsx              # Browse all events
│   │   └── [id]/
│   │       └── page.tsx          # Event details
│   │
│   ├── auth/
│   │   ├── login/
│   │   └── register/
│   │
│   ├── organizer/
│   │   ├── dashboard/
│   │   ├── events/
│   │   ├── events/create/
│   │   ├── events/[id]/edit/
│   │   ├── tickets/
│   │   ├── sales/
│   │   └── profile/
│   │
│   ├── admin/
│   │   ├── dashboard/
│   │   ├── organizers/
│   │   ├── events/
│   │   ├── events/pending/
│   │   ├── users/
│   │   ├── reports/
│   │   └── settings/
│   │
│   ├── profile/
│   ├── checkout/
│   ├── payment-success/
│   ├── payment-failed/
│   └── layout.tsx
│
├── components/
│   ├── common/
│   │   ├── Navbar.tsx
│   │   ├── Footer.tsx
│   │   ├── Button.tsx
│   │   ├── Loader.tsx
│   │   └── Modal.tsx
│   │
│   ├── events/
│   │   ├── EventCard.tsx
│   │   ├── EventForm.tsx
│   │   ├── TicketCard.tsx
│   │   └── EventBanner.tsx
│   │
│   ├── admin/
│   └── organizer/
│
├── lib/
│   ├── api.ts
│   ├── auth.ts
│   └── utils.ts
│
├── services/
│   ├── auth.ts
│   ├── events.ts
│   ├── tickets.ts
│   ├── users.ts
│   └── payments.ts
│
├── hooks/
├── types/
├── public/
├── styles/
└── middleware.ts

backend/
│
├── src/
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── eventController.js
│   │   ├── ticketController.js
│   │   ├── paymentController.js
│   │   ├── organizerController.js
│   │   └── adminController.js
│   │
│   ├── routes/
│   │   ├── auth.js
│   │   ├── events.js
│   │   ├── tickets.js
│   │   ├── payments.js
│   │   ├── organizers.js
│   │   └── admin.js
│   │
│   ├── middleware/
│   │   ├── authenticate.js
│   │   ├── authorize.js
│   │   └── upload.js
│   │
│   ├── models/
│   ├── database/
│   ├── config/
│   └── server.js
│
└── package.json backend/
│
├── src/
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── eventController.js
│   │   ├── ticketController.js
│   │   ├── paymentController.js
│   │   ├── organizerController.js
│   │   └── adminController.js
│   │
│   ├── routes/
│   │   ├── auth.js
│   │   ├── events.js
│   │   ├── tickets.js
│   │   ├── payments.js
│   │   ├── organizers.js
│   │   └── admin.js
│   │
│   ├── middleware/
│   │   ├── authenticate.js
│   │   ├── authorize.js
│   │   └── upload.js
│   │
│   ├── models/
│   ├── database/
│   ├── config/
│   └── server.js
│
└── package.json
