import { create } from "zustand";
import type { SignatureData, SignatureStyle } from "@/lib/supabase/types";

interface EditorState {
  step: number;
  templateId: string;
  signatureName: string;
  data: SignatureData;
  style: SignatureStyle;
  logoUrl: string | null;
  photoUrl: string | null;
  setStep: (step: number) => void;
  setTemplateId: (id: string) => void;
  setSignatureName: (name: string) => void;
  setData: (data: Partial<SignatureData>) => void;
  setStyle: (style: Partial<SignatureStyle>) => void;
  setLogoUrl: (url: string | null) => void;
  setPhotoUrl: (url: string | null) => void;
  reset: () => void;
  loadSignature: (sig: {
    template_id: string;
    name: string;
    data: SignatureData;
    style: SignatureStyle;
    logo_url: string | null;
    photo_url: string | null;
  }) => void;
}

const defaultData: SignatureData = {
  full_name: "",
  position: "",
  company: "",
  motto: "",
  phone: "",
  email: "",
  website: "",
  socials: {},
};

const defaultStyle: SignatureStyle = {
  primary_color: "#F97316",
  secondary_color: "#111827",
  text_color: "#6B7280",
  background_color: "#FFFFFF",
  font: "Arial",
  font_size: "md",
  alignment: "left",
  border_radius: "md",
  shadow: true,
};

export const useEditorStore = create<EditorState>((set) => ({
  step: 1,
  templateId: "",
  signatureName: "Můj podpis",
  data: { ...defaultData },
  style: { ...defaultStyle },
  logoUrl: null,
  photoUrl: null,
  setStep: (step) => set({ step }),
  setTemplateId: (templateId) => set({ templateId }),
  setSignatureName: (signatureName) => set({ signatureName }),
  setData: (data) =>
    set((state) => ({ data: { ...state.data, ...data } })),
  setStyle: (style) =>
    set((state) => ({ style: { ...state.style, ...style } })),
  setLogoUrl: (logoUrl) => set({ logoUrl }),
  setPhotoUrl: (photoUrl) => set({ photoUrl }),
  reset: () =>
    set({
      step: 1,
      templateId: "",
      signatureName: "Můj podpis",
      data: { ...defaultData },
      style: { ...defaultStyle },
      logoUrl: null,
      photoUrl: null,
    }),
  loadSignature: (sig) =>
    set({
      step: 1,
      templateId: sig.template_id,
      signatureName: sig.name,
      data: sig.data,
      style: sig.style,
      logoUrl: sig.logo_url,
      photoUrl: sig.photo_url,
    }),
}));
