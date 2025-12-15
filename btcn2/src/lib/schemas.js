import { z } from "zod";

/**
 * Zod Validation Schemas for form validation
 * Located in: src/lib/ (theo cấu trúc project)
 */

/**
 * Login Schema
 * - username: Non-empty string (thay vì email vì API dùng username)
 * - password: Non-empty string
 */
export const loginSchema = z.object({
  username: z.string().min(1, "Username is required"),
  password: z.string().min(1, "Password is required"),
});

/**
 * Register Schema
 * - username: Min 2 characters
 * - email: Valid email
 * - password: Min 6 characters
 * - confirmPassword: Must match password (using .refine())
 * - phone: Optional phone number
 * - dob: Optional date of birth (YYYY-MM-DD)
 */
export const registerSchema = z
  .object({
    username: z.string().min(2, "Username must be at least 2 characters"),
    email: z.string().email("Please enter a valid email address"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z.string().min(1, "Please confirm your password"),
    phone: z.string().optional(),
    dob: z.string().optional(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"], // Error will be shown on confirmPassword field
  });

// Export types for TypeScript (optional, for future use)
// export type LoginFormData = z.infer<typeof loginSchema>;
// export type RegisterFormData = z.infer<typeof registerSchema>;
