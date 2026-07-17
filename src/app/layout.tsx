import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "AI Arena - AI 大模型排名",
  description: "多维度 AI 大模型排名网站，包含 ELO 综合评分、编程/写作/数学/推理分项排名及性价比对比。数据持续更新。",
  keywords: ["AI", "大模型", "排名", "LLM", "排行榜", "GPT", "Claude", "Gemini"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN" className="h-full antialiased">
      <body className="min-h-full flex flex-col bg-background text-foreground">
        <Header />
        <main className="flex-1">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
