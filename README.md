# Next Commerce Boilerplate

A Next.js boilerplate for building scalable and secure e-commerce websites with Prisma, Stripe, and Tailwind CSS.

## Tech Stack

- **Next.js**: For building server-rendered, statically generated, and performance-optimized websites.
- **Prisma**: For managing database schema and migrations.
- **Stripe**: For handling payments and subscriptions.
- **TailwindCSS**: For styling and layout.

## Environment Variables

To get started, you'll need to add the following environment variables to your project:

- `DATABASE_URL`: Connect to Supabase via connection pooling with Supavisor.
- `DIRECT_URL`: Direct connection to the database. Used for migrations.
- `RESEND_API_KEY`: API key for Resend.
- `STRIPE_SECRET_KEY`: Secret key for Stripe.
- `STRIPE_WEBHOOK_SECRET`: Webhook secret key for Stripe.
- `NEXT_PUBLIC_STRIPE_PUBLIC_KEY`: Public key for Stripe.
- `NEXT_PUBLIC_SERVER_URL`: Public URL for your server.

## Features

- Server-side rendering for improved SEO and performance
- Authentication and authorization with NextAuth
- Payment gateway integration with Stripe
- Styling and layout with Tailwind CSS

## Getting Started

1. Clone the repository: `git clone https://github.com/your-username/next-commerce-boilerplate.git`
2. Install dependencies:

   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   # or
   bun dev
   ```

3. Set up the database: `npx prisma migrate dev`
4. Start the development server: `npm run dev` or `yarn dev`

## Contributing

Contributions are welcome! Please follow these guidelines:

- Fork the repository
- Create a new branch for your feature or fix
- Submit a pull request

## License

The Next Commerce Boilerplate is released under the MIT License.
