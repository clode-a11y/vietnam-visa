import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Виза во Вьетнам для граждан РФ | Нячанг",
  description: "Всё о визах во Вьетнам: безвизовый въезд до 45 дней, E-Visa, виза по прилёту. Актуальная информация для граждан России.",
  keywords: "виза Вьетнам, виза Нячанг, E-Visa Вьетнам, безвизовый въезд Вьетнам",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
