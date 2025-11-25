export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "13.0.5"
  }
  public: {
    Tables: {
      categories: {
        Row: {
          description: string | null
          icon: string | null
          id: number
          name: string | null
          slug: string
        }
        Insert: {
          description?: string | null
          icon?: string | null
          id?: number
          name?: string | null
          slug: string
        }
        Update: {
          description?: string | null
          icon?: string | null
          id?: number
          name?: string | null
          slug?: string
        }
        Relationships: []
      }
      facilities: {
        Row: {
          icon: string | null
          id: number
          name: string
        }
        Insert: {
          icon?: string | null
          id?: number
          name: string
        }
        Update: {
          icon?: string | null
          id?: number
          name?: string
        }
        Relationships: []
      }
      house_categories: {
        Row: {
          category_id: number
          house_id: number
        }
        Insert: {
          category_id: number
          house_id: number
        }
        Update: {
          category_id?: number
          house_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "house_categories_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "categories"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "house_categories_house_id_fkey"
            columns: ["house_id"]
            isOneToOne: false
            referencedRelation: "houses"
            referencedColumns: ["id"]
          },
        ]
      }
      house_facilities: {
        Row: {
          facility_id: number
          house_id: number
        }
        Insert: {
          facility_id: number
          house_id?: number
        }
        Update: {
          facility_id?: number
          house_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "house_facilities_facility_id_fkey"
            columns: ["facility_id"]
            isOneToOne: false
            referencedRelation: "facilities"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "house_facilities_house_id_fkey"
            columns: ["house_id"]
            isOneToOne: false
            referencedRelation: "houses"
            referencedColumns: ["id"]
          },
        ]
      }
      house_supplies: {
        Row: {
          house_id: number
          supply_id: number
        }
        Insert: {
          house_id?: number
          supply_id: number
        }
        Update: {
          house_id?: number
          supply_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "house_amenities_amenity_id_fkey"
            columns: ["supply_id"]
            isOneToOne: false
            referencedRelation: "supplies"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "house_amenities_house_id_fkey"
            columns: ["house_id"]
            isOneToOne: false
            referencedRelation: "houses"
            referencedColumns: ["id"]
          },
        ]
      }
      house_tags: {
        Row: {
          house_id: number
          tag_id: number
        }
        Insert: {
          house_id: number
          tag_id: number
        }
        Update: {
          house_id?: number
          tag_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "house_tags_house_id_fkey"
            columns: ["house_id"]
            isOneToOne: false
            referencedRelation: "houses"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "house_tags_tag_id_fkey"
            columns: ["tag_id"]
            isOneToOne: false
            referencedRelation: "tags"
            referencedColumns: ["id"]
          },
        ]
      }
      houses: {
        Row: {
          address: string | null
          allow_pet: boolean | null
          area_info: Json | null
          booked_count: number | null
          check_in: string | null
          check_out: string | null
          created_at: string | null
          description: string | null
          guests_per_room: string | null
          house_rules: Json | null
          id: number
          images: string[] | null
          is_featured: boolean | null
          is_sale: boolean | null
          map: Json | null
          name: string
          notes: string | null
          num_rooms: number | null
          policies: Json | null
          price: number | null
          promotions: Json | null
          ratings: Json | null
          related_houses: Json | null
          slug: string
          updated_at: string | null
          view_count: number | null
          ward_id: number | null
        }
        Insert: {
          address?: string | null
          allow_pet?: boolean | null
          area_info?: Json | null
          booked_count?: number | null
          check_in?: string | null
          check_out?: string | null
          created_at?: string | null
          description?: string | null
          guests_per_room?: string | null
          house_rules?: Json | null
          id?: number
          images?: string[] | null
          is_featured?: boolean | null
          is_sale?: boolean | null
          map?: Json | null
          name: string
          notes?: string | null
          num_rooms?: number | null
          policies?: Json | null
          price?: number | null
          promotions?: Json | null
          ratings?: Json | null
          related_houses?: Json | null
          slug: string
          updated_at?: string | null
          view_count?: number | null
          ward_id?: number | null
        }
        Update: {
          address?: string | null
          allow_pet?: boolean | null
          area_info?: Json | null
          booked_count?: number | null
          check_in?: string | null
          check_out?: string | null
          created_at?: string | null
          description?: string | null
          guests_per_room?: string | null
          house_rules?: Json | null
          id?: number
          images?: string[] | null
          is_featured?: boolean | null
          is_sale?: boolean | null
          map?: Json | null
          name?: string
          notes?: string | null
          num_rooms?: number | null
          policies?: Json | null
          price?: number | null
          promotions?: Json | null
          ratings?: Json | null
          related_houses?: Json | null
          slug?: string
          updated_at?: string | null
          view_count?: number | null
          ward_id?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "houses_ward_id_fkey"
            columns: ["ward_id"]
            isOneToOne: false
            referencedRelation: "wards"
            referencedColumns: ["id"]
          },
        ]
      }
      ratings: {
        Row: {
          comment: string | null
          create_at: string | null
          id: number
          rating: number | null
          username: string | null
        }
        Insert: {
          comment?: string | null
          create_at?: string | null
          id?: number
          rating?: number | null
          username?: string | null
        }
        Update: {
          comment?: string | null
          create_at?: string | null
          id?: number
          rating?: number | null
          username?: string | null
        }
        Relationships: []
      }
      supplies: {
        Row: {
          icon: string | null
          id: number
          name: string
        }
        Insert: {
          icon?: string | null
          id?: number
          name: string
        }
        Update: {
          icon?: string | null
          id?: number
          name?: string
        }
        Relationships: []
      }
      tags: {
        Row: {
          description: string | null
          icon: string | null
          id: number
          name: string | null
          slug: string
        }
        Insert: {
          description?: string | null
          icon?: string | null
          id?: number
          name?: string | null
          slug: string
        }
        Update: {
          description?: string | null
          icon?: string | null
          id?: number
          name?: string | null
          slug?: string
        }
        Relationships: []
      }
      types: {
        Row: {
          description: string | null
          id: number
          name: string | null
          slug: string
        }
        Insert: {
          description?: string | null
          id?: number
          name?: string | null
          slug: string
        }
        Update: {
          description?: string | null
          id?: number
          name?: string | null
          slug?: string
        }
        Relationships: []
      }
      wards: {
        Row: {
          id: number
          name: string
        }
        Insert: {
          id?: number
          name: string
        }
        Update: {
          id?: number
          name?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
