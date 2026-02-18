"use client";

const Footer = () => {
  return (
    <footer className="w-full bg-slate-300 p-6 text-md">
      <div className="w-full max-w-2xl mx-auto">
        <h2 className="text-xl mb-6">CommonGround Collective</h2>
        <div className=" w-full grid grid-cols-2">
          <div>
            <div>
              <a href="/events">Events</a>
            </div>
            <div>
              <a href="/resources">Resources</a>
            </div>
            <div>
              <a href="/about">About</a>
              <ul className="ps-3">
                <li>
                  <a href="/about/story">Story</a>
                </li>
                <li>
                  <a href="/about/people">People</a>
                </li>
                <li>
                  <a href="/about/contact">Contact</a>
                </li>
              </ul>
            </div>
          </div>
          <div>
            <div>
              <a href="/donate">Donate</a>
            </div>
            <div className="mb-6">
              <a href="/signin">Sign In</a>
            </div>
          </div>
        </div>
        <div className="text-center">
          <p>Created by Will Delorm</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
