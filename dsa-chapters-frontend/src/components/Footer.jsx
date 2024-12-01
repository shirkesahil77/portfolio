import React from "react";

function Footer() {
  return (
    <div>
      <footer className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8">
          <div className="text-center text-sm text-gray-500">
            <p>
              © {new Date().getFullYear()} DSA Learning Platform. All rights
              reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Footer;
