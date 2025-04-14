import { z } from "zod";

export const loginSchema = z.object({
  email: z
    .string({
      required_error: "Email is required",
      invalid_type_error: "Email must be a string",
    })
    .nonempty({ message: "Email cannot be empty" })
    .email({ message: "Invalid email format" }),
  password: z
    .string({
      required_error: "Password is required",
      invalid_type_error: "Password must be a string",
    })
    .min(6, { message: "Password must be at least 6 characters" })
    // Ensure the first character is uppercase
    .regex(/^[A-Z]/, {
      message: "Password must start with an uppercase letter",
    })
    // Ensure the password contains at least one number
    .regex(/(?=.*\d)/, {
      message: "Password must contain at least one number",
    })
    // Ensure the password contains at least one special character (e.g., !@#$%^&*)
    .regex(/(?=.*[!@#$%^&*])/, {
      message: "Password must contain at least one special character",
    }),
});

export type LoginFormValues = z.infer<typeof loginSchema>;