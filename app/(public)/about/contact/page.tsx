import ContactForm from "@/components/ContactForm";

const Contact = () => {
  return (
    <main className="w-full">
      <section className="flex w-full justify-center items-center py-12">
        <h1 className={`text-4xl font-black uppercase text-center filter`}>
          Contact us
        </h1>
      </section>
      <section className="w-full mx-auto flex flex-col justify-center items-center px-4 sm:px-6 py-4 sm:py-6">
        <p className="mb-6">
          Please fill out the form below. We will respond as soon as we are
          able.
        </p>
      </section>
      <section className="px-4 sm:px-6 mb-12">
        <ContactForm />
      </section>
    </main>
  );
};

export default Contact;
