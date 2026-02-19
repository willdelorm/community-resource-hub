export type ResourceCategory =
  | "Housing"
  | "Employment"
  | "Food"
  | "Mental Health"
  | "Healthcare"
  | "Legal"
  | "Education"
  | "Transportation"
  | "Financial"
  | "Other";

export type Database = {
  public: {
    Tables: {
      resources: {
        Row: {
          id: string;
          name: string;
          description: string | null;
          category: ResourceCategory;
          website: string | null;
          phone: string | null;
          email: string | null;
          address: string | null;
          is_active: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          description?: string | null;
          category: ResourceCategory;
          website?: string | null;
          phone?: string | null;
          email?: string | null;
          address?: string | null;
          is_active?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          description?: string | null;
          category?: ResourceCategory;
          website?: string | null;
          phone?: string | null;
          email?: string | null;
          address?: string | null;
          is_active?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [];
      };
      announcements: {
        Row: {
          id: string;
          title: string;
          content: string;
          date_expired: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          title: string;
          content: string;
          date_expired?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          title?: string;
          content?: string;
          date_expired?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [];
      };
      events: {
        Row: {
          id: string;
          title: string;
          description: string | null;
          start_date: string;
          end_date: string | null;
          location: string | null;
          url: string | null;
          is_recurring: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          title: string;
          description?: string | null;
          start_date: string;
          end_date?: string | null;
          location?: string | null;
          url?: string | null;
          is_recurring?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          title?: string;
          description?: string | null;
          start_date?: string;
          end_date?: string | null;
          location?: string | null;
          url?: string | null;
          is_recurring?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [];
      };
    };
    Views: Record<never, never>;
    Functions: Record<never, never>;
    Enums: {
      resource_category: ResourceCategory;
    };
    CompositeTypes: Record<never, never>;
  };
};

// Convenience row types
export type Resource = Database["public"]["Tables"]["resources"]["Row"];
export type Announcement = Database["public"]["Tables"]["announcements"]["Row"];
export type Event = Database["public"]["Tables"]["events"]["Row"];

export type ResourceInsert =
  Database["public"]["Tables"]["resources"]["Insert"];
export type AnnouncementInsert =
  Database["public"]["Tables"]["announcements"]["Insert"];
export type EventInsert = Database["public"]["Tables"]["events"]["Insert"];

export type ResourceUpdate =
  Database["public"]["Tables"]["resources"]["Update"];
export type AnnouncementUpdate =
  Database["public"]["Tables"]["announcements"]["Update"];
export type EventUpdate = Database["public"]["Tables"]["events"]["Update"];

export const RESOURCE_CATEGORIES: ResourceCategory[] = [
  "Housing",
  "Employment",
  "Food",
  "Mental Health",
  "Healthcare",
  "Legal",
  "Education",
  "Transportation",
  "Financial",
  "Other",
];
