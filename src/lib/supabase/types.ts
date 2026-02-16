export type Tier = "free" | "pro" | "team";

export interface Profile {
  id: string;
  tier: Tier;
  team_id: string | null;
  payment_id: string | null;
  jp_vision_client: boolean;
  created_at: string;
  updated_at: string;
}

export interface Signature {
  id: string;
  user_id: string;
  template_id: string;
  name: string;
  data: SignatureData;
  style: SignatureStyle;
  logo_url: string | null;
  photo_url: string | null;
  created_at: string;
  updated_at: string;
}

export interface SignatureData {
  full_name: string;
  position: string;
  company: string;
  motto: string;
  phone: string;
  email: string;
  website: string;
  socials: {
    linkedin?: string;
    instagram?: string;
    facebook?: string;
    twitter?: string;
    github?: string;
    tiktok?: string;
    youtube?: string;
  };
}

export interface SignatureStyle {
  primary_color: string;
  secondary_color: string;
  text_color: string;
  background_color: string;
  font: string;
  font_size: "sm" | "md" | "lg";
  alignment: "left" | "center";
  border_radius: "none" | "sm" | "md" | "lg";
  shadow: boolean;
}

export interface Team {
  id: string;
  name: string;
  owner_id: string;
  brand_kit: BrandKit;
  created_at: string;
}

export interface BrandKit {
  primary_color: string;
  secondary_color: string;
  font: string;
  logo_url: string | null;
}

export interface TeamMember {
  id: string;
  team_id: string;
  user_id: string;
  role: "owner" | "member";
  invited_at: string;
  joined_at: string | null;
}
