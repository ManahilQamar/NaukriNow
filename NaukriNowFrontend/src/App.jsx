import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Homepage from "./components/Homepage/Homepage";
import Login from "./components/Auth/Login";
import Signup from "./components/Auth/Signup";
import CompanyReviews from "./components/CompanyReviews/CompanyReviews";
import CompanyDetail from "./components/CompanyDetail/CompanyDetail";
import Dashboard from "./components/Dashboard";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";
import EmployerRoutes from "./routes/EmployerRoutes";
import JobListingPage from "./components/JobListingPage/JobListingPage";
import RoleSelection from "./components/RoleSelection/RoleSelection"; 
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import PostJob from "./components/PostJob/PostJob";
import Testimonials from "./components/PostJob/AddJob/Testimonials";
import EmployerSignup from "./components/EmployerSignup/EmployerSignup";
import CreateJobPost from "./components/CreateJobPost/CreateJobPost";
import JobReview from "./components/JobReview/JobReview";
import SponsorJobPage from "./components/SponsorJobPage/SponsorJobPage";
import ContactInfoPage from "./components/ContactInfoPage/ContactInfoPage";
import AddressUpdatePage from "./components/AddressUpdatePage/AddressUpdatePage";
import ResumeUploadPage from "./components/ResumeUploadPage/ResumeUploadPage";
import EducationDetailsPage from "./components/EducationDetailsPage/EducationDetailsPage";
import Profile from "./components/Profile/Profile";
import PlaceholderPage from "./components/PlaceholderPage/PlaceholderPage";



function App() {
  const isAuthenticated = !!localStorage.getItem("token");

  return (
    <Router>
      <Routes>
        {/* Root → Homepage */}
        <Route path="/" element={<Homepage />} />  

        {/* Main pages */}
        <Route path="/company-reviews" element={<CompanyReviews />} />
        <Route path="/company/:id" element={<CompanyDetail />} />
        <Route path="/jobs" element={<JobListingPage />} />

        {/* Auth pages */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        
 
        {/* Role Selection (only after login) */}
        <Route
          path="/select-role"
          element={isAuthenticated ? <RoleSelection /> : <Navigate to="/login" />}
        />


        <Route
  path="/post-job"
  element={
    <ProtectedRoute>
      <PostJob />
    </ProtectedRoute>
  }
/>

        {/* Employer section */}
        <Route path="/employers/*" element={<EmployerRoutes />} />
        
        {/* Employer Signup */}
        <Route path="/employer-signup" element={<EmployerSignup />} />

        {/* Create Job Post */}
        <Route path="/create-job-post" element={<CreateJobPost />} />

        {/* Job Review */}
        <Route path="/job-review" element={<JobReview />} />

        {/* Sponsor Job Page */}
        <Route path="/sponsor-job" element={<SponsorJobPage />} />

        {/* Contact Info Page */}
        <Route path="/contact-info" element={<ContactInfoPage />} />

        {/* Address Update Page */}

        <Route path="/address-update" element={<AddressUpdatePage />} />

        {/* Resume Upload Page */}

        <Route path="/resume-upload" element={<ResumeUploadPage />} />

        {/* Education Details Page */}

        <Route path="/education-details" element={<EducationDetailsPage />} />

        {/* Protected dashboard */}
       <Route
  path="/dashboard"
  element={
    <ProtectedRoute>
      <Dashboard />
    </ProtectedRoute>
  }
/>

                {/* Profile */}
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />

        {/* Placeholder / coming-soon pages */}
        <Route path="/post-cv" element={<PlaceholderPage title="Post your CV" description="Resume upload flow is available under your profile." />} />
        <Route path="/all-jobs" element={<PlaceholderPage title="All Jobs" description="A full job browsing experience is coming soon." />} />
        <Route path="/locations" element={<PlaceholderPage title="All Locations" description="Browse jobs by location — coming soon." />} />
        <Route path="/career-advice" element={<PlaceholderPage title="Career Advice" description="Tips and guides for your career journey — coming soon." />} />
        <Route path="/resume-builder" element={<PlaceholderPage title="Resume Builder" description="Build your resume step-by-step — coming soon." />} />
        <Route path="/pricing" element={<PlaceholderPage title="Pricing" description="Employer pricing plans — coming soon." />} />
        <Route path="/recruitment-solutions" element={<PlaceholderPage title="Recruitment Solutions" description="Enterprise hiring solutions — coming soon." />} />
        <Route path="/employer-dashboard" element={<PlaceholderPage title="Employer Dashboard" description="Manage your job posts and applicants — coming soon." />} />
        <Route path="/about" element={<PlaceholderPage title="About Us" description="Learn more about NaukriNow." />} />
        <Route path="/careers" element={<PlaceholderPage title="Careers" description="Join our team — open positions coming soon." />} />
        <Route path="/press" element={<PlaceholderPage title="Press Center" description="Media resources and press releases — coming soon." />} />
        <Route path="/help" element={<PlaceholderPage title="Help Center" description="Frequently asked questions and support." />} />
        <Route path="/contact" element={<PlaceholderPage title="Contact Us" description="Reach out to our support team." />} />
        <Route path="/privacy" element={<PlaceholderPage title="Privacy Center" description="How we handle and protect your data." />} />
        <Route path="/terms" element={<PlaceholderPage title="Terms of Service" description="Terms and conditions for using NaukriNow." />} />
        <Route path="/sitemap" element={<PlaceholderPage title="Sitemap" description="Full site navigation map." />} />
        <Route path="/accessibility" element={<PlaceholderPage title="Accessibility" description="Our commitment to accessible design." />} />
        <Route path="/sustainability" element={<PlaceholderPage title="Sustainability" description="Our ESG and sustainability efforts." />} />
        <Route path="/diversity" element={<PlaceholderPage title="Diversity & Inclusion" description="Our diversity and inclusion commitments." />} />
        <Route path="/ad-choices" element={<PlaceholderPage title="Ad Choices" description="Advertising preferences and choices." />} />
        <Route path="/companies" element={<PlaceholderPage title="Browse Companies" description="Explore top companies — coming soon." />} />
        <Route path="/resources" element={<PlaceholderPage title="Resources" description="Job resources and guides — coming soon." />} />

     <Route path="/salary-guide" element={<PlaceholderPage title="Salary Guide" description="Compare salaries across roles and companies — coming soon." />} />
        <Route
          path="/testimonials"
          element={
            <ProtectedRoute>
              <Testimonials />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
