import Image from "next/image";

export default function Logo() {
  return (
    <Image
      src="/morur-misti-logo.png"
      alt="Company Logo"
      width={80}
      height={60}
      className="object-contain"
      priority
    />
  );
}
