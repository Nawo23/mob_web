export type Section =
    | "dashboard"
    | "hero"
    | "logos"
    | "projects"
    | "services"
    | "team"
    | "testimonials"
    | "pricing"
    | "messages"
    | "stats"
    | "contact"
    | "footer"
    | "users";

// Admin sa Super Admin dennatama okkoma sections walata full access
export function hasAccess(role: string, section: Section): boolean {
    if (section === "users") return role === "SUPER_ADMIN"; // staff/admin accounts manage karanna Super Admin ta witharai
    return true;
}

// Admin sa Super Admin dennatama edit/create/delete karanna puluwan
export function canEdit(role: string): boolean {
    return role === "SUPER_ADMIN" || role === "ADMIN";
}

export function getDefaultRoute(): string {
    return "/admin";
}