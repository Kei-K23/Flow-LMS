import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function absoluteURL(url: string) {
  return `${process.env.NEXT_PUBLIC_BASE_URL}${url}`
}
