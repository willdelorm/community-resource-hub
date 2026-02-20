"use client";

import { Button } from "@/components/ui/button";

const Donate = () => {
  return (
    <main className="w-full flex-1">
      <section className="flex justify-center items-center py-12">
        <h1 className={`text-4xl font-black uppercase text-center filter`}>
          Donate
        </h1>
      </section>
      <section className="p-12">
        <h2 className="sr-only">Donation Options</h2>
        <p className="text-center mb-6">
          Want to support us? We accept donations online through PayPal, Venmo,
          and in cash at any of our events. You can also suppport us for as
          little as $1 on Ko-fi.
        </p>
        <div className="flex justify-center items-center gap-3 px-6">
          <Button className="paypal bg-blue-800 hover:bg-blue-700 rounded-3xl min-w-32">PayPal</Button>
          <Button className="venmo bg-blue-500 hover:bg-blue-400 rounded-3xl min-w-32">Venmo</Button>
          <Button className="kofi bg-amber-600 hover:bg-amber-500 rounded-3xl min-w-32">Ko-fi</Button>
        </div>
      </section>
    </main>
  );
};

export default Donate;
