import { useState, useEffect } from "react";
import { getUserProfile } from "../services/api";
import { BackButton } from "../components/common/BackButton";
import { User, Mail, Phone, Calendar, Loader } from "lucide-react";

/**
 * Profile - User profile page
 * - Displays user information: username, email, phone, dob
 * - Private route (requires authentication)
 * Located in: src/pages/
 */
export function Profile() {
  const [profile, setProfile] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const data = await getUserProfile();
        setProfile(data);
      } catch (err) {
        console.error("Error fetching profile:", err);
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProfile();
  }, []);

  // Loading State
  if (isLoading) {
    return (
      <main className="flex-1 bg-gray-100 dark:bg-slate-800 transition-colors p-4">
        <div className="flex flex-col items-center justify-center py-20">
          <Loader className="w-12 h-12 text-sky-500 animate-spin mb-4" />
          <p className="text-gray-500 dark:text-gray-400">Loading profile...</p>
        </div>
      </main>
    );
  }

  // Error State
  if (error) {
    return (
      <main className="flex-1 bg-gray-100 dark:bg-slate-800 transition-colors p-4">
        <BackButton className="mb-4" />
        <div className="text-center py-16">
          <div className="text-6xl mb-4">❌</div>
          <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-300 mb-2">
            Error loading profile
          </h3>
          <p className="text-gray-500 dark:text-gray-400">{error}</p>
        </div>
      </main>
    );
  }

  // Format date
  const formatDate = (dateStr) => {
    if (!dateStr) return "Not provided";
    try {
      return new Date(dateStr).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });
    } catch {
      return dateStr;
    }
  };

  return (
    <main className="flex-1 bg-gray-100 dark:bg-slate-800 transition-colors">
      {/* Back Button */}
      <div className="p-4">
        <BackButton />
      </div>

      {/* Profile Section */}
      <section className="px-4 pb-6 max-w-2xl mx-auto">
        <div className="bg-white dark:bg-slate-700 rounded-lg shadow-md overflow-hidden">
          {/* Header with gradient */}
          <div className="h-32 bg-gradient-to-r from-sky-500 via-indigo-500 to-purple-500 relative">
            {/* Avatar */}
            <div className="absolute -bottom-12 left-6">
              <div className="w-24 h-24 rounded-full bg-white dark:bg-slate-700 border-4 border-white dark:border-slate-700 flex items-center justify-center shadow-lg">
                <User size={48} className="text-sky-500" />
              </div>
            </div>
          </div>

          {/* Profile Content */}
          <div className="pt-16 pb-6 px-6">
            {/* Username - Large */}
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
              {profile?.username}
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-6 capitalize">
              {profile?.role || "User"}
            </p>

            {/* Info Grid */}
            <div className="space-y-4">
              {/* Email */}
              <div className="flex items-start gap-3 p-3 bg-gray-50 dark:bg-slate-600 rounded-lg">
                <Mail size={20} className="text-sky-500 mt-0.5 flex-shrink-0" />
                <div className="flex-1">
                  <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">
                    Email Address
                  </p>
                  <p className="text-sm font-medium text-gray-900 dark:text-white break-all">
                    {profile?.email || "Not provided"}
                  </p>
                </div>
              </div>

              {/* Phone */}
              <div className="flex items-start gap-3 p-3 bg-gray-50 dark:bg-slate-600 rounded-lg">
                <Phone
                  size={20}
                  className="text-indigo-500 mt-0.5 flex-shrink-0"
                />
                <div className="flex-1">
                  <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">
                    Phone Number
                  </p>
                  <p className="text-sm font-medium text-gray-900 dark:text-white">
                    {profile?.phone || "Not provided"}
                  </p>
                </div>
              </div>

              {/* Date of Birth */}
              <div className="flex items-start gap-3 p-3 bg-gray-50 dark:bg-slate-600 rounded-lg">
                <Calendar
                  size={20}
                  className="text-purple-500 mt-0.5 flex-shrink-0"
                />
                <div className="flex-1">
                  <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">
                    Date of Birth
                  </p>
                  <p className="text-sm font-medium text-gray-900 dark:text-white">
                    {formatDate(profile?.dob)}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

export default Profile;
