import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

/**
 * BackButton - Reusable back button component
 * Props:
 * - to: string (optional) - Link destination. If provided, renders as Link
 * - label: string (default: "Back") - Button text
 * - className: string (optional) - Additional classes
 *
 * If `to` is not provided, uses navigate(-1) to go back
 */
export function BackButton({ to, label = "Back", className = "" }) {
  const navigate = useNavigate();

  const baseClasses =
    "inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-white dark:bg-slate-700 border border-gray-200 dark:border-slate-600 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-slate-600 hover:border-gray-300 dark:hover:border-slate-500 shadow-sm hover:shadow transition-all duration-200";

  // If `to` is provided, render as Link
  if (to) {
    return (
      <Link to={to} className={`${baseClasses} ${className}`}>
        <ArrowLeft size={18} />
        <span className="font-medium">{label}</span>
      </Link>
    );
  }

  // Otherwise, render as button with navigate(-1)
  return (
    <button
      onClick={() => navigate(-1)}
      className={`${baseClasses} ${className}`}
    >
      <ArrowLeft size={18} />
      <span className="font-medium">{label}</span>
    </button>
  );
}

export default BackButton;
