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
    PostgrestVersion: "13.0.5";
  };
  public: {
    Tables: {
      customers: {
        Row: {
          address: string | null;
          city: string | null;
          created_at: string;
          credit_limit: number | null;
          customer_code: string;
          email: string | null;
          id: string;
          name: string;
          outstanding_balance: number | null;
          phone: string | null;
          state: string | null;
          updated_at: string;
        };
        Insert: {
          address?: string | null;
          city?: string | null;
          created_at?: string;
          credit_limit?: number | null;
          customer_code: string;
          email?: string | null;
          id?: string;
          name: string;
          outstanding_balance?: number | null;
          phone?: string | null;
          state?: string | null;
          updated_at?: string;
        };
        Update: {
          address?: string | null;
          city?: string | null;
          created_at?: string;
          credit_limit?: number | null;
          customer_code?: string;
          email?: string | null;
          id?: string;
          name?: string;
          outstanding_balance?: number | null;
          phone?: string | null;
          state?: string | null;
          updated_at?: string;
        };
        Relationships: [];
      };
      order_items: {
        Row: {
          created_at: string;
          id: string;
          order_id: string;
          product_id: string;
          quantity: number;
          total: number;
          unit_price: number;
        };
        Insert: {
          created_at?: string;
          id?: string;
          order_id: string;
          product_id: string;
          quantity: number;
          total: number;
          unit_price: number;
        };
        Update: {
          created_at?: string;
          id?: string;
          order_id?: string;
          product_id?: string;
          quantity?: number;
          total?: number;
          unit_price?: number;
        };
        Relationships: [
          {
            foreignKeyName: "order_items_order_id_fkey";
            columns: ["order_id"];
            isOneToOne: false;
            referencedRelation: "orders";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "order_items_product_id_fkey";
            columns: ["product_id"];
            isOneToOne: false;
            referencedRelation: "products";
            referencedColumns: ["id"];
          }
        ];
      };
      orders: {
        Row: {
          created_at: string;
          customer_id: string;
          delivery_date: string | null;
          id: string;
          notes: string | null;
          order_date: string;
          order_number: string;
          status: string | null;
          total_amount: number;
          updated_at: string;
          van_id: string | null;
        };
        Insert: {
          created_at?: string;
          customer_id: string;
          delivery_date?: string | null;
          id?: string;
          notes?: string | null;
          order_date?: string;
          order_number: string;
          status?: string | null;
          total_amount?: number;
          updated_at?: string;
          van_id?: string | null;
        };
        Update: {
          created_at?: string;
          customer_id?: string;
          delivery_date?: string | null;
          id?: string;
          notes?: string | null;
          order_date?: string;
          order_number?: string;
          status?: string | null;
          total_amount?: number;
          updated_at?: string;
          van_id?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "orders_customer_id_fkey";
            columns: ["customer_id"];
            isOneToOne: false;
            referencedRelation: "customers";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "orders_van_id_fkey";
            columns: ["van_id"];
            isOneToOne: false;
            referencedRelation: "vans";
            referencedColumns: ["id"];
          }
        ];
      };
      products: {
        Row: {
          created_at: string;
          description: string | null;
          id: string;
          name: string;
          product_code: string;
          reorder_level: number | null;
          stock_quantity: number;
          unit_price: number;
          category: string | null;
          quantity: number;
          unit: string | null;
          updated_at: string;
        };
        Insert: {
          created_at?: string;
          description?: string | null;
          id?: string;
          name: string;
          product_code: string;
          stock_quantity?: number;
          unit_price: number;
          category?: string | null;
          quantity?: number;
          unit?: string | null;
          updated_at?: string;
        };
        Update: {
          created_at?: string;
          description?: string | null;
          id?: string;
          name?: string;
          product_code?: string;
          stock_quantity?: number;
          unit_price?: number;
          category?: string | null;
          quantity?: number;
          unit?: string | null;
          updated_at?: string;
        };
        Relationships: [];
      };

      receipts: {
        Row: {
          amount: number;
          created_at: string;
          customer_id: string;
          id: string;
          notes: string | null;
          payment_method: string | null;
          receipt_date: string;
          receipt_number: string;
          reference_number: string | null;
          updated_at: string;
          van_id: string | null;
        };
        Insert: {
          amount: number;
          created_at?: string;
          customer_id: string;
          id?: string;
          notes?: string | null;
          payment_method?: string | null;
          receipt_date?: string;
          receipt_number: string;
          reference_number?: string | null;
          updated_at?: string;
          van_id?: string | null;
        };
        Update: {
          amount?: number;
          created_at?: string;
          customer_id?: string;
          id?: string;
          notes?: string | null;
          payment_method?: string | null;
          receipt_date?: string;
          receipt_number?: string;
          reference_number?: string | null;
          updated_at?: string;
          van_id?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "receipts_customer_id_fkey";
            columns: ["customer_id"];
            isOneToOne: false;
            referencedRelation: "customers";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "receipts_van_id_fkey";
            columns: ["van_id"];
            isOneToOne: false;
            referencedRelation: "vans";
            referencedColumns: ["id"];
          }
        ];
      };
      return_items: {
        Row: {
          created_at: string;
          id: string;
          product_id: string;
          quantity: number;
          return_id: string;
          total: number;
          unit_price: number;
        };
        Insert: {
          created_at?: string;
          id?: string;
          product_id: string;
          quantity: number;
          return_id: string;
          total: number;
          unit_price: number;
        };
        Update: {
          created_at?: string;
          id?: string;
          product_id?: string;
          quantity?: number;
          return_id?: string;
          total?: number;
          unit_price?: number;
        };
        Relationships: [
          {
            foreignKeyName: "return_items_product_id_fkey";
            columns: ["product_id"];
            isOneToOne: false;
            referencedRelation: "products";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "return_items_return_id_fkey";
            columns: ["return_id"];
            isOneToOne: false;
            referencedRelation: "sales_returns";
            referencedColumns: ["id"];
          }
        ];
      };
      sale_items: {
        Row: {
          created_at: string;
          discount: number | null;
          id: string;
          product_id: string;
          quantity: number;
          sale_id: string;
          total: number;
          unit_price: number;
        };
        Insert: {
          created_at?: string;
          discount?: number | null;
          id?: string;
          product_id: string;
          quantity: number;
          sale_id: string;
          total: number;
          unit_price: number;
        };
        Update: {
          created_at?: string;
          discount?: number | null;
          id?: string;
          product_id?: string;
          quantity?: number;
          sale_id?: string;
          total?: number;
          unit_price?: number;
        };
        Relationships: [
          {
            foreignKeyName: "sale_items_product_id_fkey";
            columns: ["product_id"];
            isOneToOne: false;
            referencedRelation: "products";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "sale_items_sale_id_fkey";
            columns: ["sale_id"];
            isOneToOne: false;
            referencedRelation: "sales";
            referencedColumns: ["id"];
          }
        ];
      };
      sales: {
        Row: {
          balance: number | null;
          created_at: string;
          customer_id: string;
          id: string;
          invoice_number: string;
          notes: string | null;
          paid_amount: number | null;
          payment_status: string | null;
          sale_date: string;
          total_amount: number;
          updated_at: string;
          van_id: string | null;
        };
        Insert: {
          balance?: number | null;
          created_at?: string;
          customer_id: string;
          id?: string;
          invoice_number: string;
          notes?: string | null;
          paid_amount?: number | null;
          payment_status?: string | null;
          sale_date?: string;
          total_amount?: number;
          updated_at?: string;
          van_id?: string | null;
        };
        Update: {
          balance?: number | null;
          created_at?: string;
          customer_id?: string;
          id?: string;
          invoice_number?: string;
          notes?: string | null;
          paid_amount?: number | null;
          payment_status?: string | null;
          sale_date?: string;
          total_amount?: number;
          updated_at?: string;
          van_id?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "sales_customer_id_fkey";
            columns: ["customer_id"];
            isOneToOne: false;
            referencedRelation: "customers";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "sales_van_id_fkey";
            columns: ["van_id"];
            isOneToOne: false;
            referencedRelation: "vans";
            referencedColumns: ["id"];
          }
        ];
      };
      sales_returns: {
        Row: {
          created_at: string;
          id: string;
          reason: string | null;
          return_date: string;
          return_number: string;
          sale_id: string;
          total_amount: number;
          updated_at: string;
        };
        Insert: {
          created_at?: string;
          id?: string;
          reason?: string | null;
          return_date?: string;
          return_number: string;
          sale_id: string;
          total_amount?: number;
          updated_at?: string;
        };
        Update: {
          created_at?: string;
          id?: string;
          reason?: string | null;
          return_date?: string;
          return_number?: string;
          sale_id?: string;
          total_amount?: number;
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "sales_returns_sale_id_fkey";
            columns: ["sale_id"];
            isOneToOne: false;
            referencedRelation: "sales";
            referencedColumns: ["id"];
          }
        ];
      };
      stock_transfers: {
        Row: {
          created_at: string;
          from_van_id: string;
          id: string;
          notes: string | null;
          status: string | null;
          to_van_id: string;
          transfer_date: string;
          transfer_number: string;
          updated_at: string;
        };
        Insert: {
          created_at?: string;
          from_van_id: string;
          id?: string;
          notes?: string | null;
          status?: string | null;
          to_van_id: string;
          transfer_date?: string;
          transfer_number: string;
          updated_at?: string;
        };
        Update: {
          created_at?: string;
          from_van_id?: string;
          id?: string;
          notes?: string | null;
          status?: string | null;
          to_van_id?: string;
          transfer_date?: string;
          transfer_number?: string;
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "stock_transfers_from_van_id_fkey";
            columns: ["from_van_id"];
            isOneToOne: false;
            referencedRelation: "vans";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "stock_transfers_to_van_id_fkey";
            columns: ["to_van_id"];
            isOneToOne: false;
            referencedRelation: "vans";
            referencedColumns: ["id"];
          }
        ];
      };
      transfer_items: {
        Row: {
          created_at: string;
          id: string;
          product_id: string;
          quantity: number;
          transfer_id: string;
        };
        Insert: {
          created_at?: string;
          id?: string;
          product_id: string;
          quantity: number;
          transfer_id: string;
        };
        Update: {
          created_at?: string;
          id?: string;
          product_id?: string;
          quantity?: number;
          transfer_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "transfer_items_product_id_fkey";
            columns: ["product_id"];
            isOneToOne: false;
            referencedRelation: "products";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "transfer_items_transfer_id_fkey";
            columns: ["transfer_id"];
            isOneToOne: false;
            referencedRelation: "stock_transfers";
            referencedColumns: ["id"];
          }
        ];
      };
      vans: {
        Row: {
          created_at: string;
          driver_name: string | null;
          id: string;
          phone: string | null;
          status: string | null;
          updated_at: string;
          van_code: string;
          van_name: string;
        };
        Insert: {
          created_at?: string;
          driver_name?: string | null;
          id?: string;
          phone?: string | null;
          status?: string | null;
          updated_at?: string;
          van_code: string;
          van_name: string;
        };
        Update: {
          created_at?: string;
          driver_name?: string | null;
          id?: string;
          phone?: string | null;
          status?: string | null;
          updated_at?: string;
          van_code?: string;
          van_name?: string;
        };
        Relationships: [];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
};

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
