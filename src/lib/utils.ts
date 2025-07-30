import { AddressProps } from "@/types/auth";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { v4 as uuidv4 } from "uuid";

export function createUUId() {
  return uuidv4();
}

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const formatDate = (date: Date) => {
  return date.toLocaleDateString("vi-VN", {
    year: "numeric",
    month: "numeric",
    day: "numeric",
  });
};

export const formatTime = (date: Date) => {
  return date.toLocaleTimeString("vi-VN", {
    hour12: false,
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });
};

export function formatMoney(
  amount: number,
  locale = "vi-VN",
  currency = "VND"
): string {
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency,
    minimumFractionDigits: 0,
  }).format(amount);
}

export function formatAddress(address: AddressProps) {
  const ward = address.ward ? JSON.parse(address.ward) : null;
  const district = address.district ? JSON.parse(address.district) : null;
  const city = address.city ? JSON.parse(address.city) : null;

  return [
    address.street,
    ward?.name,
    district?.name,
    city?.name,
    address.country,
  ]
    .filter(Boolean)
    .join(", ");
}

export function formatDeliveryAddress(address: {
  street?: string;
  wardName?: string;
  districtName?: string;
  provinceName?: string;
}) {
  const parts = [
    address.street,
    address.wardName,
    address.districtName,
    address.provinceName,
  ]
    .filter(Boolean)
    .map((part) => (part as string).replace(/^"|"$/g, ""));

  return parts.join(", ");
}

export function extractThumbnailAndDescription(htmlString: string) {
  if (typeof window === "undefined") return { thumbnail: "", description: "" };

  const parser = new DOMParser();
  const doc = parser.parseFromString(htmlString, "text/html");
  const img = doc.querySelector("img")?.getAttribute("src") || "";
  const description = doc.querySelector("p")?.textContent || "";
  return { thumbnail: img, description };
}
