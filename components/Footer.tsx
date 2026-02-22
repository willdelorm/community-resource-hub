"use client";

const Footer = () => {
  return (
    <footer className="w-full bg-gray-300 text-gray-600">
      <div className="mx-auto max-w-2xl px-4 sm:px-6 py-8 sm:py-12">
        <div className="mb-8">
          <h2 className="text-xl font-black uppercase tracking-wide text-gray-900">
            CommonGround Collective
          </h2>
          <p className="mt-1 text-sm text-gray-600">
            Connecting people with community resources.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-8 border-t border-gray-400 pt-8">
          <div className="flex flex-col gap-1">
            <p className="mb-2 text-xs font-semibold uppercase tracking-wide sm:tracking-widest text-gray-600">
              Explore
            </p>
            <a href="/events" className="text-sm hover:text-gray-900 transition-colors">Events</a>
            <a href="/resources" className="text-sm hover:text-gray-900 transition-colors">Resources</a>
            <a href="/donate" className="text-sm hover:text-gray-900 transition-colors">Donate</a>
          </div>
          <div className="flex flex-col gap-1">
            <p className="mb-2 text-xs font-semibold uppercase tracking-wide sm:tracking-widest text-gray-600">
              About
            </p>
            <a href="/about/story" className="text-sm hover:text-gray-900 transition-colors">Story</a>
            <a href="/about/people" className="text-sm hover:text-gray-900 transition-colors">People</a>
            <a href="/about/contact" className="text-sm hover:text-gray-900 transition-colors">Contact</a>
            <a href="/signin" className="text-sm hover:text-gray-900 transition-colors">Sign In</a>
          </div>
        </div>
        <div className="mt-8 border-t border-gray-400 pt-6 text-center text-xs text-gray-500">
          <p>Created by <a href="https://willdelorm.com" className="hover:text-gray-900 transition-colors">Will Delorm</a></p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
