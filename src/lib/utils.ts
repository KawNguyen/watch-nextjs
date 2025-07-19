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

export const formatTime = (date: Date) => {
  return date.toLocaleTimeString("en-US", {
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
