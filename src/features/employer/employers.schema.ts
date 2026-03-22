import { z } from "zod";

export const organizationTypes = [
  "development",
  "business",
  "finance & accounting",
  "it & software",
  "office productivity",
  "personal development",
  "design",
  "marketing",
  "photography & video",
  "healthcare",
  "education",
  "retail",
  "manufacturing",
  "hospitality",
  "consulting",
  "real estate",
  "legal",
  "other",
] as const;

export const teamSizes = [
  "1",
  "2-10",
  "11-50",
  "51-200",
  "201-500",
  "501-1000",
  "1001+",
] as const;

export const employerProfileSchema = z.object({
  companyName: z
    .string()
    .trim()
    .min(2, "Company Name must be at least 2 characters long")
    .max(20, "Company name must not exceed 20 characters"),

  organizationType: z.enum(organizationTypes, {
    error: "Please select a valid organization type",
  }),
  teamSize: z.enum(teamSizes, {
    error: "Please select a valid organization type",
  }),

  yearOfEstablishment: z
    .string()
    .trim()
    .regex(/^\d{4}$/, "Please enter a valid 4-digit year")
    .refine((year) => {
      const yearNum = parseInt(year);

      const currentYear = new Date().getFullYear();
      return yearNum >= 1800 && yearNum <= currentYear;
    }),

  websiteUrl: z
    .url("Please enter a valid URL (e.g., https://example.com)")
    .trim()
    .max(500, "Website URL must not exceed 500 characters")
    .optional()
    .or(z.literal("")),

  location: z
    .string()
    .trim()
    .min(2, "Location must be at least 2 characters long")
    .max(255, "Location must not exceed 255 characters")
    .optional()
    .or(z.literal("")), // here empty string would fall under minimum length validation, so user will see error if they clear the field
  // so we need to do this

  avatarUrl: z.url("Please upload the image"),

  bannerImageUrl: z.url("Please upload the image").optional().or(z.literal("")),
});

export type EmployerProfileData = z.infer<typeof employerProfileSchema>
