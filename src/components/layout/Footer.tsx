
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-white border-t border-gray-200 mt-auto">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">MentorConnect</h3>
            <p className="text-sm text-gray-600 mb-4">
              Connecting mentors and mentees for impactful knowledge sharing and professional growth.
            </p>
          </div>
          
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider mb-4">Resources</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/resources/guides" className="text-sm text-gray-600 hover:text-mentorBlue">
                  Mentorship Guides
                </Link>
              </li>
              <li>
                <Link to="/resources/best-practices" className="text-sm text-gray-600 hover:text-mentorBlue">
                  Best Practices
                </Link>
              </li>
              <li>
                <Link to="/resources/faq" className="text-sm text-gray-600 hover:text-mentorBlue">
                  FAQ
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider mb-4">Platform</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/mentors" className="text-sm text-gray-600 hover:text-mentorBlue">
                  Find Mentors
                </Link>
              </li>
              <li>
                <Link to="/mentees" className="text-sm text-gray-600 hover:text-mentorBlue">
                  Find Mentees
                </Link>
              </li>
              <li>
                <Link to="/channels" className="text-sm text-gray-600 hover:text-mentorBlue">
                  Discussion Channels
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider mb-4">Contact</h3>
            <ul className="space-y-2">
              <li className="text-sm text-gray-600">
                Email: support@mentorconnect.com
              </li>
              <li>
                <Link to="/contact" className="text-sm text-gray-600 hover:text-mentorBlue">
                  Contact Form
                </Link>
              </li>
              <li>
                <Link to="/feedback" className="text-sm text-gray-600 hover:text-mentorBlue">
                  Submit Feedback
                </Link>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-200 mt-8 pt-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-gray-600">
            © {new Date().getFullYear()} MentorConnect. All rights reserved.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link to="/terms" className="text-xs text-gray-600 hover:text-mentorBlue">Terms of Service</Link>
            <Link to="/privacy" className="text-xs text-gray-600 hover:text-mentorBlue">Privacy Policy</Link>
            <Link to="/cookies" className="text-xs text-gray-600 hover:text-mentorBlue">Cookie Policy</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
