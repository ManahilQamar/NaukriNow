import { useNavigate } from "react-router-dom";
import React, { useState } from "react";
import { Check, Info } from "lucide-react";

const SponsorJobPage = () => {
  const navigate = useNavigate();

  const [selectedPlan, setSelectedPlan] = useState("standard");
  const [urgentlyHiring, setUrgentlyHiring] = useState(false);
  const [jobBranding, setJobBranding] = useState(false);
  const [budgetOption, setBudgetOption] = useState("plan");
  const [customBudget, setCustomBudget] = useState(8);
  const [duration, setDuration] = useState("continuous");
  const [customDuration, setCustomDuration] = useState(30);

  const plans = {
    standard: {
      name: "Standard",
      dailyRate: 8,
      description: "Boost your job's visibility to a broad audience.",
    },
    premium: {
      name: "Premium",
      dailyRate: 15,
      description: "Connect with top talent from your industry and get the tools to hire efficiently.",
    },
  };

  const calculateWeeklyBudget = () => {
    if (budgetOption === "custom") {
      return customBudget * 7;
    }

    const dailyRate = plans[selectedPlan].dailyRate;
    const additionalCost = (urgentlyHiring ? dailyRate * 0.7 : 0) + (jobBranding ? dailyRate * 0.5 : 0);
    return (dailyRate + additionalCost) * 7;
  };

  const weeklyBudget = calculateWeeklyBudget();

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-md overflow-hidden">
        <div className="p-6 border-b border-gray-200">
          <h1 className="text-2xl font-bold text-gray-800">Sponsor job</h1>
        </div>

        <div className="p-6">
          <div className="mb-8">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">Choose a plan</h2>

            <div className="mb-4">
              <button
                onClick={() => setBudgetOption(budgetOption === "plan" ? "custom" : "plan")}
                className="text-blue-600 hover:text-blue-800 text-sm font-medium"
              >
                {budgetOption === "plan" ? "Switch to a custom budget" : "Switch to a plan"}
              </button>
            </div>

            {budgetOption === "custom" ? (
              <div className="border border-gray-300 rounded-lg p-4 mb-6">
                <h3 className="font-semibold text-gray-700 mb-2">Custom Budget</h3>
                <div className="flex items-center mb-2">
                  <span className="mr-2 text-gray-700">US$</span>
                  <input
                    type="number"
                    value={customBudget}
                    onChange={(e) => setCustomBudget(Math.max(8, parseInt(e.target.value) || 8))}
                    min="8"
                    max="100"
                    className="border border-gray-300 rounded px-3 py-2 w-20"
                  />
                  <span className="ml-2 text-gray-600">daily average</span>
                </div>
                <p className="text-gray-600 text-sm">Set your own daily budget for this job post.</p>
              </div>
            ) : (
              <div className="space-y-4 mb-6">
                <div
                  className={`border rounded-lg p-4 cursor-pointer transition-all ${
                    selectedPlan === "standard"
                      ? "border-blue-500 bg-blue-50"
                      : "border-gray-300 hover:border-blue-300"
                  }`}
                  onClick={() => setSelectedPlan("standard")}
                >
                  <div className="flex items-start">
                    <div
                      className={`w-5 h-5 rounded-full border flex items-center justify-center mr-3 mt-1 ${
                        selectedPlan === "standard"
                          ? "border-blue-500 bg-blue-500"
                          : "border-gray-400"
                      }`}
                    >
                      {selectedPlan === "standard" && <Check size={14} className="text-white" />}
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-800">Standard</h3>
                      <p className="text-gray-700">
                        {formatCurrency(plans.standard.dailyRate)} daily average
                      </p>
                      <p className="text-gray-600 text-sm mt-1">{plans.standard.description}</p>
                    </div>
                  </div>
                </div>

                <div
                  className={`border rounded-lg p-4 cursor-pointer transition-all ${
                    selectedPlan === "premium"
                      ? "border-blue-500 bg-blue-50"
                      : "border-gray-300 hover:border-blue-300"
                  }`}
                  onClick={() => setSelectedPlan("premium")}
                >
                  <div className="flex items-start">
                    <div
                      className={`w-5 h-5 rounded-full border flex items-center justify-center mr-3 mt-1 ${
                        selectedPlan === "premium"
                          ? "border-blue-500 bg-blue-500"
                          : "border-gray-400"
                      }`}
                    >
                      {selectedPlan === "premium" && <Check size={14} className="text-white" />}
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-800">Premium</h3>
                      <p className="text-gray-700">
                        {formatCurrency(plans.premium.dailyRate)} daily average
                      </p>
                      <p className="text-gray-600 text-sm mt-1">{plans.premium.description}</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            <div className="space-y-4">
              <div className="border border-gray-300 rounded-lg p-4">
                <div className="flex items-start">
                  <input
                    type="checkbox"
                    id="urgentlyHiring"
                    checked={urgentlyHiring}
                    onChange={() => setUrgentlyHiring(!urgentlyHiring)}
                    className="mt-1 mr-3 w-4 h-4 text-blue-600 focus:ring-blue-500"
                  />
                  <div>
                    <label htmlFor="urgentlyHiring" className="font-semibold text-gray-800 cursor-pointer">
                      Urgently hiring label (optional)
                    </label>
                    <p className="text-gray-600 text-sm mt-1">
                      Jobs with this label receive 70% more applications.
                      {urgentlyHiring && budgetOption === "plan" && (
                        <span className="text-green-600 font-medium ml-1">
                          +{formatCurrency(plans[selectedPlan].dailyRate * 0.7 * 7)} per week
                        </span>
                      )}
                    </p>
                  </div>
                </div>
              </div>

              <div className="border border-gray-300 rounded-lg p-4">
                <div className="flex items-start">
                  <input
                    type="checkbox"
                    id="jobBranding"
                    checked={jobBranding}
                    onChange={() => setJobBranding(!jobBranding)}
                    className="mt-1 mr-3 w-4 h-4 text-blue-600 focus:ring-blue-500"
                  />
                  <div>
                    <label htmlFor="jobBranding" className="font-semibold text-gray-800 cursor-pointer">
                      Job branding
                    </label>
                    <p className="text-gray-600 text-sm mt-1">
                      Featuring your logo and company headers on job listings.
                      {jobBranding && budgetOption === "plan" && (
                        <span className="text-green-600 font-medium ml-1">
                          +{formatCurrency(plans[selectedPlan].dailyRate * 0.5 * 7)} per week
                        </span>
                      )}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mb-8">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">Plan duration</h2>
            <div className="flex flex-col sm:flex-row sm:items-center space-y-3 sm:space-y-0 sm:space-x-6">
              <div className="flex items-center">
                <input
                  type="radio"
                  id="continuous"
                  name="duration"
                  checked={duration === "continuous"}
                  onChange={() => setDuration("continuous")}
                  className="mr-2 w-4 h-4 text-blue-600 focus:ring-blue-500"
                />
                <label htmlFor="continuous" className="text-gray-700 cursor-pointer">
                  Run continuously
                </label>
              </div>
              <div className="flex items-center">
                <input
                  type="radio"
                  id="custom"
                  name="duration"
                  checked={duration === "custom"}
                  onChange={() => setDuration("custom")}
                  className="mr-2 w-4 h-4 text-blue-600 focus:ring-blue-500"
                />
                <label htmlFor="custom" className="text-gray-700 cursor-pointer">
                  Run for
                </label>
                <input
                  type="number"
                  value={customDuration}
                  onChange={(e) => setCustomDuration(parseInt(e.target.value) || 30)}
                  min="7"
                  max="90"
                  className="ml-2 border border-gray-300 rounded px-2 py-1 w-16"
                  disabled={duration !== "custom"}
                />
                <span className="ml-1 text-gray-700">days</span>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-200 pt-6 mb-8">
            <div className="flex justify-between items-center mb-2">
              <span className="font-semibold text-gray-800">Max budget:</span>
              <span className="font-bold text-lg text-gray-800">
                {formatCurrency(weeklyBudget)} per week
              </span>
            </div>
            <p className="text-gray-600 text-sm">
              You can change the amount, pause or close your job at any time.
            </p>
          </div>

          <div className="flex flex-col-reverse sm:flex-row sm:justify-between sm:items-center space-y-reverse space-y-4 sm:space-y-0">
            <button
              onClick={() => navigate("/dashboard")}
              className="text-gray-600 hover:text-gray-800 font-medium py-2 px-4 rounded"
            >
              No thanks
            </button>
            <button
              onClick={() => navigate("/dashboard")}
              className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-lg"
            >
              Save and continue
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-2xl mx-auto mt-6 text-center text-gray-500 text-sm">
        <div className="mb-2">©2025 Indeed</div>
        <div className="flex flex-wrap justify-center gap-4">
          <a href="#" className="hover:text-gray-700">
            Cookies, privacy and terms
          </a>
          <a href="#" className="hover:text-gray-700">
            Privacy center
          </a>
          <a href="#" className="hover:text-gray-700">
            Security
          </a>
          <a href="#" className="hover:text-gray-700">
            Billing
          </a>
          <a href="#" className="hover:text-gray-700">
            Contact
          </a>
        </div>
      </div>
    </div>
  );
};

export default SponsorJobPage;