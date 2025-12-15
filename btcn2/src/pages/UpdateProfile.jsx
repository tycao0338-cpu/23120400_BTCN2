import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getUserProfile, updateUserProfile } from "../services/api";
import { BackButton } from "../components/common/BackButton";
import { Mail, Phone, Calendar, Loader, Save } from "lucide-react";

/**
 * UpdateProfile - Update user profile page
 * - Edit email, phone, dob
 * - Private route (requires authentication)
 * Located in: src/pages/
 */
export function UpdateProfile() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  // Form state
  const [formData, setFormData] = useState({
    email: "",
    phone: "",
    dob: "",
  });

  // Load current profile
  useEffect(() => {
    const fetchProfile = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const data = await getUserProfile();
        setFormData({
          email: data.email || "",
          phone: data.phone || "",
          dob: data.dob || "",
        });
      } catch (err) {
        console.error("Error fetching profile:", err);
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProfile();
  }, []);

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSaving(true);
    setError(null);
    setSuccess(false);

    try {
      await updateUserProfile(formData);
      setSuccess(true);

      // Redirect to profile after 1.5s
      setTimeout(() => {
        navigate("/profile");
      }, 1500);
    } catch (err) {
      console.error("Error updating profile:", err);
      setError(err.message || "Failed to update profile");
    } finally {
      setIsSaving(false);
    }
  };

  // Loading State
  if (isLoading) {
    return (
      <main className="flex-1 bg-gray-100 dark:bg-slate-800 transition-colors p-4">
        <div className="flex flex-col items-center justify-center py-20">
          <Loader className="w-12 h-12 text-sky-500 animate-spin mb-4" />
          <p className="text-gray-500 dark:text-gray-400">Loading...</p>
        </div>
      </main>
    );
  }

  return (
    <main className="flex-1 bg-gray-100 dark:bg-slate-800 transition-colors">
      {/* Back Button */}
      <div className="p-4">
        <BackButton />
      </div>

      {/* Update Form */}
      <section className="px-4 pb-6 max-w-2xl mx-auto">
        <div className="bg-white dark:bg-slate-700 rounded-lg shadow-md p-6">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
            Update Profile
          </h1>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Email */}
            <div>
              <label className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                <Mail size={16} className="text-sky-500" />
                Email Address
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-600 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-sky-500"
                placeholder="Enter your email"
              />
            </div>

            {/* Phone */}
            <div>
              <label className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                <Phone size={16} className="text-indigo-500" />
                Phone Number
              </label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-600 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-sky-500"
                placeholder="Enter your phone number"
              />
            </div>

            {/* Date of Birth */}
            <div>
              <label className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                <Calendar size={16} className="text-purple-500" />
                Date of Birth
              </label>
              <input
                type="date"
                name="dob"
                value={formData.dob}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-600 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-sky-500"
              />
            </div>

            {/* Error Message */}
            {error && (
              <div className="p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
                <p className="text-sm text-red-600 dark:text-red-400">
                  {error}
                </p>
              </div>
            )}

            {/* Success Message */}
            {success && (
              <div className="p-3 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg">
                <p className="text-sm text-green-600 dark:text-green-400">
                  Profile updated successfully! Redirecting...
                </p>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSaving}
              className="w-full py-3 bg-gradient-to-r from-sky-500 via-indigo-500 to-purple-500 hover:from-sky-600 hover:via-indigo-600 hover:to-purple-600 disabled:from-gray-400 disabled:to-gray-400 text-white font-semibold rounded-lg transition-all shadow-md hover:shadow-lg disabled:shadow-none flex items-center justify-center gap-2"
            >
              {isSaving ? (
                <>
                  <Loader size={20} className="animate-spin" />
                  Saving...
                </>
              ) : (
                <>
                  <Save size={20} />
                  Save Changes
                </>
              )}
            </button>
          </form>
        </div>
      </section>
    </main>
  );
}

export default UpdateProfile;
